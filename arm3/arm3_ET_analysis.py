import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import rc



CSV_PATH = "results/2023_06_01_14_15/csv"

def load_gaze_data(csv_path):
    gz = []

    csv_files = os.listdir(csv_path)
    for i in range(len(csv_files)):
        df = pd.read_csv(csv_path + "/" + csv_files[i], header=0)
        gz.append(df)
    
    return csv_files, gz

var, gaze = load_gaze_data(CSV_PATH)

sample = gaze[var.index('samples.csv')]

time = sample["samples.time"]
pupil = sample["samples.paL"]


plt.plot(time,pupil)
plt.xlabel("Time")
plt.ylabel("Average Pupil Size")
plt.show()


