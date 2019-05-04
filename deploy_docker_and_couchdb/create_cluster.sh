git clone https://gist.github.com/redgeoff/5099f46ae63acbd8da1137e2ed436a7c create-cluster
cd create-cluster
chmod +x ./create-cluster.sh
./create-cluster.sh admin admin 5984 5986 "$1 $2"
