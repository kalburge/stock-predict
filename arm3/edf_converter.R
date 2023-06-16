# install.packages("eyelinkReader")
library(eyelinkReader)

results_path <- "/Users/goldlab/Documents/Ishan_summer23/test_runs/arm3/results/"
run_path <- "2023_06_01_16_07"
filename <- "ARM3_ET.EDF"
setwd(paste(results_path,run_path,sep=""))
gaze <- read_edf(filename, import_samples=TRUE)

if (!dir.exists("csv")){
  dir.create("csv")
}else{
  print("dir 'csv' exists")
}

setwd("csv")
varnames <- names(gaze)

for (i in 1:length(gaze)) {
  write.csv(gaze[i], paste(varnames[i],".csv", sep=""))
}


