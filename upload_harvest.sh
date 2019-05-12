scp -i /Users/liurongxiao/rongxiaol.pem -r ./tweets_harvester ubuntu@172.26.37.189:.
scp -i /Users/liurongxiao/rongxiaol.pem -r ./tweets_harvester ubuntu@172.26.37.200:.
scp -i /Users/liurongxiao/rongxiaol.pem -r ./tweets_harvester ubuntu@172.26.38.0:.
scp -i /Users/liurongxiao/rongxiaol.pem -r ./tweets_harvester ubuntu@172.26.38.153:.
ssh -i /Users/liurongxiao/rongxiaol.pem ubuntu@172.26.37.189 "cd tweets_harvester; chmod 777 ./harvest_Sydney.sh; nohup ./harvest_Sydney.sh >nohup.out 2>&1 &"
ssh -i /Users/liurongxiao/rongxiaol.pem ubuntu@172.26.37.200 "cd tweets_harvester; chmod 777 ./harvest_Melbourne.sh; nohup ./harvest_Melbourne.sh >nohup.out 2>&1 &"
ssh -i /Users/liurongxiao/rongxiaol.pem ubuntu@172.26.38.0 "cd tweets_harvester; chmod 777 ./harvest_Brisbane.sh; nohup ./harvest_Brisbane.sh >nohup.out 2>&1 &"
ssh -i /Users/liurongxiao/rongxiaol.pem ubuntu@172.26.38.153 "cd tweets_harvester; chmod 777 ./harvest_Perth.sh; nohup ./harvest_Perth.sh >nohup.out 2>&1 &"