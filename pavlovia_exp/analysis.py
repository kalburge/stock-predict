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
    print("There are " + str(len(files)) + " subject's data files in this folder.")
    return files, len(files)

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
    return block.iloc[start: -5]

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

def get_score(df, thresh):
    dp_threshold = np.sum(thresh)
    avg_score_per_block = [sc - round(sc/2, 0) for sc in thresh]
    bonus_threshold = np.sum(avg_score_per_block)
    final_score = df['score'].iloc[-1]
    # if final_score >= dp_threshold:
    #     return "Exceeded DP algorithm score"
    return final_score

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
    return inp, outp, slope, intercept, p, linestyle, color

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
    
def show_bonuses(files, eps_thresh):
    print("The following participants received a bonus. Results are displayed in the format id,bonus:\n")
    for f in files:
        pid, df, acc, length = load(f, eps_thresh, True)


def get_population_summary(files, eps_thresh):
    id = []; accuracy = []; time_taken = []; score = []; rec_bonus = []; slope = []; intercept = []; pval = []
    change_in_eps = []; num_commits = []
    discard = 70
    for f in files:
        pid, df, acc, length = load(f, eps_thresh)
        s, i, p = get_iai_eps_slopes(df, discard)
        id.append(pid); accuracy.append(acc); time_taken.append(length); 
        score.append(get_score(df,eps_thresh)); rec_bonus.append((compute_bonus(df, eps_thresh) != 0))
        slope.append(s); intercept.append(i); pval.append(p)
        change_in_eps.append(get_change_iai(df,discard))
        num_commits.append(len(df[df['commit'] == 1]))
    
    id = np.array(id); id = id.reshape(-1,1)
    accuracy = np.array(accuracy); accuracy = accuracy.reshape(-1,1)
    time_taken = np.array(time_taken); time_taken = time_taken.reshape(-1,1)
    score = np.array(score); score = score.reshape(-1,1)
    rec_bonus = np.array(rec_bonus); rec_bonus = rec_bonus.reshape(-1,1)
    slope = np.array(slope); slope = slope.reshape(-1,1)
    intercept = np.array(intercept); intercept = intercept.reshape(-1,1)
    pval = np.array(pval); pval = pval.reshape(-1,1)
    change_in_eps = np.array(change_in_eps); change_in_eps = change_in_eps.reshape(-1,1)
    num_commits = np.array(num_commits); num_commits = num_commits.reshape(-1,1)
    mat = np.concatenate((id, accuracy, time_taken, score, 
            rec_bonus, slope, intercept, pval, change_in_eps, num_commits), axis=1)

    show_summary_plots(accuracy, time_taken, score, rec_bonus, slope, intercept, pval, change_in_eps, num_commits)
    return pd.DataFrame(mat, columns=['id', 'accuracy', 'time_taken', 'score', 'received_bonus', 'slope', 'intercept', 'pval', 'change_in_eps', 'num_commits'])


def show_summary_plots(accuracy, time_taken, score, rec_bonus, slope, intercept, pval, change_in_eps, num_commits):
    fig, ax = plt.subplots(figsize=(9,12),dpi=150)
    plt.subplots_adjust(wspace=0.35, hspace = 0.3) 
    plt.subplot(321)
    plt.scatter(accuracy, score, c=rec_bonus)
    plt.hlines(y=492, xmin = min(accuracy), xmax = max(accuracy), colors = ['black'], linestyles = 'dashed')
    plt.xlabel("Accuracy")
    plt.ylabel("Score")
    plt.title("Subject score vs. accuracy", fontsize = 10)
    plt.subplot(322)
    plt.scatter(accuracy, num_commits, c=score)
    plt.xlabel("Accuracy")
    plt.ylabel("Number of commits")
    plt.title("Subject number of commits (s) vs. accuracy (color = score)", fontsize = 10)
    plt.colorbar()
    plt.subplot(323)
    plt.scatter(accuracy, time_taken, c=score)
    plt.xlabel("Accuracy")
    plt.ylabel("Time Taken (s)")
    plt.title("Subject time taken (s) vs. accuracy (color = score)", fontsize = 10)
    plt.colorbar()
    plt.subplot(324)
    plt.scatter(accuracy, slope, c=score)
    plt.xlabel("Accuracy")
    plt.ylabel("Slope")
    plt.title("Subject slope (s) vs. accuracy (color = score)", fontsize = 10)
    plt.colorbar()
    plt.subplot(325)
    plt.scatter(accuracy, intercept, c=score)
    plt.xlabel("Accuracy")
    plt.ylabel("Intercept")
    plt.title("Subject intercept (s) vs. accuracy (color = score)", fontsize = 10)
    plt.colorbar()
    plt.subplot(326)
    plt.scatter(accuracy, change_in_eps, c=score)
    plt.xlabel("Accuracy")
    plt.ylabel("Change in $\mu_\\tau$ across $\epsilon$")
    plt.title("Subject intercept (s) vs. change in $\mu_\\tau$ across $\epsilon$ (color = score)", fontsize = 10)
    plt.colorbar()
    # plt.subplot(326)
    # plt.scatter(accuracy, intercept, c=score)
    # plt.xlabel("Accuracy")
    # plt.ylabel("Intercept")
    # plt.title("Subject intercept (s) vs. accuracy (color = score)", fontsize = 11)
    # plt.colorbar()

    

def get_iai_eps_slopes(df, discard):
    __, eps, mu_i, __ = get_mean_iai(df, discard)
    x, y, s, i, p, l, c = get_linear_fit(eps,mu_i)
    # plt.plot(x,y, linestyle = l, c=c)
    return s, i, p

def get_change_iai(df, discard):
    __, eps, mu_i, __ = get_mean_iai(df, discard)
    return mu_i[-1] - mu_i[0]
