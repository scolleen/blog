FROM node:6-onbuild
EXPOSE 3000
RUN npm install -g forever
ENTRYPOINT forever --spinSleepTime 1000 --minUptime 1000 ./bin/www