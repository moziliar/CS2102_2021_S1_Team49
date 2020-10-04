#!/bin/bash

BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../

PROTO_DEST=C:/Users/user/Desktop/CS2102_2021_S1_Team49/src/app/protos
JS_PROTO_DEST=./dist/server/protos

mkdir -p ${PROTO_DEST}
mkdir -p ${JS_PROTO_DEST}

# JavaScript code generation
yarn run grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DEST} \
    --grpc_out=${PROTO_DEST} \
    --plugin=protoc-gen-grpc=C:/Users/user/Desktop/CS2102_2021_S1_Team49/node_modules/.bin/grpc_tools_node_protoc_plugin.cmd \
    -I ./proto \
    proto/*.proto

# TypeScript code generation
yarn run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=C:/Users/user/Desktop/CS2102_2021_S1_Team49/node_modules/.bin/protoc-gen-ts.cmd \
    --ts_out=${PROTO_DEST} \
    -I ./proto \
    proto/*.proto