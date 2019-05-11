curl "http://45.113.232.90/couchdbro/twitter/_design/twitter/_view/summary" \
-G \
--data-urlencode 'start_key=["perth",2014,12,1]' \
--data-urlencode 'end_key=["perth",2014,12,31]' \
--data-urlencode 'reduce=false' \
--data-urlencode 'include_docs=true' \
--user "readonly:ween7ighai9gahR6" \
-o ./1415Perth.json
python3 save2db.py 'Perth' './1415Perth.json'
python3 tweets_search_harvester.py 'Perth'