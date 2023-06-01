# install.packages("eyelinkReader")
library(eyelinkReader)

directory <- "/Users/goldlab/Documents/Ishan_summer23/test_runs/arm3"
filename <- "ARM3_ET_2023_05_31_14_05.EDF"
setwd(directory)
gaze <- read_edf(filename)


View(gaze$saccades)
plot(gaze, trial = 1, show_fixations = TRUE, show_saccades = TRUE)
plot(gaze, trial = NULL, show_fixations = TRUE, show_saccades = FALSE)
