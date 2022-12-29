#!/bin/sh

TRUE=1
FALSE=0

readonly CWD=$(dirname "$0")

gencertificate="$FALSE"

if [ ! -d "$CWD/../cert/" ]; then
	mkdir $CWD/../cert
fi

if [ "$1" = "--cert-gen" ]; then
	gencertificate="$TRUE"
fi

readonly cert_name=$CWD/../cert/cert-server

echo "Stopping NGINX if it is running..."
echo ""

sudo nginx -s stop

if [ "$gencertificate" = "$TRUE" ]; then
	echo ""
	echo "Generating certificate..."
	echo ""

	$CWD/cert-generate $cert_name

	echo ""
	echo "Configuring certificate..."
	echo ""

	$CWD/cert-configure $cert_name
fi

echo ""
echo "Starting NGINX..."
echo ""

sudo nginx

cd $CWD/../

echo ""
echo "Starting gunicorn..."
echo ""

$CWD/start.sh
