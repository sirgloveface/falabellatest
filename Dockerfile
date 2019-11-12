FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN apt update
RUN apt install nano
RUN npm install

EXPOSE 3000


