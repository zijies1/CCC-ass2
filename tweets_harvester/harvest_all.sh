
ssh -i /Users/liurongxiao/rongxiaol.pem ubuntu@172.26.37.189 "cd tweets_harvester; chmod 777 ./harvest_Sydney.sh; nohup ./harvest_Sydney.sh >/dev/null 2>&1 &"
ssh -i /Users/liurongxiao/rongxiaol.pem ubuntu@172.26.37.241 "cd tweets_harvester; chmod 777 ./harvest_Melbourne.sh; nohup ./harvest_Melbourne.sh >/dev/null 2>&1 &"
ssh -i /Users/liurongxiao/rongxiaol.pem ubuntu@172.26.38.153 "cd tweets_harvester; chmod 777 ./harvest_Brisbane.sh; nohup ./harvest_Brisbane.sh >/dev/null 2>&1 &"
ssh -i /Users/liurongxiao/rongxiaol.pem ubuntu@172.26.38.174 "cd tweets_harvester; chmod 777 ./harvest_Perth.sh; nohup ./harvest_Perth.sh >/dev/null 2>&1 &"