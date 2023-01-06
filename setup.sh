#!/bin/sh

sudo /sbin/iptables -P INPUT DROP
sudo /sbin/iptables -P FORWARD ACCEPT
sudo /sbin/iptables -P OUTPUT DROP

sudo /sbin/iptables -A INPUT -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT
sudo /sbin/iptables -A OUTPUT -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT

sudo /sbin/iptables -A FORWARD -m state --state ESTABLISHED -j ACCEPT
sudo /sbin/iptables -A FORWARD -p tcp --dport 5432 -s 192.168.1.0/24 -d 192.168.0.10 -j ACCEPT

sudo /sbin/iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.2:3000
