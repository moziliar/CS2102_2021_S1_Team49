FROM envoyproxy/envoy:v1.16.0

FROM node
COPY --from=0 /usr/local/bin/envoy /usr/local/bin/envoy
COPY envoy.yaml /etc/envoy/envoy.yaml
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN ["chmod", "+x", "run_app.sh"]
EXPOSE 9090
EXPOSE 9901
EXPOSE 8081
EXPOSE 8080
CMD ./run_app.sh
