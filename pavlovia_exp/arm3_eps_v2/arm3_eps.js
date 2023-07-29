/************************** 
 * arm3_eps Test *
 * author: Ishan Kalburge *
 **************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2022.2.5.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


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
var correct = (- 1);
var REWARD = 1;
var PUNISH = (- 1);
var reward_shown = false;
var currentHour = 0;

var draw;
var success;
var cor;
var txt;
var color = "";


function reward(Q, run, correct_state, score) {
    var cor, draw, success, color;
    draw = flipCoin();
    success = (draw <= Q);
    cor = false;
    txt = "No Feedback Given!";
    color = "black";
    if (((run == "up") && (correct_state == 1))) {
        if (success) {
            score += REWARD;
            txt = ("Correct!");
            color = "lightgreen";
        }
        cor = true;
    } else {
        if (((run == "down") && (correct_state == 0))) {
            if (success) {
                score += REWARD;
                txt = ("Correct!");
                color = "lightgreen";

            }
            cor = true;
        } else {
            if (success) {
                score += PUNISH;
                txt = "Error!";
                color = "red";
            }
        }
    }
    return [cor, score, txt, color];
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
flowScheduler.add(introductionRoutineBegin());
flowScheduler.add(introductionRoutineEachFrame());
flowScheduler.add(introductionRoutineEnd());
flowScheduler.add(objectiveRoutineBegin());
flowScheduler.add(objectiveRoutineEachFrame());
flowScheduler.add(objectiveRoutineEnd());
flowScheduler.add(objective2RoutineBegin());
flowScheduler.add(objective2RoutineEachFrame());
flowScheduler.add(objective2RoutineEnd());
flowScheduler.add(explainButtonsRoutineBegin());
flowScheduler.add(explainButtonsRoutineEachFrame());
flowScheduler.add(explainButtonsRoutineEnd());
flowScheduler.add(explainWindowRoutineBegin());
flowScheduler.add(explainWindowRoutineEachFrame());
flowScheduler.add(explainWindowRoutineEnd());
flowScheduler.add(startTrainingRoutineBegin());
flowScheduler.add(startTrainingRoutineEachFrame());
flowScheduler.add(startTrainingRoutineEnd());
const firstTrainingLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(firstTrainingLoopBegin(firstTrainingLoopScheduler));
flowScheduler.add(firstTrainingLoopScheduler);
flowScheduler.add(firstTrainingLoopEnd);
flowScheduler.add(explainFeedback1RoutineBegin());
flowScheduler.add(explainFeedback1RoutineEachFrame());
flowScheduler.add(explainFeedback1RoutineEnd());
// flowScheduler.add(explainFeedback2RoutineBegin());
// flowScheduler.add(explainFeedback2RoutineEachFrame());
// flowScheduler.add(explainFeedback2RoutineEnd());
// flowScheduler.add(startTrainingRoutineBegin());
// flowScheduler.add(startTrainingRoutineEachFrame());
// flowScheduler.add(startTrainingRoutineEnd());
// const secondTrainingLoopScheduler = new Scheduler(psychoJS);
// flowScheduler.add(secondTrainingLoopBegin(secondTrainingLoopScheduler));
// flowScheduler.add(secondTrainingLoopScheduler);
// flowScheduler.add(secondTrainingLoopEnd);
flowScheduler.add(explainSteps1RoutineBegin());
flowScheduler.add(explainSteps1RoutineEachFrame());
flowScheduler.add(explainSteps1RoutineEnd());
flowScheduler.add(explainSteps2RoutineBegin());
flowScheduler.add(explainSteps2RoutineEachFrame());
flowScheduler.add(explainSteps2RoutineEnd());
// flowScheduler.add(startTrainingRoutineBegin());
// flowScheduler.add(startTrainingRoutineEachFrame());
// flowScheduler.add(startTrainingRoutineEnd());
// const thirdTrainingLoopScheduler = new Scheduler(psychoJS);
// flowScheduler.add(thirdTrainingLoopBegin(thirdTrainingLoopScheduler));
// flowScheduler.add(thirdTrainingLoopScheduler);
// flowScheduler.add(thirdTrainingLoopEnd);
flowScheduler.add(explainScoreRoutineBegin());
flowScheduler.add(explainScoreRoutineEachFrame());
flowScheduler.add(explainScoreRoutineEnd());
flowScheduler.add(explainBenchmarkRoutineBegin());
flowScheduler.add(explainBenchmarkRoutineEachFrame());
flowScheduler.add(explainBenchmarkRoutineEnd());
flowScheduler.add(startTrainingRoutineBegin());
flowScheduler.add(startTrainingRoutineEachFrame());
flowScheduler.add(startTrainingRoutineEnd());
const fourthTrainingLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(fourthTrainingLoopBegin(fourthTrainingLoopScheduler));
flowScheduler.add(fourthTrainingLoopScheduler);
flowScheduler.add(fourthTrainingLoopEnd);
flowScheduler.add(explainStabilityRoutineBegin());
flowScheduler.add(explainStabilityRoutineEachFrame());
flowScheduler.add(explainStabilityRoutineEnd());
flowScheduler.add(explainHighStabilityRoutineBegin());
flowScheduler.add(explainHighStabilityRoutineEachFrame());
flowScheduler.add(explainHighStabilityRoutineEnd());
flowScheduler.add(startTrainingRoutineBegin());
flowScheduler.add(startTrainingRoutineEachFrame());
flowScheduler.add(startTrainingRoutineEnd());
const fifthTrainingLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(fifthTrainingLoopBegin(fifthTrainingLoopScheduler));
flowScheduler.add(fifthTrainingLoopScheduler);
flowScheduler.add(fifthTrainingLoopEnd);
flowScheduler.add(explainLowStabilityRoutineBegin());
flowScheduler.add(explainLowStabilityRoutineEachFrame());
flowScheduler.add(explainLowStabilityRoutineEnd());
flowScheduler.add(startTrainingRoutineBegin());
flowScheduler.add(startTrainingRoutineEachFrame());
flowScheduler.add(startTrainingRoutineEnd());
const sixthTrainingLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(sixthTrainingLoopBegin(sixthTrainingLoopScheduler));
flowScheduler.add(sixthTrainingLoopScheduler);
flowScheduler.add(sixthTrainingLoopEnd);
flowScheduler.add(beginRoutineBegin());
flowScheduler.add(beginRoutineEachFrame());
flowScheduler.add(beginRoutineEnd());
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
  resources: [ {name: 'hourglass.png', path: 'hourglass.png'},
               {name: 'coins.png', path: 'coins.png'}
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

const numSteps = 5;
const trainSteps12 = 60;
const trainSteps3on = 60;
var counterNum = numSteps;
// const dp_threshold = 311;
var dp_threshold = 10;
var avg_score = dp_threshold - Math.round(dp_threshold/2);
// const param_set = [0.05, 0.1143, 0.1786, 0.2429, 0.3071, 0.3714, 0.4357, 0.5];
const param_set = [[0.05, 80], [0.1143, 56], [0.1786, 41], [0.2429, 32], [0.3071, 29], [0.3714, 25], [0.4357, 24], [0.5, 24]];
var numBlocks = param_set.length;
var params = shuffle(param_set);
var feedbackRel = 0.75;
var hazard = 0;
const color_increment = [-1, -0.71428571, -0.42857143, -0.14285714,  0.14285714, 0.42857143,  0.71428571, 1];


var presentationComponents;
var presentationClock;


var space_to_begin;
var space_to_continue;


var startTraining_text;
var startTrainingComponents;
var startTrainingClock;



var introductionComponents;
var introductionClock;
var intro_text;


var consentComponents;
var consentClock;
var consent_text;


var objectiveComponents;
var objectiveClock;
var objective_top_text;

var objective_initial_text;
var objective_final_text;
var objective_zeroLine_label_line;
var objective_time_axis;
var objective_data_box;
var objective_data_text;

var objective2Components;
var objective2_top_text;



var explainButtonsComponents;
var explainButtonsClock;
var explainButtons_top_text;


var explainWindowComponents;
var explainWindowClock;
var explainWindow_top_text;


var firstPracticeComponents;
var firstPracticeClock;
var firstPracticeRel = 1;


var explainFeedback1Components;
var explainFeedback1Clock;
var explainFeedback1_top_text;
var explainFeedback1_center_text;


var explainFeedback2Components;
var explainFeedback2Clock;
var explainFeedback2_top_text;
var correct_text;
var error_text;
var noFeedback_text;


var secondPracticeComponents;
var secondPracticeClock;

var explainSteps1Components;
var explainSteps1Clock;
var explainSteps1_top_text;
var explainSteps_step_box;


var explainSteps2Components;
var explainSteps2Clock;
var explainSteps2_top_text;


var thirdPracticeComponents;
var thirdPracticeClock;

var explainScoreComponents;
var explainScoreClock;
var explainScore_top_text;
var explainScore_score_box;


var explainBenchmarkComponents;
var explainBenchmarkClock;
var explainBenchmark_top_text;
var explainBenchmark_benchmark_box

var fourthPracticeComponents;
var fourthPracticeClock;


var explainStabilityComponents;
var explainStabilityClock;
var explainStability_top_text;
var explainStability_center_box;


var explainLowStabilityComponents;
var explainLowStabilityClock;
var explainLowStability_top_text;
var explainLowStability_center_box;


var fifthPracticeComponents;
var fifthPracticeClock;


var explainHighStabilityComponents;
var explainHighStabilityClock;
var explainHighStability_top_text;
var explainHighStability_center_box;

var sixthPracticeComponents;
var sixthPracticeClock;



var beginComponents;
var beginClock;



var displayComponents;
var displayClock;
var display_eps_level;
var display_eps_dot;
var display_high;
var display_low;



var space_bar;
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
var dummystock;
var eps_level;
var eps_dot;
var low;
var high;
var counter;
var running_score;
var counter_img;
var running_score_text;
var running_score_img;
var thresh;
var thresh_text;
var counter_bar;
var score_bar;
const bar_width = 0.05;
const bar_height = 0.2;
const score_bar_pos = 0.4;
const counter_bar_pos = -1*score_bar_pos;
const counter_increment = bar_height/numSteps;
var score_increment = bar_height/(2*avg_score);
var counter_bar_height = counterNum*counter_increment;
var score_bar_height = score*score_increment;
const thresh_height = bar_height*0;
var thresh_str = 'Benchmark: ' + avg_score.toString();
var score_height;
var conditions;
const condText = 'Current Stability';
var resp;
var reward_pres;
var blockDisplay;
var blockN = 0;
var displayText;
var summaryClock;
var score_display;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "instructions"
  startTrainingClock = new util.Clock();
  introductionClock = new util.Clock();
  consentClock = new util.Clock();
  objectiveClock = new util.Clock();
  explainButtonsClock = new util.Clock();
  explainWindowClock = new util.Clock();
  firstPracticeClock = new util.Clock();
  secondPracticeClock = new util.Clock();
  explainFeedback1Clock = new util.Clock();
  explainFeedback2Clock = new util.Clock();
  explainSteps1Clock = new util.Clock();
  explainSteps2Clock = new util.Clock();
  thirdPracticeClock = new util.Clock();
  fourthPracticeClock = new util.Clock();
  explainScoreClock = new util.Clock();
  explainBenchmarkClock = new util.Clock();
  explainStabilityClock = new util.Clock();
  explainHighStabilityClock = new util.Clock();
  fifthPracticeClock = new util.Clock();
  explainLowStabilityClock = new util.Clock();
  sixthPracticeClock = new util.Clock();
  beginClock = new util.Clock();
  displayClock = new util.Clock();
  
  
  space_to_continue = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_to_continue',
    text: "Press SPACE to continue.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, -0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  space_to_begin = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_to_begin',
    text: "The training section is complete.\n\nPress SPACE to BEGIN the task.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  
  startTraining_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'startTraining_text',
    text: "Try it for yourself!\n\nPress SPACE to practice.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  // \n\nAs a reminder:\n\n1) Press RIGHT to sample another time step of stock-market data.\n2) Press UP if you think that the final stock price will be HIGHER than the initial.\n3) Press DOWN if you think that the final stock price will be LOWER than the initial."
  
  
  consent_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'consent_text',
    text: "CONSENT SCREEN\n\nThis is an academic research project conducted through the University of Pennsylvania. In this game, you are being trained as a day-trader at a financial assets company. You will view a stock market fluctuate over time and decide whether you think the stock value will be higher at the end of the trial than at the beginning.\n\nThe estimated total time is about 30 minutes.\n\nYou must be at least 18 years old to participate. Your participation in this research is voluntary, which means you can choose whether or not to participate without negative consequences. Your anonymity is assured: the researchers who have requested your participation will not receive any personal information about you except your previously provided Prolific demographic data such as gender, ethnicity, and age. The de-identified data may be stored and distributed for future research studies without additional informed consent.\n\nIf you have questions about this research, please contact Ishan Kalburge by emailing ikalbur1@jhu.edu or Josh Gold by emailing jigold@pennmedicine.upenn.edu.\n\nIf you have questions, concerns, or complaints regarding your participation in this research study, or if you have any questions about your rights as a research subject and you cannot reach a member of the study team, you may contact the Office of Regulatory Affairs at the University of Pennsylvania by calling (215) 898-2614 or emailing irb@pobox.upenn.edu.\n\nBy pressing SPACE, you acknowledge that you have read the information above and agree to take part in this study, and that you understand that you may withdraw your consent at any time before you complete the tasks.",
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
    text: "Please read the following instructions carefully. You will not be able to return to a previous screen.\n\nPress SPACE to continue.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.045,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  

  
  
  objective_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'details_text',
    text: "In this experiment, you are a stock-market analyst who is being trained to make moment-by-moment stock-market predictions and send as many accurate recommendations to a customer as possible in a certain amount of time.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });


  objective2_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'details_text',
    text: "Specifically, on each trial you will view a graph of stock-market prices fluctuating up and down over time (from the left to the right of the screen). The initial price is always fixed. Your task is to determine whether the final price on that trial will be higher or lower than the initial price. The challenge is to do so both as accurately and quickly as possible.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });

  objective_initial_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'details_text',
    text: "Initial price",
    font: 'Open Sans',
    units: undefined, 
    pos: [counter_bar_pos - 0.01, 0], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('salmon'),  opacity: undefined,
    depth: 0.0 
  });



  objective_final_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'details_text',
    text: "Final price?",
    font: 'Open Sans',
    units: undefined, 
    pos: [score_bar_pos + 0.01, 0], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('salmon'),  opacity: undefined,
    depth: 0.0 
  });


  objective_zeroLine_label_line = new visual.ShapeStim ({
    win: psychoJS.window, name: 'dummystock', 
    vertices: [[-0.05, 0.02],[0.05, 0.12]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('salmon'),
    fillColor: new util.Color('salmon'),
    opacity: undefined, depth: -1, interpolate: true,
  });


  objective_time_axis = new visual.TextStim({
    win: psychoJS.window,
    name: 'details_text',
    text: "Time axis",
    font: 'Open Sans',
    units: undefined, 
    pos: [0.07, 0.06], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('salmon'),  opacity: undefined,
    depth: 0.0 
  });


  objective_data_box = new visual.Rect ({
    win: psychoJS.window, name: 'side_box2', 
    width: 0.12, height: 0.13,
    ori: 0.0, pos: [(- Math.round(14/2))/20 + 0.025, 0.025],
    lineWidth: 5.0, 
    size: [0.5, 0.5],
    colorSpace: 'rgb',
    lineColor: new util.Color('salmon'),
    opacity: undefined, depth: -7, interpolate: true,
  });

  objective_data_text = new visual.TextStim({
      win: psychoJS.window,
      name: 'details_text',
      text: "Price data point",
      font: 'Open Sans',
      units: undefined, 
      pos: [(- Math.round(14/2))/20 + 0.075, 0.075], height: 0.02,  wrapWidth: undefined, ori: 0.0,
      languageStyle: 'LTR',
      color: new util.Color('salmon'),  opacity: undefined,
      depth: 0.0 
    });

  

  
  
  explainButtons_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'objective_text',
    text: "1) Press RIGHT to sample another time step of stock-market data.\n2) Press UP if you think the final stock price will be HIGHER than the initial price.\n3) Press DOWN if you think the final stock price will be LOWER than the initial price.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
    
    explainWindow_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'explainWindow1',
    text: "You must commit to an UP or DOWN choice within 13 time steps. Once you commit, the trial will end, and you will not be able to see the remaining data points.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  explainFeedback1_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'objective_text',
    text: "After each trial, the customer will typically give you feedback. “Correct!” means that your prediction on that trial was correct and your end-of-year salary bonus goes up. “Error!” means that your prediction on that trial was not correct and your end-of-year salary bonus goes down. However, sometimes (approximately 25% of the time) the customer will ignore your recommendation, in which case you will see “No Feedback Given!”",
    font: 'Open Sans',
    units: undefined,  
    alignText: 'left',
    pos: [0, 0.37], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });

  explainFeedback1_center_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'objective_text',
    text: "or\n\n\nor",
    font: 'Open Sans',
    units: undefined,  
    alignText: 'left',
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });


  explainFeedback2_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'objective_text',
    text: "However, on some trials the customer might choose to simply disregard your advice. In those cases (roughly 25% of the time), you will see:",
    font: 'Open Sans',
    units: undefined,  
    alignText: 'left',
    pos: [0, 0.37], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });

  correct_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'correct',
    text: "Correct!",
    font: 'Open Sans',
    units: undefined,  
    alignText: 'left',
    pos: [0, 0.1], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('lightgreen'),  opacity: undefined,
    depth: 0.0 
  });


  error_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'error',
    text: "Error!",
    font: 'Open Sans',
    units: undefined,  
    alignText: 'left',
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('red'),  opacity: undefined,
    depth: 0.0 
  });




  noFeedback_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'noFeedback_text',
    text: "No Feedback Given!",
    font: 'Open Sans',
    units: undefined,  
    alignText: 'left',
    pos: [0, -0.1], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: 0.0 
  });

  
    explainSteps1_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'explainSteps_text',
    text: "Your training for a given set of conditions (block) will end after you have used up " + numSteps.toString() + " time steps. A time-step tracker will be displayed on the LEFT. There will be 8 total blocks.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  
  explainSteps_step_box = new visual.Rect ({
    win: psychoJS.window, name: 'side_box2', 
    width: bar_width + 0.03, height: counter_bar_height+0.15,
    ori: 0.0, pos: [counter_bar_pos, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('salmon'),
    opacity: undefined, depth: -7, interpolate: true,
  });



  explainSteps2_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'details_text',
    text: "Note that using more time steps on a given trial gives you more price information and thus generally supports more accurate decisions. However, using more time steps on each trial also limits the total number of trials you will be able to complete in that block before the number of available time steps runs out. This gives you fewer opportunities to try to increase your bonus.",
    font: 'Open Sans',
    units: undefined,  
    alignText: 'left',
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });


  explainScore_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'explainScore_text',
    text: "A end-of-year salary bonus tracker will be shown on the RIGHT, which increases on “Correct!” trials, decreases on “Error!” trials, and does not change on “No Feedback Given!” trials.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });

  explainScore_score_box = new visual.Rect ({
    win: psychoJS.window, name: 'side_box2', 
    width: bar_width + 0.03, height: counter_bar_height+0.15,
    ori: 0.0, pos: [score_bar_pos, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('salmon'),
    opacity: undefined, depth: -7, interpolate: true,
  });


  explainBenchmark_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'explainBenchmark_text',
    text: "You will also see a performance benchmark, which will increase as you complete more blocks. If you exceed the final benchmark by the end of the experiment, you will receive an additional cash payment.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });


  explainBenchmark_benchmark_box = new visual.Rect ({
    win: psychoJS.window, name: 'side_box2', 
    width: bar_width + 0.17, height: 0.1,
    ori: 0.0, pos: [score_bar_pos+0.07, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('salmon'),
    opacity: undefined, depth: -7, interpolate: true,
  });

 explainStability_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'vars_text',
    text: "Finally, the “Current Stability” of a block determines how consistent the state of the final price (UP or DOWN) is from one trial to the next in the block. We will be manipulating the level of stability for each of the 8 blocks. The levels range from low to high and will be shown on the slider below.",
    font: 'Open Sans',
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });
  
  
  explainStability_center_box = new visual.Rect ({
    win: psychoJS.window, name: 'side_box2', 
    width: 0.23, height: 0.05,
    ori: 0.0, pos: [-0.21, 0.2625],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('salmon'),
    opacity: undefined, depth: -7, interpolate: true,
  });


  explainHighStability_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'vars_text',
    text: "If you are in a HIGH stability block, the final price will tend to be higher or lower than the initial price for numerous trials in a row, and so you should expect to select either UP or DOWN numerous times in a row.",
    font: 'Open Sans',
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });
  
  
  explainHighStability_center_box = new visual.Rect ({
    win: psychoJS.window, name: 'side_box2', 
    width: 0.23, height: 0.05,
    ori: 0.0, pos: [-0.21, 0.2625],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('salmon'),
    opacity: undefined, depth: -7, interpolate: true,
  });


  explainLowStability_top_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'vars_text',
    text: "If you are in a LOW stability block, the final price will tend to be higher or lower than the initial price more randomly from trial to trial, and so you should NOT expect to select either UP or DOWN numerous times in a row.",
    font: 'Open Sans',
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });
  
  
  explainLowStability_center_box = new visual.Rect ({
    win: psychoJS.window, name: 'side_box2', 
    width: 0.23, height: 0.05,
    ori: 0.0, pos: [-0.21, 0.2625],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('salmon'),
    opacity: undefined, depth: -7, interpolate: true,
  });

  
  dummystock = new visual.ShapeStim ({
    win: psychoJS.window, name: 'dummystock', 
    vertices: [[(- Math.round(14/2))/10, 0],[(- Math.round(14/2))/10 + 0.1, 0.1]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    size: [0.5, 0.5],
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });

  
  space_bar = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "presentation"
  presentationClock = new util.Clock();
  // Run 'Begin Experiment' code from getNormalRV
  const DRIFT = 0.5;
  const SIG = 1;
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
  
  eps_level = new visual.ShapeStim ({
    win: psychoJS.window, name: 'eps_level', 
    vertices: [[-0.28,0.25], [-0.14,0.25]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('black'),
    fillColor: new util.Color('black'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  eps_dot = new visual.Polygon({
    win: psychoJS.window, name: 'eps_dot',
    colorSpace: 'rgb',
    pos: [-0.26,0.25],
    radius: 0.005,
    lineColor: new util.Color('cyan'),
    fillColor: new util.Color('cyan'),
    edges: 128,
    opacity: undefined, depth: -1, interpolate: true,
    });
    
    
  low = new visual.TextStim({
    win: psychoJS.window,
    name: 'low',
    text: 'Low',
    font: 'Open Sans',
    units: undefined, 
    pos: [-0.30, 0.25], height: 0.014,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -7 
  });
  
  high = new visual.TextStim({
    win: psychoJS.window,
    name: 'high',
    text: 'High',
    font: 'Open Sans',
    units: undefined, 
    pos: [-0.12, 0.25], height: 0.014,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -7 
  });


  
  counter = new visual.TextStim({
    win: psychoJS.window,
    name: 'counter',
    text: counterNum,
    font: 'Open Sans',
    units: undefined, 
    pos: [counter_bar_pos, -(bar_height/2 + 0.02)], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([-0.4, -0.4, -0.4]),  opacity: undefined,
    depth: -7 
  });
  
  counter_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'counter_hg', units : undefined, 
    image : 'hourglass.png', mask : undefined,
    pos: [counter_bar_pos, (bar_height/2 + 0.035)], size: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([-0.4, -0.4, -0.4]),  opacity: undefined,
    depth: -7 
  });
  
  counter_bar = new visual.Rect ({
    win: psychoJS.window, name: 'counter_bar', 
    width: [1.0, 1.0][0], height: [1.0, 1.0][1],
    ori: 0.0, pos: [counter_bar_pos, 0],
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    size: [bar_width, bar_height],
    lineColor: new util.Color([-0.4, -0.4, -0.4]),
    fillColor: new util.Color([-0.4, -0.4, -0.4]),
    opacity: undefined, depth: -8, interpolate: true,
  });
  
  running_score = new visual.TextStim({
    win: psychoJS.window,
    name: 'running_score',
    text: score.toString(),
    font: 'Open Sans',
    units: undefined, 
    pos: [score_bar_pos, -(bar_height/2 + 0.02)], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('gold'),  opacity: undefined,
    depth: -7 
  });

   running_score_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'running_score_coins', units : undefined, 
    image : 'coins.png', mask : undefined,
    pos: [score_bar_pos, (bar_height/2 + 0.035)], size: 0.06,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([-0.4, -0.4, -0.4]),  opacity: undefined,
    depth: -7 
  });
  
  thresh = new visual.ShapeStim ({
    win: psychoJS.window, name: 'threshold', 
    vertices: [[score_bar_pos-0.03, thresh_height], [score_bar_pos+0.03, thresh_height]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('black'),
    fillColor: new util.Color('black'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  thresh_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'thresh_text',
    text: thresh_str,
    font: 'Open Sans',
    units: undefined, 
    pos: [score_bar_pos+0.1, thresh_height], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -7 
  });
  
  
    score_bar = new visual.Rect ({
    win: psychoJS.window, name: 'score_bar', 
    width: [1.0, 1.0][0], height: [1.0, 1.0][1],
    ori: 0.0, pos: [score_bar_pos, 0 - (2*avg_score - score)*score_increment/2],
    size: [bar_width, score_bar_height],
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('gold'),
    fillColor: new util.Color('gold'),
    opacity: undefined, depth: -8, interpolate: true,
  });

  
  
  conditions = new visual.TextStim({
    win: psychoJS.window,
    name: 'conditions',
    text: condText,
    font: 'Open Sans',
    units: undefined, 
    pos: [-0.21, 0.275], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('cyan'),  opacity: undefined,
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
    
    display_eps_level = new visual.ShapeStim ({
    win: psychoJS.window, name: 'eps_level', 
    vertices: [[-0.14,-0.1], [0.14,-0.1]],
    ori: 0.0, pos: [0, 0],
    lineWidth: 5.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('black'),
    fillColor: new util.Color('black'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  display_eps_dot = new visual.Polygon({
    win: psychoJS.window, name: 'eps_dot',
    colorSpace: 'rgb',
    pos: [,-0.1],
    radius: 0.005,
    lineColor: new util.Color('cyan'),
    fillColor: new util.Color('cyan'),
    edges: 128,
    opacity: undefined, depth: -1, interpolate: true,
    });

    display_low = new visual.TextStim({
    win: psychoJS.window,
    name: 'low',
    text: 'Low',
    font: 'Open Sans',
    units: undefined, 
    pos: [-0.16, -0.1], height: 0.017,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -7 
  });
  
  display_high = new visual.TextStim({
    win: psychoJS.window,
    name: 'high',
    text: 'High',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.16, -0.1], height: 0.017,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -7 
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



// ****END OF INSTANTIATION****


var t;
var frameN;
var continueRoutine;
var _space_bar_allKeys;

// startTraining
function startTrainingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    startTrainingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    startTrainingComponents = [];
    startTrainingComponents.push(startTraining_text);
    startTrainingComponents.push(space_bar);
    
    for (const thisComponent of startTrainingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function startTrainingRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = startTrainingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    score = 0;
    
    
    // *text* updates
    if (t >= 0.0 && startTraining_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      startTraining_text.tStart = t;  // (not accounting for frame time here)
      startTraining_text.frameNStart = frameN;  // exact frame index
      startTraining_text.setAutoDraw(true);
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
    for (const thisComponent of startTrainingComponents)
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


function startTrainingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of startTrainingComponents) {
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
function introductionRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    introductionClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    introductionComponents = [];
    introductionComponents.push(intro_text);
    introductionComponents.push(space_bar);
    
    for (const thisComponent of introductionComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function introductionRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = introductionClock.getTime();
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
    for (const thisComponent of introductionComponents)
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


function introductionRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of introductionComponents) {
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




// objective text
function objectiveRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    objectiveClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    objectiveComponents = [];
    objectiveComponents.push(space_to_continue);
    objectiveComponents.push(objective_top_text);
    objectiveComponents.push(plotLim);
    objectiveComponents.push(zeroLine);
    objectiveComponents.push(dummystock);
    objectiveComponents.push(space_bar);
    for (const thisComponent of objectiveComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function objectiveRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = objectiveClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && objective_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_top_text.tStart = t;  // (not accounting for frame time here)
      objective_top_text.frameNStart = frameN;  // exact frame index
      objective_top_text.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
    }


    if (t >= 0.0 && objective_initial_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_initial_text.tStart = t;  // (not accounting for frame time here)
      objective_initial_text.frameNStart = frameN;  // exact frame index
      objective_initial_text.setAutoDraw(true);
    }


    if (t >= 0.0 && objective_final_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_final_text.tStart = t;  // (not accounting for frame time here)
      objective_final_text.frameNStart = frameN;  // exact frame index
      objective_final_text.setAutoDraw(true);
    }

    if (t >= 0.0 && objective_zeroLine_label_line.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_zeroLine_label_line.tStart = t;  // (not accounting for frame time here)
      objective_zeroLine_label_line.frameNStart = frameN;  // exact frame index
      objective_zeroLine_label_line.setAutoDraw(true);
    }

    if (t >= 0.0 && objective_time_axis.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_time_axis.tStart = t;  // (not accounting for frame time here)
      objective_time_axis.frameNStart = frameN;  // exact frame index
      objective_time_axis.setAutoDraw(true);
    }

    if (t >= 0.0 && objective_data_box.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_data_box.tStart = t;  // (not accounting for frame time here)
      objective_data_box.frameNStart = frameN;  // exact frame index
      objective_data_box.setAutoDraw(true);
    }

    if (t >= 0.0 && objective_data_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_data_text.tStart = t;  // (not accounting for frame time here)
      objective_data_text.frameNStart = frameN;  // exact frame index
      objective_data_text.setAutoDraw(true);
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
    for (const thisComponent of objectiveComponents)
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


function objectiveRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of objectiveComponents) {
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


// objective text
function objective2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    objective2Components = [];
    objective2Components.push(space_to_continue);
    objective2Components.push(objective2_top_text);
    objective2Components.push(objective_initial_text);
    objective2Components.push(objective_final_text);
    objective2Components.push(objective_zeroLine_label_line);
    objective2Components.push(objective_time_axis);
    objective2Components.push(objective_data_box);
    objective2Components.push(objective_data_text);
    objective2Components.push(plotLim);
    objective2Components.push(zeroLine);
    objective2Components.push(dummystock);
    objective2Components.push(space_bar);
    for (const thisComponent of objective2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function objective2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = objectiveClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && objective2_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective2_top_text.tStart = t;  // (not accounting for frame time here)
      objective2_top_text.frameNStart = frameN;  // exact frame index
      objective2_top_text.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
    }


    if (t >= 0.0 && objective_initial_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_initial_text.tStart = t;  // (not accounting for frame time here)
      objective_initial_text.frameNStart = frameN;  // exact frame index
      objective_initial_text.setAutoDraw(true);
    }


    if (t >= 0.0 && objective_final_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_final_text.tStart = t;  // (not accounting for frame time here)
      objective_final_text.frameNStart = frameN;  // exact frame index
      objective_final_text.setAutoDraw(true);
    }

    if (t >= 0.0 && objective_zeroLine_label_line.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_zeroLine_label_line.tStart = t;  // (not accounting for frame time here)
      objective_zeroLine_label_line.frameNStart = frameN;  // exact frame index
      objective_zeroLine_label_line.setAutoDraw(true);
    }

    if (t >= 0.0 && objective_time_axis.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_time_axis.tStart = t;  // (not accounting for frame time here)
      objective_time_axis.frameNStart = frameN;  // exact frame index
      objective_time_axis.setAutoDraw(true);
    }

    if (t >= 0.0 && objective_data_box.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_data_box.tStart = t;  // (not accounting for frame time here)
      objective_data_box.frameNStart = frameN;  // exact frame index
      objective_data_box.setAutoDraw(true);
    }

    if (t >= 0.0 && objective_data_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      objective_data_text.tStart = t;  // (not accounting for frame time here)
      objective_data_text.frameNStart = frameN;  // exact frame index
      objective_data_text.setAutoDraw(true);
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
    for (const thisComponent of objective2Components)
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


function objective2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of objective2Components) {
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



// explainButtons text
function explainButtonsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainButtonsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainButtonsComponents = [];
    explainButtonsComponents.push(space_to_continue);
    explainButtonsComponents.push(explainButtons_top_text);
    explainButtonsComponents.push(plotLim);
    explainButtonsComponents.push(zeroLine);
    explainButtonsComponents.push(dummystock);
    explainButtonsComponents.push(space_bar);
    
    for (const thisComponent of explainButtonsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainButtonsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainButtonsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainButtons_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainButtons_top_text.tStart = t;  // (not accounting for frame time here)
      explainButtons_top_text.frameNStart = frameN;  // exact frame index
      explainButtons_top_text.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
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
    for (const thisComponent of explainButtonsComponents)
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


function explainButtonsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainButtonsComponents) {
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



// explainWindowEx text
function explainWindowRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainWindowClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainWindowComponents = [];
    explainWindowComponents.push(space_to_continue);
    explainWindowComponents.push(explainWindow_top_text);
    explainWindowComponents.push(plotLim);
    explainWindowComponents.push(zeroLine);
    explainWindowComponents.push(dummystock);
    explainWindowComponents.push(space_bar);
    
    for (const thisComponent of explainWindowComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainWindowRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainWindowClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainWindow_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainWindow_top_text.tStart = t;  // (not accounting for frame time here)
      explainWindow_top_text.frameNStart = frameN;  // exact frame index
      explainWindow_top_text.setAutoDraw(true);
    }
    

    
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
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
    for (const thisComponent of explainWindowComponents)
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


function explainWindowRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainWindowComponents) {
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


var train;
function firstTrainingLoopBegin(firstTrainingLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    counterNum = trainSteps12;
    cont = true;
    currentHour = 0;
    score = 0;
    stocklist = getStocksForNHours(state*DRIFT, SIG, 14);
    hazard = 0.2429;
    // const color_increment = [-1, -0.71428571, -0.42857143, -0.14285714,  0.14285714, 0.42857143,  0.71428571, 1];
    eps_dot.setPos([-0.2,0.25]);
    // [0.05, 0.1143, 0.1786, 0.2429, 0.3071, 0.3714, 0.4357, 0.5]

    // set up handler to look after randomisation of conditions etc
    train = new TrialHandler({
      psychoJS: psychoJS,
      nReps: trainSteps12, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'train'
    });
    psychoJS.experiment.addLoop(train); // add the loop to the experiment
    currentLoop = train;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrain of train) {
      snapshot = train.getSnapshot();
      firstTrainingLoopScheduler.add(importConditions(snapshot));
      firstTrainingLoopScheduler.add(firstPracticeRoutineBegin(snapshot));
      firstTrainingLoopScheduler.add(firstPracticeRoutineEachFrame());
      firstTrainingLoopScheduler.add(firstPracticeRoutineEnd(snapshot));
      firstTrainingLoopScheduler.add(firstTrainingLoopEndIteration(firstTrainingLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function firstTrainingLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(train);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function firstTrainingLoopEndIteration(scheduler, snapshot) {
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


// firstPractice start
function firstPracticeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'firstPractice' ---
    t = 0;
    firstPracticeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from getNormalRV

    resp.keys = undefined;
    resp.rt = undefined;
    _resp_allKeys = [];
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    thresh_text.setText(thresh_str);
    running_score.setText(score.toString())
    // keep track of which components have finished
    firstPracticeComponents = [];
    firstPracticeComponents.push(stockline1);
    firstPracticeComponents.push(stockline2);
    firstPracticeComponents.push(stockline3);
    firstPracticeComponents.push(stockline4);
    firstPracticeComponents.push(stockline5);
    firstPracticeComponents.push(stockline6);
    firstPracticeComponents.push(stockline7);
    firstPracticeComponents.push(stockline8);
    firstPracticeComponents.push(stockline9);
    firstPracticeComponents.push(stockline10);
    firstPracticeComponents.push(stockline11);
    firstPracticeComponents.push(stockline12);
    firstPracticeComponents.push(stockline13);
    firstPracticeComponents.push(resp);
    firstPracticeComponents.push(reward_pres);
    firstPracticeComponents.push(plotLim);
    firstPracticeComponents.push(zeroLine);
    firstPracticeComponents.push(explainButtons_top_text);
    // firstPracticeComponents.push(counter);
    // firstPracticeComponents.push(running_score);
    // firstPracticeComponents.push(counter_img);
    // firstPracticeComponents.push(running_score_img);
    // firstPracticeComponents.push(thresh);
    // firstPracticeComponents.push(thresh_text);
    // firstPracticeComponents.push(counter_bar);
    // firstPracticeComponents.push(score_bar);
    // firstPracticeComponents.push(conditions);
    // firstPracticeComponents.push(low);
    // firstPracticeComponents.push(high);
    // firstPracticeComponents.push(eps_level);
    // firstPracticeComponents.push(eps_dot);

    for (const thisComponent of firstPracticeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}



function firstPracticeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'firstPractice' ---
    // get current time
    t = firstPracticeClock.getTime();
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

    if (t >= 0.0 && explainButtons_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainButtons_top_text.tStart = t;  // (not accounting for frame time here)
      explainButtons_top_text.frameNStart = frameN;  // exact frame index
      explainButtons_top_text.setAutoDraw(true);
    }
    
    
    // if (((cont == true)) && counter.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   counter.tStart = t;  // (not accounting for frame time here)
    //   counter.frameNStart = frameN;  // exact frame index
    //   counter.setAutoDraw(true);
    // }
   
    
    // if (((cont == true)) && running_score.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   running_score.tStart = t;  // (not accounting for frame time here)
    //   running_score.frameNStart = frameN;  // exact frame index
    //   running_score.setAutoDraw(true);
    // }
    
    // if (((cont == true)) && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   counter_bar.tStart = t;  // (not accounting for frame time here)
    //   counter_bar.frameNStart = frameN;  // exact frame index
    //   counter_bar.setAutoDraw(true);
    // }
    
    //  if (((cont == true)) && score_bar.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   score_bar.tStart = t;  // (not accounting for frame time here)
    //   score_bar.frameNStart = frameN;  // exact frame index
    //   score_bar.setAutoDraw(true);
    // }
    
    //  if (((cont == true)) && counter_img.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   counter_img.tStart = t;  // (not accounting for frame time here)
    //   counter_img.frameNStart = frameN;  // exact frame index
    //   counter_img.setAutoDraw(true);
    // }
    
    //  if (((cont == true)) && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   running_score_img.tStart = t;  // (not accounting for frame time here)
    //   running_score_img.frameNStart = frameN;  // exact frame index
    //   running_score_img.setAutoDraw(true);
    // }
    
    //  if (((cont == true)) && thresh.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   thresh.tStart = t;  // (not accounting for frame time here)
    //   thresh.frameNStart = frameN;  // exact frame index
    //   thresh.setAutoDraw(true);
    // }
    
    
    // if (((cont == true)) && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   thresh_text.tStart = t;  // (not accounting for frame time here)
    //   thresh_text.frameNStart = frameN;  // exact frame index
    //   thresh_text.setAutoDraw(true);
    // }

    
    // if (((cont == true)) && conditions.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   conditions.tStart = t;  // (not accounting for frame time here)
    //   conditions.frameNStart = frameN;  // exact frame index
    //   conditions.setAutoDraw(true);
    // }
    
    // if (((cont == true)) && eps_level.status === PsychoJS.Status.NOT_STARTED && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   eps_level.tStart = t;  // (not accounting for frame time here)
    //   eps_level.frameNStart = frameN;  // exact frame index
    //   eps_level.setAutoDraw(true);
    //   eps_dot.tStart = t;  // (not accounting for frame time here)
    //   eps_dot.frameNStart = frameN;  // exact frame index
    //   eps_dot.setAutoDraw(true);
    // }
    
    // if (((cont == true)) && high.status === PsychoJS.Status.NOT_STARTED && low.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   high.tStart = t;  // (not accounting for frame time here)
    //   high.frameNStart = frameN;  // exact frame index
    //   high.setAutoDraw(true);
    //   low.tStart = t;  // (not accounting for frame time here)
    //   low.frameNStart = frameN;  // exact frame index
    //   low.setAutoDraw(true);
    // }
    
    
    // *stockline1* updates
    if (((cont == true)) && currentHour >= 0 && stockline1.status === PsychoJS.Status.NOT_STARTED) {
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      
      // counter.setAutoDraw(true);
      // running_score.setAutoDraw(true);
      // counter_bar.setAutoDraw(true);
      // score_bar.setAutoDraw(true);
      // counter_img.setAutoDraw(true);
      // running_score_img.setAutoDraw(true);
      // thresh.setAutoDraw(true);
      // thresh_text.setAutoDraw(true);
      // conditions.setAutoDraw(true);
      // eps_level.setAutoDraw(true);
      // eps_dot.setAutoDraw(true);
      // high.setAutoDraw(true);
      // low.setAutoDraw(true);

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
    
    // if ((currentHour == 0) && blockDisplay.status == PsychoJS.Status.NOT_STARTED) {
    //   plotLim.setAutoDraw(false);
    //   zeroLine.setAutoDraw(false);
    //   counter_bar.setAutoDraw(false);
    //   score_bar.setAutoDraw(false);
    //   counter.setAutoDraw(false);
    //   running_score.setAutoDraw(false);
    //   counter_img.setAutoDraw(false);
    //   running_score_img.setAutoDraw(false);
    //   thresh.setAutoDraw(false);
    //   thresh_text.setAutoDraw(false);
    //   conditions.setAutoDraw(false);
    //   eps_level.setAutoDraw(false);
    //   eps_dot.setAutoDraw(false);
    //   high.setAutoDraw(false);
    //   low.setAutoDraw(false);
    //   stockline1.setAutoDraw(false);
    //   blockDisplay.tStart = t;  // (not accounting for frame time here)
    //   blockDisplay.frameNStart = frameN;  // exact frame index
    //   blockDisplay.setAutoDraw(true);
    // }
    
    // if (blockDisplay.status === PsychoJS.Status.STARTED && t >= (blockDisplay.tStart + 3)) {
    //   blockDisplay.setAutoDraw(false);
    //   plotLim.setAutoDraw(true);
    //   zeroLine.setAutoDraw(true);
    //   counter_bar.setAutoDraw(true);
    //   score_bar.setAutoDraw(true);
    //   counter.setAutoDraw(true);
    //   running_score.setAutoDraw(true);
    //   counter_img.setAutoDraw(true);
    //   running_score_img.setAutoDraw(true);
    //   thresh.setAutoDraw(true);
    //   thresh_text.setAutoDraw(true);
    //   conditions.setAutoDraw(true);
    //   eps_level.setAutoDraw(true);
    //   eps_dot.setAutoDraw(true);
    //   high.setAutoDraw(true);
    //   low.setAutoDraw(true);
    //   stockline1.tStart = t;  // (not accounting for frame time here)
    //   stockline1.frameNStart = frameN;  // exact frame index
    //   stockline1.setAutoDraw(true);
    // }

    
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
    if (((cont == false)) && (counterNum != 0) && reward_pres.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.setAutoDraw(false);
      zeroLine.setAutoDraw(false);
      explainButtons_top_text.setAutoDraw(false);

      // counter.setAutoDraw(false);
      // running_score.setAutoDraw(false);
      // counter_bar.setAutoDraw(false);
      // score_bar.setAutoDraw(false);
      // counter_img.setAutoDraw(false);
      // running_score_img.setAutoDraw(false);
      // thresh.setAutoDraw(false);
      // thresh_text.setAutoDraw(false);
      // conditions.setAutoDraw(false);
      // eps_level.setAutoDraw(false);
      // eps_dot.setAutoDraw(false);
      // high.setAutoDraw(false);
      // low.setAutoDraw(false);
    //   blockDisplay.setAutoDraw(false);
      reward_pres.tStart = t;  // (not accounting for frame time here)
      reward_pres.frameNStart = frameN;  // exact frame index
      
      reward_pres.setAutoDraw(true);
    }

    if (reward_pres.status === PsychoJS.Status.STARTED && t >= (reward_pres.tStart + 0.5)) {
      reward_pres.setAutoDraw(false);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      explainButtons_top_text.setAutoDraw(true);

      
      // counter.setAutoDraw(true);
      // running_score.setAutoDraw(true);
      // counter_bar.setAutoDraw(true);
      // score_bar.setAutoDraw(true);
      // counter_img.setAutoDraw(true);
      // running_score_img.setAutoDraw(true);
      // thresh.setAutoDraw(true);
      // thresh_text.setAutoDraw(true);
      // conditions.setAutoDraw(true);
      // eps_level.setAutoDraw(true);
      // eps_dot.setAutoDraw(true);
      // high.setAutoDraw(true);
      // low.setAutoDraw(true);
      
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
    } else if (((thisResp == "up") || (thisResp == "down")) && counterNum > 1) {
            
        cont = false;
        [correct, score, txt, color] = reward(firstPracticeRel, thisResp, actual_state, score);
        coin = flipCoin();
        if ((coin <= hazard)) {
            state = ((- 1) * state);
        }
        reward_shown = true;
        
        reward_pres = new visual.TextStim({
          win: psychoJS.window,
          name: 'reward_pres',
          text: txt,
          font: 'Open Sans',
          units: undefined, 
          pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
          languageStyle: 'LTR',
          color: new util.Color(color),  opacity: undefined,
          depth: -5.0 
        });


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
      

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of firstPracticeComponents)
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
function firstPracticeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'firstPractice' ---
    for (const thisComponent of firstPracticeComponents) {
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
    psychoJS.experiment.addData('q_prob', firstPracticeRel);
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
    
    
    // the Routine "firstPractice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}










// explainFeedback1 text
function explainFeedback1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainFeedback1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainFeedback1Components = [];
    explainFeedback1Components.push(space_to_continue);
    explainFeedback1Components.push(explainFeedback1_top_text);
    explainFeedback1Components.push(explainFeedback1_center_text);
    explainFeedback1Components.push(correct_text);
    explainFeedback1Components.push(error_text);
    explainFeedback1Components.push(noFeedback_text);
    explainFeedback1Components.push(space_bar);

    
    for (const thisComponent of explainFeedback1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainFeedback1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainFeedback1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainFeedback1_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainFeedback1_top_text.tStart = t;  // (not accounting for frame time here)
      explainFeedback1_top_text.frameNStart = frameN;  // exact frame index
      explainFeedback1_top_text.setAutoDraw(true);
    }
    
    if (t >= 0.0 && explainFeedback1_center_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainFeedback1_center_text.tStart = t;  // (not accounting for frame time here)
      explainFeedback1_center_text.frameNStart = frameN;  // exact frame index
      explainFeedback1_center_text.setAutoDraw(true);
    }
    
    if (t >= 0.0 && correct_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      correct_text.tStart = t;  // (not accounting for frame time here)
      correct_text.frameNStart = frameN;  // exact frame index
      correct_text.setAutoDraw(true);
    }
    if (t >= 0.0 && error_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      error_text.tStart = t;  // (not accounting for frame time here)
      error_text.frameNStart = frameN;  // exact frame index
      error_text.setAutoDraw(true);
    }
    if (t >= 0.0 && noFeedback_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      noFeedback_text.tStart = t;  // (not accounting for frame time here)
      noFeedback_text.frameNStart = frameN;  // exact frame index
      noFeedback_text.setAutoDraw(true);
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
    for (const thisComponent of explainFeedback1Components)
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


function explainFeedback1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainFeedback1Components) {
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


// explainFeedback2 text
function explainFeedback2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainFeedback2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainFeedback2Components = [];
    explainFeedback2Components.push(space_to_continue);
    explainFeedback2Components.push(explainFeedback2_top_text);
    explainFeedback2Components.push(noFeedback_text);
    explainFeedback2Components.push(space_bar);

    for (const thisComponent of explainFeedback2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainFeedback2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainFeedback2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainFeedback2_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainFeedback2_top_text.tStart = t;  // (not accounting for frame time here)
      explainFeedback2_top_text.frameNStart = frameN;  // exact frame index
      explainFeedback2_top_text.setAutoDraw(true);
    }
    
    if (t >= 0.0 && noFeedback_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      noFeedback_text.tStart = t;  // (not accounting for frame time here)
      noFeedback_text.frameNStart = frameN;  // exact frame index
      noFeedback_text.setAutoDraw(true);
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
    for (const thisComponent of explainFeedback2Components)
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


function explainFeedback2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainFeedback2Components) {
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


function secondTrainingLoopBegin(secondTrainingLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    counterNum = trainSteps12;
    cont = true;
    currentHour = 0;
    score = 0;
    stocklist = getStocksForNHours(state*DRIFT, SIG, 14);
    hazard = 0.2429;
    // eps_dot.setPos([-0.2,0.25]);
    // [0.05, 0.1143, 0.1786, 0.2429, 0.3071, 0.3714, 0.4357, 0.5]

    // set up handler to look after randomisation of conditions etc
    train = new TrialHandler({
      psychoJS: psychoJS,
      nReps: trainSteps12, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'train'
    });
    psychoJS.experiment.addLoop(train); // add the loop to the experiment
    currentLoop = train;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrain of train) {
      snapshot = train.getSnapshot();
      secondTrainingLoopScheduler.add(importConditions(snapshot));
      secondTrainingLoopScheduler.add(secondPracticeRoutineBegin(snapshot));
      secondTrainingLoopScheduler.add(secondPracticeRoutineEachFrame());
      secondTrainingLoopScheduler.add(secondPracticeRoutineEnd(snapshot));
      secondTrainingLoopScheduler.add(secondTrainingLoopEndIteration(secondTrainingLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function secondTrainingLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(train);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function secondTrainingLoopEndIteration(scheduler, snapshot) {
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


// secondPractice start
function secondPracticeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'secondPractice' ---
    t = 0;
    secondPracticeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from getNormalRV

    resp.keys = undefined;
    resp.rt = undefined;
    _resp_allKeys = [];
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    thresh_text.setText(thresh_str);
    running_score.setText(score.toString())
    // keep track of which components have finished
    secondPracticeComponents = [];
    secondPracticeComponents.push(stockline1);
    secondPracticeComponents.push(stockline2);
    secondPracticeComponents.push(stockline3);
    secondPracticeComponents.push(stockline4);
    secondPracticeComponents.push(stockline5);
    secondPracticeComponents.push(stockline6);
    secondPracticeComponents.push(stockline7);
    secondPracticeComponents.push(stockline8);
    secondPracticeComponents.push(stockline9);
    secondPracticeComponents.push(stockline10);
    secondPracticeComponents.push(stockline11);
    secondPracticeComponents.push(stockline12);
    secondPracticeComponents.push(stockline13);
    secondPracticeComponents.push(resp);
    secondPracticeComponents.push(reward_pres);
    secondPracticeComponents.push(plotLim);
    secondPracticeComponents.push(zeroLine);
    // secondPracticeComponents.push(counter);
    // secondPracticeComponents.push(running_score);
    // secondPracticeComponents.push(counter_img);
    // secondPracticeComponents.push(running_score_img);
    // secondPracticeComponents.push(thresh);
    // secondPracticeComponents.push(thresh_text);
    // secondPracticeComponents.push(counter_bar);
    // secondPracticeComponents.push(score_bar);
    // secondPracticeComponents.push(conditions);
    // secondPracticeComponents.push(low);
    // secondPracticeComponents.push(high);
    // secondPracticeComponents.push(eps_level);
    // secondPracticeComponents.push(eps_dot);

    for (const thisComponent of secondPracticeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function secondPracticeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'secondPractice' ---
    // get current time
    t = secondPracticeClock.getTime();
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
    
    
    // if (((cont == true)) && counter.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   counter.tStart = t;  // (not accounting for frame time here)
    //   counter.frameNStart = frameN;  // exact frame index
    //   counter.setAutoDraw(true);
    // }
   
    
    // if (((cont == true)) && running_score.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   running_score.tStart = t;  // (not accounting for frame time here)
    //   running_score.frameNStart = frameN;  // exact frame index
    //   running_score.setAutoDraw(true);
    // }
    
    // if (((cont == true)) && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   counter_bar.tStart = t;  // (not accounting for frame time here)
    //   counter_bar.frameNStart = frameN;  // exact frame index
    //   counter_bar.setAutoDraw(true);
    // }
    
    //  if (((cont == true)) && score_bar.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   score_bar.tStart = t;  // (not accounting for frame time here)
    //   score_bar.frameNStart = frameN;  // exact frame index
    //   score_bar.setAutoDraw(true);
    // }
    
    //  if (((cont == true)) && counter_img.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   counter_img.tStart = t;  // (not accounting for frame time here)
    //   counter_img.frameNStart = frameN;  // exact frame index
    //   counter_img.setAutoDraw(true);
    // }
    
    //  if (((cont == true)) && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   running_score_img.tStart = t;  // (not accounting for frame time here)
    //   running_score_img.frameNStart = frameN;  // exact frame index
    //   running_score_img.setAutoDraw(true);
    // }
    
    //  if (((cont == true)) && thresh.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   thresh.tStart = t;  // (not accounting for frame time here)
    //   thresh.frameNStart = frameN;  // exact frame index
    //   thresh.setAutoDraw(true);
    // }
    
    
    // if (((cont == true)) && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   thresh_text.tStart = t;  // (not accounting for frame time here)
    //   thresh_text.frameNStart = frameN;  // exact frame index
    //   thresh_text.setAutoDraw(true);
    // }

    
    // if (((cont == true)) && conditions.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   conditions.tStart = t;  // (not accounting for frame time here)
    //   conditions.frameNStart = frameN;  // exact frame index
    //   conditions.setAutoDraw(true);
    // }
    
    // if (((cont == true)) && eps_level.status === PsychoJS.Status.NOT_STARTED && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   eps_level.tStart = t;  // (not accounting for frame time here)
    //   eps_level.frameNStart = frameN;  // exact frame index
    //   eps_level.setAutoDraw(true);
    //   eps_dot.tStart = t;  // (not accounting for frame time here)
    //   eps_dot.frameNStart = frameN;  // exact frame index
    //   eps_dot.setAutoDraw(true);
    // }
    
    // if (((cont == true)) && high.status === PsychoJS.Status.NOT_STARTED && low.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   high.tStart = t;  // (not accounting for frame time here)
    //   high.frameNStart = frameN;  // exact frame index
    //   high.setAutoDraw(true);
    //   low.tStart = t;  // (not accounting for frame time here)
    //   low.frameNStart = frameN;  // exact frame index
    //   low.setAutoDraw(true);
    // }
    
    
    // *stockline1* updates
    if (((cont == true)) && currentHour >= 0 && stockline1.status === PsychoJS.Status.NOT_STARTED) {
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      
      // counter.setAutoDraw(true);
      // running_score.setAutoDraw(true);
      // counter_bar.setAutoDraw(true);
      // score_bar.setAutoDraw(true);
      // counter_img.setAutoDraw(true);
      // running_score_img.setAutoDraw(true);
      // thresh.setAutoDraw(true);
      // thresh_text.setAutoDraw(true);
      // conditions.setAutoDraw(true);
      // eps_level.setAutoDraw(true);
      // eps_dot.setAutoDraw(true);
      // high.setAutoDraw(true);
      // low.setAutoDraw(true);

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
    
    // if ((currentHour == 0) && blockDisplay.status == PsychoJS.Status.NOT_STARTED) {
    //   plotLim.setAutoDraw(false);
    //   zeroLine.setAutoDraw(false);
    //   counter_bar.setAutoDraw(false);
    //   score_bar.setAutoDraw(false);
    //   counter.setAutoDraw(false);
    //   running_score.setAutoDraw(false);
    //   counter_img.setAutoDraw(false);
    //   running_score_img.setAutoDraw(false);
    //   thresh.setAutoDraw(false);
    //   thresh_text.setAutoDraw(false);
    //   conditions.setAutoDraw(false);
    //   eps_level.setAutoDraw(false);
    //   eps_dot.setAutoDraw(false);
    //   high.setAutoDraw(false);
    //   low.setAutoDraw(false);
    //   stockline1.setAutoDraw(false);
    //   blockDisplay.tStart = t;  // (not accounting for frame time here)
    //   blockDisplay.frameNStart = frameN;  // exact frame index
    //   blockDisplay.setAutoDraw(true);
    // }
    
    // if (blockDisplay.status === PsychoJS.Status.STARTED && t >= (blockDisplay.tStart + 3)) {
    //   blockDisplay.setAutoDraw(false);
    //   plotLim.setAutoDraw(true);
    //   zeroLine.setAutoDraw(true);
    //   counter_bar.setAutoDraw(true);
    //   score_bar.setAutoDraw(true);
    //   counter.setAutoDraw(true);
    //   running_score.setAutoDraw(true);
    //   counter_img.setAutoDraw(true);
    //   running_score_img.setAutoDraw(true);
    //   thresh.setAutoDraw(true);
    //   thresh_text.setAutoDraw(true);
    //   conditions.setAutoDraw(true);
    //   eps_level.setAutoDraw(true);
    //   eps_dot.setAutoDraw(true);
    //   high.setAutoDraw(true);
    //   low.setAutoDraw(true);
    //   stockline1.tStart = t;  // (not accounting for frame time here)
    //   stockline1.frameNStart = frameN;  // exact frame index
    //   stockline1.setAutoDraw(true);
    // }

    
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
    if (((cont == false)) && (counterNum != 0) && reward_pres.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.setAutoDraw(false);
      zeroLine.setAutoDraw(false);

      // counter.setAutoDraw(false);
      // running_score.setAutoDraw(false);
      // counter_bar.setAutoDraw(false);
      // score_bar.setAutoDraw(false);
      // counter_img.setAutoDraw(false);
      // running_score_img.setAutoDraw(false);
      // thresh.setAutoDraw(false);
      // thresh_text.setAutoDraw(false);
      // conditions.setAutoDraw(false);
      // eps_level.setAutoDraw(false);
      // eps_dot.setAutoDraw(false);
      // high.setAutoDraw(false);
      // low.setAutoDraw(false);
    //   blockDisplay.setAutoDraw(false);
      reward_pres.tStart = t;  // (not accounting for frame time here)
      reward_pres.frameNStart = frameN;  // exact frame index
      
      reward_pres.setAutoDraw(true);
    }

    if (reward_pres.status === PsychoJS.Status.STARTED && t >= (reward_pres.tStart + 0.5)) {
      reward_pres.setAutoDraw(false);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);

      
      // counter.setAutoDraw(true);
      // running_score.setAutoDraw(true);
      // counter_bar.setAutoDraw(true);
      // score_bar.setAutoDraw(true);
      // counter_img.setAutoDraw(true);
      // running_score_img.setAutoDraw(true);
      // thresh.setAutoDraw(true);
      // thresh_text.setAutoDraw(true);
      // conditions.setAutoDraw(true);
      // eps_level.setAutoDraw(true);
      // eps_dot.setAutoDraw(true);
      // high.setAutoDraw(true);
      // low.setAutoDraw(true);
      
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
    } else if (((thisResp == "up") || (thisResp == "down")) && counterNum > 1) {
            
        cont = false;
        [correct, score, txt, color] = reward(feedbackRel, thisResp, actual_state, score);
        coin = flipCoin();
        if ((coin <= hazard)) {
            state = ((- 1) * state);
        }
        reward_shown = true;
        
        reward_pres = new visual.TextStim({
          win: psychoJS.window,
          name: 'reward_pres',
          text: txt,
          font: 'Open Sans',
          units: undefined, 
          pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
          languageStyle: 'LTR',
          color: new util.Color(color),  opacity: undefined,
          depth: -5.0 
        });


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
      

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of secondPracticeComponents)
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
function secondPracticeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'secondPractice' ---
    for (const thisComponent of secondPracticeComponents) {
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
    
    
    // the Routine "secondPractice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}




// explainSteps1Ex text
function explainSteps1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    counterNum = numSteps;
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2]);
    counter.setText(counterNum);
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainSteps1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainSteps1Components = [];
    explainSteps1Components.push(space_to_continue);
    explainSteps1Components.push(explainSteps1_top_text);
    explainSteps1Components.push(explainSteps_step_box);
    explainSteps1Components.push(plotLim);
    explainSteps1Components.push(zeroLine);
    explainSteps1Components.push(dummystock);
    explainSteps1Components.push(counter);
    explainSteps1Components.push(counter_img);
    explainSteps1Components.push(counter_bar);
    explainSteps1Components.push(space_bar);
    
    for (const thisComponent of explainSteps1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainSteps1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainSteps1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainSteps1_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainSteps1_top_text.tStart = t;  // (not accounting for frame time here)
      explainSteps1_top_text.frameNStart = frameN;  // exact frame index
      explainSteps1_top_text.setAutoDraw(true);
    }


    if (t >= 0.0 && explainSteps_step_box.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainSteps_step_box.tStart = t;  // (not accounting for frame time here)
      explainSteps_step_box.frameNStart = frameN;  // exact frame index
      explainSteps_step_box.setAutoDraw(true);
    }
        
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
    }

    if (t >= 0.0 && counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter.tStart = t;  // (not accounting for frame time here)
      counter.frameNStart = frameN;  // exact frame index
      counter.setAutoDraw(true);
    }

    if (t >= 0.0 && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
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
    for (const thisComponent of explainSteps1Components)
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


function explainSteps1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainSteps1Components) {
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


// explainSteps2Ex text
function explainSteps2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainSteps2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainSteps2Components = [];
    explainSteps2Components.push(space_to_continue);
    explainSteps2Components.push(explainSteps2_top_text);
    explainSteps2Components.push(explainSteps_step_box);
    explainSteps2Components.push(plotLim);
    explainSteps2Components.push(zeroLine);
    explainSteps2Components.push(dummystock);
    explainSteps2Components.push(counter);
    explainSteps2Components.push(counter_img);
    explainSteps2Components.push(counter_bar);
    explainSteps2Components.push(space_bar);
    
    for (const thisComponent of explainSteps2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainSteps2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainSteps2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainSteps2_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainSteps2_top_text.tStart = t;  // (not accounting for frame time here)
      explainSteps2_top_text.frameNStart = frameN;  // exact frame index
      explainSteps2_top_text.setAutoDraw(true);
    }


    if (t >= 0.0 && explainSteps_step_box.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainSteps_step_box.tStart = t;  // (not accounting for frame time here)
      explainSteps_step_box.frameNStart = frameN;  // exact frame index
      explainSteps_step_box.setAutoDraw(true);
    }
        
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
    }

    if (t >= 0.0 && counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter.tStart = t;  // (not accounting for frame time here)
      counter.frameNStart = frameN;  // exact frame index
      counter.setAutoDraw(true);
    }

    if (t >= 0.0 && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
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
    for (const thisComponent of explainSteps2Components)
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


function explainSteps2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainSteps2Components) {
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



function thirdTrainingLoopBegin(thirdTrainingLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    counterNum = trainSteps3on;
    cont = true;
    currentHour = 0;
    score = 0;
    stocklist = getStocksForNHours(state*DRIFT, SIG, 14);
    hazard = 0.2429;
    // eps_dot.setPos([-0.2,0.25]);
    // [0.05, 0.1143, 0.1786, 0.2429, 0.3071, 0.3714, 0.4357, 0.5]

    // set up handler to look after randomisation of conditions etc
    train = new TrialHandler({
      psychoJS: psychoJS,
      nReps: trainSteps3on, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'train'
    });
    psychoJS.experiment.addLoop(train); // add the loop to the experiment
    currentLoop = train;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrain of train) {
      snapshot = train.getSnapshot();
      thirdTrainingLoopScheduler.add(importConditions(snapshot));
      thirdTrainingLoopScheduler.add(thirdPracticeRoutineBegin(snapshot));
      thirdTrainingLoopScheduler.add(thirdPracticeRoutineEachFrame());
      thirdTrainingLoopScheduler.add(thirdPracticeRoutineEnd(snapshot));
      thirdTrainingLoopScheduler.add(thirdTrainingLoopEndIteration(thirdTrainingLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function thirdTrainingLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(train);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function thirdTrainingLoopEndIteration(scheduler, snapshot) {
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


// thirdPractice start
function thirdPracticeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'thirdPractice' ---
    t = 0;
    thirdPracticeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from getNormalRV

    resp.keys = undefined;
    resp.rt = undefined;
    _resp_allKeys = [];
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    thresh_text.setText(thresh_str);
    running_score.setText(score.toString())
    // keep track of which components have finished
    thirdPracticeComponents = [];
    thirdPracticeComponents.push(stockline1);
    thirdPracticeComponents.push(stockline2);
    thirdPracticeComponents.push(stockline3);
    thirdPracticeComponents.push(stockline4);
    thirdPracticeComponents.push(stockline5);
    thirdPracticeComponents.push(stockline6);
    thirdPracticeComponents.push(stockline7);
    thirdPracticeComponents.push(stockline8);
    thirdPracticeComponents.push(stockline9);
    thirdPracticeComponents.push(stockline10);
    thirdPracticeComponents.push(stockline11);
    thirdPracticeComponents.push(stockline12);
    thirdPracticeComponents.push(stockline13);
    thirdPracticeComponents.push(resp);
    thirdPracticeComponents.push(reward_pres);
    thirdPracticeComponents.push(plotLim);
    thirdPracticeComponents.push(zeroLine);
    thirdPracticeComponents.push(counter);
    thirdPracticeComponents.push(counter_img);
    thirdPracticeComponents.push(counter_bar);
    // thirdPracticeComponents.push(running_score);
    // thirdPracticeComponents.push(running_score_img);
    // thirdPracticeComponents.push(thresh);
    // thirdPracticeComponents.push(thresh_text);
    // thirdPracticeComponents.push(score_bar);
    // thirdPracticeComponents.push(conditions);
    // thirdPracticeComponents.push(low);
    // thirdPracticeComponents.push(high);
    // thirdPracticeComponents.push(eps_level);
    // thirdPracticeComponents.push(eps_dot);

    for (const thisComponent of thirdPracticeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function thirdPracticeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'thirdPractice' ---
    // get current time
    t = thirdPracticeClock.getTime();
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
   
     if (((cont == true)) && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }


    if (((cont == true)) && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
    }

    
    // if (((cont == true)) && running_score.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   running_score.tStart = t;  // (not accounting for frame time here)
    //   running_score.frameNStart = frameN;  // exact frame index
    //   running_score.setAutoDraw(true);
    // }
    
    
    
    //  if (((cont == true)) && score_bar.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   score_bar.tStart = t;  // (not accounting for frame time here)
    //   score_bar.frameNStart = frameN;  // exact frame index
    //   score_bar.setAutoDraw(true);
    // }
    
    
    
    //  if (((cont == true)) && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   running_score_img.tStart = t;  // (not accounting for frame time here)
    //   running_score_img.frameNStart = frameN;  // exact frame index
    //   running_score_img.setAutoDraw(true);
    // }
    
    //  if (((cont == true)) && thresh.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   thresh.tStart = t;  // (not accounting for frame time here)
    //   thresh.frameNStart = frameN;  // exact frame index
    //   thresh.setAutoDraw(true);
    // }
    
    
    // if (((cont == true)) && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   thresh_text.tStart = t;  // (not accounting for frame time here)
    //   thresh_text.frameNStart = frameN;  // exact frame index
    //   thresh_text.setAutoDraw(true);
    // }

    
    // if (((cont == true)) && conditions.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   conditions.tStart = t;  // (not accounting for frame time here)
    //   conditions.frameNStart = frameN;  // exact frame index
    //   conditions.setAutoDraw(true);
    // }
    
    // if (((cont == true)) && eps_level.status === PsychoJS.Status.NOT_STARTED && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   eps_level.tStart = t;  // (not accounting for frame time here)
    //   eps_level.frameNStart = frameN;  // exact frame index
    //   eps_level.setAutoDraw(true);
    //   eps_dot.tStart = t;  // (not accounting for frame time here)
    //   eps_dot.frameNStart = frameN;  // exact frame index
    //   eps_dot.setAutoDraw(true);
    // }
    
    // if (((cont == true)) && high.status === PsychoJS.Status.NOT_STARTED && low.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   high.tStart = t;  // (not accounting for frame time here)
    //   high.frameNStart = frameN;  // exact frame index
    //   high.setAutoDraw(true);
    //   low.tStart = t;  // (not accounting for frame time here)
    //   low.frameNStart = frameN;  // exact frame index
    //   low.setAutoDraw(true);
    // }
    
    
    // *stockline1* updates
    if (((cont == true)) && currentHour >= 0 && stockline1.status === PsychoJS.Status.NOT_STARTED) {
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      
      counter.setAutoDraw(true);
      counter_bar.setAutoDraw(true);
      counter_img.setAutoDraw(true);
      // running_score.setAutoDraw(true);
      // score_bar.setAutoDraw(true);
      // running_score_img.setAutoDraw(true);
      // thresh.setAutoDraw(true);
      // thresh_text.setAutoDraw(true);
      // conditions.setAutoDraw(true);
      // eps_level.setAutoDraw(true);
      // eps_dot.setAutoDraw(true);
      // high.setAutoDraw(true);
      // low.setAutoDraw(true);

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
    if (((cont == false)) && (counterNum != 0) && reward_pres.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.setAutoDraw(false);
      zeroLine.setAutoDraw(false);

      counter.setAutoDraw(false);
      counter_bar.setAutoDraw(false);
      counter_img.setAutoDraw(false);
      // running_score.setAutoDraw(false);
      // score_bar.setAutoDraw(false);
      // running_score_img.setAutoDraw(false);
      // thresh.setAutoDraw(false);
      // thresh_text.setAutoDraw(false);
      // conditions.setAutoDraw(false);
      // eps_level.setAutoDraw(false);
      // eps_dot.setAutoDraw(false);
      // high.setAutoDraw(false);
      // low.setAutoDraw(false);
    //   blockDisplay.setAutoDraw(false);
      reward_pres.tStart = t;  // (not accounting for frame time here)
      reward_pres.frameNStart = frameN;  // exact frame index
      
      reward_pres.setAutoDraw(true);
    }

    if (reward_pres.status === PsychoJS.Status.STARTED && t >= (reward_pres.tStart + 0.5)) {
      reward_pres.setAutoDraw(false);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);

      
      counter.setAutoDraw(true);
      counter_bar.setAutoDraw(true);
      counter_img.setAutoDraw(true);
      // running_score.setAutoDraw(true);
      // score_bar.setAutoDraw(true);
      // running_score_img.setAutoDraw(true);
      // thresh.setAutoDraw(true);
      // thresh_text.setAutoDraw(true);
      // conditions.setAutoDraw(true);
      // eps_level.setAutoDraw(true);
      // eps_dot.setAutoDraw(true);
      // high.setAutoDraw(true);
      // low.setAutoDraw(true);
      
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
    } else if (((thisResp == "up") || (thisResp == "down")) && counterNum > 1) {
            
        cont = false;
        [correct, score, txt, color] = reward(feedbackRel, thisResp, actual_state, score);
        coin = flipCoin();
        if ((coin <= hazard)) {
            state = ((- 1) * state);
        }
        reward_shown = true;
        
        reward_pres = new visual.TextStim({
          win: psychoJS.window,
          name: 'reward_pres',
          text: txt,
          font: 'Open Sans',
          units: undefined, 
          pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
          languageStyle: 'LTR',
          color: new util.Color(color),  opacity: undefined,
          depth: -5.0 
        });


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
      

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of thirdPracticeComponents)
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
function thirdPracticeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'thirdPractice' ---
    for (const thisComponent of thirdPracticeComponents) {
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
    
    
    // the Routine "thirdPractice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


// explainScore text
function explainScoreRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    counterNum = numSteps;
    score = 0;
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    // thresh_text.setText(thresh_str);
    running_score.setText(score.toString())
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainScoreClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainScoreComponents = [];
    explainScoreComponents.push(space_to_continue);
    explainScoreComponents.push(explainScore_top_text);
    explainScoreComponents.push(explainScore_score_box);
    explainScoreComponents.push(plotLim);
    explainScoreComponents.push(zeroLine);
    explainScoreComponents.push(dummystock);
    explainScoreComponents.push(counter);
    explainScoreComponents.push(running_score);
    explainScoreComponents.push(counter_img);
    explainScoreComponents.push(running_score_img);
    explainScoreComponents.push(counter_bar);
    explainScoreComponents.push(score_bar);
    explainScoreComponents.push(space_bar);
    // explainScoreComponents.push(thresh);
    // explainScoreComponents.push(thresh_text);
    // explainScoreComponents.push(conditions);
    // explainScoreComponents.push(low);
    // explainScoreComponents.push(high);
    // explainScoreComponents.push(eps_level);
    // explainScoreComponents.push(eps_dot);
    
    for (const thisComponent of explainScoreComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainScoreRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainScoreClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainScore_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainScore_top_text.tStart = t;  // (not accounting for frame time here)
      explainScore_top_text.frameNStart = frameN;  // exact frame index
      explainScore_top_text.setAutoDraw(true);
    }

    if (t >= 0.0 && explainScore_score_box.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainScore_score_box.tStart = t;  // (not accounting for frame time here)
      explainScore_score_box.frameNStart = frameN;  // exact frame index
      explainScore_score_box.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter.tStart = t;  // (not accounting for frame time here)
      counter.frameNStart = frameN;  // exact frame index
      counter.setAutoDraw(true);
    }
    
    if (t >= 0.0 && running_score.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score.tStart = t;  // (not accounting for frame time here)
      running_score.frameNStart = frameN;  // exact frame index
      running_score.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score_img.tStart = t;  // (not accounting for frame time here)
      running_score_img.frameNStart = frameN;  // exact frame index
      running_score_img.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
    }
    
    if (t >= 0.0 && score_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_bar.tStart = t;  // (not accounting for frame time here)
      score_bar.frameNStart = frameN;  // exact frame index
      score_bar.setAutoDraw(true);
    }
    
    // if (t >= 0.0 && thresh.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   thresh.tStart = t;  // (not accounting for frame time here)
    //   thresh.frameNStart = frameN;  // exact frame index
    //   thresh.setAutoDraw(true);
    // }
    
    // if (t >= 0.0 && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   thresh_text.tStart = t;  // (not accounting for frame time here)
    //   thresh_text.frameNStart = frameN;  // exact frame index
    //   thresh_text.setAutoDraw(true);
    // }
    
    
    // if (t >= 0.0 && conditions.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   conditions.tStart = t;  // (not accounting for frame time here)
    //   conditions.frameNStart = frameN;  // exact frame index
    //   conditions.setAutoDraw(true);
    // }
    
    // if (t >= 0.0 && low.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   low.tStart = t;  // (not accounting for frame time here)
    //   low.frameNStart = frameN;  // exact frame index
    //   low.setAutoDraw(true);
    // }
    
    // if (t >= 0.0 && high.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   high.tStart = t;  // (not accounting for frame time here)
    //   high.frameNStart = frameN;  // exact frame index
    //   high.setAutoDraw(true);
    // }
    
    // if (t >= 0.0 && eps_level.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   eps_level.tStart = t;  // (not accounting for frame time here)
    //   eps_level.frameNStart = frameN;  // exact frame index
    //   eps_level.setAutoDraw(true);
    // }
    
    // if (t >= 0.0 && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   eps_dot.tStart = t;  // (not accounting for frame time here)
    //   eps_dot.frameNStart = frameN;  // exact frame index
    //   eps_dot.setAutoDraw(true);
    // }

    
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
    for (const thisComponent of explainScoreComponents)
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


function explainScoreRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainScoreComponents) {
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




// explainBenchmark text
function explainBenchmarkRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    thresh_text.setText(thresh_str);
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainBenchmarkClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainBenchmarkComponents = [];
    explainBenchmarkComponents.push(space_to_continue);
    explainBenchmarkComponents.push(explainBenchmark_top_text);
    explainBenchmarkComponents.push(explainBenchmark_benchmark_box);
    explainBenchmarkComponents.push(plotLim);
    explainBenchmarkComponents.push(zeroLine);
    explainBenchmarkComponents.push(dummystock);
    explainBenchmarkComponents.push(counter);
    explainBenchmarkComponents.push(running_score);
    explainBenchmarkComponents.push(counter_img);
    explainBenchmarkComponents.push(running_score_img);
    explainBenchmarkComponents.push(counter_bar);
    explainBenchmarkComponents.push(score_bar);
    explainBenchmarkComponents.push(thresh);
    explainBenchmarkComponents.push(thresh_text);
    explainBenchmarkComponents.push(space_bar);
    // explainBenchmarkComponents.push(conditions);
    // explainBenchmarkComponents.push(low);
    // explainBenchmarkComponents.push(high);
    // explainBenchmarkComponents.push(eps_level);
    // explainBenchmarkComponents.push(eps_dot);
    
    for (const thisComponent of explainBenchmarkComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainBenchmarkRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainBenchmarkClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainBenchmark_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainBenchmark_top_text.tStart = t;  // (not accounting for frame time here)
      explainBenchmark_top_text.frameNStart = frameN;  // exact frame index
      explainBenchmark_top_text.setAutoDraw(true);
    }


    if (t >= 0.0 && explainBenchmark_benchmark_box.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainBenchmark_benchmark_box.tStart = t;  // (not accounting for frame time here)
      explainBenchmark_benchmark_box.frameNStart = frameN;  // exact frame index
      explainBenchmark_benchmark_box.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter.tStart = t;  // (not accounting for frame time here)
      counter.frameNStart = frameN;  // exact frame index
      counter.setAutoDraw(true);
    }
    
    if (t >= 0.0 && running_score.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score.tStart = t;  // (not accounting for frame time here)
      running_score.frameNStart = frameN;  // exact frame index
      running_score.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score_img.tStart = t;  // (not accounting for frame time here)
      running_score_img.frameNStart = frameN;  // exact frame index
      running_score_img.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
    }
    
    if (t >= 0.0 && score_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_bar.tStart = t;  // (not accounting for frame time here)
      score_bar.frameNStart = frameN;  // exact frame index
      score_bar.setAutoDraw(true);
    }
    
    if (t >= 0.0 && thresh.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh.tStart = t;  // (not accounting for frame time here)
      thresh.frameNStart = frameN;  // exact frame index
      thresh.setAutoDraw(true);
    }
    
    if (t >= 0.0 && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh_text.tStart = t;  // (not accounting for frame time here)
      thresh_text.frameNStart = frameN;  // exact frame index
      thresh_text.setAutoDraw(true);
    }
    
    
    // if (t >= 0.0 && conditions.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   conditions.tStart = t;  // (not accounting for frame time here)
    //   conditions.frameNStart = frameN;  // exact frame index
    //   conditions.setAutoDraw(true);
    // }
    
    // if (t >= 0.0 && low.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   low.tStart = t;  // (not accounting for frame time here)
    //   low.frameNStart = frameN;  // exact frame index
    //   low.setAutoDraw(true);
    // }
    
    // if (t >= 0.0 && high.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   high.tStart = t;  // (not accounting for frame time here)
    //   high.frameNStart = frameN;  // exact frame index
    //   high.setAutoDraw(true);
    // }
    
    // if (t >= 0.0 && eps_level.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   eps_level.tStart = t;  // (not accounting for frame time here)
    //   eps_level.frameNStart = frameN;  // exact frame index
    //   eps_level.setAutoDraw(true);
    // }
    
    // if (t >= 0.0 && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   eps_dot.tStart = t;  // (not accounting for frame time here)
    //   eps_dot.frameNStart = frameN;  // exact frame index
    //   eps_dot.setAutoDraw(true);
    // }

    
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
    for (const thisComponent of explainBenchmarkComponents)
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


function explainBenchmarkRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainBenchmarkComponents) {
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

function fourthTrainingLoopBegin(fourthTrainingLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    counterNum = trainSteps3on;
    cont = true;
    currentHour = 0;
    score = 0;
    stocklist = getStocksForNHours(state*DRIFT, SIG, 14);
    hazard = 0.2429;
    // eps_dot.setPos([-0.2,0.25]);
    // [0.05, 0.1143, 0.1786, 0.2429, 0.3071, 0.3714, 0.4357, 0.5]

    // set up handler to look after randomisation of conditions etc
    train = new TrialHandler({
      psychoJS: psychoJS,
      nReps: trainSteps3on, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'train'
    });
    psychoJS.experiment.addLoop(train); // add the loop to the experiment
    currentLoop = train;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrain of train) {
      snapshot = train.getSnapshot();
      fourthTrainingLoopScheduler.add(importConditions(snapshot));
      fourthTrainingLoopScheduler.add(fourthPracticeRoutineBegin(snapshot));
      fourthTrainingLoopScheduler.add(fourthPracticeRoutineEachFrame());
      fourthTrainingLoopScheduler.add(fourthPracticeRoutineEnd(snapshot));
      fourthTrainingLoopScheduler.add(fourthTrainingLoopEndIteration(fourthTrainingLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function fourthTrainingLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(train);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function fourthTrainingLoopEndIteration(scheduler, snapshot) {
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


// fourthPractice start
function fourthPracticeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'fourthPractice' ---
    t = 0;
    fourthPracticeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from getNormalRV

    resp.keys = undefined;
    resp.rt = undefined;
    _resp_allKeys = [];
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    thresh_text.setText(thresh_str);
    running_score.setText(score.toString())
    // keep track of which components have finished
    fourthPracticeComponents = [];
    fourthPracticeComponents.push(stockline1);
    fourthPracticeComponents.push(stockline2);
    fourthPracticeComponents.push(stockline3);
    fourthPracticeComponents.push(stockline4);
    fourthPracticeComponents.push(stockline5);
    fourthPracticeComponents.push(stockline6);
    fourthPracticeComponents.push(stockline7);
    fourthPracticeComponents.push(stockline8);
    fourthPracticeComponents.push(stockline9);
    fourthPracticeComponents.push(stockline10);
    fourthPracticeComponents.push(stockline11);
    fourthPracticeComponents.push(stockline12);
    fourthPracticeComponents.push(stockline13);
    fourthPracticeComponents.push(resp);
    fourthPracticeComponents.push(reward_pres);
    fourthPracticeComponents.push(plotLim);
    fourthPracticeComponents.push(zeroLine);
    fourthPracticeComponents.push(counter);
    fourthPracticeComponents.push(counter_img);
    fourthPracticeComponents.push(counter_bar);
    fourthPracticeComponents.push(running_score);
    fourthPracticeComponents.push(running_score_img);
    fourthPracticeComponents.push(score_bar);
    fourthPracticeComponents.push(thresh);
    fourthPracticeComponents.push(thresh_text);
    // fourthPracticeComponents.push(conditions);
    // fourthPracticeComponents.push(low);
    // fourthPracticeComponents.push(high);
    // fourthPracticeComponents.push(eps_level);
    // fourthPracticeComponents.push(eps_dot);

    for (const thisComponent of fourthPracticeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function fourthPracticeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'fourthPractice' ---
    // get current time
    t = fourthPracticeClock.getTime();
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
   
     if (((cont == true)) && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }


    if (((cont == true)) && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
    }

    
    if (((cont == true)) && running_score.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score.tStart = t;  // (not accounting for frame time here)
      running_score.frameNStart = frameN;  // exact frame index
      running_score.setAutoDraw(true);
    }
    
    
    
     if (((cont == true)) && score_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_bar.tStart = t;  // (not accounting for frame time here)
      score_bar.frameNStart = frameN;  // exact frame index
      score_bar.setAutoDraw(true);
    }
    
    
    
     if (((cont == true)) && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score_img.tStart = t;  // (not accounting for frame time here)
      running_score_img.frameNStart = frameN;  // exact frame index
      running_score_img.setAutoDraw(true);
    }
    
     if (((cont == true)) && thresh.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh.tStart = t;  // (not accounting for frame time here)
      thresh.frameNStart = frameN;  // exact frame index
      thresh.setAutoDraw(true);
    }
    
    
    if (((cont == true)) && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh_text.tStart = t;  // (not accounting for frame time here)
      thresh_text.frameNStart = frameN;  // exact frame index
      thresh_text.setAutoDraw(true);
    }

    
    // if (((cont == true)) && conditions.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   conditions.tStart = t;  // (not accounting for frame time here)
    //   conditions.frameNStart = frameN;  // exact frame index
    //   conditions.setAutoDraw(true);
    // }
    
    // if (((cont == true)) && eps_level.status === PsychoJS.Status.NOT_STARTED && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   eps_level.tStart = t;  // (not accounting for frame time here)
    //   eps_level.frameNStart = frameN;  // exact frame index
    //   eps_level.setAutoDraw(true);
    //   eps_dot.tStart = t;  // (not accounting for frame time here)
    //   eps_dot.frameNStart = frameN;  // exact frame index
    //   eps_dot.setAutoDraw(true);
    // }
    
    // if (((cont == true)) && high.status === PsychoJS.Status.NOT_STARTED && low.status === PsychoJS.Status.NOT_STARTED) {
    //   // keep track of start time/frame for later
    //   high.tStart = t;  // (not accounting for frame time here)
    //   high.frameNStart = frameN;  // exact frame index
    //   high.setAutoDraw(true);
    //   low.tStart = t;  // (not accounting for frame time here)
    //   low.frameNStart = frameN;  // exact frame index
    //   low.setAutoDraw(true);
    // }
    
    
    // *stockline1* updates
    if (((cont == true)) && currentHour >= 0 && stockline1.status === PsychoJS.Status.NOT_STARTED) {
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      
      counter.setAutoDraw(true);
      running_score.setAutoDraw(true);
      counter_bar.setAutoDraw(true);
      score_bar.setAutoDraw(true);
      counter_img.setAutoDraw(true);
      running_score_img.setAutoDraw(true);
      thresh.setAutoDraw(true);
      thresh_text.setAutoDraw(true);
      // conditions.setAutoDraw(true);
      // eps_level.setAutoDraw(true);
      // eps_dot.setAutoDraw(true);
      // high.setAutoDraw(true);
      // low.setAutoDraw(true);

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
    if (((cont == false)) && (counterNum != 0) && reward_pres.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.setAutoDraw(false);
      zeroLine.setAutoDraw(false);

      counter.setAutoDraw(false);
      counter_bar.setAutoDraw(false);
      counter_img.setAutoDraw(false);
      running_score.setAutoDraw(false);
      score_bar.setAutoDraw(false);
      running_score_img.setAutoDraw(false);
      thresh.setAutoDraw(false);
      thresh_text.setAutoDraw(false);
      // conditions.setAutoDraw(false);
      // eps_level.setAutoDraw(false);
      // eps_dot.setAutoDraw(false);
      // high.setAutoDraw(false);
      // low.setAutoDraw(false);
    //   blockDisplay.setAutoDraw(false);
      reward_pres.tStart = t;  // (not accounting for frame time here)
      reward_pres.frameNStart = frameN;  // exact frame index
      
      reward_pres.setAutoDraw(true);
    }

    if (reward_pres.status === PsychoJS.Status.STARTED && t >= (reward_pres.tStart + 0.5)) {
      reward_pres.setAutoDraw(false);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);

      
      counter.setAutoDraw(true);
      counter_bar.setAutoDraw(true);
      counter_img.setAutoDraw(true);
      running_score.setAutoDraw(true);
      score_bar.setAutoDraw(true);
      running_score_img.setAutoDraw(true);
      thresh.setAutoDraw(true);
      thresh_text.setAutoDraw(true);
      // conditions.setAutoDraw(true);
      // eps_level.setAutoDraw(true);
      // eps_dot.setAutoDraw(true);
      // high.setAutoDraw(true);
      // low.setAutoDraw(true);
      
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
    } else if (((thisResp == "up") || (thisResp == "down")) && counterNum > 1) {
            
        cont = false;
        [correct, score, txt, color] = reward(feedbackRel, thisResp, actual_state, score);
        coin = flipCoin();
        if ((coin <= hazard)) {
            state = ((- 1) * state);
        }
        reward_shown = true;
        
        reward_pres = new visual.TextStim({
          win: psychoJS.window,
          name: 'reward_pres',
          text: txt,
          font: 'Open Sans',
          units: undefined, 
          pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
          languageStyle: 'LTR',
          color: new util.Color(color),  opacity: undefined,
          depth: -5.0 
        });


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
      

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of fourthPracticeComponents)
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
function fourthPracticeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'fourthPractice' ---
    for (const thisComponent of fourthPracticeComponents) {
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
    
    
    // the Routine "fourthPractice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

// explainStability text
function explainStabilityRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    counterNum = numSteps;
    score = 0;
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    thresh_text.setText(thresh_str);
    running_score.setText(score.toString())
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainStabilityClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainStabilityComponents = [];
    explainStabilityComponents.push(space_to_continue);
    explainStabilityComponents.push(explainStability_top_text);
    explainStabilityComponents.push(explainStability_center_box);
    explainStabilityComponents.push(plotLim);
    explainStabilityComponents.push(zeroLine);
    explainStabilityComponents.push(dummystock);
    explainStabilityComponents.push(counter);
    explainStabilityComponents.push(running_score);
    explainStabilityComponents.push(counter_img);
    explainStabilityComponents.push(running_score_img);
    explainStabilityComponents.push(thresh);
    explainStabilityComponents.push(thresh_text);
    explainStabilityComponents.push(counter_bar);
    explainStabilityComponents.push(score_bar);
    explainStabilityComponents.push(conditions);
    explainStabilityComponents.push(low);
    explainStabilityComponents.push(high);
    explainStabilityComponents.push(eps_level);
    explainStabilityComponents.push(eps_dot);
    explainStabilityComponents.push(space_bar);
    
    for (const thisComponent of explainStabilityComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainStabilityRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainStabilityClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainStability_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainStability_top_text.tStart = t;  // (not accounting for frame time here)
      explainStability_top_text.frameNStart = frameN;  // exact frame index
      explainStability_top_text.setAutoDraw(true);
    }
    
    if (t >= 0.0 && explainStability_center_box.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainStability_center_box.tStart = t;  // (not accounting for frame time here)
      explainStability_center_box.frameNStart = frameN;  // exact frame index
      explainStability_center_box.setAutoDraw(true);
    }
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter.tStart = t;  // (not accounting for frame time here)
      counter.frameNStart = frameN;  // exact frame index
      counter.setAutoDraw(true);
    }
    
    if (t >= 0.0 && running_score.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score.tStart = t;  // (not accounting for frame time here)
      running_score.frameNStart = frameN;  // exact frame index
      running_score.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score_img.tStart = t;  // (not accounting for frame time here)
      running_score_img.frameNStart = frameN;  // exact frame index
      running_score_img.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
    }
    
    if (t >= 0.0 && score_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_bar.tStart = t;  // (not accounting for frame time here)
      score_bar.frameNStart = frameN;  // exact frame index
      score_bar.setAutoDraw(true);
    }
    
    if (t >= 0.0 && thresh.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh.tStart = t;  // (not accounting for frame time here)
      thresh.frameNStart = frameN;  // exact frame index
      thresh.setAutoDraw(true);
    }
    
    if (t >= 0.0 && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh_text.tStart = t;  // (not accounting for frame time here)
      thresh_text.frameNStart = frameN;  // exact frame index
      thresh_text.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && conditions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      conditions.tStart = t;  // (not accounting for frame time here)
      conditions.frameNStart = frameN;  // exact frame index
      conditions.setAutoDraw(true);
    }
    
    if (t >= 0.0 && low.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      low.tStart = t;  // (not accounting for frame time here)
      low.frameNStart = frameN;  // exact frame index
      low.setAutoDraw(true);
    }
    
    if (t >= 0.0 && high.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      high.tStart = t;  // (not accounting for frame time here)
      high.frameNStart = frameN;  // exact frame index
      high.setAutoDraw(true);
    }
    
    if (t >= 0.0 && eps_level.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      eps_level.tStart = t;  // (not accounting for frame time here)
      eps_level.frameNStart = frameN;  // exact frame index
      eps_level.setAutoDraw(true);
    }
    
    if (t >= 0.0 && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      eps_dot.tStart = t;  // (not accounting for frame time here)
      eps_dot.frameNStart = frameN;  // exact frame index
      eps_dot.setAutoDraw(true);
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
    for (const thisComponent of explainStabilityComponents)
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


function explainStabilityRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainStabilityComponents) {
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


// explainHighStability text
function explainHighStabilityRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    counterNum = numSteps;
    score = 0;
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    thresh_text.setText(thresh_str);
    running_score.setText(score.toString());
    hazard = 0.05;
    // const color_increment = [-1, -0.71428571, -0.42857143, -0.14285714,  0.14285714, 0.42857143,  0.71428571, 1];
    eps_dot.setPos([-0.14,0.25]);
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainHighStabilityClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainHighStabilityComponents = [];
    explainHighStabilityComponents.push(space_to_continue);
    explainHighStabilityComponents.push(explainHighStability_top_text);
    explainHighStabilityComponents.push(explainHighStability_center_box);
    explainHighStabilityComponents.push(plotLim);
    explainHighStabilityComponents.push(zeroLine);
    explainHighStabilityComponents.push(dummystock);
    explainHighStabilityComponents.push(counter);
    explainHighStabilityComponents.push(running_score);
    explainHighStabilityComponents.push(counter_img);
    explainHighStabilityComponents.push(running_score_img);
    explainHighStabilityComponents.push(thresh);
    explainHighStabilityComponents.push(thresh_text);
    explainHighStabilityComponents.push(counter_bar);
    explainHighStabilityComponents.push(score_bar);
    explainHighStabilityComponents.push(conditions);
    explainHighStabilityComponents.push(low);
    explainHighStabilityComponents.push(high);
    explainHighStabilityComponents.push(eps_level);
    explainHighStabilityComponents.push(eps_dot);
    explainHighStabilityComponents.push(space_bar);
    
    for (const thisComponent of explainHighStabilityComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainHighStabilityRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainHighStabilityClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainHighStability_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainHighStability_top_text.tStart = t;  // (not accounting for frame time here)
      explainHighStability_top_text.frameNStart = frameN;  // exact frame index
      explainHighStability_top_text.setAutoDraw(true);
    }
    
    if (t >= 0.0 && explainHighStability_center_box.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainHighStability_center_box.tStart = t;  // (not accounting for frame time here)
      explainHighStability_center_box.frameNStart = frameN;  // exact frame index
      explainHighStability_center_box.setAutoDraw(true);
    }
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter.tStart = t;  // (not accounting for frame time here)
      counter.frameNStart = frameN;  // exact frame index
      counter.setAutoDraw(true);
    }
    
    if (t >= 0.0 && running_score.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score.tStart = t;  // (not accounting for frame time here)
      running_score.frameNStart = frameN;  // exact frame index
      running_score.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score_img.tStart = t;  // (not accounting for frame time here)
      running_score_img.frameNStart = frameN;  // exact frame index
      running_score_img.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
    }
    
    if (t >= 0.0 && score_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_bar.tStart = t;  // (not accounting for frame time here)
      score_bar.frameNStart = frameN;  // exact frame index
      score_bar.setAutoDraw(true);
    }
    
    if (t >= 0.0 && thresh.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh.tStart = t;  // (not accounting for frame time here)
      thresh.frameNStart = frameN;  // exact frame index
      thresh.setAutoDraw(true);
    }
    
    if (t >= 0.0 && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh_text.tStart = t;  // (not accounting for frame time here)
      thresh_text.frameNStart = frameN;  // exact frame index
      thresh_text.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && conditions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      conditions.tStart = t;  // (not accounting for frame time here)
      conditions.frameNStart = frameN;  // exact frame index
      conditions.setAutoDraw(true);
    }
    
    if (t >= 0.0 && low.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      low.tStart = t;  // (not accounting for frame time here)
      low.frameNStart = frameN;  // exact frame index
      low.setAutoDraw(true);
    }
    
    if (t >= 0.0 && high.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      high.tStart = t;  // (not accounting for frame time here)
      high.frameNStart = frameN;  // exact frame index
      high.setAutoDraw(true);
    }
    
    if (t >= 0.0 && eps_level.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      eps_level.tStart = t;  // (not accounting for frame time here)
      eps_level.frameNStart = frameN;  // exact frame index
      eps_level.setAutoDraw(true);
    }
    
    if (t >= 0.0 && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      eps_dot.tStart = t;  // (not accounting for frame time here)
      eps_dot.frameNStart = frameN;  // exact frame index
      eps_dot.setAutoDraw(true);
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
    for (const thisComponent of explainHighStabilityComponents)
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


function explainHighStabilityRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainHighStabilityComponents) {
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


function fifthTrainingLoopBegin(fifthTrainingLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    counterNum = trainSteps3on;
    cont = true;
    currentHour = 0;
    score = 0;
    stocklist = getStocksForNHours(state*DRIFT, SIG, 14);
    // eps_dot.setPos([-0.2,0.25]);
    // [0.05, 0.1143, 0.1786, 0.2429, 0.3071, 0.3714, 0.4357, 0.5]

    // set up handler to look after randomisation of conditions etc
    train = new TrialHandler({
      psychoJS: psychoJS,
      nReps: trainSteps3on, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'train'
    });
    psychoJS.experiment.addLoop(train); // add the loop to the experiment
    currentLoop = train;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrain of train) {
      snapshot = train.getSnapshot();
      fifthTrainingLoopScheduler.add(importConditions(snapshot));
      fifthTrainingLoopScheduler.add(fifthPracticeRoutineBegin(snapshot));
      fifthTrainingLoopScheduler.add(fifthPracticeRoutineEachFrame());
      fifthTrainingLoopScheduler.add(fifthPracticeRoutineEnd(snapshot));
      fifthTrainingLoopScheduler.add(fifthTrainingLoopEndIteration(fifthTrainingLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function fifthTrainingLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(train);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function fifthTrainingLoopEndIteration(scheduler, snapshot) {
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


// fifthPractice start
function fifthPracticeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'fifthPractice' ---
    t = 0;
    fifthPracticeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from getNormalRV

    resp.keys = undefined;
    resp.rt = undefined;
    _resp_allKeys = [];
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    thresh_text.setText(thresh_str);
    running_score.setText(score.toString())
    // keep track of which components have finished
    fifthPracticeComponents = [];
    fifthPracticeComponents.push(stockline1);
    fifthPracticeComponents.push(stockline2);
    fifthPracticeComponents.push(stockline3);
    fifthPracticeComponents.push(stockline4);
    fifthPracticeComponents.push(stockline5);
    fifthPracticeComponents.push(stockline6);
    fifthPracticeComponents.push(stockline7);
    fifthPracticeComponents.push(stockline8);
    fifthPracticeComponents.push(stockline9);
    fifthPracticeComponents.push(stockline10);
    fifthPracticeComponents.push(stockline11);
    fifthPracticeComponents.push(stockline12);
    fifthPracticeComponents.push(stockline13);
    fifthPracticeComponents.push(resp);
    fifthPracticeComponents.push(reward_pres);
    fifthPracticeComponents.push(plotLim);
    fifthPracticeComponents.push(zeroLine);
    fifthPracticeComponents.push(counter);
    fifthPracticeComponents.push(counter_img);
    fifthPracticeComponents.push(counter_bar);
    fifthPracticeComponents.push(running_score);
    fifthPracticeComponents.push(running_score_img);
    fifthPracticeComponents.push(score_bar);
    fifthPracticeComponents.push(thresh);
    fifthPracticeComponents.push(thresh_text);
    fifthPracticeComponents.push(conditions);
    fifthPracticeComponents.push(low);
    fifthPracticeComponents.push(high);
    fifthPracticeComponents.push(eps_level);
    fifthPracticeComponents.push(eps_dot);

    for (const thisComponent of fifthPracticeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function fifthPracticeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'fifthPractice' ---
    // get current time
    t = fifthPracticeClock.getTime();
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
   
     if (((cont == true)) && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }


    if (((cont == true)) && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
    }

    
    if (((cont == true)) && running_score.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score.tStart = t;  // (not accounting for frame time here)
      running_score.frameNStart = frameN;  // exact frame index
      running_score.setAutoDraw(true);
    }
    
    
    
     if (((cont == true)) && score_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_bar.tStart = t;  // (not accounting for frame time here)
      score_bar.frameNStart = frameN;  // exact frame index
      score_bar.setAutoDraw(true);
    }
    
    
    
     if (((cont == true)) && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score_img.tStart = t;  // (not accounting for frame time here)
      running_score_img.frameNStart = frameN;  // exact frame index
      running_score_img.setAutoDraw(true);
    }
    
     if (((cont == true)) && thresh.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh.tStart = t;  // (not accounting for frame time here)
      thresh.frameNStart = frameN;  // exact frame index
      thresh.setAutoDraw(true);
    }
    
    
    if (((cont == true)) && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh_text.tStart = t;  // (not accounting for frame time here)
      thresh_text.frameNStart = frameN;  // exact frame index
      thresh_text.setAutoDraw(true);
    }

    
    if (((cont == true)) && conditions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      conditions.tStart = t;  // (not accounting for frame time here)
      conditions.frameNStart = frameN;  // exact frame index
      conditions.setAutoDraw(true);
    }
    
    if (((cont == true)) && eps_level.status === PsychoJS.Status.NOT_STARTED && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      eps_level.tStart = t;  // (not accounting for frame time here)
      eps_level.frameNStart = frameN;  // exact frame index
      eps_level.setAutoDraw(true);
      eps_dot.tStart = t;  // (not accounting for frame time here)
      eps_dot.frameNStart = frameN;  // exact frame index
      eps_dot.setAutoDraw(true);
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
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      
      counter.setAutoDraw(true);
      running_score.setAutoDraw(true);
      counter_bar.setAutoDraw(true);
      score_bar.setAutoDraw(true);
      counter_img.setAutoDraw(true);
      running_score_img.setAutoDraw(true);
      thresh.setAutoDraw(true);
      thresh_text.setAutoDraw(true);
      conditions.setAutoDraw(true);
      eps_level.setAutoDraw(true);
      eps_dot.setAutoDraw(true);
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
    if (((cont == false)) && (counterNum != 0) && reward_pres.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.setAutoDraw(false);
      zeroLine.setAutoDraw(false);

      counter.setAutoDraw(false);
      counter_bar.setAutoDraw(false);
      counter_img.setAutoDraw(false);
      running_score.setAutoDraw(false);
      score_bar.setAutoDraw(false);
      running_score_img.setAutoDraw(false);
      thresh.setAutoDraw(false);
      thresh_text.setAutoDraw(false);
      conditions.setAutoDraw(false);
      eps_level.setAutoDraw(false);
      eps_dot.setAutoDraw(false);
      high.setAutoDraw(false);
      low.setAutoDraw(false);
      reward_pres.tStart = t;  // (not accounting for frame time here)
      reward_pres.frameNStart = frameN;  // exact frame index
      
      reward_pres.setAutoDraw(true);
    }

    if (reward_pres.status === PsychoJS.Status.STARTED && t >= (reward_pres.tStart + 0.5)) {
      reward_pres.setAutoDraw(false);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);

      
      counter.setAutoDraw(true);
      counter_bar.setAutoDraw(true);
      counter_img.setAutoDraw(true);
      running_score.setAutoDraw(true);
      score_bar.setAutoDraw(true);
      running_score_img.setAutoDraw(true);
      thresh.setAutoDraw(true);
      thresh_text.setAutoDraw(true);
      conditions.setAutoDraw(true);
      eps_level.setAutoDraw(true);
      eps_dot.setAutoDraw(true);
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
    } else if (((thisResp == "up") || (thisResp == "down")) && counterNum > 1) {
            
        cont = false;
        [correct, score, txt, color] = reward(feedbackRel, thisResp, actual_state, score);
        coin = flipCoin();
        if ((coin <= hazard)) {
            state = ((- 1) * state);
        }
        reward_shown = true;
        
        reward_pres = new visual.TextStim({
          win: psychoJS.window,
          name: 'reward_pres',
          text: txt,
          font: 'Open Sans',
          units: undefined, 
          pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
          languageStyle: 'LTR',
          color: new util.Color(color),  opacity: undefined,
          depth: -5.0 
        });


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
      

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of fifthPracticeComponents)
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
function fifthPracticeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'fifthPractice' ---
    for (const thisComponent of fifthPracticeComponents) {
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
    
    
    // the Routine "fifthPractice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}







// explainLowStability text
function explainLowStabilityRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    counterNum = numSteps;
    score = 0;
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    thresh_text.setText(thresh_str);
    running_score.setText(score.toString());
    hazard = 0.5;
    // const color_increment = [-1, -0.71428571, -0.42857143, -0.14285714,  0.14285714, 0.42857143,  0.71428571, 1];
    eps_dot.setPos([-0.28,0.25]);
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    explainLowStabilityClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    explainLowStabilityComponents = [];
    explainLowStabilityComponents.push(space_to_continue);
    explainLowStabilityComponents.push(explainLowStability_top_text);
    explainLowStabilityComponents.push(explainLowStability_center_box);
    explainLowStabilityComponents.push(plotLim);
    explainLowStabilityComponents.push(zeroLine);
    explainLowStabilityComponents.push(dummystock);
    explainLowStabilityComponents.push(counter);
    explainLowStabilityComponents.push(running_score);
    explainLowStabilityComponents.push(counter_img);
    explainLowStabilityComponents.push(running_score_img);
    explainLowStabilityComponents.push(thresh);
    explainLowStabilityComponents.push(thresh_text);
    explainLowStabilityComponents.push(counter_bar);
    explainLowStabilityComponents.push(score_bar);
    explainLowStabilityComponents.push(conditions);
    explainLowStabilityComponents.push(low);
    explainLowStabilityComponents.push(high);
    explainLowStabilityComponents.push(eps_level);
    explainLowStabilityComponents.push(eps_dot);
    explainLowStabilityComponents.push(space_bar);
    
    for (const thisComponent of explainLowStabilityComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function explainLowStabilityRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = explainLowStabilityClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && space_to_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_continue.tStart = t;  // (not accounting for frame time here)
      space_to_continue.frameNStart = frameN;  // exact frame index
      space_to_continue.setAutoDraw(true);
    } 
    
    
    if (t >= 0.0 && explainLowStability_top_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainLowStability_top_text.tStart = t;  // (not accounting for frame time here)
      explainLowStability_top_text.frameNStart = frameN;  // exact frame index
      explainLowStability_top_text.setAutoDraw(true);
    }
    
    if (t >= 0.0 && explainLowStability_center_box.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explainLowStability_center_box.tStart = t;  // (not accounting for frame time here)
      explainLowStability_center_box.frameNStart = frameN;  // exact frame index
      explainLowStability_center_box.setAutoDraw(true);
    }
    
    if (t >= 0.0 && plotLim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.tStart = t;  // (not accounting for frame time here)
      plotLim.frameNStart = frameN;  // exact frame index
      plotLim.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && zeroLine.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      zeroLine.tStart = t;  // (not accounting for frame time here)
      zeroLine.frameNStart = frameN;  // exact frame index
      zeroLine.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && dummystock.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dummystock.tStart = t;  // (not accounting for frame time here)
      dummystock.frameNStart = frameN;  // exact frame index
      dummystock.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter.tStart = t;  // (not accounting for frame time here)
      counter.frameNStart = frameN;  // exact frame index
      counter.setAutoDraw(true);
    }
    
    if (t >= 0.0 && running_score.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score.tStart = t;  // (not accounting for frame time here)
      running_score.frameNStart = frameN;  // exact frame index
      running_score.setAutoDraw(true);
    }
    
    if (t >= 0.0 && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score_img.tStart = t;  // (not accounting for frame time here)
      running_score_img.frameNStart = frameN;  // exact frame index
      running_score_img.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
    }
    
    if (t >= 0.0 && score_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_bar.tStart = t;  // (not accounting for frame time here)
      score_bar.frameNStart = frameN;  // exact frame index
      score_bar.setAutoDraw(true);
    }
    
    if (t >= 0.0 && thresh.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh.tStart = t;  // (not accounting for frame time here)
      thresh.frameNStart = frameN;  // exact frame index
      thresh.setAutoDraw(true);
    }
    
    if (t >= 0.0 && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh_text.tStart = t;  // (not accounting for frame time here)
      thresh_text.frameNStart = frameN;  // exact frame index
      thresh_text.setAutoDraw(true);
    }
    
    
    if (t >= 0.0 && conditions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      conditions.tStart = t;  // (not accounting for frame time here)
      conditions.frameNStart = frameN;  // exact frame index
      conditions.setAutoDraw(true);
    }
    
    if (t >= 0.0 && low.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      low.tStart = t;  // (not accounting for frame time here)
      low.frameNStart = frameN;  // exact frame index
      low.setAutoDraw(true);
    }
    
    if (t >= 0.0 && high.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      high.tStart = t;  // (not accounting for frame time here)
      high.frameNStart = frameN;  // exact frame index
      high.setAutoDraw(true);
    }
    
    if (t >= 0.0 && eps_level.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      eps_level.tStart = t;  // (not accounting for frame time here)
      eps_level.frameNStart = frameN;  // exact frame index
      eps_level.setAutoDraw(true);
    }
    
    if (t >= 0.0 && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      eps_dot.tStart = t;  // (not accounting for frame time here)
      eps_dot.frameNStart = frameN;  // exact frame index
      eps_dot.setAutoDraw(true);
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
    for (const thisComponent of explainLowStabilityComponents)
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


function explainLowStabilityRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of explainLowStabilityComponents) {
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

function sixthTrainingLoopBegin(sixthTrainingLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    counterNum = trainSteps3on;
    cont = true;
    currentHour = 0;
    score = 0;
    stocklist = getStocksForNHours(state*DRIFT, SIG, 14);
    // [0.05, 0.1143, 0.1786, 0.2429, 0.3071, 0.3714, 0.4357, 0.5]

    // set up handler to look after randomisation of conditions etc
    train = new TrialHandler({
      psychoJS: psychoJS,
      nReps: trainSteps3on, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'train'
    });
    psychoJS.experiment.addLoop(train); // add the loop to the experiment
    currentLoop = train;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrain of train) {
      snapshot = train.getSnapshot();
      sixthTrainingLoopScheduler.add(importConditions(snapshot));
      sixthTrainingLoopScheduler.add(sixthPracticeRoutineBegin(snapshot));
      sixthTrainingLoopScheduler.add(sixthPracticeRoutineEachFrame());
      sixthTrainingLoopScheduler.add(sixthPracticeRoutineEnd(snapshot));
      sixthTrainingLoopScheduler.add(sixthTrainingLoopEndIteration(sixthTrainingLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function sixthTrainingLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(train);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function sixthTrainingLoopEndIteration(scheduler, snapshot) {
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


// sixthPractice start
function sixthPracticeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'sixthPractice' ---
    t = 0;
    sixthPracticeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from getNormalRV

    resp.keys = undefined;
    resp.rt = undefined;
    _resp_allKeys = [];
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    thresh_text.setText(thresh_str);
    running_score.setText(score.toString())
    // keep track of which components have finished
    sixthPracticeComponents = [];
    sixthPracticeComponents.push(stockline1);
    sixthPracticeComponents.push(stockline2);
    sixthPracticeComponents.push(stockline3);
    sixthPracticeComponents.push(stockline4);
    sixthPracticeComponents.push(stockline5);
    sixthPracticeComponents.push(stockline6);
    sixthPracticeComponents.push(stockline7);
    sixthPracticeComponents.push(stockline8);
    sixthPracticeComponents.push(stockline9);
    sixthPracticeComponents.push(stockline10);
    sixthPracticeComponents.push(stockline11);
    sixthPracticeComponents.push(stockline12);
    sixthPracticeComponents.push(stockline13);
    sixthPracticeComponents.push(resp);
    sixthPracticeComponents.push(reward_pres);
    sixthPracticeComponents.push(plotLim);
    sixthPracticeComponents.push(zeroLine);
    sixthPracticeComponents.push(counter);
    sixthPracticeComponents.push(counter_img);
    sixthPracticeComponents.push(counter_bar);
    sixthPracticeComponents.push(running_score);
    sixthPracticeComponents.push(running_score_img);
    sixthPracticeComponents.push(score_bar);
    sixthPracticeComponents.push(thresh);
    sixthPracticeComponents.push(thresh_text);
    sixthPracticeComponents.push(conditions);
    sixthPracticeComponents.push(low);
    sixthPracticeComponents.push(high);
    sixthPracticeComponents.push(eps_level);
    sixthPracticeComponents.push(eps_dot);

    for (const thisComponent of sixthPracticeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function sixthPracticeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'sixthPractice' ---
    // get current time
    t = sixthPracticeClock.getTime();
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
   
     if (((cont == true)) && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }


    if (((cont == true)) && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
    }

    
    if (((cont == true)) && running_score.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score.tStart = t;  // (not accounting for frame time here)
      running_score.frameNStart = frameN;  // exact frame index
      running_score.setAutoDraw(true);
    }
    
    
    
     if (((cont == true)) && score_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_bar.tStart = t;  // (not accounting for frame time here)
      score_bar.frameNStart = frameN;  // exact frame index
      score_bar.setAutoDraw(true);
    }
    
    
    
     if (((cont == true)) && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score_img.tStart = t;  // (not accounting for frame time here)
      running_score_img.frameNStart = frameN;  // exact frame index
      running_score_img.setAutoDraw(true);
    }
    
     if (((cont == true)) && thresh.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh.tStart = t;  // (not accounting for frame time here)
      thresh.frameNStart = frameN;  // exact frame index
      thresh.setAutoDraw(true);
    }
    
    
    if (((cont == true)) && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh_text.tStart = t;  // (not accounting for frame time here)
      thresh_text.frameNStart = frameN;  // exact frame index
      thresh_text.setAutoDraw(true);
    }

    
    if (((cont == true)) && conditions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      conditions.tStart = t;  // (not accounting for frame time here)
      conditions.frameNStart = frameN;  // exact frame index
      conditions.setAutoDraw(true);
    }
    
    if (((cont == true)) && eps_level.status === PsychoJS.Status.NOT_STARTED && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      eps_level.tStart = t;  // (not accounting for frame time here)
      eps_level.frameNStart = frameN;  // exact frame index
      eps_level.setAutoDraw(true);
      eps_dot.tStart = t;  // (not accounting for frame time here)
      eps_dot.frameNStart = frameN;  // exact frame index
      eps_dot.setAutoDraw(true);
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
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      
      counter.setAutoDraw(true);
      running_score.setAutoDraw(true);
      counter_bar.setAutoDraw(true);
      score_bar.setAutoDraw(true);
      counter_img.setAutoDraw(true);
      running_score_img.setAutoDraw(true);
      thresh.setAutoDraw(true);
      thresh_text.setAutoDraw(true);
      conditions.setAutoDraw(true);
      eps_level.setAutoDraw(true);
      eps_dot.setAutoDraw(true);
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
    if (((cont == false)) && (counterNum != 0) && reward_pres.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.setAutoDraw(false);
      zeroLine.setAutoDraw(false);

      counter.setAutoDraw(false);
      counter_bar.setAutoDraw(false);
      counter_img.setAutoDraw(false);
      running_score.setAutoDraw(false);
      score_bar.setAutoDraw(false);
      running_score_img.setAutoDraw(false);
      thresh.setAutoDraw(false);
      thresh_text.setAutoDraw(false);
      conditions.setAutoDraw(false);
      eps_level.setAutoDraw(false);
      eps_dot.setAutoDraw(false);
      high.setAutoDraw(false);
      low.setAutoDraw(false);
    //   blockDisplay.setAutoDraw(false);
      reward_pres.tStart = t;  // (not accounting for frame time here)
      reward_pres.frameNStart = frameN;  // exact frame index
      
      reward_pres.setAutoDraw(true);
    }

    if (reward_pres.status === PsychoJS.Status.STARTED && t >= (reward_pres.tStart + 0.5)) {
      reward_pres.setAutoDraw(false);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);

      
      counter.setAutoDraw(true);
      counter_bar.setAutoDraw(true);
      counter_img.setAutoDraw(true);
      running_score.setAutoDraw(true);
      score_bar.setAutoDraw(true);
      running_score_img.setAutoDraw(true);
      thresh.setAutoDraw(true);
      thresh_text.setAutoDraw(true);
      conditions.setAutoDraw(true);
      eps_level.setAutoDraw(true);
      eps_dot.setAutoDraw(true);
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
    } else if (((thisResp == "up") || (thisResp == "down")) && counterNum > 1) {
            
        cont = false;
        [correct, score, txt, color] = reward(feedbackRel, thisResp, actual_state, score);
        coin = flipCoin();
        if ((coin <= hazard)) {
            state = ((- 1) * state);
        }
        reward_shown = true;
        
        reward_pres = new visual.TextStim({
          win: psychoJS.window,
          name: 'reward_pres',
          text: txt,
          font: 'Open Sans',
          units: undefined, 
          pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
          languageStyle: 'LTR',
          color: new util.Color(color),  opacity: undefined,
          depth: -5.0 
        });


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
      

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of sixthPracticeComponents)
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
function sixthPracticeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'sixthPractice' ---
    for (const thisComponent of sixthPracticeComponents) {
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
    
    
    // the Routine "sixthPractice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}







// begin img
function beginRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    score = 0;
    dp_threshold = 0;
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    beginClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    beginComponents = [];
    beginComponents.push(space_to_begin);
    beginComponents.push(space_bar);
    
    for (const thisComponent of beginComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function beginRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = beginClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    

    
    // *text* updates
    if (t >= 0.0 && space_to_begin.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_to_begin.tStart = t;  // (not accounting for frame time here)
      space_to_begin.frameNStart = frameN;  // exact frame index
      space_to_begin.setAutoDraw(true);
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
    for (const thisComponent of beginComponents)
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


function beginRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of beginComponents) {
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







// display img
var current_param;
function displayRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    counterNum = numSteps;
    cont = true;
    currentHour = 0;
    blockN += 1;
    stocklist = getStocksForNHours(state*DRIFT, SIG, 14);
    current_param = params.pop();
    hazard = current_param[0];
    dp_threshold += current_param[1];
    avg_score = dp_threshold - Math.round(dp_threshold/2);
    score_increment = bar_height/(2*avg_score);
    score_bar_height = score*score_increment;
    thresh_str = 'Benchmark: ' + avg_score.toString();
    // [0.05, 0.1143, 0.1786, 0.2429, 0.3071, 0.3714, 0.4357, 0.5]
    // const color_increment = [-1, -0.71428571, -0.42857143, -0.14285714,  0.14285714, 0.42857143,  0.71428571, 1];
    if (hazard == 0.5) {
        eps_dot.setPos([-0.28,0.25]);
        display_eps_dot.setPos([-0.14, -0.1]);
    } else if (hazard == 0.4357) {
        eps_dot.setPos([-0.26,0.25]);
        display_eps_dot.setPos([-0.1, -0.1]);
    } else if (hazard == 0.3714) {
        eps_dot.setPos([-0.24,0.25]);
        display_eps_dot.setPos([-0.06, -0.1]);
    } else if (hazard == 0.3071) {
        eps_dot.setPos([-0.22,0.25]);
        display_eps_dot.setPos([-0.02, -0.1]);
    } else if (hazard == 0.2429) {
        eps_dot.setPos([-0.2,0.25]);
        display_eps_dot.setPos([0.02, -0.1]);
    } else if (hazard == 0.1786) {
        eps_dot.setPos([-0.18,0.25]);
        display_eps_dot.setPos([0.06, -0.1]);
    } else if (hazard == 0.1143) {
        eps_dot.setPos([-0.16,0.25]);
        display_eps_dot.setPos([0.1, -0.1]);
    } else if (hazard == 0.05) {
        eps_dot.setPos([-0.14,0.25]);
        display_eps_dot.setPos([0.14, -0.1]);
    }

    displayText = "Block " + blockN.toString() + "\n\nRunning total score: " + score.toString() + "\n\n" + condText + "\n\n\nPress SPACE to continue.";
    blockDisplay.setText(displayText);
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
   displayClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    space_bar.keys = undefined;
    space_bar.rt = undefined;
    _space_bar_allKeys = [];
    // keep track of which components have finished
    displayComponents = [];
    displayComponents.push(blockDisplay);
    displayComponents.push(display_eps_level);
    displayComponents.push(display_eps_dot);
    displayComponents.push(display_low);
    displayComponents.push(display_high);
    displayComponents.push(space_bar);
    
    for (const thisComponent of displayComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function displayRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = displayClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    
    // *text* updates
    if (t >= 0.0 && blockDisplay.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blockDisplay.tStart = t;  // (not accounting for frame time here)
      blockDisplay.frameNStart = frameN;  // exact frame index
      blockDisplay.setAutoDraw(true);
    }

    // *text* updates
    if (t >= 0.0 && display_eps_level.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      display_eps_level.tStart = t;  // (not accounting for frame time here)
      display_eps_level.frameNStart = frameN;  // exact frame index
      display_eps_level.setAutoDraw(true);
    }

    // *text* updates
    if (t >= 0.0 && display_eps_dot.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      display_eps_dot.tStart = t;  // (not accounting for frame time here)
      display_eps_dot.frameNStart = frameN;  // exact frame index
      display_eps_dot.setAutoDraw(true);
    }

    // *text* updates
    if (t >= 0.0 && display_low.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      display_low.tStart = t;  // (not accounting for frame time here)
      display_low.frameNStart = frameN;  // exact frame index
      display_low.setAutoDraw(true);
    }

    // *text* updates
    if (t >= 0.0 && display_high.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      display_high.tStart = t;  // (not accounting for frame time here)
      display_high.frameNStart = frameN;  // exact frame index
      display_high.setAutoDraw(true);
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
    for (const thisComponent of displayComponents)
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


function displayRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of displayComponents) {
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


var steps;
function stepsLoopBegin(stepsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
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
      blocksLoopScheduler.add(displayRoutineBegin());
      blocksLoopScheduler.add(displayRoutineEachFrame());
      blocksLoopScheduler.add(displayRoutineEnd());
      const stepsLoopScheduler = new Scheduler(psychoJS);
      blocksLoopScheduler.add(stepsLoopBegin(stepsLoopScheduler, snapshot));
      blocksLoopScheduler.add(stepsLoopScheduler);
      blocksLoopScheduler.add(stepsLoopEnd);
      blocksLoopScheduler.add(blocksLoopEndIteration(blocksLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
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
    // reward_pres.setText(txt);
    counter.setText(counterNum);
    counter_bar.setSize([bar_width, counterNum*counter_increment]);
    counter_bar.setPos([counter_bar_pos, 0 - (numSteps - counterNum)*counter_increment/2])
    if (score > 2*avg_score) {
        score_height = 2*avg_score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 2*avg_score)*score_increment/2]);
    } else if (score >= 0) {
        score_height = score*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - score)*score_increment/2]);
    } else {
        score_height = 0*score_increment;
        score_bar.setPos([score_bar_pos, 0 - (2*avg_score - 0)*score_increment/2]);
    }
    score_bar.setSize([bar_width, score_height]);
    thresh_text.setText(thresh_str);
    running_score.setText(score.toString())
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
    presentationComponents.push(resp);
    presentationComponents.push(reward_pres);
    // presentationComponents.push(blockDisplay);
    presentationComponents.push(plotLim);
    presentationComponents.push(zeroLine);
    presentationComponents.push(counter);
    presentationComponents.push(running_score);
    presentationComponents.push(counter_img);
    presentationComponents.push(running_score_img);
    presentationComponents.push(thresh);
    presentationComponents.push(thresh_text);
    presentationComponents.push(counter_bar);
    presentationComponents.push(score_bar);
    presentationComponents.push(conditions);
    presentationComponents.push(low);
    presentationComponents.push(high);
    presentationComponents.push(eps_level);
    presentationComponents.push(eps_dot);

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
    
    if (((cont == true)) && counter_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_bar.tStart = t;  // (not accounting for frame time here)
      counter_bar.frameNStart = frameN;  // exact frame index
      counter_bar.setAutoDraw(true);
    }
    
     if (((cont == true)) && score_bar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_bar.tStart = t;  // (not accounting for frame time here)
      score_bar.frameNStart = frameN;  // exact frame index
      score_bar.setAutoDraw(true);
    }
    
     if (((cont == true)) && counter_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter_img.tStart = t;  // (not accounting for frame time here)
      counter_img.frameNStart = frameN;  // exact frame index
      counter_img.setAutoDraw(true);
    }
    
     if (((cont == true)) && running_score_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      running_score_img.tStart = t;  // (not accounting for frame time here)
      running_score_img.frameNStart = frameN;  // exact frame index
      running_score_img.setAutoDraw(true);
    }
    
     if (((cont == true)) && thresh.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh.tStart = t;  // (not accounting for frame time here)
      thresh.frameNStart = frameN;  // exact frame index
      thresh.setAutoDraw(true);
    }
    
    
    if (((cont == true)) && thresh_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thresh_text.tStart = t;  // (not accounting for frame time here)
      thresh_text.frameNStart = frameN;  // exact frame index
      thresh_text.setAutoDraw(true);
    }

    
    if (((cont == true)) && conditions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      conditions.tStart = t;  // (not accounting for frame time here)
      conditions.frameNStart = frameN;  // exact frame index
      conditions.setAutoDraw(true);
    }
    
    if (((cont == true)) && eps_level.status === PsychoJS.Status.NOT_STARTED && eps_dot.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      eps_level.tStart = t;  // (not accounting for frame time here)
      eps_level.frameNStart = frameN;  // exact frame index
      eps_level.setAutoDraw(true);
      eps_dot.tStart = t;  // (not accounting for frame time here)
      eps_dot.frameNStart = frameN;  // exact frame index
      eps_dot.setAutoDraw(true);
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
      counter_bar.setAutoDraw(true);
      score_bar.setAutoDraw(true);
      counter.setAutoDraw(true);
      running_score.setAutoDraw(true);
      counter_img.setAutoDraw(true);
      running_score_img.setAutoDraw(true);
      thresh.setAutoDraw(true);
      thresh_text.setAutoDraw(true);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      conditions.setAutoDraw(true);
      eps_level.setAutoDraw(true);
      eps_dot.setAutoDraw(true);
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
    
    // if ((currentHour == 0) && blockDisplay.status == PsychoJS.Status.NOT_STARTED) {
    //   plotLim.setAutoDraw(false);
    //   zeroLine.setAutoDraw(false);
    //   counter_bar.setAutoDraw(false);
    //   score_bar.setAutoDraw(false);
    //   counter.setAutoDraw(false);
    //   running_score.setAutoDraw(false);
    //   counter_img.setAutoDraw(false);
    //   running_score_img.setAutoDraw(false);
    //   thresh.setAutoDraw(false);
    //   thresh_text.setAutoDraw(false);
    //   conditions.setAutoDraw(false);
    //   eps_level.setAutoDraw(false);
    //   eps_dot.setAutoDraw(false);
    //   high.setAutoDraw(false);
    //   low.setAutoDraw(false);
    //   stockline1.setAutoDraw(false);
    //   blockDisplay.tStart = t;  // (not accounting for frame time here)
    //   blockDisplay.frameNStart = frameN;  // exact frame index
    //   blockDisplay.setAutoDraw(true);
    // }
    
    // if (blockDisplay.status === PsychoJS.Status.STARTED && t >= (blockDisplay.tStart + 3)) {
    //   blockDisplay.setAutoDraw(false);
    //   plotLim.setAutoDraw(true);
    //   zeroLine.setAutoDraw(true);
    //   counter_bar.setAutoDraw(true);
    //   score_bar.setAutoDraw(true);
    //   counter.setAutoDraw(true);
    //   running_score.setAutoDraw(true);
    //   counter_img.setAutoDraw(true);
    //   running_score_img.setAutoDraw(true);
    //   thresh.setAutoDraw(true);
    //   thresh_text.setAutoDraw(true);
    //   conditions.setAutoDraw(true);
    //   eps_level.setAutoDraw(true);
    //   eps_dot.setAutoDraw(true);
    //   high.setAutoDraw(true);
    //   low.setAutoDraw(true);
    //   stockline1.tStart = t;  // (not accounting for frame time here)
    //   stockline1.frameNStart = frameN;  // exact frame index
    //   stockline1.setAutoDraw(true);
    // }

    
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
    if (((cont == false)) && (counterNum != 0) && reward_pres.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      plotLim.setAutoDraw(false);
      zeroLine.setAutoDraw(false);
      counter_bar.setAutoDraw(false);
      score_bar.setAutoDraw(false);
      counter.setAutoDraw(false);
      running_score.setAutoDraw(false);
      counter_img.setAutoDraw(false);
      running_score_img.setAutoDraw(false);
      thresh.setAutoDraw(false);
      thresh_text.setAutoDraw(false);
      conditions.setAutoDraw(false);
      eps_level.setAutoDraw(false);
      eps_dot.setAutoDraw(false);
      high.setAutoDraw(false);
      low.setAutoDraw(false);
    //   blockDisplay.setAutoDraw(false);
      reward_pres.tStart = t;  // (not accounting for frame time here)
      reward_pres.frameNStart = frameN;  // exact frame index
      
      reward_pres.setAutoDraw(true);
    }

    if (reward_pres.status === PsychoJS.Status.STARTED && t >= (reward_pres.tStart + 0.5)) {
      reward_pres.setAutoDraw(false);
      plotLim.setAutoDraw(true);
      zeroLine.setAutoDraw(true);
      counter_bar.setAutoDraw(true);
      score_bar.setAutoDraw(true);
      counter.setAutoDraw(true);
      running_score.setAutoDraw(true);
      counter_img.setAutoDraw(true);
      running_score_img.setAutoDraw(true);
      thresh.setAutoDraw(true);
      thresh_text.setAutoDraw(true);
      conditions.setAutoDraw(true);
      eps_level.setAutoDraw(true);
      eps_dot.setAutoDraw(true);
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
    } else if (((thisResp == "up") || (thisResp == "down")) && counterNum > 1) {
            
        cont = false;
        [correct, score, txt, color] = reward(feedbackRel, thisResp, actual_state, score);
        coin = flipCoin();
        if ((coin <= hazard)) {
            state = ((- 1) * state);
        }
        reward_shown = true;


        reward_pres = new visual.TextStim({
          win: psychoJS.window,
          name: 'reward_pres',
          text: txt,
          font: 'Open Sans',
          units: undefined, 
          pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
          languageStyle: 'LTR',
          color: new util.Color(color),  opacity: undefined,
          depth: -5.0 
        });
        
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
    
    score_display.setText(score + "\n\nThank you for participating in this study. The completion code is C1NJP8LA.\n\nYour submission will be manually accepted, and if you exceeded the benchmark, you will receive a bonus shortly. Have a nice day!");
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
      score_bar.setAutoDraw(false);
      counter.setAutoDraw(false);
      running_score.setAutoDraw(false);
      counter_img.setAutoDraw(false);
      running_score_img.setAutoDraw(false);
      thresh.setAutoDraw(false);
      thresh_text.setAutoDraw(false);
      conditions.setAutoDraw(false);
      eps_level.setAutoDraw(false);
      eps_dot.setAutoDraw(false);
      high.setAutoDraw(false);
      low.setAutoDraw(false);
      score_display.tStart = t;  // (not accounting for frame time here)
      score_display.frameNStart = frameN;  // exact frame index
      
      score_display.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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
