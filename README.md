# gold-lab

All materials related to my summer research internship at Gold Lab, University of Pennsylvania Perelman School of Medicine Department of Neuroscience.


### Current Pavlovia links: 

arm3_eps: https://run.pavlovia.org/jigold/arm3_eps_v2

arm3_q: https://run.pavlovia.org/jigold/arm3_q_v2




# Model dynamics

## Value functions

Instead of only $p_{0,+}^{i+1}, p_{0,+-}^{i+1}$, we also have $p_{0,0}^{i+1}$ (the initial state likelihood given that I received no reward)

$$\begin{align*}
    V_+(p_n^i;N) & = q[p_n^i\{R_c + V(p_{0,+}^{i+1};N-n-1)\} \\
                 & + (1-p_n^i)\{R_i + V(p_{0,-}^{i+1};N-n-1)\}]\\
                 & + \textcolor{red}{(1-q)[0 + V(p_{0,0}^{i+1};N-n-1)]}\\
    V_-(p_n^i;N) & = q[(1-p_n^i)\{R_c + V(p_{0,+}^{i+1};N-n-1)\} \\
                 & + p_n^i[\{R_i + V(p_{0,-}^{i+1};N-n-1)\}]\\
                 & + \textcolor{red}{(1-q)[0 + V(p_{0,0}^{i+1};N-n-1)]}\\
\end{align*}$$

## Belief Updates

$$y_0^i = \ln \begin{cases}
\frac{(1-\epsilon)}{\epsilon}, & r^{i-1} = +, p_n^{i-1} > \frac12 \text{ or } r^{i-1} = -, p_n^{i-1} < \frac12\\
\frac{\epsilon }{(1-\epsilon) }, & r^{i-1} = +, p_n^{i-1} < \frac12 \text{ or } r^{i-1} = -, p_n^{i-1} > \frac12\\
\frac{(1-\epsilon)e^{y_n^{i-1}}+ \epsilon}{\epsilon e^{y_n^{i-1}} + (1-\epsilon)}, & r^{i-1} = 0\\
 \end{cases}$$
