# Cómo lanzar el contenedor 

1. Descargamos la imagen
```
docker pull mariadb:10.4
```
2. Corremos la imagen
```
sudo  docker run --name mariadbtest -e MYSQL_ROOT_PASSWORD=pass -p 13306:3306 -d docker.io/library/mariadb:10.4
```

Con esto las credenciales son: 
Sobre puerto: 133306 
contraseña: pass

3. Accedemos al contenedor para meter los datos pertinenetes:   

```
sudo docker exec -it mariadbtest /bin/bash  
```

4. Dentro de la terminal hacer:   
```
mysql -uroot -ppass
```

Y copiar el contenido del docker:   

```sql
CREATE DATABASE agil; 
CREATE TABLE agil.webState (
    id int auto_increment,  
    view VARCHAR(100),
    counter int, 
    action VARCHAR(100), 
    indice_tiempo int, 
    time_action VARCHAR(20), 
    ultima_modificacion timestamp, 
    primary key(id)
); 

INSERT INTO agil.webState(view, ultima_modificacion) VALUES 
('profile', CURRENT_TIMESTAMP(1));

UPDATE agil.webState SET 
    view = 'focus', 
    counter = 1, 
    indice_tiempo = 1,
    action = 'ninguna',
    time_action = 'EN_MOVIMIENTO',
    ultima_modificacion = CURRENT_TIMESTAMP(2)
    WHERE id=1;

SELECT * FROM agil.webState; 
```

VAmos a localizar la dirección IP de nuestro contendor 
```
docker inspect mariadbtest | grep 'IPAddress'
```
Ejemplo de ejecución

```
blanca@Maquinaciones ~/r/AgilUGR-web (blanca#28) [1]> docker inspect mariadbtest | grep 'IPAddress'                                                             (base) 
            "SecondaryIPAddresses": null,
            "IPAddress": "172.17.0.2",
                    "IPAddress": "172.17.0.2",
```   

Ahora con esto podríamos acceder al contenedor 

```
blanca@Maquinaciones ~/r/AgilUGR-web (blanca#28) [1]> mysql -u root -p -h 172.17.0.2                                                                            (base) 
Enter password: 
```