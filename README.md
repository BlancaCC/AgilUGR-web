# AgilUGR-web
Web and backend for the app AgilUGR built for NPI

## Cómo levantar el backend

### Paquetes necesarios
- Node
- npm

### Pasos para levantar backend

0. Estar en la carpeta de backend.  
1. Instalar paquetes como express. 
`npm install`

2. `npm start`  levantar servidor.

Si todo es correcto aparecerá en la terminal:

```
> backend@1.0.0 start <TU-PATH>/AgilUGR-web/backend
> node index.js

Agil UGR listening at http://localhost:8000

```

## Para probarlo

### Para ver estado de la app

Usar una petición get a la raiz.

Esto es tan simple como abrir el navegador y escribir:
` http://localhost:8000`.


### Sobreescribir estado de la app

Se hará por peticiones put.
Las estructuras de la petición son las siguientes.

` http://localhost:8000/<atributo stado>/<valor atributo`

un ejemplo sería
`http://localhost:8000/view/home`
Esto indicaría que dentro de la estructura que guarda el estado de la app.
Para la propiedad view, acualizamos su valor a home.

#### ¿Cómo poder hacer una petición put?

##### Usando VSCODE  
Recomiendo instalar el pluggin thunder-client
( https://www.producthunt.com/posts/thunder-client )

![Ejemplo de comando](./media/put-example)

1. Abrir pluggin
1.2 Pulsar new request (o algo por el estilo, el único botón de arriba a la izquierda). 
2. Donde pone tipo de petición arriba izquierda (métodos GET, PUT...)
Cambiar a PUT.
copiar la estrutura de la petición esto es 
` http://localhost:8000/<atributo stado>/<valor atributo`
como por ejemplo: 
`http://localhost:8000/view/home`

(Ver foto put-example)