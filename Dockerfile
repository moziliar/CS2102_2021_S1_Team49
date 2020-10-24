FROM envoyproxy/envoy:v1.15-latest
COPY ./envoy.yml /etc/envoy/envoy.yaml
EXPOSE 9090
CMD ["/usr/local/bin/envoy", "-c", "/etc/envoy/envoy.yaml", "&"]

FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
