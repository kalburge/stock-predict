#!/usr/bin/env python
# coding: utf-8

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from mpl_toolkits import mplot3d
import os
import sklearn
from sklearn.linear_model import LinearRegression
import statsmodels.formula.api as smf
from scipy import stats

numBlocks = 8
numSteps = 370

def get_files_in_directory(directory):
    files = []
    for filename in os.listdir(directory):
        f = os.path.join(directory, filename)
        # checking if it is a file
        if os.path.isfile(f) and f[-4:] == ".csv":
            files.append(f)
    return files

def load(filepath, thresh, showBonus=False):
    df = pd.read_csv(filepath)
    participant_ID = 0
    if 'PROLIFIC_PID' in df.columns:
        participant_ID = df["PROLIFIC_PID"][0]
        df.drop(columns=['PROLIFIC_PID', 'STUDY_ID', 'SESSION_ID', 'space_bar.keys', 'space_bar.rt', 'participant', 'session', 'date', 'expName',
                        'psychopyVersion', 'OS', 'frameRate', 'steps.thisRepN', 'steps.thisTrialN',
                        'steps.thisIndex', 'steps.ran', 'blocks.thisRepN', 'blocks.thisTrialN', 'blocks.thisN',
                        'blocks.thisIndex', 'blocks.ran', 'train.thisRepN', 'train.thisTrialN',
                        'train.thisN', 'train.thisIndex', 'train.ran'], inplace=True)
    else:
        df.drop(columns=['space_bar.keys', 'space_bar.rt', 'participant', 'session', 'date', 'expName',
                        'psychopyVersion', 'OS', 'frameRate', 'steps.thisRepN', 'steps.thisTrialN',
                        'steps.thisIndex', 'steps.ran', 'blocks.thisRepN', 'blocks.thisTrialN', 'blocks.thisN',
                        'blocks.thisIndex', 'blocks.ran'], inplace=True)
        if 'train.thisRepN' in df.columns:
            df.drop(columns=['train.thisRepN', 'train.thisTrialN', 'train.thisN', 
            'train.thisIndex', 'train.ran'], inplace=True)
    lengthExp = np.sum(df['resp.rt'])
    # drop unused columns
    df.dropna(how='all', inplace=True)
    # drop training round
    df.dropna(how='any', inplace=True)
    df.reset_index(inplace=True)
    df.drop(columns = 'index', inplace=True)
    df["commit"] = [1 if resp == 'up' or resp == 'down' else 0 for resp in df['resp.keys']]
    df["resp.keys"] = [1 if resp == 'up' else -1 if resp == 'down' else 0 for resp in df['resp.keys']]
    df["dPrice_dt"] = np.diff(df['price'], prepend=0)
    overall_acc = accuracy(df)
    # print result
    if showBonus:
        if compute_bonus(df, thresh) != 0:
            print(str(participant_ID) + ',' + str(compute_bonus(df, thresh)))
    return participant_ID, df, overall_acc, lengthExp

def convert_to_bursty(choice, idx):
    '''Converts simulated choice data structure into a data structure of time lags (amount of time since last
    consuming a particular choice).
    
    Parameters
    ----------
    choice : numpy array
        The data structure containing the choice made for each time point t in the simulation.
        
    Returns
    -------
    lags : pandas DataFrame
        The DataFrame containing the time lags for choice 2 (choice_index = 1 denotes choice 2, = 0 
        denotes choice 1)
    dfTL.shape[0] : int
        The number of lags in the DataFrame
    
    '''
    choice_index = 1 - idx
    new_choice = [float(i) for i in choice]
    new_choice = [float('nan') if x==choice_index else x for x in new_choice]
    choicetime = []
    for i in range(0,len(new_choice)):
        if round(new_choice[i],1) == idx: # choice == 0 if event happen (e.g., go to gym)
            choicetime.append(i)
    time_lags = [choicetime[i] - choicetime[i-1] for i in range(1,len(choicetime))]
    dfTL = pd.DataFrame(time_lags, columns=['TL'])
    dfTL['counts'] = choicetime[0:len(choicetime)-1]
    lags = dfTL.groupby(dfTL['TL']).count()
    return np.array(time_lags), np.array(lags.index), np.array(lags.counts), dfTL.shape[0]

def block(n, df, start):
    k = int(df.shape[0]/numBlocks)
    block = df.iloc[(n-1)*k: n*k]
    return block.iloc[start:]

def accuracy(df):
    commits = df[df['commit'] == 1]
    correct_resps = np.array(commits['resp.keys'] == commits['state']).tolist()
    correct_resps = [int(c) for c in correct_resps]
    return round(np.sum(correct_resps)/len(correct_resps),3)

def compute_bonus(df, thresh):
    dp_threshold = np.sum(thresh)
    avg_score_per_block = [sc - round(sc/2, 0) for sc in thresh]
    bonus_threshold = np.sum(avg_score_per_block)
    final_score = df['score'].iloc[-1]
    # if final_score >= dp_threshold:
    #     return "Exceeded DP algorithm score"
    if final_score >= bonus_threshold:
        return round(final_score/bonus_threshold,2)
    else:
        return 0

def compute_burstiness(lags_line):
    mean = np.mean(lags_line)
    std = np.std(lags_line)
    return (std - mean)/(std+mean)

def compute_mean(lags_line):
    return np.mean(lags_line)

def compute_std(lags_line):
    return np.std(lags_line)

def get_accuracy(data, d=0):
    q = []; eps = []; acc_i = []; nlist = []
    for i in range(1,numBlocks+1):
        curBlock = block(i,data,d)
        q.append(curBlock['q_prob'].iloc[1]); eps.append(curBlock['eps_prob'].iloc[1])
        acc_i.append(accuracy(curBlock))
    q = np.array(q); q = q.reshape(-1,1)
    eps = np.array(eps); eps = eps.reshape(-1,1)
    acc_i = np.array(acc_i); acc_i = acc_i.reshape(-1,1)
    return q, eps, acc_i

def get_burstiness(data, d=0):
    q = []; eps = []; b_i = []; nlist = []
    for i in range(1,numBlocks+1):
        curBlock = block(i,data,d)
        all_lags, lags, freq, N = convert_to_bursty(np.array(curBlock.commit), 1)
        q.append(curBlock['q_prob'].iloc[1]); eps.append(curBlock['eps_prob'].iloc[1])
        b_i.append(compute_burstiness(all_lags)); nlist.append(N)
    q = np.array(q); q = q.reshape(-1,1)
    eps = np.array(eps); eps = eps.reshape(-1,1)
    b_i = np.array(b_i); b_i = b_i.reshape(-1,1)
    nlist = np.array(nlist); nlist = nlist.reshape(-1,1)
    return q, eps, b_i, nlist
    
def get_mean_iai(data, d=0):
    q = []; eps = []; mu_i = []; nlist = []
    for i in range(1,numBlocks+1):
        curBlock = block(i,data,d)
        all_lags, lags, freq, N = convert_to_bursty(np.array(curBlock.commit), 1)
        q.append(curBlock['q_prob'].iloc[1]); eps.append(curBlock['eps_prob'].iloc[1])
        mu_i.append(compute_mean(all_lags)); nlist.append(N)
    q = np.array(q); q = q.reshape(-1,1)
    eps = np.array(eps); eps = eps.reshape(-1,1)
    mu_i = np.array(mu_i); mu_i = mu_i.reshape(-1,1)
    nlist = np.array(nlist); nlist = nlist.reshape(-1,1)
    return q, eps, mu_i, nlist

def get_linear_fit(x,y):
    slope, intercept, r2, p, se = stats.linregress(x[:,0], y[:,0])
    linestyle = 'solid'
    color = 'grey'
    if r2 < 0.5:
        linestyle = 'dotted'
    if p < 0.05:
        color = 'red'
    inp = np.linspace(np.min(x), np.max(x), 8)
    outp = slope*inp + intercept
    inp = inp.reshape(-1,1); outp = outp.reshape(-1,1)
    return inp, outp, linestyle, color

def get_sin_fit(x,y):
    dataset = np.concatenate((x[:,0].reshape(-1,1), y[:,0].reshape(-1,1)), axis=1)
    dataset = pd.DataFrame(data, columns = ["x", "y"])
    mdl = smf.logit(formula = "y~x", data = dataset).fit()
    slope, intercept, r2, p, se = mdl.params[1], mdl.params[0], mdl.prsquared, mdl.pval
    linestyle = 'solid'
    color = 'grey'
    if r2 < 0.5:
        linestyle = 'dotted'
    if p < 0.05:
        color = 'cyan'
    inp = np.linspace(np.min(x), np.max(x), 8)
    outp = slope*inp + intercept
    inp = inp.reshape(-1,1); outp = outp.reshape(-1,1)
    return inp, outp, linestyle, color

    
def get_threshold(data, d=0):
    q = []; eps = []; up_price = []; down_price = []; change_up = []; change_down = []
    for i in range(1,numBlocks+1):
        curBlock = block(i,data,d)
        ups = curBlock.index[curBlock['resp.keys'] == 1]
        ups = ups - 1
        ups = ups[1:]
        downs = curBlock.index[curBlock['resp.keys'] == -1]
        downs = downs - 1
        downs = downs[1:]
        q.append(curBlock['q_prob'].iloc[1]); eps.append(curBlock['eps_prob'].iloc[1])
        up_price.append(np.mean(data.iloc[ups]['price'])); down_price.append(np.mean(data.iloc[downs]['price']))
        change_up.append(np.mean(data.iloc[ups]['dPrice_dt']))
        change_down.append(np.mean(data.iloc[downs]['dPrice_dt']))
      
    q = np.array(q); q = q.reshape(-1,1)
    eps = np.array(eps); eps = eps.reshape(-1,1)
    up_price = np.array(up_price); up_price = up_price.reshape(-1,1)
    down_price = np.array(down_price); down_price = down_price.reshape(-1,1)
    change_up = np.array(change_up); change_up = change_up.reshape(-1,1)
    change_down = np.array(change_down); change_down = change_down.reshape(-1,1)
    
    return q, eps, up_price, down_price, change_up, change_down



def get_abs_threshold(data, d=0):
    q = []; eps = []; threshold_price = []
    for i in range(1,numBlocks+1):
        curBlock = block(i,data,d)
        all = curBlock.index[np.abs(curBlock['resp.keys']) == 1]
        all = all - 1
        all = all[1:]
        q.append(curBlock['q_prob'].iloc[1]); eps.append(curBlock['eps_prob'].iloc[1])
        threshold_price.append(np.mean(data.iloc[all]['price'])); 
      
    q = np.array(q); q = q.reshape(-1,1)
    eps = np.array(eps); eps = eps.reshape(-1,1)
    threshold_price = np.array(threshold_price); threshold_price = threshold_price.reshape(-1,1)
    
    return q, eps, threshold_price
    

    
def plot_eps(data, d=0):
    eps = []; b_i = []; mu_i = []; std_i = [];
    fig, ax = plt.subplots(figsize=(7,2.5),dpi=150)
    plt.subplots_adjust(wspace=0.4)
    for i in range(1,numBlocks+1):
        curBlock = block(i,data,d)
        all_lags, lags, freq, N = convert_to_bursty(np.array(curBlock.commit), 1)
        eps.append(curBlock['eps_prob'].iloc[1])
        b_i.append(compute_burstiness(all_lags))
        mu_i.append(compute_mean(all_lags))
        std_i.append(compute_std(all_lags))
    
    eps = np.array(eps); eps = eps.reshape(-1,1)
    b_i = np.array(b_i); b_i = b_i.reshape(-1,1)
    mu_i = np.array(mu_i); mu_i = mu_i.reshape(-1,1)
    std_i = np.array(std_i); std_i = std_i.reshape(-1,1)
    
    plt.subplot(131)
    plt.scatter(eps,b_i)
    plt.xlabel('$\epsilon$'); plt.ylabel('$B$')
    eps_mdl = LinearRegression(); eps_mdl.fit(eps,b_i)
    plt.plot(eps, eps_mdl.predict(eps), 'r')
    
    plt.subplot(132)
    plt.scatter(eps,mu_i)
    plt.xlabel('$\epsilon$'); plt.ylabel('$\mu$')
    eps_mdl = LinearRegression(); eps_mdl.fit(eps,mu_i)
    plt.plot(eps, eps_mdl.predict(eps), 'r')
    
    plt.subplot(133)
    plt.scatter(eps,std_i)
    plt.xlabel('$\epsilon$'); plt.ylabel('$\sigma$')
    eps_mdl = LinearRegression(); eps_mdl.fit(eps,std_i)
    plt.plot(eps, eps_mdl.predict(eps), 'r')
    plt.show()
    
    
    
def plot_q(data):
    q = []; b_i = []; mu_i = []; std_i = [];
    fig, ax = plt.subplots(figsize=(7,2.5),dpi=150)
    plt.subplots_adjust(wspace=0.4)
    for i in range(1,numBlocks+1):
        curBlock = block(i,data)
        all_lags, lags, freq, N = convert_to_bursty(np.array(curBlock.commit), 1)
        q.append(curBlock['q_prob'].iloc[1])
        b_i.append(compute_burstiness(all_lags))
        mu_i.append(compute_mean(all_lags))
        std_i.append(compute_std(all_lags))
    
    q = np.array(q); q = q.reshape(-1,1)
    b_i = np.array(b_i); b_i = b_i.reshape(-1,1)
    mu_i = np.array(mu_i); mu_i = mu_i.reshape(-1,1)
    std_i = np.array(std_i); std_i = std_i.reshape(-1,1)
    
    plt.subplot(131)
    plt.scatter(q,b_i)
    plt.xlabel('$q$'); plt.ylabel('$B$')
    q_mdl = LinearRegression(); q_mdl.fit(q,b_i)
    plt.plot(q, q_mdl.predict(q), 'r')
    
    plt.subplot(132)
    plt.scatter(q,mu_i)
    plt.xlabel('$q$'); plt.ylabel('$\mu$')
    q_mdl = LinearRegression(); q_mdl.fit(q,mu_i)
    plt.plot(q, q_mdl.predict(q), 'r')
    
    plt.subplot(133)
    plt.scatter(q,std_i)
    plt.xlabel('$q$'); plt.ylabel('$\sigma$')
    q_mdl = LinearRegression(); q_mdl.fit(q,std_i)
    plt.plot(q, q_mdl.predict(q), 'r')
    plt.show()