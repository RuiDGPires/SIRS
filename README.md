# README

## SetUp VM1 - ApplicationServer 
Type: Linux
Version: Red Hat (64-bit)
Distribution: CentOS Linux 7 (Core) Kernel 3.10.0-1160.81.1.el7.x86_64 on an x86_64
Default settings
#### filehash:
#### vm disk image name: VM1.ova
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

Note: trace logs present in such directory

##### Once the vm is running go to `SIRS` folder `ls` and `cd SIRS`. And inside the SIRS folder: first time setup

Firstly, install the needed packages and tools
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
#### vm disk image name: VM2.ova
For this machine it was used the setup provided in the labs of SIRS:
https://github.com/seed-labs/seed-labs/blob/master/manuals/vm/seedvm-manual.md

Now,
- Select the VM Settings/Network/Adapter1
- Attach to `Internal Network`. Call it sw-1
- Promiscuous Mode: Allow VMs

Repeat for VM2 and VM3 but creating a second Network adapter in VM2 and calling the `Internal Network` sw-2.

Finally, create a third Network adapter in VM2 that is `nat`-ed with your physical address. 
This interface will be used to access the Internet.
##### After setting up following the above instructions

You have to edit the corresponding `/etc/netplan/01-network-manager-all.yaml`

```
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
  ethernets:
      enp0s3:
          addresses:
              - 192.168.1.254/24
      enp0s8:
          addresses:
              - 192.168.0.100/24
      enp0s9:
          dhcp4: true
          addresses:
              - 192.168.2.254/24
```

After editing the file run:

```bash
$ sudo netplan try
$ sudo netplan apply
```

You should also enable IP forwarding permanently on VM2. For that you need to edit `/etc/sysctl.conf` and uncomment the following line

```bash
net.ipv4.ip_forward=1
```

To make the iptables rules persistent, in VM2 install (select "yes" to save the current rules):

```bash
$ sudo apt install iptables-persistent
```
To save the current rules again, do:
```bash
# FOR IPv4
$ sudo sh -c 'iptables-save > /etc/iptables/rules.v4'
```

##### Each time the machine is initialized do
```bash
sudo iptables -t nat -F            
sudo iptables -t nat -A POSTROUTING  -o enp0s9 -j MASQUERADE    
```

##### To set up the firewall
TODO

## SetUp VM3 - DatabaseServer 
#### filehash:
#### vm disk image name: VM3.ova
login user: `rui`
Type: Linux
Version: Red Hat (64-bit)
Distribution: CentOS Linux 7 (Core) Kernel 3.10.0-1160.81.1.el7.x86_64 on an x86_64
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
Note: trace logs present in such directory
##### Once the vm is running go to `SIRS` folder `ls` and `cd SIRS`. And inside the SIRS folder: first time setup

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
#### vm disk image name: VM4.ova
For this machine it was used the setup provided in the labs of SIRS:
https://github.com/seed-labs/seed-labs/blob/master/manuals/vm/seedvm-manual.md

Now,
- Select the VM Settings/Network/Adapter1
- Attach to `Internal Network`. Call it sw-1
- Promiscuous Mode: Allow VMs

##### After setting up following the above instructions

You have to edit the corresponding `/etc/netplan/01-network-manager-all.yaml`

```
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
  ethernets:
      enp0s3:
          addresses:
              - 192.168.1.2/24
          routes:
              - to: 0.0.0.0/0
                via: 192.168.1.254
```

After editing the file run:

```bash
$ sudo netplan try
$ sudo netplan apply
```

##### One the virtual machine is up do the frontend setup

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
