#!/bin/sh

if [ ! "$1" = "--skip-install" ]; then
	sudo yum update -y
	sudo yum install python3 python3-pip3 -y
	sudo yum install python3-devel -y
	sudo yum install nginx -y
	sudo yum install tmux -y
	sudo yum install postgresql -y

	sudo pip3 install flask
	sudo pip3 install pyotp
	sudo pip3 install psycopg2
	sudo pip3 install pexpect
	sudo pip3 install gunicorn
fi

readonly CWD=$(dirname "$0")
readonly NETWORKFILE=$CWD/../ifcfg-enp0s8 
readonly NGINXFILE=$CWD/../nginx.conf

$CWD/netconfig $NETWORKFILE
$CWD/nginx-configure $NGINXFILE
