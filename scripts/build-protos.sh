#!/bin/bash

BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../

PROTO_DEST=./src/app/protos
JS_PROTO_DEST=./dist/server/protos

mkdir -p ${PROTO_DEST}
mkdir -p ${JS_PROTO_DEST}

# JavaScript code generation
yarn run grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DEST} \
    --grpc_out=${PROTO_DEST} \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    -I ./proto \
    proto/*.proto

# TypeScript code generation
yarn run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=${PROTO_DEST} \
    -I ./proto \
    proto/*.proto

# FE code generation
yarn run grpc_tools_node_protoc -I=./proto proto/*.proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${PROTO_DEST}