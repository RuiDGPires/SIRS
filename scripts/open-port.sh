#!/bin/sh

sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
