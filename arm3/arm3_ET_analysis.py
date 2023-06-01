import numpy as np
import pandas as pd
import matplotlib.pyplot as plt




def eyedata2pandasframe(directory):
    '''
    This function takes a directory from which it tries to read in ASCII files containing eyetracking data
    It returns  eye_data: A pandas dataframe containing data from fixations AND saccades fix_data: A pandas dataframe containing only data from fixations
                sac_data: pandas dataframe containing only data from saccades
                fixation: numpy array containing information about fixation onsets and offsets
                saccades: numpy array containing information about saccade onsets and offsets
                blinks: numpy array containing information about blink onsets and offsets 
                trials: numpy array containing information about trial onsets 
    '''
    eye_data= []
    fix_data = []
    sac_data = []
    data_header = {0: 'TimeStamp',1: 'X_Coord',2: 'Y_Coord',3: 'Diameter'}
    event_header = {0: 'Start', 1: 'End'}
    start_reading = False
    in_blink = False
    in_saccade = False
    fix_timestamps = []
    sac_timestamps = []
    blink_timestamps = []
    trials = []
    sample_rate_info = []
    sample_rate = 0
    # read the file and store, depending on the messages the data
    # we have the following structure:
    # a header -- every line starts with a '**'
    # a bunch of messages containing information about callibration/validation and so on all starting with 'MSG'
    # followed by:
    # START 10350638    LEFT    SAMPLES EVENTS
    # PRESCALER 1
    # VPRESCALER    1
    # PUPIL AREA
    # EVENTS    GAZE    LEFT    RATE     500.00 TRACKING    CR  FILTER  2
    # SAMPLES   GAZE    LEFT    RATE     500.00 TRACKING    CR  FILTER  2
    # followed by the actual data:
    # normal data --> [TIMESTAMP]\t [X-Coords]\t [Y-Coords]\t [Diameter]
    # Start of EVENTS [BLINKS FIXATION SACCADES] --> S[EVENTNAME] [EYE] [TIMESTAMP]
    # End of EVENTS --> E[EVENT] [EYE] [TIMESTAMP_START]\t [TIMESTAMP_END]\t [TIME OF EVENT]\t [X-Coords start]\t [Y-Coords start]\t [X_Coords end]\t [Y-Coords end]\t [?]\t [?]
    # Trial messages --> MSG timestamp\t TRIAL [TRIALNUMBER]
    try:
        with open(directory) as f:
            csv_reader = csv.reader(f, delimiter ='\t')
            for i, row in enumerate (csv_reader):
                if any ('RATE' in item for item in row):
                    sample_rate_info = row
                if any('SYNCTIME' in item for item in row):          # only start reading after this message
                    start_reading = True
                elif any('SFIX' in item for item in row): pass
                    #fix_timestamps[0].append (row)
                elif any('EFIX' in item for item in row):
                    fix_timestamps.append ([row[0].split(' ')[4],row[1]])
                    #fix_timestamps[1].append (row)
                elif any('SSACC' in item for item in row): 
                    #sac_timestamps[0].append (row)
                    in_saccade = True
                elif any('ESACC' in item for item in row):
                    sac_timestamps.append ([row[0].split(' ')[3],row[1]])
                    in_saccade = False
                elif any('SBLINK' in item for item in row):          # stop reading here because the blinks contain NaN
                    # blink_timestamps[0].append (row)
                    in_blink = True
                elif any('EBLINK' in item for item in row):          # start reading again. the blink ended
                    blink_timestamps.append ([row[0].split(' ')[2],row[1]])
                    in_blink = False
                elif any('TRIAL' in item for item in row):
                    # the first element is 'MSG', we don't need it, then we split the second element to seperate the timestamp and only keep it as an integer
                    trials.append (int(row[1].split(' ')[0]))
                elif start_reading and not in_blink:
                    eye_data.append(row)
                    if in_saccade:
                        sac_data.append(row)
                    else:
                        fix_data.append(row)

        # drop the last data point, because it is the 'END' message
        eye_data.pop(-1)
        sac_data.pop(-1)
        fix_data.pop(-1)
        # convert every item in list into a float, substract the start of the first trial to set the start of the first video to t0=0
        # then devide by 1000 to convert from milliseconds to seconds
        for row in eye_data:
            for i, item in enumerate (row):
                row[i] = float (item)

        for row in fix_data:
            for i, item in enumerate (row):
                row[i] = float (item)

        for row in sac_data:
            for i, item in enumerate (row):
                row[i] = float (item)

        for row in fix_timestamps:
            for i, item in enumerate (row):
                row [i] = (float(item)-trials[0])/1000

        for row in sac_timestamps:
            for i, item in enumerate (row):
                row [i] = (float(item)-trials[0])/1000

        for row in blink_timestamps:
            for i, item in enumerate (row):
                row [i] = (float(item)-trials[0])/1000

        sample_rate = float (sample_rate_info[4])

        # convert into pandas fix_data Frames for a better overview
        eye_data = pd.DataFrame(eye_data)
        fix_data = pd.DataFrame(fix_data)
        sac_data = pd.DataFrame(sac_data)
        fix_timestamps = pd.DataFrame(fix_timestamps)
        sac_timestamps = pd.DataFrame(sac_timestamps)
        trials = np.array(trials)
        blink_timestamps = pd.DataFrame(blink_timestamps)
        # rename header for an even better overview
        eye_data = eye_data.rename(columns=data_header)
        fix_data = fix_data.rename(columns=data_header)
        sac_data = sac_data.rename(columns=data_header)
        fix_timestamps = fix_timestamps.rename(columns=event_header)
        sac_timestamps = sac_timestamps.rename(columns=event_header)
        blink_timestamps = blink_timestamps.rename(columns=event_header)
        # substract the first timestamp of trials to set the start of the first video to t0=0
        eye_data.TimeStamp -= trials[0]
        fix_data.TimeStamp -= trials[0]
        sac_data.TimeStamp -= trials[0]
        trials -= trials[0]
        trials = trials /1000      # does not work with trials/=1000
        # devide TimeStamp to get time in seconds
        eye_data.TimeStamp /=1000
        fix_data.TimeStamp /=1000
        sac_data.TimeStamp /=1000
        return eye_data, fix_data, sac_data, fix_timestamps, sac_timestamps, blink_timestamps, trials, sample_rate
    except:
        print ('Could not read ' + str(directory) + ' properly!!! Returned empty data')
        return eye_data, fix_data, sac_data, fix_timestamps, sac_timestamps, blink_timestamps, trials, sample_rate


file = eyedata2pandasframe('ARM3_ET_2023_05_31_14_05.asc')