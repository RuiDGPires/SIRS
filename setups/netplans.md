# Netplans

## Database netplan

```
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
  ethernets:
      enp0s3:    # or enp0s8, if you have it enabled instead
          addresses:
              - 192.168.0.10/24
          routes:
              - to: 0.0.0.0/0
                via: 192.168.0.100
```

## Application Server

```
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
  ethernets:
      enp0s3:
          addresses:
              - 192.168.1.1/24
          routes:
              - to: 0.0.0.0/0
                via: 192.168.1.254
```

## Firewall

```
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
  ethernets:
      enp0s3:
          addresses:
              - 192.168.1.254/24
      enp0s8:
          addresses:
              - 192.168.0.100/24
      enp0s9:
          dhcp4: true
          addresses:
              - 192.168.2.254/24
```

## Utils

`sudo netplan try`
`sudo netplan apply`
