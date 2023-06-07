import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import scipy.signal as sig


CSV_PATH = "results/2023_06_01_16_07/csv"

def load_gaze_data(csv_path):
    gz = []

    csv_files = os.listdir(csv_path)
    for i in range(len(csv_files)):
        df = pd.read_csv(csv_path + "/" + csv_files[i], header=0)
        gz.append(df)
    
    return csv_files, gz
    
    
def remove_missing(pupil, time):
    time_nan = []
    pupil_nan = []
    
    T = time[len(time)-1]-time[0]
    idx = 0
    for i in range(T):
        time_nan.append(time[0] + i)
        if time[idx] == time[0]+i:
            pupil_nan.append(pupil[idx])
#            time_nan.append(time[idx])
            idx += 1
        else:
#            time_nan.append(i)
            pupil_nan.append(np.nan)
    return pupil_nan, time_nan

def get_pupil_time(var, df):
    samples = df[var.index("samples.csv")]
    time = samples["samples.time"]
    pupil = samples["samples.paL"]
    
    return samples, pupil, time
    
def get_blinks(var,df):
    
    blinks = df[var.index("blinks.csv")]
    starts = np.array(blinks["blinks.sttime"])
    ends = np.array(blinks["blinks.entime"])
    
    return blinks, starts, ends
    
def remove_blinks(pupil, starts, ends):
    pupil_new = pupil
    window = 100
    for i in range(len(starts)):
        spup = time.index(starts[i])
        epup = time.index(ends[i])
        
        for j in range((spup-window),(epup+window)):
            pupil_new[j] = np.nan;
        
    return pupil_new

def filter_derivs(pupil):
    deriv = np.diff(pupil)
    np.insert(deriv, 0, 0)
    mean_deriv = np.mean(deriv)
    sd_deriv = np.std(deriv)

    for i in range(len(deriv)):
        if (deriv[i] > mean_deriv + (3*sd_deriv)) or (deriv[i] < mean_deriv - (3*sd_deriv)):
            pupil[i] = np.nan
            
    return pupil
    
    
def filter_outliers(pupil):
    mean_pupil = np.mean(pupil)
    sd_pupil = np.std(pupil)

    for i in range(len(pupil)):
        if (pupil[i] > mean_pupil + (3*sd_pupil)) or (pupil[i] < mean_pupil - (3*sd_pupil)):
            pupil[i] = np.nan
            
    return pupil
    
    
def interpolate(pupil):
    pupil = pd.Series(pupil)
    pupil = pupil.interpolate()
    pupil = np.array(pupil)
        

    return pupil
    
    
#def filter_mvmts(pupil, samples):
#    pupil_z = (pupil-np.mean(pupil))/np.std(pupil)
#    x = pd.Series(samples["samples.pxL"])
#    y = pd.Series(samples["samples.pyL"])
#    x = x.interpolate()
#    y = y.interpolate()
#    
#    z_x = (x-np.mean(x))/np.std(x)
#    z_y = (y-np.mean(y))/np.std(y)
#    
#    
    
    
def filter_signal(pupil):
    srate = 500
    lpass = 4  
    n_order = 1
    freq = (lpass/srate)*2


    b,a = sig.butter(n_order,freq,'low')
    pupil = sig.filtfilt(b,a, pupil)
    
    return pupil
    
    
def save_data(path, time,pupil):
    pupil = np.array(pupil); time = np.array(time)
    pupil = pupil.reshape((len(pupil),1)); time = time.reshape((len(time),1))
    data = np.concatenate((time, pupil), axis=1)
    df = pd.DataFrame(data, columns = ['time', 'pupil'])
    df.to_csv(path, index=False)
    

var, gaze = load_gaze_data(CSV_PATH)
samples, pupil, time = get_pupil_time(var,gaze)
plt.subplot(231)
plt.plot(time,pupil)


pupil, time = remove_missing(pupil, time)
plt.subplot(232)
plt.plot(time,pupil)


blinks, bstarts, bends = get_blinks(var, gaze)
pupil = remove_blinks(pupil, bstarts, bends)
plt.subplot(233)
plt.plot(time, pupil)


pupil = filter_derivs(pupil)
plt.subplot(234)
plt.plot(time,pupil)


pupil = filter_outliers(pupil)
plt.subplot(235)
plt.plot(time,pupil)



pupil = filter_signal(interpolate(pupil))
plt.subplot(236)
plt.plot(time,pupil)

data_path = 'pupil_preprocessed.csv'
save_data(CSV_PATH + '/' + data_path, time,pupil)


plt.show()





