from __future__ import division
from __future__ import print_function

from pathlib import Path


import pylink
import os
import platform
import random
import time
import sys
from EyeLinkCoreGraphicsPsychoPy import EyeLinkCoreGraphicsPsychoPy
from psychopy import visual, core, event, monitors, gui
from psychopy.event import waitKeys
from psychopy.core import wait
from PIL import Image  # for preparing the Host backdrop image
from string import ascii_letters, digits
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# STATIC VARIABLES
WIN_DIM = (1600,1200)
TRIALS = 10
T_STIM = 2
T_CLEAR = T_STIM/3
FULLSCR = False
WINDOW = 3
MAX_SAMP = 15

# Housekeeping variables
clock = core.Clock()



# show text messages
def show_text(txt, win, time=T_STIM, h=None, p=(0,0), wait_kb=False):
    """Show text message stimuli to participants"""
    
    if not wait_kb:
        msg = visual.TextStim(win, text=txt, height=h, pos=p)
        
        msg.draw()
        win.flip()
        wait(time)
        
        clear(win)
        
    else:
        msg = visual.TextStim(win, text=txt+"\nPress SPACE to continue or Q to quit.", height=h, pos=p)
        
        msg.draw()
        win.flip()
        key = waitKeys(keyList=["space","q"])
        if key[0] == "q":
            print("Quitting program...")
            quit()
            
        clear(win)
        
        
def show_task(img_path, txt, win, time=T_STIM, txt_h=None, txt_p=(0,0), wait_kb=False, img_size=None):
    """Show text message stimuli to participants"""
    
    if not wait_kb:
        img = visual.ImageStim(win, image=img_path, size=img_size)
        msg = visual.TextStim(win, text=txt, height=txt_h, pos=txt_p)
        
        img.draw()
        msg.draw()
        win.flip()
        wait(time)
        
        clear(win)
        
    else:
        img = visual.ImageStim(win, image=img_path, size=img_size)
        msg = visual.TextStim(win, text=txt, height=txt_h, pos=txt_p)
        
        img.draw()
        msg.draw()
        win.flip()
        key = waitKeys(keyList=["m","n", "space", "q"])
        
        clear(win)
        return key[0]
    
def clear(win):
    """Clear current window"""
    
    win.flip()
    wait(T_CLEAR)
    
def input_fname():
    """Input filename at beginning of each task run"""
    
    exp_info = {'Results filename' : 'TEST000'}
    dialg = gui.DlgFromDict(exp_info)
    if not dialg.OK:
        # Maybe add a nice print statement?
        print("User pressed 'Cancel.'\nQuitting program...")
        quit()
    else:
        fname = exp_info['Results filename']
        
        

    
dlg = input_fname()

win = visual.Window(size=WIN_DIM, fullscr=FULLSCR)

descript = """
PSYCHOPHYSICS TEST RUN
developed May 26th, 2023
Ishan Kalburge
"""
show_text(descript, win)
show_text("Please read the task instructions!", win, wait_kb=True)



ndaq = pd.read_csv("nasdaq_5yrs.csv")

price = np.array(ndaq["Open"])
date = np.array(ndaq["Date"])

N = len(price)

#random.seed(0)

for trial in range(TRIALS):
    
    start_date = random.randint(0,N-MAX_SAMP)
    stock_window = start_date-WINDOW
    current_date = start_date
    
    #fig, ax = plt.subplots()
    fig = plt.figure(figsize=(15,10))
    plt.plot(date[stock_window:current_date], price[stock_window:current_date], linewidth=2.5)
    plt.xticks([])
    #fig.patch.set_visible(False)
    plt.axis('off')
    plt.savefig('ndaq.png', dpi=80, transparent=True)

    img_path = Path() / "ndaq.png"



    task_txt = """
    Sell         Sample           Buy
    N            SPACE            M
    """
    key = show_task(img_path, task_txt, win, txt_h=0.085, txt_p=(0,-0.7), wait_kb=True)
    
    current_date += 1
    
    while key == 'space' and current_date <= MAX_SAMP:
        if key == 'q':
            break
        #fig, ax = plt.subplots()
        fig = plt.figure(figsize=(15,10))
        plt.plot(date[stock_window:current_date], price[stock_window:current_date], linewidth=2.5)
        plt.xticks([])
        #fig.patch.set_visible(False)
        plt.axis('off')
        plt.savefig('ndaq.png', dpi=80, transparent=True)

        img_path = Path() / "ndaq.png"



        task_txt = """
        Sell         Sample           Buy
        N            SPACE            M
        """
        key = show_task(img_path, task_txt, win, txt_h=0.085, txt_p=(0,-0.7), wait_kb=True)
        
        current_date += 1
        


win.close()
quit()




