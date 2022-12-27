#!/bin/sh

gunicorn -w 4 -b localhost:5000 server:app
