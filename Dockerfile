FROM node:current-alpine3.13
RUN mkdir ./react-frontend
COPY ./package.json ./react-frontend
COPY ./package-lock.json ./react-frontend
WORKDIR ./react-frontend
RUN npm install -d --registry=https://registry.npm.taobao.org --legacy-peer-deps --save
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
