# Application Server Branch | DO NOT MERGE

## Setup

Firstly, install the needed packages and tools
```sh
./scripts/setup.sh
```

(se faltar alguma coisa, adicionem neste script)

## Running the Server

If it is the first time running the server, run with
```sh
./scripts/all.sh --cert-gen
```

This will create and sign the certificate for the server and adds it to the trusted servers in this machine

From now on, the server can be run simply with
```sh
./scripts/all.sh
```
### [Optional] Tmux

To open a tmux session:
```sh
tmux
```

Then, start the server...

To detatch from the tmux session:
> CTRL+B
> D

To re-attach to the tmux session:
```sh
tmux attach
```
