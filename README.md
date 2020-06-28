# Stark-Wie-Ein-Baum

<img align="right" width="auto" height="300" src="./app/src/images/logo.png">

### About
["Stark wie ein Baum!“](https://www.hof-grueneberg.de/Stiftung/Stiftung-hof-grueneberg/#c1669) ist ein Gemeinschaftsprojekt des Caritas-Kinderhospizdienstes und der [Stiftung Hof Grüneberg](https://www.hof-grueneberg.de/stiftung/stiftung-hof-grueneberg/).

http://app.stark-wie-ein-baum.de/

### Backend:
#### Starting in production mode
```
cd api
sudo docker-compose build
sudo docker-compose up
```

#### Starting in dev mode
you need a .env in api/

```
cd api
python3 -m virtualenv venv
source venv/bin/activate
source .env
export FLASK_ENV=dev
flask run
```
The flask-server runs on http://127.0.0.1:5000

#### Building a docker image
you need a .env in api/sweb-backend/

```
cd api/sweb_backend/
docker build -t <registry>/<namespace>/sweb_backend:<tag> -f ../Dockerfile .
docker push <registry>/<namespace>/sweb_backend:<tag> 
```

### Frontend
```
cd app
npm install
npm start
```
Frontend runs on https://127.0.0.1:3000

### current domains

swebapi.demo.datexis.com (api baseurl used by frontend)
swebapi.dev.demo.datexis.com (development: test and approve new changes)
swebapi.monitoring.demo.datexis.com (monitoring app that sends an email if /api/karte does not return <200>)

admin.stark-wie-ein-baum.de (accessing the admin portal)
app.stark-wie-ein-baum.de (accessing sweb frontend)


                
