#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2022.2.5),
    on Thu Jun 22 16:55:21 2023
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

# Run 'Before Experiment' code from getNormalRV
import numpy as np

def flipCoin():
    return np.random.uniform()
def getNormallyDistributedRandomNumber(DRIFT, SIG):
    return np.random.normal(DRIFT, SIG)
    
coin = flipCoin()
state = 1
if coin > 0.5:
    state = -1

# Run 'Before Experiment' code from whatNext
score = 0
EPS = 0.6
Q = 0.6
txt = ''
REWARD = 3
PUNISH = -1
reward_shown = False

def reward(run, correct_state, score):
    draw = flipCoin()
    success = draw <= Q
    cor = False
    txt = '+0'
    if run == 'up' and correct_state == 1:
        if success:
            score += REWARD
            txt = "+" + str(REWARD)
        cor = True
    elif run == 'down' and correct_state == 0:
        if success:
            score += REWARD
            txt = "+" + str(REWARD)
        cor = True
    else:
        if success:
            score += PUNISH
            txt = str(PUNISH)
    return cor, score, txt


# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)
# Store info about the experiment session
psychopyVersion = '2022.2.5'
expName = 'DARC Demo Experiment'  # from the Builder filename that created this script
expInfo = {
    'participant': '',
    'trials': '20',
    'particles': '10000',
}
# --- Show participant info dialog --
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='/Users/goldlab/Documents/Ishan_summer23/test_runs/arm3/arm3_ET_builder.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.DEBUG)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# --- Setup the Window ---
win = visual.Window(
    size=[1680, 1050], fullscr=True, screen=0, 
    winType='pyglet', allowStencil=False,
    monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
    blendMode='avg', useFBO=True)
win.mouseVisible = False
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess
# --- Setup input devices ---
ioConfig = {}

# Setup iohub keyboard
ioConfig['Keyboard'] = dict(use_keymap='psychopy')

ioSession = '1'
if 'session' in expInfo:
    ioSession = str(expInfo['session'])
ioServer = io.launchHubServer(window=win, **ioConfig)
eyetracker = None

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard(backend='iohub')

# --- Initialize components for Routine "instructions" ---
text = visual.TextStim(win=win, name='text',
    text='You will be presented with choices between 2 amounts of money.\nSome will be delivered at different points in time.\nSome have a certain probability of being received. If not, you receive nothing.\n\nYour job is to consider which you prefer and choose using the LEFT or RIGHT keys.\n\nThere is no correct or incorrect response, please emphasise accuracy in which choice you prefer, no need to rush!\n\nPress SPACE to continue.',
    font='Arial',
    pos=(0, 0), height=0.075, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
space_press = keyboard.Keyboard()

# --- Initialize components for Routine "presentation" ---
# Run 'Begin Experiment' code from getNormalRV
DRIFT = 0.5
SIG = 1
stock = 0
cont = True
stock_show = visual.TextStim(win=win, name='stock_show',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
resp = keyboard.Keyboard()
reward_pres = visual.TextStim(win=win, name='reward_pres',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
second_stock = visual.TextStim(win=win, name='second_stock',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-5.0);

# --- Initialize components for Routine "total" ---
total_display = visual.TextStim(win=win, name='total_display',
    text='',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.Clock()  # to track time remaining of each (possibly non-slip) routine 

# --- Prepare to start Routine "instructions" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
space_press.keys = []
space_press.rt = []
_space_press_allKeys = []
# keep track of which components have finished
instructionsComponents = [text, space_press]
for thisComponent in instructionsComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "instructions" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *text* updates
    if text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        text.frameNStart = frameN  # exact frame index
        text.tStart = t  # local t and not account for scr refresh
        text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(text, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'text.started')
        text.setAutoDraw(True)
    
    # *space_press* updates
    waitOnFlip = False
    if space_press.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        space_press.frameNStart = frameN  # exact frame index
        space_press.tStart = t  # local t and not account for scr refresh
        space_press.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(space_press, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'space_press.started')
        space_press.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(space_press.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(space_press.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if space_press.status == STARTED and not waitOnFlip:
        theseKeys = space_press.getKeys(keyList=['space'], waitRelease=False)
        _space_press_allKeys.extend(theseKeys)
        if len(_space_press_allKeys):
            space_press.keys = _space_press_allKeys[-1].name  # just the last key pressed
            space_press.rt = _space_press_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in instructionsComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "instructions" ---
for thisComponent in instructionsComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# the Routine "instructions" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
steps = data.TrialHandler(nReps=10, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=[None],
    seed=None, name='steps')
thisExp.addLoop(steps)  # add the loop to the experiment
thisStep = steps.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisStep.rgb)
if thisStep != None:
    for paramName in thisStep:
        exec('{} = thisStep[paramName]'.format(paramName))

for thisStep in steps:
    currentLoop = steps
    # abbreviate parameter names if possible (e.g. rgb = thisStep.rgb)
    if thisStep != None:
        for paramName in thisStep:
            exec('{} = thisStep[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "presentation" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # Run 'Begin Routine' code from getNormalRV
    X_t = getNormallyDistributedRandomNumber(state*DRIFT, SIG)
    if cont:
        stock = stock + X_t
    else:
        stock = X_t
    stock_show.setText(stock)
    resp.keys = []
    resp.rt = []
    _resp_allKeys = []
    reward_pres.setText(txt)
    second_stock.setText(stock)
    # keep track of which components have finished
    presentationComponents = [stock_show, resp, reward_pres, second_stock]
    for thisComponent in presentationComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "presentation" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *stock_show* updates
        if stock_show.status == NOT_STARTED and cont == True:
            # keep track of start time/frame for later
            stock_show.frameNStart = frameN  # exact frame index
            stock_show.tStart = t  # local t and not account for scr refresh
            stock_show.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(stock_show, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'stock_show.started')
            stock_show.setAutoDraw(True)
        
        # *resp* updates
        waitOnFlip = False
        if resp.status == NOT_STARTED and tThisFlip >= 0.15-frameTolerance:
            # keep track of start time/frame for later
            resp.frameNStart = frameN  # exact frame index
            resp.tStart = t  # local t and not account for scr refresh
            resp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(resp, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'resp.started')
            resp.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(resp.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if resp.status == STARTED and not waitOnFlip:
            theseKeys = resp.getKeys(keyList=['up', 'down','right'], waitRelease=False)
            _resp_allKeys.extend(theseKeys)
            if len(_resp_allKeys):
                resp.keys = _resp_allKeys[-1].name  # just the last key pressed
                resp.rt = _resp_allKeys[-1].rt
                # a response ends the routine
                continueRoutine = False
        
        # *reward_pres* updates
        if reward_pres.status == NOT_STARTED and cont == False:
            # keep track of start time/frame for later
            reward_pres.frameNStart = frameN  # exact frame index
            reward_pres.tStart = t  # local t and not account for scr refresh
            reward_pres.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(reward_pres, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'reward_pres.started')
            reward_pres.setAutoDraw(True)
        if reward_pres.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > reward_pres.tStartRefresh + 1.5-frameTolerance:
                # keep track of stop time/frame for later
                reward_pres.tStop = t  # not accounting for scr refresh
                reward_pres.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'reward_pres.stopped')
                reward_pres.setAutoDraw(False)
        
        # *second_stock* updates
        if second_stock.status == NOT_STARTED and tThisFlip >= 2-frameTolerance:
            # keep track of start time/frame for later
            second_stock.frameNStart = frameN  # exact frame index
            second_stock.tStart = t  # local t and not account for scr refresh
            second_stock.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(second_stock, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'second_stock.started')
            second_stock.setAutoDraw(True)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in presentationComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "presentation" ---
    for thisComponent in presentationComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if resp.keys in ['', [], None]:  # No response was made
        resp.keys = None
    steps.addData('resp.keys',resp.keys)
    if resp.keys != None:  # we had a response
        steps.addData('resp.rt', resp.rt)
    # Run 'End Routine' code from whatNext
    thisResp = resp.keys
    actual_state = state > 0
    reward_shown = False
    if thisResp == 'right':
        cont = True
    elif thisResp == 'up' or thisResp == 'down':
        cont = False
        correct, score, txt = reward(thisResp, actual_state, score)
        print(correct, score, txt)
        coin = flipCoin()
        if coin <= EPS:
            state = -1*state
            print(coin,state)
        reward_shown = True
        X_t = getNormallyDistributedRandomNumber(state*DRIFT, SIG)
        stock = X_t
        
    
    
    # the Routine "presentation" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 10 repeats of 'steps'


# --- Prepare to start Routine "total" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
# Run 'Begin Routine' code from code
score = 'Total: ' + str(score)
total_display.setText(score)
# keep track of which components have finished
totalComponents = [total_display]
for thisComponent in totalComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "total" ---
while continueRoutine and routineTimer.getTime() < 3.0:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *total_display* updates
    if total_display.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        total_display.frameNStart = frameN  # exact frame index
        total_display.tStart = t  # local t and not account for scr refresh
        total_display.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(total_display, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'total_display.started')
        total_display.setAutoDraw(True)
    if total_display.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > total_display.tStartRefresh + 3-frameTolerance:
            # keep track of stop time/frame for later
            total_display.tStop = t  # not accounting for scr refresh
            total_display.frameNStop = frameN  # exact frame index
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'total_display.stopped')
            total_display.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in totalComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "total" ---
for thisComponent in totalComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
if routineForceEnded:
    routineTimer.reset()
else:
    routineTimer.addTime(-3.000000)

# --- End experiment ---
# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
if eyetracker:
    eyetracker.setConnectionState(False)
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
