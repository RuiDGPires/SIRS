#!/bin/sh
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 5432 -j ACCEPT
sudo systemctl restart postgresql

