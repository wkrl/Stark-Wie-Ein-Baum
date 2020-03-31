# Stark-Wie-Ein-Baum

### About
["Stark wie ein Baum!“](https://www.hof-grueneberg.de/Stiftung/Stiftung-hof-grueneberg/#c1669) ist ein Gemeinschaftsprojekt des Caritas-Kinderhospizdienstes und der [Stiftung Hof Grüneberg](https://www.hof-grueneberg.de/stiftung/stiftung-hof-grueneberg/).

http://app.stark-wie-ein-baum.de/

### Demo
#### Backend:
#### Starting in production mode
```
cd api
sudo docker-compose build
sudo docker-compose up
```

#### Starting in dev mode
```
cd api
export FLASK_ENV=dev
source venv/bin/activate
source .env
flask run
```
The flask-server runs on http://127.0.0.1:5000

#### Frontend
```
cd app
npm install
npm start
```
Frontend runs on https://127.0.0.1:3000

### (TODO) API Documentation
https://swebapi.demo.datexis.com/api

                 /api/karte
                    
                 /api/karte/baeume
                    
                 /api/karte/baeume/id
                    
                 /api/karte/baeume/id/koordinaten
                 
                 /api/karte/baeume/properties

### HOW TO
mysql -u kat -p -P 3308 -h 127.0.0.1 restfulFlask < mysql_init.sql 

                
