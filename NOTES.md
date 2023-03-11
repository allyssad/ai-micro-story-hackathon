# BRAIN.JS INTRO

# Neural Net has 2 Stages (TRAIN, RUN)

# TRAIN (net.train())

## Forward Propagation

- Problem: ball, goal

**Prediction** - where we want the ball to land, how much power to put behind it

## Back Propagation

1. **measure** - from the prediction, we can see how far we're off from the actual goal

- referred to as _error_

2. **learn** - make a determination as to what we're going to do next

# RUN (net.run())

- we no longer have to measure how far we are from the goal, we already know
- no need to back propagate
