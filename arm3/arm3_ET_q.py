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


WIN_DIM = (1600,1200); T_STIM = 0.5
FULLSCR = False
WINDOW = 14; numSteps = 50; numBlocks = 9;
DRIFT = 0.5; SIG = 1; REWARD = 1; PUNISH = -1; 
paramset = [[0.05, 0.55], [0.25, 0.55], [0.45, 0.55], [0.05, 0.75], [0.25, 0.75], [0.45, 0.75], [0.05, 0.95], [0.25, 0.95], [0.45, 0.95]] #format: (eps, q)
params = random.sample(paramset, len(paramset))
memory_mode = True

dummy_mode = False
joy_mode = True
full_screen = True
use_retina = False
edf_fname = 'ARM3_ET'

press_to_continue = "SPACE"
if joy_mode:
    press_to_continue = "B"


grey = (0.5, 0.5, 0.5)
greyU = (0.65, 0.65, 0.65)
greyL = (0.35, 0.35, 0.35)
window_backend = 'pyglet'

# Switch to the script folder
script_path = os.path.dirname(sys.argv[0])
if len(script_path) != 0:
    os.chdir(script_path)

# Show only critical log message in the PsychoPy console
from psychopy import logging
logging.console.setLevel(logging.CRITICAL)

from psychopy.hardware import joystick
joystick.backend = 'glfw'
joy = joystick.Joystick(0)
bttnPress = joy
print(joy)
print(bttnPress.getButton(4))
print(bttnPress.getButton(5))

# Prompt user to specify an EDF data filename
# before we open a fullscreen window
dlg_title = 'Enter EDF File Name'
dlg_prompt = 'Please enter a file name with 8 or fewer characters\n' + \
             '[letters, numbers, and underscore].'

# loop until we get a valid filename
# while True:
#     dlg = gui.Dlg(dlg_title)
#     dlg.addText(dlg_prompt)
#     dlg.addField('File Name:', edf_fname)
#     # show dialog and wait for OK or Cancel
#     ok_data = dlg.show()
#     if dlg.OK:  # if ok_data is not None
#         print('EDF data filename: {}'.format(ok_data[0]))
#     else:
#         print('user cancelled')
#         core.quit()
#         sys.exit()

#     # get the string entered by the experimenter
#     tmp_str = dlg.data[0]
#     # strip trailing characters, ignore the ".edf" extension
#     edf_fname = tmp_str.rstrip().split('.')[0]

#     # check if the filename is valid (length <= 8 & no special char)
#     allowed_char = ascii_letters + digits + '_'
#     if not all([c in allowed_char for c in edf_fname]):
#         print('ERROR: Invalid EDF filename')
#     elif len(edf_fname) > 8:
#         print('ERROR: EDF filename should not exceed 8 characters')
#     else:
#         break

A = 0
B = 1
X = 2
Y = 3
LB = 4
RB = 5




# Set up a folder to store the EDF data files and the associated resources
# e.g., files defining the interest areas used in each trial
results_folder = 'results'
if not os.path.exists(results_folder):
    os.makedirs(results_folder)

# We download EDF data file from the EyeLink Host PC to the local hard
# drive at the end of each testing session, here we rename the EDF to
# include session start date/time
time_str = time.strftime("%Y_%m_%d_%H_%M", time.localtime())
session_identifier = edf_fname

# create a folder for the current testing session in the "results" folder
session_folder = os.path.join(results_folder, time_str)
if not os.path.exists(session_folder):
    os.makedirs(session_folder)

# Step 1: Connect to the EyeLink Host PC
#
# The Host IP address, by default, is "100.1.1.1".
# the "el_tracker" objected created here can be accessed through the Pylink
# Set the Host PC address to "None" (without quotes) to run the script
# in "Dummy Mode"
if dummy_mode:
    el_tracker = pylink.EyeLink(None)
else:
    try:
        el_tracker = pylink.EyeLink("100.1.1.1")
    except RuntimeError as error:
        print('ERROR:', error)
        core.quit()
        sys.exit()

# Step 2: Open an EDF data file on the Host PC
edf_file = edf_fname + ".EDF"
try:
    el_tracker.openDataFile(edf_file)
except RuntimeError as err:
    print('ERROR:', err)
    # close the link if we have one open
    if el_tracker.isConnected():
        el_tracker.close()
    core.quit()
    sys.exit()

# Add a header text to the EDF file to identify the current experiment name
# This is OPTIONAL. If your text starts with "RECORDED BY " it will be
# available in DataViewer's Inspector window by clicking
# the EDF session node in the top panel and looking for the "Recorded By:"
# field in the bottom panel of the Inspector.
preamble_text = 'RECORDED BY %s' % os.path.basename(__file__)
el_tracker.sendCommand("add_file_preamble_text '%s'" % preamble_text)

# Step 3: Configure the tracker
#
# Put the tracker in offline mode before we change tracking parameters
el_tracker.setOfflineMode()

# Get the software version:  1-EyeLink I, 2-EyeLink II, 3/4-EyeLink 1000,
# 5-EyeLink 1000 Plus, 6-Portable DUO
eyelink_ver = 0  # set version to 0, in case running in Dummy mode
if not dummy_mode:
    vstr = el_tracker.getTrackerVersionString()
    eyelink_ver = int(vstr.split()[-1].split('.')[0])
    # print out some version info in the shell
    print('Running experiment on %s, version %d' % (vstr, eyelink_ver))

# File and Link data control
# what eye events to save in the EDF file, include everything by default
file_event_flags = 'LEFT,RIGHT,FIXATION,SACCADE,BLINK,MESSAGE,BUTTON,INPUT'
# what eye events to make available over the link, include everything by default
link_event_flags = 'LEFT,RIGHT,FIXATION,SACCADE,BLINK,BUTTON,FIXUPDATE,INPUT'
# what sample data to save in the EDF data file and to make available
# over the link, include the 'HTARGET' flag to save head target sticker
# data for supported eye trackers
if eyelink_ver > 3:
    file_sample_flags = 'LEFT,RIGHT,GAZE,HREF,RAW,AREA,HTARGET,GAZERES,BUTTON,STATUS,INPUT'
    link_sample_flags = 'LEFT,RIGHT,GAZE,GAZERES,AREA,HTARGET,STATUS,INPUT'
else:
    file_sample_flags = 'LEFT,RIGHT,GAZE,HREF,RAW,AREA,GAZERES,BUTTON,STATUS,INPUT'
    link_sample_flags = 'LEFT,RIGHT,GAZE,GAZERES,AREA,STATUS,INPUT'
el_tracker.sendCommand("file_event_filter = %s" % file_event_flags)
el_tracker.sendCommand("file_sample_data = %s" % file_sample_flags)
el_tracker.sendCommand("link_event_filter = %s" % link_event_flags)
el_tracker.sendCommand("link_sample_data = %s" % link_sample_flags)

# Optional tracking parameters
# Sample rate, 250, 500, 1000, or 2000, check your tracker specification
# if eyelink_ver > 2:
#     el_tracker.sendCommand("sample_rate 1000")
# Choose a calibration type, H3, HV3, HV5, HV13 (HV = horizontal/vertical),
el_tracker.sendCommand("calibration_type = HV9")
# Set a gamepad button to accept calibration/drift check target
# You need a supported gamepad/button box that is connected to the Host PC
el_tracker.sendCommand("button_function 5 'accept_target_fixation'")

# Step 4: set up a graphics environment for calibration
#
# Open a window, be sure to specify monitor parameters
mon = monitors.Monitor('myMonitor', width=53.0, distance=70.0)
win = visual.Window(fullscr=full_screen,
                    monitor=mon,
                    screen = 1,
                    winType=window_backend,
                    units='pix')

# get the native screen resolution used by PsychoPy
scn_width, scn_height = win.size



#background_image.autoDraw = True
# resolution fix for Mac retina displays
if 'Darwin' in platform.system():
    if use_retina:
        scn_width = int(scn_width/2.0)
        scn_height = int(scn_height/2.0)

# Pass the display pixel coordinates (left, top, right, bottom) to the tracker
# see the EyeLink Installation Guide, "Customizing Screen Settings"
el_coords = "screen_pixel_coords = 0 0 %d %d" % (scn_width - 1, scn_height - 1)
el_tracker.sendCommand(el_coords)

# Write a DISPLAY_COORDS message to the EDF file
# Data Viewer needs this piece of info for proper visualization, see Data
# Viewer User Manual, "Protocol for EyeLink Data to Viewer Integration"
dv_coords = "DISPLAY_COORDS  0 0 %d %d" % (scn_width - 1, scn_height - 1)
el_tracker.sendMessage(dv_coords)

# Configure a graphics environment (genv) for tracker calibration
genv = EyeLinkCoreGraphicsPsychoPy(el_tracker, win)
print(genv)  # print out the version number of the CoreGraphics library

# Set background and foreground colors for the calibration target
# in PsychoPy, (-1, -1, -1)=black, (1, 1, 1)=white, (0, 0, 0)=mid-gray
foreground_color = (-1, -1, -1)
background_color = win.color
genv.setCalibrationColors(foreground_color, background_color)

# Set up the calibration target
#
# The target could be a "circle" (default), a "picture", a "movie" clip,
# or a rotating "spiral". To configure the type of calibration target, set
# genv.setTargetType to "circle", "picture", "movie", or "spiral", e.g.,
# genv.setTargetType('picture')
##
# Use gen.setPictureTarget() to set a "picture" target
# genv.setPictureTarget(os.path.join('images', 'checker10000.png'))
#
# Use genv.setMovieTarget() to set a "movie" target
# genv.setMovieTarget(os.path.join('videos', 'calibVid.mov'))

# Use a picture as the calibration target
genv.setTargetType('picture')
genv.setPictureTarget(os.path.join('images', 'fixTarget.bmp'))

# Configure the size of the calibration target (in pixels)
# this option applies only to "circle" and "spiral" targets
# genv.setTargetSize(24)

# Beeps to play during calibration, validation and drift correction
# parameters: target, good, error
#     target -- sound to play when target moves
#     good -- sound to play on successful operation
#     error -- sound to play on failure or interruption
# Each parameter could be ''--default sound, 'off'--no sound, or a wav file
genv.setCalibrationSounds('', '', '')

# resolution fix for macOS retina display issues
if use_retina:
    genv.fixMacRetinaDisplay()

# Request Pylink to use the PsychoPy window we opened above for calibration
pylink.openGraphicsEx(genv)


# define a few helper functions for trial handling


def clear(win):
    """ clear up the PsychoPy window"""
    win.flip()


def show_msg(win, txt, time=T_STIM, h=None, p=(0,0), wait_kb=True, wrapWidth=None):
    """Show text message stimuli to participants"""
    txt_color = (-0.4,-0.4,-0.4)
    tmp = 0
    if not joy_mode:
        if not wait_kb:
            
            msg = visual.TextStim(win, text=txt, height=h, pos=p, color=txt_color)
            
            msg.draw()
            win.flip()
            wait(time)
            
        else:
            msg = visual.TextStim(win, text=txt, height=h, pos=p, color=txt_color)
            msg.draw()
            win.flip()
            key = waitKeys()
            if key[0] == "q":
                print("Quitting program...")
                quit()
    else:
        keypress = False
        if not wait_kb:
            
            msg = visual.TextStim(win, text=txt, height=h, pos=p, color=txt_color)
            
            msg.draw()
            win.flip()
            wait(time)
            
        else:
            msg = visual.TextStim(win, text=txt, height=h, pos=p, color=txt_color)
            msg.draw()
            win.flip()
            while not keypress:
                if bttnPress.getButton(X):
                    print("Quitting program...")
                    quit()
                if bttnPress.getButton(B):
                    while bttnPress.getButton(B):
                        tmp += 1
                    keypress = True


def show_calibration(win, txt, time=T_STIM, h=None, p=(0,0), wait_kb=True):
    """Show text message stimuli to participants"""
    txt_color = (-0.4,-0.4,-0.4)
    tmp = 0
    if not wait_kb:
        
        msg = visual.TextStim(win, text=txt, height=h, pos=p, color=txt_color)
        
        msg.draw()
        win.flip()
        wait(time)
        
    else:
        msg = visual.TextStim(win, text=txt, height=h, pos=p, color=txt_color)
        msg.draw()
        win.flip()
        key = waitKeys()
        if key[0] == "q":
            print("Quitting program...")
            quit()
        
def instructions(win):
    img_path = 'images/training_img.png'
    training_img = visual.ImageStim(win, image=img_path, size=None)
    return

def terminate_task():
    """ Terminate the task gracefully and retrieve the EDF data file

    file_to_retrieve: The EDF on the Host that we would like to download
    win: the current window used by the experimental script
    """

    el_tracker = pylink.getEYELINK()

    if el_tracker.isConnected():
        # Terminate the current trial first if the task terminated prematurely
        error = el_tracker.isRecording()
        if error == pylink.TRIAL_OK:
            abort_trial()

        # Put tracker in Offline mode
        el_tracker.setOfflineMode()

        # Clear the Host PC screen and wait for 500 ms
        el_tracker.sendCommand('clear_screen 0')
        pylink.msecDelay(500)

        # Close the edf data file on the Host
        el_tracker.closeDataFile()

        # Show a file transfer message on the screen
        msg = 'EDF data is transferring from EyeLink Host PC...'
        show_msg(win, msg, wait_kb=False)

        # Download the EDF data file from the Host PC to a local data folder
        # parameters: source_file_on_the_host, destination_file_on_local_drive
        local_edf = os.path.join(session_folder, session_identifier + '.EDF')
        try:
            el_tracker.receiveDataFile(edf_file, local_edf)
        except RuntimeError as error:
            print('ERROR:', error)

        # Close the link to the tracker.
        el_tracker.close()

    # close the PsychoPy window
    win.close()

    # quit PsychoPy
    core.quit()
    sys.exit()


def abort_trial():
    """Ends recording """

    el_tracker = pylink.getEYELINK()

    # Stop recording
    if el_tracker.isRecording():
        # add 100 ms to catch final trial events
#        pylink.pumpDelay(100)
        el_tracker.stopRecording()

    # clear the screen
    clear(win)
    # Send a message to clear the Data Viewer screen
    bgcolor_RGB = (116, 116, 116)
    el_tracker.sendMessage('!V CLEAR %d %d %d' % bgcolor_RGB)

    # send a message to mark trial end
    el_tracker.sendMessage('TRIAL_RESULT %d' % pylink.TRIAL_ERROR)

    return pylink.TRIAL_ERROR



def generate_stock(drift_rate, sig, window):
    x_t = 0
    stock = []
    for i in range(window+1):
        stock.append(x_t)
        d = np.random.normal(drift_rate, sig)
        x_t += d
    return stock


def generate_stimuli(stock):
    for time in range(len(stock)):
        # load the image to display, here we stretch the image to fill full screen
        fig, ax = plt.subplots(figsize=(10,8))
        ax.plot(range(WINDOW+1), np.zeros((WINDOW+1,1)), linestyle='dashed', linewidth=3, color=greyL)
        if memory_mode:
            ax.plot(range(time+1), stock[:time+1], linewidth=20, color=greyL)
            ax.plot(range(time+1), stock[:time+1], linewidth=7, color=greyU)
        else:
            ax.plot(range(time-1, time+1), stock[time-1:time+1], linewidth=20, color=greyL)
            ax.plot(range(time-1, time+1), stock[time-1:time+1], linewidth=7, color=greyU)

        ax.set_xlim(0, WINDOW); ax.tick_params(width=4, length=12, color=greyL)
        ax.set_xticklabels( () ); ax.set_yticklabels( () )
        
        # Set y-limits = (-mean of final X_w - 3SD_w, mean_w + 3SD_w)
        ylim = WINDOW*DRIFT + 3*SIG*np.sqrt(WINDOW)
        ax.set_ylim(-ylim, ylim)
    #
    #    plt.axis('off')
        for axis in ['top','bottom']:
            ax.spines[axis].set_linewidth(4)
            ax.spines[axis].set_color(greyL) 
        for axis in ['left', 'right']:
            ax.spines[axis].set_linewidth(4)
            ax.spines[axis].set_color(greyU) 
        filename = 'images/stock_' + str(time) + '.png'
        plt.savefig(filename, dpi=80, transparent=True)


    




def run_trial(hazard, feed, txt):
    el_tracker = pylink.getEYELINK()
    
    experiment_el_time = el_tracker.getCurrentTime()
    print("EyeLink Time Elapsed Until Task Start:", experiment_el_time - el_start_time)
    experiment_psy_time = core.getTime()*1000
    print("PsychoPy Time Elapsed Until Task Start:", experiment_psy_time - psy_start_time)
    
    responses = []; correct_states = []; correct_responses = []; score_tracker =[]; RT_tracker = [];
    time = 1; score = 0; keypress_time = 0
    state = np.sign(np.random.uniform(-1, 1))
    stock = generate_stock(state*DRIFT, SIG, WINDOW); generate_stimuli(stock)
    # get a reference to the currently active EyeLink connection
    
        
    # no drift check: empty code

    # put tracker in idle/offline mode before recording
    if not dummy_mode:
        el_tracker.setOfflineMode()
    
    # Start recording
    # arguments: sample_to_file, events_to_file, sample_over_link,
    # event_over_link (1-yes, 0-no)
    try:
        el_tracker.startRecording(1, 1, 1, 1)
    except RuntimeError as error:
        print("ERROR:", error)
        abort_trial()
        return pylink.TRIAL_ERROR
    
    recording_start = core.getTime()*1000
    print('start recording:', recording_start)
    
    count = numSteps
    for step in range(numSteps):
        el_step_start = el_tracker.getCurrentTime()
        psy_step_start = core.getTime()*1000
        
        
#        correct_states.append(stock[-1] > stock[0]); score_tracker.append(score)
        correct_states.append(state > 0); score_tracker.append(score)
        if time < WINDOW:
            img_path = 'images/stock_' + str(time) + '.png'
            img = visual.ImageStim(win, image=img_path, size=None)   
        counter_txt = visual.TextStim(win, text=count, pos = (-250, -200), color = (-0.4,-0.4,-0.4), units='pix')
        cond_txt = visual.TextStim(win, text=txt, pos = (-200, 200), color = (-0.4,-0.4,-0.4), units='pix')
        # draw fixation target
        if not dummy_mode:
            fixate = visual.Circle(
                win=win,
                units="pix",
                radius=50,
                fillColor=[0, 0, 0],
                lineColor=[0.3, 0.3, 0.3],
                lineWidth=8,
                edges=128
            )
            fixate.draw()
            
        # show the image, and log a message to mark the onset of the image
        img.draw()
        counter_txt.draw()
        cond_txt.draw()
        win.flip()
        # Send a message to clear the Data Viewer screen, get it ready for
        # drawing the pictures during visualization
        if not dummy_mode:
            wait(1)
            fixate = visual.Circle(
                win=win,
                units="pix",
                radius=50,
                fillColor=[0, 0, 0],
                lineColor=[-0.3, -0.3, -0.3],
                lineWidth=8,
                edges=128
            )
            fixate.draw()
            # show the image, and log a message to mark the onset of the image

            img.draw()
            counter_txt.draw()
            cond_txt.draw()
            win.flip()
    
        img_onset_time = core.getTime()*1000  # record the image onset time
        print("Lag:", img_onset_time - keypress_time)
    
        event.clearEvents()  # clear cached PsychoPy events
        RT = -1  # keep track of the response time
        key = 0
        get_keypress = False
        correct = None
        hold_time = 0
        if joy_mode:
            if time < WINDOW - 1 and step < numSteps - 1:
                while not get_keypress:

                    # abort the current trial if the tracker is no longer recording
                    error = el_tracker.isRecording()
                    if error is not pylink.TRIAL_OK:
                        el_tracker.sendMessage('tracker_disconnected')
                        abort_trial()
                        return error
                        # Stop stimulus presentation when the spacebar is pressed
                    if bttnPress.getButton(B):
                        keypress_time = core.getTime()*1000
                        while bttnPress.getButton(B):
                            hold_time += 1
                        # get response time in ms, PsychoPy report time in sec
                        RT = int((core.getTime()*1000 - img_onset_time))
                        key = 0
                        get_keypress = True
                        count -= 1
                            
                    elif bttnPress.getButton(Y):
                        keypress_time = core.getTime()*1000
                        while bttnPress.getButton(B):
                            hold_time += 1
                        key = 1
                        # get response time in ms, PsychoPy report time in sec
                        RT = int((core.getTime()*1000 - img_onset_time))
                        correct, score = display_reward(win, key, score, state, feed)
                        get_keypress = True
                        count -= 1
                        
                    elif bttnPress.getButton(A):
                        keypress_time = core.getTime()*1000
                        while bttnPress.getButton(B):
                            hold_time += 1
                        key = -1
                        # get response time in ms, PsychoPy report time in sec
                        RT = int((core.getTime()*1000 - img_onset_time))
                        correct, score = display_reward(win, key, score, state, feed)
                        get_keypress = True
                        count -= 1
                        
                    if bttnPress.getButton(X):
                        terminate_task()
            else:
                while not get_keypress:

                    # abort the current trial if the tracker is no longer recording
                    error = el_tracker.isRecording()
                    if error is not pylink.TRIAL_OK:
                        el_tracker.sendMessage('tracker_disconnected')
                        abort_trial()
                        return error
                        # Stop stimulus presentation when the spacebar is pressed
                            
                    elif bttnPress.getButton(Y):
                        keypress_time = core.getTime()*1000
                        while bttnPress.getButton(B):
                            hold_time += 1
                        key = 1
                        # get response time in ms, PsychoPy report time in sec
                        RT = int((core.getTime()*1000 - img_onset_time))
                        correct, score = display_reward(win, key, score, state, feed)
                        get_keypress = True
                        count -= 1
                        
                    elif bttnPress.getButton(A):
                        keypress_time = core.getTime()*1000
                        while bttnPress.getButton(B):
                            hold_time += 1
                        key = -1
                        # get response time in ms, PsychoPy report time in sec
                        RT = int((core.getTime()*1000 - img_onset_time))
                        correct, score = display_reward(win, key, score, state, feed)
                        get_keypress = True
                        count -= 1
                        
                    if bttnPress.getButton(X):
                        terminate_task()
        else:
            if time < WINDOW - 1 and step < numSteps - 1:
                while not get_keypress:

                    # abort the current trial if the tracker is no longer recording
                    error = el_tracker.isRecording()
                    if error is not pylink.TRIAL_OK:
                        el_tracker.sendMessage('tracker_disconnected')
                        abort_trial()
                        return error

                    # check keyboard events
                    for keycode, modifier in event.getKeys(modifiers=True):
                        # Stop stimulus presentation when the spacebar is pressed
                        if keycode == 'right':
                            keypress_time = core.getTime()*1000
                            # get response time in ms, PsychoPy report time in sec
                            RT = int((core.getTime()*1000 - img_onset_time))
                            key = 0
                            get_keypress = True
                            count -= 1

                        # Abort a trial if "ESCAPE" is pressed
                        if keycode == 'escape':
                            el_tracker.sendMessage('trial_skipped_by_user')
                            # clear the screen
                            clear(win)
                            # abort trial
                            abort_trial()
                            return pylink.SKIP_TRIAL
                            
                        if keycode == 'up' or keycode == 'down':
                            keypress_time = core.getTime()*1000
                            if keycode == 'up':
                                key = 1
                            else:
                                key = -1
                            # get response time in ms, PsychoPy report time in sec
                            RT = int((core.getTime()*1000 - img_onset_time))
                            correct, score = display_reward(win, key, score, state, feed)
                            get_keypress = True
                            count -= 1

                            
                        if keycode == 'q':
                            terminate_task()
            else:
                while not get_keypress:

                    # abort the current trial if the tracker is no longer recording
                    error = el_tracker.isRecording()
                    if error is not pylink.TRIAL_OK:
                        el_tracker.sendMessage('tracker_disconnected')
                        abort_trial()
                        return error

                    # check keyboard events
                    for keycode, modifier in event.getKeys(modifiers=True):

                        # Abort a trial if "ESCAPE" is pressed
                        if keycode == 'escape':
                            el_tracker.sendMessage('trial_skipped_by_user')
                            # clear the screen
                            clear(win)
                            # abort trial
                            abort_trial()
                            return pylink.SKIP_TRIAL
                            
                        if keycode == 'up' or keycode == 'down':
                            keypress_time = core.getTime()*1000
                            if keycode == 'up':
                                key = 1
                            else:
                                key = -1
                            # get response time in ms, PsychoPy report time in sec
                            RT = int((core.getTime()*1000 - img_onset_time))
                            correct, score = display_reward(win, key, score, state, feed)
                            get_keypress = True
                            count -= 1
                            
                        if keycode == 'q':
                            terminate_task()
        if key == 0 and time < WINDOW + 1: 
            correct_responses.append(np.nan)
            time += 1
        elif np.abs(key) == 1:
            correct_responses.append(correct)
            switch = np.random.uniform(0,1) <= hazard
            if switch:
                state = -1*state
            stock = generate_stock(state*DRIFT, SIG, WINDOW); generate_stimuli(stock)
            time = 1
        RT_tracker.append(RT)
        responses.append(key); 
        
        
        el_step_end = el_tracker.getCurrentTime()
        print("EyeLink Task Time:", el_step_end - el_step_start)
        psy_step_end = core.getTime()*1000
        print("PsychoPy Task Time:", psy_step_end - psy_step_start)
        
        
    
    end_time = core.getTime()*1000    
    
    responses = np.array(responses); correct_states = np.array(correct_states); RT_tracker = np.array(RT_tracker)
    correct_responses = np.array(correct_responses); score_tracker = np.array(score_tracker)
    responses = responses.reshape(len(responses),1); correct_states = correct_states.reshape(len(correct_states),1); 
    correct_responses = correct_responses.reshape(len(correct_responses),1); score_tracker = score_tracker.reshape(len(score_tracker),1)
    RT_tracker = RT_tracker.reshape(len(RT_tracker),1)
    print(len(responses), len(correct_states), len(correct_responses), len(score_tracker))
    df = np.concatenate((responses,correct_states,correct_responses,score_tracker, RT_tracker),axis=1)
    df = pd.DataFrame(df, columns=["responses", "correct_states", "correct_responses", "score_tracker", "RT_tracker"])
    df.to_csv(session_folder + '/resultsDF.csv', index=False)
    
    if not dummy_mode:
        el_tracker.stopRecording()
    
    return score

def display_reward(win, run, score, state, feed):
    draw = np.random.uniform(0,1)
    success = draw <= feed
    cor = False
    txt = "No Feedback"
    if run == 1 and state > 0:
        if success:
            score += REWARD
            txt = "Correct!"
        cor = True
    elif run == -1 and state < 0:
        if success:
            score += REWARD
            txt = "Correct!"
        cor = True
    else:
        if success:
            score += PUNISH
            txt = "Incorrect!"
    show_msg(win, txt, h=70, wait_kb = False)
    return cor, score


# Step 5: Set up the camera and calibrate the tracker

# Show the task instructions

    
consent_msg = "This is an academic research project conducted through the University of Pennsylvania. In this game, you are being trained as a day-trader at a financial assets company. You will view a stock market fluctuate on an hourly basis over the course of a day and decide whether you think the stock value will be higher at the end of the day than at the beginning.\n\nThe estimated total time is about 30 minutes.\n\nYou must be at least 18 years old to participate. Your participation in this research is voluntary, which means you can choose whether or not to participate without negative consequences. Your anonymity is assured: the researchers who have requested your participation will not receive any personal information about you except your previously provided Prolific demographic data such as gender, ethnicity, and age. The de-identified data may be stored and distributed for future research studies without additional informed consent.\n\nIf you have questions about this research, please contact Ishan Kalburge by emailing ikalbur1@jhu.edu or Josh Gold by emailing jigold@pennmedicine.upenn.edu.\n\nIf you have questions, concerns, or complaints regarding your participation in this research study, or if you have any questions about your rights as a research subject and you cannot reach a member of the study team, you may contact the Office of Regulatory Affairs at the University of Pennsylvania by calling (215) 898-2614 or emailing irb@pobox.upenn.edu.\n\nBy pressing " + press_to_continue + ", you acknowledge that you have read the information above and agree to take part in this study, and that you understand that you may withdraw your consent at any time before you complete the tasks."
disclaimer_msg = "Please read the following instructions carefully. You will not be able to return to a previous screen.\n\nPress 'SPACE' " + press_to_continue + " to continue."

show_calibration(win, "Press ENTER twice to calibrate the EyeLink!")

# skip this step if running the script in Dummy Mode
if not dummy_mode:
    try:
        el_tracker.doTrackerSetup()
    except RuntimeError as err:
        print('ERROR:', err)
        el_tracker.exitCalibration()
        
        

        
show_msg(win, consent_msg, wrapWidth = 5)
show_msg(win, disclaimer_msg)


# Step 6: Run the experimental trials, index all the trials
genv.setTargetType('picture')
genv.setPictureTarget(os.path.join('images', 'fixTarget.bmp'))


el_start_time = el_tracker.getCurrentTime(); psy_start_time = core.getTime()*1000


params_idx = 0; block = 0
for block in range(numBlocks):
    block += 1
    thisParam = params[params_idx]; eps = thisParam[0]; q = thisParam[1]
    temp = 'LOW Reliability\n'
    if q == 0.75:
        temp = 'MEDIUM Reliability\n'
    elif q == 0.95:
        temp = 'HIGH Reliability\n'
    condText = temp + 'LOW Volatility'
    if eps == 0.25:
        condText = temp + 'MEDIUM Volatility'
    elif eps == 0.45:
        condText = temp + 'HIGH Volatility'
    blockMsg = 'Block: ' + str(block) + '\n\nCondition:\n' + condText + '\n\nPress SPACE to continue.'
    show_msg(win, blockMsg)
    score = run_trial(eps, q, condText)
    params_idx += 1
    

el_end_time = el_tracker.getCurrentTime(); psy_end_time = core.getTime()*1000

print("EyeLink Time Elapsed:", el_end_time - el_start_time)
print("PsychoPy Time Elapsed:", psy_end_time - psy_start_time)
print("Drift:", abs((el_end_time - el_start_time) - (psy_end_time - psy_start_time)))
# Last trial results, total score:
txt = "Final score: " + str(score)
show_msg(win, txt, wait_kb = False, h=70); clear(win)
# Step 7: disconnect, download the EDF file, then terminate the task
terminate_task()
