#!/bin/sh

if [ ! "$1" = "--skip-install" ]; then
	sudo yum update -y
	sudo yum install python3 python3-pip3 -y
	sudo yum install tmux -y
	sudo yum install postgresql -y
fi

readonly CWD=$(dirname "$0")
readonly NETWORKFILE=$CWD/../ifcfg-enp0s8 

$CWD/netconfig $NETWORKFILE
$CWD/open-port.sh
