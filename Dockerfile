FROM node:4-onbuild

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
RUN npm install node-hue-api sleep

EXPOSE 8088
ENTRYPOINT [ "npm", "start" ]
