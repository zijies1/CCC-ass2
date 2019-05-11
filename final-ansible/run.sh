#!/bin/bash
#. ./openrc.sh; ansible-playbook -i ./inventory/hosts.ini -u ubuntu --key-file=~/.ssh/xudongm.pem docker.yml
#. ./openrc.sh; ansible-playbook nectar.yml
#sleep 100
#. ./openrc.sh; ansible-playbook -i ./inventory/hosts.ini -u ubuntu --key-file=~/.ssh/xudongm.pem docker.yml
#ansible-playbook -i ./inventory/hosts.ini docker.yml
#ansible-playbook -i ./inventory/hosts.ini swarm.yml
#. ./openrc.sh; ansible-playbook -i ./inventory/hosts.ini add_key.yml
#ansible-playbook -i ./inventory/hosts.ini install_tools.yml
