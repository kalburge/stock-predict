/************************** 
 * Arm3_eps legacy *
 **************************/


// store info about the experiment session:
let expName = 'arm3_eps';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from getNormalRV
const DRIFT = 0.5;
const SIG = 1;
var stock = 0;
var cont = true;
var stocklist = [];


function flipCoin() {
    return Math.random()
}


function boxMullerTransform() {
    const u1 = Math.random();
    const u2 = Math.random();
    
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    
    return { z0, z1 };
}


function getNormallyDistributedRandomNumber(mean, stddev) {
    const { z0, _ } = boxMullerTransform();
    
    return z0 * stddev + mean;
}

var coin = flipCoin();
var state = 1;
if ((coin > 0.5)) {
    state = (- 1);
}
// Run 'Before Experiment' code from whatNext
var score = 0;
var EPS = 0.6;
var Q = 0.6;
var txt = "";
var correct = -1;
var REWARD = 3;
var PUNISH = (- 1);
var reward_shown = false;

var draw;
var success;
var cor;
var txt;
function reward(run, correct_state, score) {
    var cor, draw, success;
    draw = flipCoin();
    success = (draw <= Q);
    cor = false;
    txt = "+0";
    if (((run === "up") && (correct_state === 1))) {
        if (success) {
            score += REWARD;
            txt = ("+" + REWARD.toString());
        }
        cor = true;
    } else {
        if (((run === "down") && (correct_state === 0))) {
            if (success) {
                score += REWARD;
                txt = ("+" + REWARD.toString());
            }
            cor = true;
        } else {
            if (success) {
                score += PUNISH;
                txt = PUNISH.toString();
            }
        }
    }
    return [cor, score, txt];
}

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(instructionsRoutineBegin());
flowScheduler.add(instructionsRoutineEachFrame());
flowScheduler.add(instructionsRoutineEnd());
const stepsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(stepsLoopBegin(stepsLoopScheduler));
flowScheduler.add(stepsLoopScheduler);
flowScheduler.add(stepsLoopEnd);
flowScheduler.add(summaryRoutineBegin());
flowScheduler.add(summaryRoutineEachFrame());
flowScheduler.add(summaryRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2022.2.5';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);


  return Scheduler.Event.NEXT;
}


var instructionsClock;
var text;
var space_bar;
var presentationClock;
var stockline1;
var stock_show;
var resp;
var reward_pres;
var second_stock;
var summaryClock;
var score_display;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "instructions"
  instructionsClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: "You are a day-trader at an financial asset management company. Your job is to look at hourly stock prices and decide whether a stock is increasing or decreasing in value relative to the beginning of the day.\n\nFor each step, you can choose to sample more evidence (i.e. wait and view another hour's stock market data) by pressing RIGHT or you can commit to answer by pressing UP if you think the stock price at the end of the day will be higher than at the start or by pressing DOWN if you think the price will drop.\n\nPress SPACE to continue.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  space_bar = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "presentation"
  presentationClock = new util.Clock();
  // Run 'Begin Experiment' code from getNormalRV
  const DRIFT = 0.5;
  const SIG = 1;
  var stock = 0;
  var cont = true;
  var stocklist = [];
  stockline1 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline1', 
    vertices: [[-[1.0, 1.0][0]/2.0, 0], [+[1.0, 1.0][0]/2.0, 0]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  stock_show = new visual.TextStim({
    win: psychoJS.window,
    name: 'stock_show',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  reward_pres = new visual.TextStim({
    win: psychoJS.window,
    name: 'reward_pres',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  second_stock = new visual.TextStim({
    win: psychoJS.window,
    name: 'second_stock',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  // Initialize components for Routine "summary"
  summaryClock = new util.Clock();
  score_display = new visual.TextStim({
    win: psychoJS.window,
    name: 'score_display',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var _space_bar_allKeys;
var instructionsComponents;
function instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    instructionsComponents = [];
    instructionsComponents.push(text);
    instructionsComponents.push(space_bar);
    
    instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }

    
    // *space_bar* updates
    if (t >= 0.0 && space_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_bar.tStart = t;  // (not accounting for frame time here)
      space_bar.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_bar.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_bar.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_bar.clearEvents(); });
    }

    if (space_bar.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_bar.getKeys({keyList: ['space'], waitRelease: false});
      _space_bar_allKeys = _space_bar_allKeys.concat(theseKeys);
      if (_space_bar_allKeys.length > 0) {
        space_bar.keys = _space_bar_allKeys[_space_bar_allKeys.length - 1].name;  // just the last key pressed
        space_bar.rt = _space_bar_allKeys[_space_bar_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    instructionsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(space_bar.corr, level);
    }
    psychoJS.experiment.addData('space_bar.keys', space_bar.keys);
    if (typeof space_bar.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_bar.rt', space_bar.rt);
        routineTimer.reset();
        }
    
    space_bar.stop();
    // the Routine "instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var steps;
function stepsLoopBegin(stepsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    steps = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 28, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'steps'
    });
    psychoJS.experiment.addLoop(steps); // add the loop to the experiment
    currentLoop = steps;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    steps.forEach(function() {
      snapshot = steps.getSnapshot();
    
      stepsLoopScheduler.add(importConditions(snapshot));
      stepsLoopScheduler.add(presentationRoutineBegin(snapshot));
      stepsLoopScheduler.add(presentationRoutineEachFrame());
      stepsLoopScheduler.add(presentationRoutineEnd(snapshot));
      stepsLoopScheduler.add(stepsLoopEndIteration(stepsLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function stepsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(steps);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function stepsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var X_t;
var stock;
var _resp_allKeys;
var presentationComponents;
function presentationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'presentation' ---
    t = 0;
    presentationClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from getNormalRV
    X_t = getNormallyDistributedRandomNumber((state * DRIFT), SIG);
    if (cont) {
        stock = (stock + X_t);
        stocklist.push(stock);
    } else {
        stocklist = [];
        stock = X_t;
        stocklist.push(stock);
    }
    
    stockline1.setSize([0.5, 0.5]);
    stock_show.setText(stock);
    resp.keys = undefined;
    resp.rt = undefined;
    _resp_allKeys = [];
    reward_pres.setText(txt);
    second_stock.setText(stock);
    // keep track of which components have finished
    presentationComponents = [];
    presentationComponents.push(stockline1);
    presentationComponents.push(stock_show);
    presentationComponents.push(resp);
    presentationComponents.push(reward_pres);
    presentationComponents.push(second_stock);
    
    presentationComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function presentationRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'presentation' ---
    // get current time
    t = presentationClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *stockline1* updates
    if (t >= 0.0 && stockline1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline1.tStart = t;  // (not accounting for frame time here)
      stockline1.frameNStart = frameN;  // exact frame index
      
      stockline1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (stockline1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      stockline1.setAutoDraw(false);
    }
    
    // *stock_show* updates
    if (((cont == true)) && stock_show.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stock_show.tStart = t;  // (not accounting for frame time here)
      stock_show.frameNStart = frameN;  // exact frame index
      
      stock_show.setAutoDraw(true);
    }

    
    // *resp* updates
    if (t >= 0.0 && resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      resp.tStart = t;  // (not accounting for frame time here)
      resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { resp.clearEvents(); });
    }

    if (resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = resp.getKeys({keyList: ['up', 'down', 'right'], waitRelease: false});
      _resp_allKeys = _resp_allKeys.concat(theseKeys);
      if (_resp_allKeys.length > 0) {
        resp.keys = _resp_allKeys[_resp_allKeys.length - 1].name;  // just the last key pressed
        resp.rt = _resp_allKeys[_resp_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *reward_pres* updates
    if (((cont == false)) && reward_pres.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      reward_pres.tStart = t;  // (not accounting for frame time here)
      reward_pres.frameNStart = frameN;  // exact frame index
      
      reward_pres.setAutoDraw(true);
    }

    if (reward_pres.status === PsychoJS.Status.STARTED && t >= (reward_pres.tStart + 1.0)) {
      reward_pres.setAutoDraw(false);
    }
    
    // *second_stock* updates
    if (t >= 2 && second_stock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      second_stock.tStart = t;  // (not accounting for frame time here)
      second_stock.frameNStart = frameN;  // exact frame index
      
      second_stock.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    presentationComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var cont;
function presentationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'presentation' ---
    presentationComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(resp.corr, level);
    }
    psychoJS.experiment.addData('resp.keys', resp.keys);
    if (typeof resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('resp.rt', resp.rt);
        routineTimer.reset();
        }
    
    resp.stop();
    // Run 'End Routine' code from whatNext
    var thisResp = resp.keys;
    var actual_state = (state > 0);
    var reward_shown = false;
    if ((thisResp === "right")) {
        cont = true;
    } else {
        if (((thisResp === "up") || (thisResp === "down"))) {
            cont = false;
            [correct, score, txt] = reward(thisResp, actual_state, score);
            console.log(correct, score, txt);
            coin = flipCoin();
            if ((coin <= EPS)) {
                state = ((- 1) * state);
                console.log(coin, state);
            }
            reward_shown = true;
            X_t = getNormallyDistributedRandomNumber((state * DRIFT), SIG);
            stock = X_t;
        }
    }
    
    // the Routine "presentation" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var score;
var summaryComponents;
function summaryRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'summary' ---
    t = 0;
    summaryClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(3.000000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code
    score = ("Total: " + score.toString());
    
    score_display.setText(score);
    // keep track of which components have finished
    summaryComponents = [];
    summaryComponents.push(score_display);
    
    summaryComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function summaryRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'summary' ---
    // get current time
    t = summaryClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *score_display* updates
    if (t >= 0.0 && score_display.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_display.tStart = t;  // (not accounting for frame time here)
      score_display.frameNStart = frameN;  // exact frame index
      
      score_display.setAutoDraw(true);
    }

    frameRemains = 0.0 + 3 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (score_display.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      score_display.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    summaryComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function summaryRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'summary' ---
    summaryComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
