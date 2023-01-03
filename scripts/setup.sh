#!/bin/sh

if [ ! "$1" = "--skip-install" ]; then
	sudo yum update -y
	sudo yum install python3 python3-pip3 -y
	sudo yum install tmux -y
	sudo yum install postgresql -y
fi

readonly CWD=$(dirname "$0")
readonly NETWORKFILE=$CWD/../ifcfg-enp0s8 
readonly PG_CONF=$CWD/../pg_hba.conf
readonly PSQL_CONF=$CWD/../postgresql.conf

$CWD/cert-configure $CWD/../cert/cert-db $CWD/../cert/cert-server
$CWD/psql-configure $PG_CONF $PSQL_CONF
$CWD/netconfig $NETWORKFILE
$CWD/open-port.sh
