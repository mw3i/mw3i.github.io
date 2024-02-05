









# Scrap

## Mermaid Skilltree

<pre class="mermaid"> 
graph LR
    0[skilltree]
        0 --> S
        0 --> C
        0 --> D
        0 --> CL
        0 --> W
    S[statistics]
        S --> Sf[frequentist hypothesis testing, bayesian]
        S --> Sc[clustering]
        S --> Sm[machine learning]
            Sm --> Smn[neural nets]
    C[codiing]
        C --> Cp[python, javascript, r]
        C --> Cs[sql]
    D[database]
        D --> Dm[mysql, ibis, ddplyr]
    CL[cloud]
        CL --> CLa["aws<br>(ec2, s3, rdb)"]
    W[web]
        W --> Wf["front-end<br>(html/css/js, bootstrap)"]
        W --> Wb["back-end<br>(django, flask)"]
</pre>