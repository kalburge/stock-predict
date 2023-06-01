from psychopy import visual, core, gui, clock, hardware
from psychopy.hardware import keyboard
from psychopy.core import wait
import pandas as pd
import numpy as np

clock = clock.Clock()

kb = keyboard.Keyboard()
key_presses = kb.getKeys()
print(key_presses)

time_init = clock.getTime()
print(time_init)

print("Hello World!")

exp_info = {'participant_ID' : '', 'age': 99}
dlg = gui.DlgFromDict(exp_info)

if not dlg.OK:
    # Maybe add a nice print statement?
    print("User pressed 'Cancel'!")
    quit()
    
    

key_presses = kb.getKeys()
for k in key_presses:
    print(k.name)

win = visual.Window()
msg = visual.TextStim(win, text=exp_info["participant_ID"])

msg.draw()
win.flip()
wait(2)
win.flip()
msg.draw()
win.flip()
wait(7)
win.flip()



time_elapsed = round(clock.getTime() - time_init,2)
print(time_elapsed)

win.close()
quit()