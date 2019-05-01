#!/bin/bash

. ./openrc.sh; ansible-playbook --ask-become-pass nectar.yml
#. ./openrc.sh; ansible-playbook show_servers.yml
#. ./openrc.sh; ansible-playbook attach_volume.yml
