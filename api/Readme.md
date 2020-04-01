## starting sweb-backend
### docker

cd sweb_backend/
```
docker build -t <registry>/<namespace>/sweb-backend:<tag> -f ../Dockerfile .
docker push <registry>/<namespace>/sweb-backend:<tag>

```

## docker-compose
cd sweb_backend/

```
docker-compose build
docker-compose up

```
