# Cómo lanzar el backend 

`npm install`
`npm start` 
Para comprobar que esta funcionando abrir navegador o consulta de get a `http://localhost:8000/`

Para crear la imagen ` sudo docker build -t blanca/agil-api . `

Tras haber seguido los pasos: https://alphonso-javier.medium.com/express-mariadb-with-docker-compose-d1af1dfae985. 


### Para empezar mariadb

Esto por primera vez   

```
sudo docker pull mariadb:latest
docker run -p 3306:3306 -d --name docker-mariadb -e MYSQL_ROOT_PASSWORD=password mariadb:latest
sudo docker exec -it docker-mariadb /bin/bash
```


