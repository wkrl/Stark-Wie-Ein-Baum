FROM node:18 AS buildbase

# copy project files with local build dir
COPY . .

ENV env=production

FROM buildbase

RUN npm install -g serve

EXPOSE 3000

CMD serve -s build -l 3000

