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

> ./scripts/all.sh

---

Then, detatch from the tmux session with
CTRL+b -> d

To re-attach to the tmux session:
> tmux attach

