#!/bin/bash

/usr/local/bin/envoy -c /etc/envoy/envoy.yaml &

npm run start
