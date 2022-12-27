#!/bin/sh

readonly CWD=$(dirname "$0")
readonly cert_name=$CWD/../cert/cert-server

echo "Stopping NGINX if it is running..."
echo ""

sudo nginx -s stop

echo ""
echo "Generating certificate..."
echo ""

$CWD/cert-generate $cert_name

echo ""
echo "Configuring certificate..."
echo ""

$CWD/cert-configure $cert_name

echo ""
echo "Starting NGINX..."
echo ""

sudo nginx

cd $CWD/../

echo ""
echo "Starting gunicorn..."
echo ""

$CWD/start.sh
