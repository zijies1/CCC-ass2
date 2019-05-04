# https://hackernoon.com/running-a-couchdb-2-0-cluster-in-production-on-aws-with-docker-50f745d4bdbc

# Download and run scripts to configure Ubuntu and Docker
git clone https://github.com/redgeoff/docker-ce-vagrant
cd docker-ce-vagrant
sudo ./ubuntu.sh # Select "keep the local version ... "
sudo ./docker.sh

# Create a directory for hosting your DB files
rm -rf /home/ubuntu/common
mkdir /home/ubuntu/common

# Run a CouchDB Docker Container and make sure to replace DB1-PRIVATE-IP accordingly.
sudo docker run -d --name couchdb \
--log-opt max-size=100m \
--restart always \
-p 5984:5984 \
-p 5986:5986 \
-p 4369:4369 \
-p 9100-9200:9100-9200 \
-v /home/ubuntu/common/data:/opt/couchdb/data \
-e COUCHDB_USER='admin' \
-e COUCHDB_PASSWORD='-pbkdf2-b1eb7a68b0778a529c68d30749954e9e430417fb,4da0f8f1d98ce649a9c5a3845241ae24,10' \
-e COUCHDB_SECRET='mysecret' \
-e NODENAME='$1' \
#The first parameter of the .sh is the instance's IP address
couchdb \
-setcookie mycookie

# Enable CORS so that your application can communicate with the database from another domain/subdomain.
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential
sudo npm install npm -g
sudo npm install -g add-cors-to-couchdb
add-cors-to-couchdb http://localhost:5984 -u admin -p admin
