#!/bin/python3

import pexpect

child = pexpect.spawn("psql -d sirs -U master")
child.expect(".+")
child.sendline("sirsebuefixe")
child.interact()
