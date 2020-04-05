## using sweb-backend
### docker (prod-mode)

```
cd $PATH/api/sweb_backend/

docker build -t <registry>/<namespace>/sweb-backend:<tag> -f ../Dockerfile .
docker push <registry>/<namespace>/sweb-backend:<tag>

```

## docker-compose (prod-mode)
you'll need a .env in api/

```
cd $PATH/api/
docker-compose build
docker-compose up

```

## virtualenv (dev-mode)
you'll need a .env in api/sweb_backend/


```
cd $PATH/api/sweb_backend/
python3 -m virtualenv venv
pip3 install -r requirements.txt
source .env
export FLASK_ENV=dev

```

