# Application Server Branch | DO NOT MERGE

## Setup

Firstly, install the needed packages and tools

> ./scripts/setup.sh

(se faltar alguma coisa, adicionem neste script)

## Run Gunicorn

**(Optional)** - to debug
Open a tmux session:

> tmux

---

If it is the first time running the server, run with

> ./scripts/all.sh --cert-gen

This will create and sign the certificate for the server and adds it to the trusted servers in this machine
From now on, the server can be run simply with
> ./scripts/all.sh


---

(If a tmux session was open...)
Then, detatch from the tmux session with
CTRL+b -> d

To re-attach to the tmux session:
> tmux attach

