/************************** 
 * arm3_q Test *
 **************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2022.2.5.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'arm3_q';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from getNormalRV
const DRIFT = 0.5;
const SIG = 1;
// var stock = 0;
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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function getStocksForNHours(mean, stddev, N) {
    var stock = [];
    var X_t = getNormallyDistributedRandomNumber(mean,stddev);
    var stockSum = 0;
    var startingV = (- Math.round(N/2))/10;
    var vertex = [];
    vertex.push(startingV);
    vertex.push(stockSum);
    stock.push(vertex);
    for (let i = 0; i < N; i++) {
        vertex = [];
        X_t = getNormallyDistributedRandomNumber(mean/(4*N),stddev/(4*N));
        stockSum += X_t;
        startingV += 0.1;
        vertex.push(startingV);
        vertex.push(stockSum);
        stock.push(vertex);
    }
    return stock
}

var coin = flipCoin();
var state = 1;
if ((coin > 0.5)) {
    state = (- 1);
}
// Run 'Before Experiment' code from whatNext
var score = 0;
var txt = "";
var correct = (- 1);
var REWARD = 1;
var PUNISH = (- 1);
var reward_shown = false;
var currentHour = 0;

var draw;
var success;
var cor;
var txt;

function reward(Q, run, correct_state, score) {
    var cor, draw, success;
    draw = flipCoin();
    success = (draw <= Q);
    cor = false;
    txt = "No Feedback";
    if (((run == "up") && (correct_state == 1))) {
        if (success) {
            score += REWARD;
            txt = ("Correct!");
        }
        cor = true;
    } else {
        if (((run == "down") && (correct_state == 0))) {
            if (success) {
                score += REWARD;
                txt = ("Correct!");
            }
            cor = true;
        } else {
            if (success) {
                score += PUNISH;
                txt = "Incorrect!";
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
flowScheduler.add(consentRoutineBegin());
flowScheduler.add(consentRoutineEachFrame());
flowScheduler.add(consentRoutineEnd());
flowScheduler.add(instructionsRoutineBegin());
flowScheduler.add(instructionsRoutineEachFrame());
flowScheduler.add(instructionsRoutineEnd());
flowScheduler.add(directionsRoutineBegin());
flowScheduler.add(directionsRoutineEachFrame());
flowScheduler.add(directionsRoutineEnd());
flowScheduler.add(detailsRoutineBegin());
flowScheduler.add(detailsRoutineEachFrame());
flowScheduler.add(detailsRoutineEnd());
flowScheduler.add(details2RoutineBegin());
flowScheduler.add(details2RoutineEachFrame());
flowScheduler.add(details2RoutineEnd());
flowScheduler.add(varsRoutineBegin());
flowScheduler.add(varsRoutineEachFrame());
flowScheduler.add(varsRoutineEnd());
flowScheduler.add(vars2RoutineBegin());
flowScheduler.add(vars2RoutineEachFrame());
flowScheduler.add(vars2RoutineEnd());
flowScheduler.add(rewardRoutineBegin());
flowScheduler.add(rewardRoutineEachFrame());
flowScheduler.add(rewardRoutineEnd());
flowScheduler.add(exampleRoutineBegin());
flowScheduler.add(exampleRoutineEachFrame());
flowScheduler.add(exampleRoutineEnd());
const blocksLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(blocksLoopBegin(blocksLoopScheduler));
flowScheduler.add(blocksLoopScheduler);
flowScheduler.add(blocksLoopEnd);
//const stepsLoopScheduler = new Scheduler(psychoJS);
//flowScheduler.add(stepsLoopBegin(stepsLoopScheduler));
//flowScheduler.add(stepsLoopScheduler);
//flowScheduler.add(stepsLoopEnd);
flowScheduler.add(summaryRoutineBegin());
flowScheduler.add(summaryRoutineEachFrame());
flowScheduler.add(summaryRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [ {'name': 'q_task_ex.png', 'path': 'q_task_ex.png'}
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
var consentClock;
var directionsClock;
var detailsClock;
var details2Clock;
var varsClock;
var vars2Clock;
var rewardClock;
var exampleClock;
var consent_text;
var intro_text;
var directions_text;
var details_text;
var details2_text;
var vars_text;
var vars2_text;
var reward_text;
var example_img;
var space_bar;
var presentationClock;
var stockline1;
var stockline2;
var stockline3;
var stockline4;
var stockline5;
var stockline6;
var stockline7;
var stockline8;
var stockline9;
var stockline10;
var stockline11;
var stockline12;
var stockline13;
var plotLim;
var zeroLine;
var q_level;
var q_dot;
var low;
var high;
var counter;
var running_score;
var avg_score = 387;
var conditions;
var condText = '';
var numSteps = 370;
const param_set = [0.05, 0.1786, 0.3071, 0.4357, 0.5643, 0.6929, 0.8214, 0.95]; 
var numBlocks = param_set.length;
var params = shuffle(param_set);
var feedbackRel = 0;
var hazard = 0.35;
var counterNum = numSteps;
//var stock_show;
var resp;
var reward_pres;
var blockDisplay;
var blockN = 0;
var displayText;
// var second_stock;
var summaryClock;
var score_display;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "instructions"
  instructionsClock = new util.Clock();
  consentClock = new util.Clock();
  directionsClock = new util.Clock();
  detailsClock = new util.Clock();
  details2Clock = new util.Clock();
  varsClock = new util.Clock();
  vars2Clock = new util.Clock();
  rewardClock = new util.Clock();
  exampleClock = new util.Clock();
  consent_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'consent_text',
    text: "CONSENT SCREEN\n\nThis is an academic research project conducted through the University of Pennsylvania. In this game, you are being trained as a day-trader at a financial assets company. You will view a stock market fluctuate on an hourly basis over the course of a day and decide whether you think the stock value will be higher at the end of the day than at the beginning.\n\nThe estimated total time is about 30 minutes.\n\nYou must be at least 18 years old to participate. Your participation in this research is voluntary, which means you can choose whether or not to participate without negative consequences. Your anonymity is assured: the researchers who have requested your participation will not receive any personal information about you except your previously provided Prolific demographic data such as gender, ethnicity, and age. The de-identified data may be stored and distributed for future research studies without additional informed consent.\n\nIf you have questions about this research, please contact Ishan Kalburge by emailing ikalbur1@jhu.edu or Josh Gold by emailing jigold@pennmedicine.upenn.edu.\n\nIf you have questions, concerns, or complaints regarding your participation in this research study, or if you have any questions about your rights as a research subject and you cannot reach a member of the study team, you may contact the Office of Regulatory Affairs at the University of Pennsylvania by calling (215) 898-2614 or emailing irb@pobox.upenn.edu.\n\nBy pressing SPACE, you acknowledge that you have read the information above and agree to take part in this study, and that you understand that you may withdraw your consent at any time before you complete the tasks.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  intro_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text',
    text: "Instructions (pg. 1 of 7): OVERVIEW\n\nYou are being trained as a day trader to make moment-by-moment stock-market predictions as quickly and accurately as possible.\n\nSpecifically, you will view graphs of stock-market prices fluctuating up and down over time (from the left to the right of the screen). Your task is to determine on each screen whether the stock price will be higher or lower at the end (the right of the screen) than it was at the beginning (the left of the screen). Assume it is impossible for the stock price to be the same at the end.\n\nPress SPACE to continue.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  
  
  directions_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'directions_text',
    text: "Instructions (pg. 2 of 7): POSSIBLE ACTIONS\n\nFor each time step, you can choose one of three actions:\n\n1)    Press RIGHT to sample another time step of stock-market data.\n2)    Press UP if you think that the stock price at the end will be HIGHER than at the beginning.\n3)    Press DOWN if you think that the stock price at the end will be LOWER than at the beginning.\n\nPress SPACE to continue.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  
    details_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'details_text',
    text: "Instructions (pg. 3 of 7): TRIALS\n\nEach screen will show a trial consisting of UP TO 13 data points; your job will be to predict where you think the final price on the 14th time step will be. You must commit to an UP or DOWN choice after the 13th time step, if you have not done so already; if you commit before then, the trial will end and you will not be able to see the remaining data points.\n\nOnce you commit to a choice on a trial, you will typically (but not always) be given immediate feedback about whether your choice was correct or not.\n\nPress SPACE to continue.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.045,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
    details2_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'details2_text',
    text: "Instructions (pg. 4 of 7): BLOCKS\n\nImportantly, your training for a given set of conditions (i.e. a particular stock) will end after you have used up a fixed number of time samples equal to " + numSteps.toString() + ". The number of remaining time samples will always be shown at the bottom-left corner.\n\nNote that using more samples on a given trial gives you more data points and thus generally supports more accurate choices but also gives you fewer opportunities to make choices and potentially receive reward. Also note that you are penalized for incorrect responses, so you must be accurate in order to maximize your final score.\n\nPress SPACE to continue.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.045,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
    vars_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'vars_text',
    text: "Instructions (pg. 5 of 7): STABILITY\n\nThroughout the experiment, you will be in a slightly unstable environment. This means that the true final state of the stock (UP or DOWN) may change at random between trials. You should NOT expect to be committing to UP or DOWN several times in a row.\n\nPress SPACE to continue.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  
    vars2_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'vars_text',
    text: "Instructions (pg. 6 of 7): FEEDBACK FREQUENCY\n\nIn this experiment, we will manipulate the frequency of instantaneous feedback after you make a decision. Each block of " + numSteps.toString() + " time samples will be associated with one of 8 frequency levels (ranging from low to high & shown on a slider in the upper left corner).\n\nHigh frequency blocks will tend to give you immediate feedback after you make a choice, which comes in the form of 'Correct!' for correct choices, 'Incorrect!' for incorrect choices, and 'No Feedback!' for unlucky choices. Conversely, if you are in a low frequency block, you may tend to see 'No Feedback' more often.\n\nPress SPACE to continue.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.045,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
    reward_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'reward_text',
    text: "Instructions (pg. 7 of 7): REWARDS\n\nYou will have the opportunity to be rewarded based on your final score. Correct answers earn you +1 points, Incorrect answers earn you -1 points, and No Feedback trials do not affect your score.\n\nA running total score will be displayed in the top right along with an average BENCHMARK score. If you exceed this benchmark, you will receive a cash bonus.\n\nPress SPACE to see an example of the task. Please study carefully!",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  
  example_img = new visual.ImageStim({
      win: psychoJS.window,
      name: 'example_img',
      image: 'q_task_ex.png',
      ori : 0, pos : [0, 0], size : undefined,
    color : new util.Color([1, 1, 1]), opacity : 1
  })

  
  space_bar = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "presentation"
  presentationClock = new util.Clock();
  // Run 'Begin Experiment' code from getNormalRV
  const DRIFT = 0.5;
  const SIG = 1;
  // var stock = 0;
  var cont = true;
  var stocklist = getStocksForNHours(state*DRIFT, SIG, 14);
  stockline1 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline1', 
    vertices: [stocklist[0],stocklist[1]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  stockline2 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline2', 
    vertices: [stocklist[1], stocklist[2]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  stockline3 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline3', 
    vertices: [stocklist[2], stocklist[3]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  stockline4 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline4', 
    vertices: [stocklist[3], stocklist[4]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  stockline5 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline5', 
    vertices: [stocklist[4], stocklist[5]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  stockline6 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline6', 
    vertices: [stocklist[5], stocklist[6]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  stockline7 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline7', 
    vertices: [stocklist[6], stocklist[7]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  stockline8 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline8', 
    vertices: [stocklist[7], stocklist[8]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  stockline9 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline9', 
    vertices: [stocklist[8], stocklist[9]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  stockline10 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline10', 
    vertices: [stocklist[9], stocklist[10]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  stockline11 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline11', 
    vertices: [stocklist[10], stocklist[11]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  stockline12 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline12', 
    vertices: [stocklist[11], stocklist[12]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  stockline13 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'stockline13', 
    vertices: [stocklist[12], stocklist[13]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  plotLim = new visual.Rect ({
    win: psychoJS.window, name: 'plotLim', 
    width: [0.7, 0.7][0], height: [0.6, 0.6][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    opacity: undefined, depth: -7, interpolate: true,
  });
  
  zeroLine = new visual.ShapeStim ({
    win: psychoJS.window, name: 'zeroLine', 
    vertices: [[-0.7,0], [0.7,0]],
    ori: 0.0, pos: [0, 0],
    size: [0.5, 0.5],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('darkgray'),
    fillColor: new util.Color('darkgray'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  
  q_level = new visual.ShapeStim ({
    win: psychoJS.window, name: 'q_level', 
    vertices: [[-0.28,0.25], [-0.14,0.25]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  q_dot = new visual.Polygon({
    win: psychoJS.window, name: 'q_dot',
    colorSpace: 'rgb',
    radius: 0.005,
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    edges: 128,
    opacity: undefined, depth: -1, interpolate: true,
    });
  
  counter = new visual.TextStim({
    win: psychoJS.window,
    name: 'counter',
    text: counterNum,
    font: 'Open Sans',
    units: undefined, 
    pos: [-0.3, -0.25], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -7 
  });
  
  running_score = new visual.TextStim({
    win: psychoJS.window,
    name: 'running_score',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.3, 0.35], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -7 
  });
  
  
  conditions = new visual.TextStim({
    win: psychoJS.window,
    name: 'conditions',
    text: condText,
    font: 'Open Sans',
    units: undefined, 
    pos: [-0.21, 0.275], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -7 
  });
  
  low = new visual.TextStim({
    win: psychoJS.window,
    name: 'low',
    text: 'Low',
    font: 'Open Sans',
    units: undefined, 
    pos: [-0.30, 0.25], height: 0.0125,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -7 
  });
  
  high = new visual.TextStim({
    win: psychoJS.window,
    name: 'high',
    text: 'High',
    font: 'Open Sans',
    units: undefined, 
    pos: [-0.12, 0.25], height: 0.0125,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -7 
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
  
  
    blockDisplay = new visual.TextStim({
        win: psychoJS.window,
        name: 'blockDisplay',
        text: '',
        font: 'Open Sans',
        units: undefined, 
        pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -5.0 
    });
  
  //second_stock = new visual.TextStim({
    //win: psychoJS.window,
    //name: 'second_stock',
    //text: '',
    //font: 'Open Sans',
    //units: undefined, 
    //pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    //languageStyle: 'LTR',
    //color: new util.Color('white'),  opacity: undefined,
    //depth: -6.0 
  //});
  
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
var consentComponents;
var directionsComponents;
var detailsComponents;
var details2Components;
var varsComponents;
var vars2Components;
var rewardComponents;
var exampleComponents;
// consent text
function consentRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    consentClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    consentComponents = [];
    consentComponents.push(consent_text);
    consentComponents.push(space_bar);
    
    for (const thisComponent of consentComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function consentRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = consentClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && consent_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent_text.tStart = t;  // (not accounting for frame time here)
      consent_text.frameNStart = frameN;  // exact frame index
      consent_text.setAutoDraw(true);
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
    for (const thisComponent of consentComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function consentRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of consentComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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

// intro_text
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
    instructionsComponents.push(intro_text);
    instructionsComponents.push(space_bar);
    
    for (const thisComponent of instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    if (t >= 0.0 && intro_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text.tStart = t;  // (not accounting for frame time here)
      intro_text.frameNStart = frameN;  // exact frame index
      intro_text.setAutoDraw(true);
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
    for (const thisComponent of instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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




// directions text
function directionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    directionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    directionsComponents = [];
    directionsComponents.push(directions_text);
    directionsComponents.push(space_bar);
    
    for (const thisComponent of directionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function directionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = directionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && directions_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      directions_text.tStart = t;  // (not accounting for frame time here)
      directions_text.frameNStart = frameN;  // exact frame index
      directions_text.setAutoDraw(true);
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
    for (const thisComponent of directionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function directionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of directionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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



// details text
function detailsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    detailsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    detailsComponents = [];
    detailsComponents.push(details_text);
    detailsComponents.push(space_bar);
    
    for (const thisComponent of detailsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function detailsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = detailsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && details_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      details_text.tStart = t;  // (not accounting for frame time here)
      details_text.frameNStart = frameN;  // exact frame index
      details_text.setAutoDraw(true);
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
    for (const thisComponent of detailsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function detailsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of detailsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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



// details2 text
function details2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    details2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    details2Components = [];
    details2Components.push(details2_text);
    details2Components.push(space_bar);
    
    for (const thisComponent of details2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function details2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = detailsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && details2_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      details2_text.tStart = t;  // (not accounting for frame time here)
      details2_text.frameNStart = frameN;  // exact frame index
      details2_text.setAutoDraw(true);
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
    for (const thisComponent of details2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function details2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of details2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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



// vars text
function varsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    varsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    varsComponents = [];
    varsComponents.push(vars_text);
    varsComponents.push(space_bar);
    
    for (const thisComponent of varsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function varsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = varsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && vars_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vars_text.tStart = t;  // (not accounting for frame time here)
      vars_text.frameNStart = frameN;  // exact frame index
      vars_text.setAutoDraw(true);
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
    for (const thisComponent of varsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function varsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of varsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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


// vars2 text
function vars2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    vars2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    vars2Components = [];
    vars2Components.push(vars2_text);
    vars2Components.push(space_bar);
    
    for (const thisComponent of vars2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function vars2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = varsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && vars2_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vars2_text.tStart = t;  // (not accounting for frame time here)
      vars2_text.frameNStart = frameN;  // exact frame index
      vars2_text.setAutoDraw(true);
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
    for (const thisComponent of vars2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function vars2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of vars2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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

// reward text
function rewardRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    rewardClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    rewardComponents = [];
    rewardComponents.push(reward_text);
    rewardComponents.push(space_bar);
    
    for (const thisComponent of rewardComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function rewardRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = varsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && reward_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      reward_text.tStart = t;  // (not accounting for frame time here)
      reward_text.frameNStart = frameN;  // exact frame index
      reward_text.setAutoDraw(true);
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
    for (const thisComponent of rewardComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function rewardRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of rewardComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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


// example img
function exampleRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    exampleClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    exampleComponents = [];
    exampleComponents.push(example_img);
    exampleComponents.push(space_bar);
    
    for (const thisComponent of exampleComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function exampleRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = varsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && example_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      example_img.tStart = t;  // (not accounting for frame time here)
      example_img.frameNStart = frameN;  // exact frame index
      example_img.setAutoDraw(true);
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
    for (const thisComponent of exampleComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function exampleRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of exampleComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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




var blocks;
function blocksLoopBegin(blocksLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    // set up handler to look after randomisation of conditions etc
    blocks = new TrialHandler({
      psychoJS: psychoJS,
      nReps: numBlocks, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'blocks'
    });
    psychoJS.experiment.addLoop(blocks); // add the loop to the experiment
    currentLoop = blocks;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisBlock of blocks) {
      snapshot = blocks.getSnapshot();
      blocksLoopScheduler.add(importConditions(snapshot));
      const stepsLoopScheduler = new Scheduler(psychoJS);
      blocksLoopScheduler.add(stepsLoopBegin(stepsLoopScheduler, snapshot));
      blocksLoopScheduler.add(stepsLoopScheduler);
      blocksLoopScheduler.add(stepsLoopEnd);
      blocksLoopScheduler.add(blocksLoopEndIteration(blocksLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var steps;
function stepsLoopBegin(stepsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    counterNum = numSteps;
    currentHour = 0;
    blockN += 1;
    stocklist = getStocksForNHours(state*DRIFT, SIG, 14);
    feedbackRel = params.pop();
    // [0.05, 0.1786, 0.3071, 0.4357, 0.5643, 0.6929, 0.8214, 0.95]; 
    if (feedbackRel == 0.05) {
        condText = "Frequency Level 1";
        q_dot.setPos([-0.28,0.25]);
    } else if (feedbackRel == 0.1786) {
        condText = "Frequency Level 2";
        q_dot.setPos([-0.26,0.25]);
    } else if (feedbackRel == 0.3071) {
        condText = "Frequency Level 3";
        q_dot.setPos([-0.24,0.25]);
    } else if (feedbackRel == 0.4357) {
        condText = "Frequency Level 4";
        q_dot.setPos([-0.22,0.25]);
    } else if (feedbackRel == 0.5643) {
        condText = "Frequency Level 5";
        q_dot.setPos([-0.2,0.25]);
    } else if (feedbackRel == 0.6929) {
        condText = "Frequency Level 6";
        q_dot.setPos([-0.18,0.25]);
    } else if (feedbackRel == 0.8214) {
        condText = "Frequency Level 7";
        q_dot.setPos([-0.16,0.25]);
    } else if (feedbackRel == 0.95) {
        condText = "Frequency Level 8";
        q_dot.setPos([-0.14,0.25]);
    }
    displayText = "Block " + blockN.toString() + "\n\nRunning total score: " + score.toString() + "\n\n" + condText;
    blockDisplay.setText(displayText);
    // set up handler to look after randomisation of conditions etc
    steps = new TrialHandler({
      psychoJS: psychoJS,
      nReps: numSteps, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'steps'
    });
    psychoJS.experiment.addLoop(steps); // add the loop to the experiment
    currentLoop = steps;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisStep of steps) {
      snapshot = steps.getSnapshot();
      stepsLoopScheduler.add(importConditions(snapshot));
      stepsLoopScheduler.add(presentationRoutineBegin(snapshot));
      stepsLoopScheduler.add(presentationRoutineEachFrame());
      stepsLoopScheduler.add(presentationRoutineEnd(snapshot));
      stepsLoopScheduler.add(stepsLoopEndIteration(stepsLoopScheduler, snapshot));
    }
    
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


async function blocksLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(blocks);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function blocksLoopEndIteration(scheduler, snapshot) {
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



//var X_t;
//var stock;
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

    resp.keys = undefined;
    resp.rt = undefined;
    _resp_allKeys = [];
    reward_pres.setText(txt);
    counter.setText(counterNum);
    running_score.setText('Running Score: ' + score.toString() + '\nBenchmark Score: ' + avg_score.toString())
    conditions.setText(condText);
    // keep track of which components have finished
    presentationComponents = [];
    presentationComponents.push(stockline1);
    presentationComponents.push(stockline2);
    presentationComponents.push(stockline3);
    presentationComponents.push(stockline4);
    presentationComponents.push(stockline5);
    presentationComponents.push(stockline6);
    presentationComponents.push(stockline7);
    presentationComponents.push(stockline8);
    presentationComponents.push(stockline9);
    presentationComponents.push(stockline10);
    presentationComponents.push(stockline11);
    presentationComponents.push(stockline12);
    presentationComponents.push(stockline13);
    //presentationComponents.push(stock_show);
    presentationComponents.push(resp);
    presentationComponents.push(reward_pres);
    presentationComponents.push(blockDisplay);
    //presentationComponents.push(second_stock);
    
    for (const thisComponent of presentationComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    
    if (((cont == true)) && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    if (((cont == true)) && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    if (((cont == true)) && counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter.tStart = t;  // (not accounting for frame time here)
      counter.frameNStart = frameN;  // exact frame index
      counter.setAutoDraw(true);
    }
    
    if (((cont == true)) && running_score.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score.tStart = t;  // (not accounting for frame time here)
      running_score.frameNStart = frameN;  // exact frame index
      running_score.setAutoDraw(true);
    }
    
    if (((cont == true)) && conditions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      conditions.tStart = t;  // (not accounting for frame time here)
      conditions.frameNStart = frameN;  // exact frame index
      conditions.setAutoDraw(true);
    }
    
    if (((cont == true)) && q_level.status === PsychoJS.Status.NOT_STARTED && q_dot.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      q_level.tStart = t;  // (not accounting for frame time here)
      q_level.frameNStart = frameN;  // exact frame index
      q_level.setAutoDraw(true);
      q_dot.tStart = t;  // (not accounting for frame time here)
      q_dot.frameNStart = frameN;  // exact frame index
      q_dot.setAutoDraw(true);
    }
    
    if (((cont == true)) && high.status === PsychoJS.Status.NOT_STARTED && low.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      high.tStart = t;  // (not accounting for frame time here)
      high.frameNStart = frameN;  // exact frame index
      high.setAutoDraw(true);
      low.tStart = t;  // (not accounting for frame time here)
      low.frameNStart = frameN;  // exact frame index
      low.setAutoDraw(true);
    }
    
    
    // *stockline1* updates
    if (((cont == true)) && currentHour >= 0 && stockline1.status === PsychoJS.Status.NOT_STARTED) {
      counter.setAutoDraw(true);
      running_score.setAutoDraw(true);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      conditions.setAutoDraw(true);
      q_level.setAutoDraw(true);
      q_dot.setAutoDraw(true);
      high.setAutoDraw(true);
      low.setAutoDraw(true);
      // keep track of start time/frame for later
      stockline1.tStart = t;  // (not accounting for frame time here)
      stockline1.frameNStart = frameN;  // exact frame index
      stockline1.setAutoDraw(true);
      
    }
    
    if (((cont == true)) && currentHour >= 1 && stockline2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline2.tStart = t;  // (not accounting for frame time here)
      stockline2.frameNStart = frameN;  // exact frame index
      stockline2.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 2 && stockline3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline3.tStart = t;  // (not accounting for frame time here)
      stockline3.frameNStart = frameN;  // exact frame index
      stockline3.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 3 && stockline4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline4.tStart = t;  // (not accounting for frame time here)
      stockline4.frameNStart = frameN;  // exact frame index
      stockline4.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 4 && stockline5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline5.tStart = t;  // (not accounting for frame time here)
      stockline5.frameNStart = frameN;  // exact frame index
      stockline5.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 5 && stockline6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline6.tStart = t;  // (not accounting for frame time here)
      stockline6.frameNStart = frameN;  // exact frame index
      stockline6.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 6 && stockline7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline7.tStart = t;  // (not accounting for frame time here)
      stockline7.frameNStart = frameN;  // exact frame index
      stockline7.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 7 && stockline8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline8.tStart = t;  // (not accounting for frame time here)
      stockline8.frameNStart = frameN;  // exact frame index
      stockline8.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 8 && stockline9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline9.tStart = t;  // (not accounting for frame time here)
      stockline9.frameNStart = frameN;  // exact frame index
      stockline9.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 9 && stockline10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline10.tStart = t;  // (not accounting for frame time here)
      stockline10.frameNStart = frameN;  // exact frame index
      stockline10.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 10 && stockline11.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline11.tStart = t;  // (not accounting for frame time here)
      stockline11.frameNStart = frameN;  // exact frame index
      stockline11.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 11 && stockline12.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline12.tStart = t;  // (not accounting for frame time here)
      stockline12.frameNStart = frameN;  // exact frame index
      stockline12.setAutoDraw(true);
    }
    
    if (((cont == true)) && currentHour >= 12 && stockline13.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stockline13.tStart = t;  // (not accounting for frame time here)
      stockline13.frameNStart = frameN;  // exact frame index
      stockline13.setAutoDraw(true);
    }
    
    if ((currentHour == 0) && blockDisplay.status == PsychoJS.Status.NOT_STARTED) {
      plotLim.setAutoDraw(false);
      zeroLine.setAutoDraw(false);
      counter.setAutoDraw(false);
      running_score.setAutoDraw(false);
      conditions.setAutoDraw(false);
      q_level.setAutoDraw(false);
      q_dot.setAutoDraw(false);
      high.setAutoDraw(false);
      low.setAutoDraw(false);
      stockline1.setAutoDraw(false);
      blockDisplay.tStart = t;  // (not accounting for frame time here)
      blockDisplay.frameNStart = frameN;  // exact frame index
      blockDisplay.setAutoDraw(true);
    }
    
    if (blockDisplay.status === PsychoJS.Status.STARTED && t >= (blockDisplay.tStart + 1.5)) {
      blockDisplay.setAutoDraw(false);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      counter.setAutoDraw(true);
      running_score.setAutoDraw(true);
      conditions.setAutoDraw(true);
      q_level.setAutoDraw(true);
      q_dot.setAutoDraw(true);
      high.setAutoDraw(true);
      low.setAutoDraw(true);
      stockline1.tStart = t;  // (not accounting for frame time here)
      stockline1.frameNStart = frameN;  // exact frame index
      stockline1.setAutoDraw(true);
    }

    
    // *resp* updates
    if (t >= 0.0 && resp.status === PsychoJS.Status.NOT_STARTED && currentHour <= 12) {
      // keep track of start time/frame for later
      resp.tStart = t;  // (not accounting for frame time here)
      resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { resp.clearEvents(); });
    }

    if (resp.status === PsychoJS.Status.STARTED && currentHour < 12) {
      let theseKeys = resp.getKeys({keyList: ['up', 'down', 'right'], waitRelease: false});
      _resp_allKeys = _resp_allKeys.concat(theseKeys);
      if (_resp_allKeys.length > 0) {
        resp.keys = _resp_allKeys[_resp_allKeys.length - 1].name;  // just the last key pressed
        resp.rt = _resp_allKeys[_resp_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    } else if (resp.status === PsychoJS.Status.STARTED && currentHour >= 12) {
      let theseKeys = resp.getKeys({keyList: ['up', 'down'], waitRelease: false});
      _resp_allKeys = _resp_allKeys.concat(theseKeys);
      if (_resp_allKeys.length > 0) {
        resp.keys = _resp_allKeys[_resp_allKeys.length - 1].name;  // just the last key pressed
        resp.rt = _resp_allKeys[_resp_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *reward_pres* updates
    if (((cont == false)) && (counterNum != numSteps) && reward_pres.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.setAutoDraw(false);
      zeroLine.setAutoDraw(false);
      counter.setAutoDraw(false);
      running_score.setAutoDraw(false);
      conditions.setAutoDraw(false);
      q_level.setAutoDraw(false);
      q_dot.setAutoDraw(false);
      high.setAutoDraw(false);
      low.setAutoDraw(false);
      blockDisplay.setAutoDraw(false);
      reward_pres.tStart = t;  // (not accounting for frame time here)
      reward_pres.frameNStart = frameN;  // exact frame index
      
      reward_pres.setAutoDraw(true);
    }

    if (reward_pres.status === PsychoJS.Status.STARTED && t >= (reward_pres.tStart + 0.5)) {
      reward_pres.setAutoDraw(false);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      counter.setAutoDraw(true);
      running_score.setAutoDraw(true);
      conditions.setAutoDraw(true);
      q_level.setAutoDraw(true);
      q_dot.setAutoDraw(true);
      high.setAutoDraw(true);
      low.setAutoDraw(true);
      stockline1.tStart = t;  // (not accounting for frame time here)
      stockline1.frameNStart = frameN;  // exact frame index
      stockline1.setAutoDraw(true);
    }
    var thisResp = resp.keys;
    var actual_state = (state > 0);
    var reward_shown = false;
    if ((thisResp === "right")) {
        cont = true;
        currentHour += 1;
    } else {
        if (((thisResp == "up") || (thisResp == "down"))) {
            if (((thisResp == "up") || (thisResp == "down"))) {
                cont = false;
                [correct, score, txt] = reward(feedbackRel, thisResp, actual_state, score);
                coin = flipCoin();
                if ((coin <= hazard)) {
                    state = ((- 1) * state);
                }
                reward_shown = true;
            }
            currentHour = 0;
            stocklist = getStocksForNHours(state*DRIFT, SIG, 14);
            stockline1 = new visual.ShapeStim ({
              win: psychoJS.window, name: 'stockline1', 
              vertices: [stocklist[0],stocklist[1]],
              ori: 0.0, pos: [0, 0],
              lineWidth: 5.0, 
              colorSpace: 'rgb',
              size: [0.5, 0.5],
              lineColor: new util.Color('white'),
              fillColor: new util.Color('white'),
              opacity: undefined, depth: -1, interpolate: true,
            });
            stockline2 = new visual.ShapeStim ({
              win: psychoJS.window, name: 'stockline2', 
              vertices: [stocklist[1], stocklist[2]],
              ori: 0.0, pos: [0, 0],
              lineWidth: 5.0, 
              colorSpace: 'rgb',
              size: [0.5, 0.5],
              lineColor: new util.Color('white'),
              fillColor: new util.Color('white'),
              opacity: undefined, depth: -1, interpolate: true,
            });
            
            stockline3 = new visual.ShapeStim ({
              win: psychoJS.window, name: 'stockline3', 
              vertices: [stocklist[2], stocklist[3]],
              ori: 0.0, pos: [0, 0],
              lineWidth: 5.0, 
              colorSpace: 'rgb',
              size: [0.5, 0.5],
              lineColor: new util.Color('white'),
              fillColor: new util.Color('white'),
              opacity: undefined, depth: -1, interpolate: true,
            });
            
            stockline4 = new visual.ShapeStim ({
              win: psychoJS.window, name: 'stockline4', 
              vertices: [stocklist[3], stocklist[4]],
              ori: 0.0, pos: [0, 0],
              lineWidth: 5.0, 
              colorSpace: 'rgb',
              size: [0.5, 0.5],
              lineColor: new util.Color('white'),
              fillColor: new util.Color('white'),
              opacity: undefined, depth: -1, interpolate: true,
            });
            
            stockline5 = new visual.ShapeStim ({
              win: psychoJS.window, name: 'stockline5', 
              vertices: [stocklist[4], stocklist[5]],
              ori: 0.0, pos: [0, 0],
              lineWidth: 5.0, 
              colorSpace: 'rgb',
              size: [0.5, 0.5],
              lineColor: new util.Color('white'),
              fillColor: new util.Color('white'),
              opacity: undefined, depth: -1, interpolate: true,
            });
            
            stockline6 = new visual.ShapeStim ({
              win: psychoJS.window, name: 'stockline6', 
              vertices: [stocklist[5], stocklist[6]],
              ori: 0.0, pos: [0, 0],
              lineWidth: 5.0, 
              colorSpace: 'rgb',
              size: [0.5, 0.5],
              lineColor: new util.Color('white'),
              fillColor: new util.Color('white'),
              opacity: undefined, depth: -1, interpolate: true,
            });
            stockline7 = new visual.ShapeStim ({
                win: psychoJS.window, name: 'stockline7', 
                vertices: [stocklist[6], stocklist[7]],
                ori: 0.0, pos: [0, 0],
                lineWidth: 5.0, 
                colorSpace: 'rgb',
                size: [0.5, 0.5],
                lineColor: new util.Color('white'),
                fillColor: new util.Color('white'),
                opacity: undefined, depth: -1, interpolate: true,
              });
              stockline8 = new visual.ShapeStim ({
                win: psychoJS.window, name: 'stockline8', 
                vertices: [stocklist[7], stocklist[8]],
                ori: 0.0, pos: [0, 0],
                lineWidth: 5.0, 
                colorSpace: 'rgb',
                size: [0.5, 0.5],
                lineColor: new util.Color('white'),
                fillColor: new util.Color('white'),
                opacity: undefined, depth: -1, interpolate: true,
              });
              stockline9 = new visual.ShapeStim ({
                win: psychoJS.window, name: 'stockline9', 
                vertices: [stocklist[8], stocklist[9]],
                ori: 0.0, pos: [0, 0],
                lineWidth: 5.0, 
                colorSpace: 'rgb',
                size: [0.5, 0.5],
                lineColor: new util.Color('white'),
                fillColor: new util.Color('white'),
                opacity: undefined, depth: -1, interpolate: true,
              });
              stockline10 = new visual.ShapeStim ({
                win: psychoJS.window, name: 'stockline10', 
                vertices: [stocklist[9], stocklist[10]],
                ori: 0.0, pos: [0, 0],
                lineWidth: 5.0, 
                colorSpace: 'rgb',
                size: [0.5, 0.5],
                lineColor: new util.Color('white'),
                fillColor: new util.Color('white'),
                opacity: undefined, depth: -1, interpolate: true,
              });
              stockline11 = new visual.ShapeStim ({
                win: psychoJS.window, name: 'stockline11', 
                vertices: [stocklist[10], stocklist[11]],
                ori: 0.0, pos: [0, 0],
                lineWidth: 5.0, 
                colorSpace: 'rgb',
                size: [0.5, 0.5],
                lineColor: new util.Color('white'),
                fillColor: new util.Color('white'),
                opacity: undefined, depth: -1, interpolate: true,
              });
              stockline12 = new visual.ShapeStim ({
                win: psychoJS.window, name: 'stockline12', 
                vertices: [stocklist[11], stocklist[12]],
                ori: 0.0, pos: [0, 0],
                lineWidth: 5.0, 
                colorSpace: 'rgb',
                size: [0.5, 0.5],
                lineColor: new util.Color('white'),
                fillColor: new util.Color('white'),
                opacity: undefined, depth: -1, interpolate: true,
              });
              stockline13 = new visual.ShapeStim ({
                win: psychoJS.window, name: 'stockline13', 
                vertices: [stocklist[12], stocklist[13]],
                ori: 0.0, pos: [0, 0],
                lineWidth: 5.0, 
                colorSpace: 'rgb',
                size: [0.5, 0.5],
                lineColor: new util.Color('white'),
                fillColor: new util.Color('white'),
                opacity: undefined, depth: -1, interpolate: true,
              });
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
    for (const thisComponent of presentationComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var cont;
var curStock;
function presentationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'presentation' ---
    for (const thisComponent of presentationComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(resp.corr, level);
    }
    psychoJS.experiment.addData('resp.keys', resp.keys);
    psychoJS.experiment.addData('state', state);
    psychoJS.experiment.addData('q_prob', feedbackRel);
    psychoJS.experiment.addData('eps_prob', hazard);
    psychoJS.experiment.addData('score', score);

    
    curStock = stocklist[currentHour];
    psychoJS.experiment.addData('price', curStock[1]);
    if (typeof resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('resp.rt', resp.rt);
        routineTimer.reset();
        }
    
    resp.stop();
    // Run 'End Routine' code from whatNext
    counterNum -= 1;
    
    
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
    
    for (const thisComponent of summaryComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
      plotLim.setAutoDraw(false);
      zeroLine.setAutoDraw(false);
      counter.setAutoDraw(false);
      running_score.setAutoDraw(false);
      conditions.setAutoDraw(false);
      q_level.setAutoDraw(false);
      q_dot.setAutoDraw(false);
      high.setAutoDraw(false);
      low.setAutoDraw(false);
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
    for (const thisComponent of summaryComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of summaryComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
