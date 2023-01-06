# README

## SetUp VM1 - ApplicationServer 
Type: Linux
Version: Red Hat (64-bit)
Distribution: CentOS
Default settings
#### filehash:
#### vm disk image name: 
login user: `rui`

##### Open terminal and pull remote repository from github
Clone repository https://github.com/RuiDGPires/SIRS.git
```sh
git clone https://github.com/RuiDGPires/SIRS.git
```

Check if directory SIRS was created and try to access
```sh
cd SIRS
```

Move to database branch
```sh
git checkout server
```

Pull to database branch
```sh
git pull
```

##### Once the vm is running, inside the SIRS folder first time setup

Firstly, install the needed packages and tools **(se faltar alguma coisa, adicionem neste script)**
```sh
./scripts/setup.sh
```
If you want to re-run this script only to configure the network and nginx, run with the `--skip-install` flag, like so:
```sh
./scripts/setup.sh --skip-install
```

##### Running the Server

If it is the first time running the server, run with
```sh
./scripts/all.sh --cert-gen
```

This will create and sign the certificate for the server and adds it to the trusted servers in this machine

From now on, the server can be run simply with
```sh
./scripts/all.sh
```
##### [Optional] Tmux

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

##### Beware

The certificate is being configured with the common name `localhost`

This should be changed to the public IP Address or, instead, the requests to that IP should be redirected to the `localhost`

If the certificate is changed, the nginx.conf will also probably need to be changed accordingly 

## SetUp VM2 - Firewall 
#### filehash:
#### vm disk image name:


## SetUp VM3 - DatabaseServer 
#### filehash:
#### vm disk image name:
login user: `rui`
Type: Linux
Version: Red Hat (64-bit)
Distribution: CentOS
Default settings

##### Open terminal and pull remote repository from github
Clone repository https://github.com/RuiDGPires/SIRS.git
```sh
git clone https://github.com/RuiDGPires/SIRS.git
```

Check if directory SIRS was created and try to access
```sh
cd SIRS
```

Move to database branch
```sh
git checkout database
```

Pull to database branch
```sh
git pull
```

##### One the vm is running, inside the SIRS folder first time setup

Run

```sh
./scripts/setup.sh
```

##### Next times, run when booting up:

```sh
./scripts/setup.sh --skip-install
```

##### Reset the Database

Usar a pass: **sirsebuefixe**
```sh
./scripts/db.sh
>>> \i sql/schema.sql
>>> \i sql/populate.sql
>>> \q
```

## SetUp VM4 - Frontend 
#### filehash:
#### vm disk image name:
##### Setup

```sh
sudo apt update
```
```sh
sudo apt install npm
```
```sh
npm install
```

You may need: 
```sh
npm config set strict-ssl false
```

Copy folder frontend, inside the folder SIRS of the zip file into the virtual machine and then access it
```sh
cd pathTo/frontend
``` 

##### Unexpected ERROR message on npm start (Possible fix)
You may need to manually delete the node_modules generated files and run
```sh
npm install
```

If error persist, redo the last step and after running `npm install`, do 
```sh
npm i -S @react-google-maps/api
```

##### Unexpected token on npm start (Possible fix)
```sh
curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
```

```sh
nvm install 18.0.0
```
Try again 

```sh
npm install
```

##### Run
```sh
npm run start
```
