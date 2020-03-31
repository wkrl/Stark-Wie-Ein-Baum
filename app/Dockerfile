# base image
FROM node:12.2.0-alpine AS buildbase

# get code into container
COPY . .

ENV env=production

RUN npm install
# start app
RUN npm run-script build


FROM buildbase

RUN npm install -g serve

CMD serve -s build -l 3000
