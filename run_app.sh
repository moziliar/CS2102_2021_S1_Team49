#!/bin/bash

set -m
ls /usr/local/bin/
/usr/local/bin/envoy -c /etc/envoy/envoy.yaml &

npm run build

npm run webapp-dev &

npm run start
