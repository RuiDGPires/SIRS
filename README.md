# Application Server Branch | DO NOT MERGE

## Setup

Firstly, install the needed packages and tools **(se faltar alguma coisa, adicionem neste script)**
```sh
./scripts/setup.sh
```
If you want to re-run this script only to configure the network and nginx, run with the `--skip-install` flag, like so:
```sh
./scripts/setup.sh --skip-install
```


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

## Beware

The certificate is being configured with the common name `localhost`
This should be changed to the public IP Address or, instead, the requests to that IP should be redirected to the `localhost`

If the certificate is changed, the nginx.conf will also probably need to be changed accordingly 
