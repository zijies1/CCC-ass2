chmod 777 tweets_search_harvester.py
nohup python3 tweets_search_harvester.py 'Brisbane' >nohup1.out 2>&1 &
curl "http://45.113.232.90/couchdbro/twitter/_design/twitter/_view/summary" \
-G \
--data-urlencode 'start_key=["brisbane",2014,1,1]' \
--data-urlencode 'end_key=["brisbane",2015,12,31]' \
--data-urlencode 'reduce=false' \
--data-urlencode 'include_docs=true' \
--user "readonly:ween7ighai9gahR6" \
-o ./1415Brisbane.json
chmod 777 save2db.py
nohup python3 save2db.py 'Brisbane' './1415Brisbane.json' >nohup2.out 2>&1 &