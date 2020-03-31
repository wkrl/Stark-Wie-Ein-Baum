# Stark-Wie-Ein-Baum

**Homepage Hof Grüneberg**<br>
https://www.hof-grueneberg.de/stiftung/stiftung-hof-grueneberg/

### DEV-MODE
### server

```
cd Stark-Wie-Ein-Baum/api/venv
source bin/activate
flask run
```

The flask-server runs on http://127.0.0.1:4000

### proxy & frontend
- configuration allows starting proxy-server and frontend concurrently

```
cd Stark-Wie-Ein-Baum/app
npm run dev

```

The app runs on http://127.0.0.1:3000
The proxy runs on http://127.0.0.1:5000

### CI/CD

Api:

```
sudo docker build -t registry/namespace/imagename -f docker/api.Dockerfile .
sudo docker push registry/namespace/imagename

```

DB:
- just apply k8s deployment mounting a PV
