#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Mar 13 11:21:17 2023

@author: nicholas
"""

import numpy as np
from scipy import integrate
from abc import ABC, abstractmethod

# Experiment super class:
class Experiment(ABC):
    def __init__(self, N, mu, sigma, epsilon, q, R, c):
        # Define task parameters:
        self.N = N # total action budget
        self.mu = mu # mean of Gaussian-evidence process
        self.sigma = sigma # standard d of Gaussian-evidence process
        self.epsilon = epsilon # environmental switching probability
        self.q = q # feedback reliability
        self.R = R # reward tuple (reward, punishment)
        self.c = c # cost tuple (commit cost, sample cost)
        self.define_objective()
    
    def init_data_storage(self):
        self.choice = np.array([]) # vector of state choices
        self.RT = np.array([]) # vector of choice times
        self.state = np.array([]) # vector of correct states
        self.reward = np.array([]) # vector of obtained rewards
        self.belief = np.array([]) # vector of observer's belief
        self.act = [] # vector of observer's actions
    
    # Objective function to maximize (defined in strategy sub classes):
    @abstractmethod
    def define_objective(self):
        raise NotImplementedError()
    
    # Simulate block of trials:
    def experiment_sim(self):
        self.init_data_storage()
        # Define initial belief and correct choice for block:
        y_0 = 0
        s_i = 2*np.random.binomial(1, 0.5)-1
        # Track number of actions spent:
        n = self.N
        while n >= self.c[0]:
            # Simulate normative belief for current trial:
            y_i = self.belief_sim(y_0, s_i)
            # Calculate response time and choice on current trial:
            response = self.trial_sim(y_i, n)
            # Determine feedback on current trial:
            feedback = np.random.binomial(1, self.q*(s_i != response[1])+(1-self.q)*(s_i == response[1]))
            # Store statistics from trial:
            self.add_trial(response[0], response[1], s_i, self.R[feedback], 
                            np.append(y_i[:n-response[0]+1], np.array([np.nan]*(self.c[0]-1))))
            # Update action spent count:
            n = response[0]-self.c[0]
            # Update initial belief and correct choice for next trial if action 
            # budget is not exhausted:
            if n >= self.c[0]:
                y_d = self.belief[-self.c[0]]
                y_0 = self.prior_update(y_d, response[1], 1-feedback)
                swap = np.random.binomial(1, self.epsilon)
                s_i = s_i*(swap == 0)-s_i*(swap == 1)
        
        if len(self.belief) < self.N:
            self.belief = np.append(self.belief, np.array([np.nan]*(self.N-len(self.belief))))
    
    # Simulate individual trials (defined in strategy sub classes):
    @abstractmethod
    def trial_sim(self):
        raise NotImplementedError()
    
    # Add trial data:
    def add_trial(self, RT, choice, state, reward, belief):
        self.RT = np.append(self.RT, RT)
        self.choice = np.append(self.choice, choice)
        self.state = np.append(self.state, state)
        self.reward = np.append(self.reward, reward)
        self.belief = np.append(self.belief, belief)
        self.act.append(['w'*(np.sum(~np.isnan(belief))-1), 'c'])
    
    # Belief evolution for individual trials:
    def belief_sim(self, y_0, s):
        y = np.empty(self.N); y[:] = np.nan; y[0] = y_0
        for i in range(self.c[1], self.N, self.c[1]):
            xi = np.random.normal(s*self.mu, self.sigma) # Draw observation
            y[i] = 2*xi*self.mu/(self.sigma**2)+y[i-self.c[1]] # Update LLR
        return y
    
    # Belief evolution across trials (based on switching and feedback):
    def prior_update(self, y_d, d, r):
        if r == 1:
            if ((self.epsilon == 0) & (self.q == 1)) | ((self.epsilon == 1) & (self.q == 0)):
                y_0 = d*np.inf
            elif ((self.epsilon == 0) & (self.q == 0)) | ((self.epsilon == 1) & (self.q == 1)):
                y_0 = d*(-np.inf)
            else:
                y_0 = d*np.log(((1-self.epsilon)*self.q*np.exp(np.abs(y_d))+self.epsilon*(1-self.q))
                                      /(self.epsilon*self.q*np.exp(np.abs(y_d))+(1-self.epsilon)*(1-self.q)))
        else:
            if ((self.epsilon == 0) & (self.q == 0)) | ((self.epsilon == 1) & (self.q == 1)):
                y_0 = d*np.inf
            elif ((self.epsilon == 0) & (self.q == 1)) | ((self.epsilon == 1) & (self.q == 0)):
                y_0 = d*(-np.inf)
            else:
                y_0 = d*np.log(((1-self.epsilon)*(1-self.q)*np.exp(np.abs(y_d))+self.epsilon*self.q)
                                      /(self.epsilon*(1-self.q)*np.exp(np.abs(y_d))+(1-self.epsilon)*self.q))
        return y_0
    
    # Perform basic data analysis:
    def accuracy(self):
        return np.sum(self.choice == self.state)/len(self.state)
    
    def reward_rate(self):
        return np.sum(self.reward)/self.N
    
    def sequence_lengths(self):
        commit_length = np.array([])
        sample_length = np.array([])
        commit = 0
        
        for i in range(len(self.act)):
            if len(self.act[i][0]) == 0:
                commit += 1
            else:
                sample_length = np.append(sample_length, len(self.act[i][0]))
                commit_length = np.append(commit_length, commit+1)
                commit = 0
                
        if len(commit_length) == 0:
            sample_length = np.array([0])
            commit_length = np.array([commit])
            
        return np.mean(commit_length), np.mean(sample_length)
    
    def kl_div(self, P, Q):
        D = P*np.log2(P/Q)
        D[P == 0] = 0
        return np.sum(D)
    
    def information_gain(self):
        IG = np.array([])
        y = self.belief[~np.isnan(self.belief)]
        for i in range(len(y)-1):
            Q = 1/(1+np.exp(-y[i]))
            P = 1/(1+np.exp(-y[i+1]))
            IG = np.append(IG, self.kl_div(np.array([P, 1-P]), np.array([Q, 1-Q])))
        
        return IG
    
# Reward-optimizing sub class:
class RewardMax(Experiment):
    
    
    def define_objective(self):    
        self.thresh = self.bellmans() 
            
    def trial_sim(self, y, n):
        RT = 0; thresh_n = self.thresh[self.N-n:]
        while np.absolute(y[RT]) < thresh_n[RT]:
            RT += self.c[1]
        choice = np.sign(y[RT])
        if choice == 0:
            choice = 2*np.random.binomial(1, 0.5)-1
        RT = n-RT
        return RT, choice
    
    # Solve Bellmans equation for reward maximization:
    def bellmans(self):
        dp = 0.001
        R_c = self.R[0]; R_i = self.R[1]
        # Adjust total action budget to account for variable-cost commitment:
        N_mod = self.N+1-self.c[0]
        # Construct likelihood mesh:
        p = np.arange(0, 1+dp, dp)
        # Calculate likelihood transition between end of one trial and start of 
        # next trial given correlation structure, decision, and feedback:
        # Decide s_+, feedback +:
        p_0_pp = self.likelihood_prior_update(p, 1, 1)
        # Decide s_-, feedback +:
        p_0_mp = self.likelihood_prior_update(p, -1, 1)
        # Decide s_+, feedback -:
        p_0_pm = self.likelihood_prior_update(p, 1, 0)
        # Decide s_-, feedback -:
        p_0_mm = self.likelihood_prior_update(p, -1, 0)
        # Correct for q = (0, 1) edge cases:
        if self.q == 0:
            p_0_pp[-1] = p_0_pp[0]; p_0_mm[-1] = p_0_mm[0]
            p_0_mp[0] = p_0_mp[-1]; p_0_pm[0] = p_0_pm[-1]
        elif self.q == 1:
            p_0_pp[0] = p_0_pp[-1]; p_0_mm[0] = p_0_mm[-1]
            p_0_mp[-1] = p_0_mp[0]; p_0_pm[-1] = p_0_pm[0]
            
        # Round new likelihoods to mesh and find corresponding indicies of 
        # new likelihoods:
        sorter = np.argsort(p)
        ind_0_pp = sorter[np.searchsorted(p, np.around(p_0_pp/dp)*dp, sorter=sorter)]
        ind_0_mp = sorter[np.searchsorted(p, np.around(p_0_mp/dp)*dp, sorter=sorter)]
        ind_0_pm = sorter[np.searchsorted(p, np.around(p_0_pm/dp)*dp, sorter=sorter)]
        ind_0_mm = sorter[np.searchsorted(p, np.around(p_0_mm/dp)*dp, sorter=sorter)]
        # Construct likelihood transfer matrix:
        F = self.likelihood_transfer(p, p)
        # Perform first step of backward induction:
        V_p = p*(self.q*R_c+(1-self.q)*R_i)+(1-p)*((1-self.q)*R_c+self.q*R_i) # Value of choosing s_+
        V_m = (1-p)*(self.q*R_c+(1-self.q)*R_i)+p*((1-self.q)*R_c+self.q*R_i) # Value of choosing s_-
        # Construct arguments of value function:
        V_full = np.column_stack((V_p,V_m))
        # Find maximal argument of value function and construct decision threshold:
        V_max = np.argmax(V_full, axis=1)
        thresh = self.thresh_construct(V_max, p)
        # Compute value function:
        V = np.amax(V_full, axis=1)[:, None]
        # Perform backward induction of Bellman's equation:
        for i in range(N_mod-1, 0, -1):
            # Value for choosing s_+/s_-:
            if self.c[0] > N_mod-i:
                V_p = p*(self.q*R_c+(1-self.q)*R_i)+(1-p)*((1-self.q)*R_c+self.q*R_i) # Value of choosing s_+
                V_m = (1-p)*(self.q*R_c+(1-self.q)*R_i)+p*((1-self.q)*R_c+self.q*R_i) # Value of choosing s_-
            else:
                V_p = p*(self.q*(R_c+V[ind_0_pp, N_mod-i-self.c[0]])+(1-self.q)*(R_i+V[ind_0_pm, N_mod-i-self.c[0]]))+(1-p)*((1-self.q)*(R_c+V[ind_0_pp, N_mod-i-self.c[0]])+self.q*(R_i+V[ind_0_pm, N_mod-i-self.c[0]]))
                V_m = (1-p)*(self.q*(R_c+V[ind_0_mp, N_mod-i-self.c[0]])+(1-self.q)*(R_i+V[ind_0_mm, N_mod-i-self.c[0]]))+p*((1-self.q)*(R_c+V[ind_0_mp, N_mod-i-self.c[0]])+self.q*(R_i+V[ind_0_mm, N_mod-i-self.c[0]]))
            
            # Value for waiting:
            if self.c[1] > N_mod-i:
                V_w = np.zeros_like(p)
            else:
                V_w = np.matmul(F,V[:, N_mod-i-self.c[1]])
            
            V_full = np.column_stack((V_p,V_m,V_w))
            V_max = np.argmax(V_full, axis=1)
            V = np.append(V, np.amax(V_full, axis=1)[:, None], axis=1)

            thresh = np.append(self.thresh_construct(V_max, p), thresh)
        
        thresh = np.append(thresh, np.inf*np.ones(self.N-N_mod))
        return thresh
    
    # Belief evolution across trials measured in state likelihood (used for obj.bellmans()):
    def likelihood_prior_update(self, p_d, d, r):
        if ((r == 1) & (d == 1)) | ((r == 0) & (d == -1)):
            p_0 = ((1-self.epsilon)*self.q*p_d+self.epsilon*(1-self.q)*(1-p_d))/((1-self.epsilon)*self.q*p_d+self.epsilon*(1-self.q)*(1-p_d)
                                                             +self.epsilon*self.q*p_d+(1-self.epsilon)*(1-self.q)*(1-p_d))
        if ((r == 1) & (d == -1)) | ((r == 0) & (d == 1)):
            p_0 = ((1-self.epsilon)*(1-self.q)*p_d+self.epsilon*self.q*(1-p_d))/((1-self.epsilon)*(1-self.q)*p_d+self.epsilon*self.q*(1-p_d)
                                                             +self.epsilon*(1-self.q)*p_d+(1-self.epsilon)*self.q*(1-p_d))
        return p_0
    
    # Belief transfer functon (used for obj.bellmans()):
    def likelihood_transfer(self, p, q):
        xi = self.sigma**2*np.log(np.outer((1-q), p)/np.outer(q, (1-p)))/(2*self.mu) # Calculate observation xi as a function of p and q
        dxi = self.sigma**2/(2*self.mu*p*(1-p)) # Calculate derivative of xi for change-of-variables
        F = dxi/np.sqrt(2*np.pi*self.sigma**2)*(np.transpose(q)*np.exp(-0.5*((xi-self.mu)/self.sigma)**2)\
                 +np.transpose(1-q)*np.exp(-0.5*((xi+self.mu)/self.sigma)**2))
        # Correct transfer matrix for likelihoods of 0:
        if q[0] == 0:
            F[0, :] = 0
        if p[0] == 0:
            F[:, 0] = 0
        if (q[0] == 0) & (p[0] == 0):
            F[0, 0] = 1
        # Correct transfer matrix for likelihoods of 1:
        if q[-1] == 1:
            F[-1, :] = 0
        if p[-1] == 1:
            F[:, -1] = 0
        if (q[-1] == 1) & (p[-1] == 1):
            F[-1, -1] = 1
        N = np.sum(F, axis=1) # Compute normalization across each row of the transfer matrix
        F = np.matmul(np.diag(1/N), F) # Normalize transfer matrix so that each row is a valid probability distribution
        return F
    
    # Threshold construction from value function (used in obj.bellmans()):
    def thresh_construct(self, V_max, p):
        if np.size(V_max[V_max == 0]) == 0:
            thresh = np.inf
        elif np.size(V_max[V_max == 2]) == 0:
            thresh = 0            
        else:
            p_ind = len(V_max)-len(V_max[V_max == 1])
            thresh_p = p[p_ind]
            thresh = np.log(thresh_p/(1-thresh_p))    
        return thresh

# Information-maximizing sub class
class InfoMax(Experiment):
    
    def define_objective(self):    
        pass
        
    def trial_sim(self, y, n):
        RT = 0; choice = np.nan
        while np.isnan(choice):
            if RT < n-self.c[0]:
                commit_inc = (self.state_entropy(y[RT])-self.commit_entropy(y[RT]))/self.c[0]
            else:
                commit_inc = self.state_entropy(y[RT])/self.c[0]
            
            if RT < n-self.c[1]:
                sample_inc = (self.state_entropy(y[RT])-self.sample_entropy(y[RT]))/self.c[1]
            else:
                sample_inc = -1
            
            if sample_inc > commit_inc:
                RT += self.c[1]
            else:
                choice = np.sign(y[RT])
                if choice == 0:
                    choice = 2*np.random.binomial(1, 0.5)-1
                    
        RT = n-RT
        return RT, choice
    
    # Calculate current state entropy:
    def state_entropy(self, y):
        if np.abs(y) == np.inf:
            entropy = 0
        else:
            entropy = np.log2(1+np.exp(-y))/(1+np.exp(-y))+np.log2(np.exp(y)+1)/(np.exp(y)+1)
            
        return entropy
    
    # Calculate expected state entropy from commitment:
    def commit_entropy(self, y):
        
        if (((self.epsilon == 0) | (self.epsilon == 1)) & ((self.q == 0) | (self.q == 1))):
            entropy = 0
        else:
            entropy = (self.q/(1+np.exp(-y))+(1-self.q)/(np.exp(y)+1))*(np.log2(1+(self.epsilon*self.q*np.exp(y)+(1-self.epsilon)*(1-self.q))/((1-self.epsilon)*self.q*np.exp(y)+self.epsilon*(1-self.q)))/(1+(self.epsilon*self.q*np.exp(y)+(1-self.epsilon)*(1-self.q))/((1-self.epsilon)*self.q*np.exp(y)+self.epsilon*(1-self.q)))+
                                                              np.log2(1+((1-self.epsilon)*self.q*np.exp(y)+self.epsilon*(1-self.q))/(self.epsilon*self.q*np.exp(y)+(1-self.epsilon)*(1-self.q)))/(1+((1-self.epsilon)*self.q*np.exp(y)+self.epsilon*(1-self.q))/(self.epsilon*self.q*np.exp(y)+(1-self.epsilon)*(1-self.q))))
            entropy += ((1-self.q)/(1+np.exp(-y))+self.q/(np.exp(y)+1))*(np.log2(1+(self.epsilon*(1-self.q)*np.exp(y)+(1-self.epsilon)*self.q)/((1-self.epsilon)*(1-self.q)*np.exp(y)+self.epsilon*self.q))/(1+(self.epsilon*(1-self.q)*np.exp(y)+(1-self.epsilon)*self.q)/((1-self.epsilon)*(1-self.q)*np.exp(y)+self.epsilon*self.q))+
                                                              np.log2(1+((1-self.epsilon)*(1-self.q)*np.exp(y)+self.epsilon*self.q)/(self.epsilon*(1-self.q)*np.exp(y)+(1-self.epsilon)*self.q))/(1+((1-self.epsilon)*(1-self.q)*np.exp(y)+self.epsilon*self.q)/(self.epsilon*(1-self.q)*np.exp(y)+(1-self.epsilon)*self.q)))
        return entropy
    
    # Calculate expected state entropy from sampling:
    def sample_entropy(self, y):
        integrand = lambda x: (1/(1+np.exp(-y))*(1/np.sqrt(2*np.pi*self.sigma**2))*np.exp(-0.5*(((self.sigma**2/(2*self.mu))*(x-y)-self.mu)/self.sigma)**2)+
                               1/(np.exp(y)+1)*(1/np.sqrt(2*np.pi*self.sigma**2))*np.exp(-0.5*(((self.sigma**2/(2*self.mu))*(x-y)+self.mu)/self.sigma)**2))*(np.log2(1+np.exp(-x))/(1+np.exp(-x))+np.log2(np.exp(x)+1)/(np.exp(x)+1))
        entropy = self.sigma**2/(2*self.mu)*integrate.quad(integrand, -25, 25)[0]
        return entropy