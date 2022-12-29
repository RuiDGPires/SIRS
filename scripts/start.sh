#!/bin/sh

readonly CWD=$(dirname "$0")
readonly LOGS=$CWD/../logs/

if [ ! -d "$LOGS" ]; then
	mkdir $LOGS
fi

#gunicorn -w 4 -b localhost:5000 server:app
gunicorn --log-level DEBUG --access-logfile $LOGS/gunicorn.log -b localhost:5000 server:app
