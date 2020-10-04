FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["ENV=$ENV DATABASE_URL=$DATABASE_URL npm", "start"]