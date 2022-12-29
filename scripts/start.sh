#!/bin/sh

readonly CWD=$(dirname "$0")
readonly LOGS=$CWD/../logs/

if [ ! -d "$LOGS" ]; then
	mkdir $LOGS
fi

#gunicorn -w 4 -b localhost:5000 server:app
$CWD/open-port.sh
gunicorn --log-level DEBUG --access-logfile $LOGS/gunicorn.log -w 4 -b localhost:5000 server:app
