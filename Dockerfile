FROM node:4-onbuild

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
RUN npm install

EXPOSE 8080
# CMD [ "npm", "start" ]
CMD [ "/bin/bash"]

# docker build -t phillips-hue-api --no-cache .
# docker run -it -P --rm --name phillips-hue-api phillips-hue-api
