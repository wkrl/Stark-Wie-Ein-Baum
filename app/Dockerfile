FROM node:18 AS buildbase

# copy local build files into image
COPY build .

ENV env=production

FROM buildbase

RUN npm install -g serve

CMD serve -s build -l 3000

