var url = 'http://localhost:8000/mariadb/'  

// Funciones a llamar en el fichero de leap
/**
 * Manda una petición 
 * @param {*} data variable a enviar
 * @param {*} route a qué ruta se le hace el put
 */
const putData = (route, data) => {
    const custom_url = url + route + '/' + data
    axios.put( custom_url) 
        .then(response => {
            const data = response.data;
            console.log(`PUT to ${custom_url}`, data);

            //Para(`Se ha enviado ${custom_url}`)
        })
        .catch(error => alert(error));
}
const Para = (ms) => {
    alert(ms)
}
//---------------- ----
// Funciones con las que testear. Tienen sentido dentro del fichero pruebasPut.html 
// Es una petición de lectura de la web 
const fetchDataAux = () => {
// Cogemos los valores 
var swipe = document.getElementById("swipe").value
var dedos = document.getElementById("dedos").value
var tap = document.getElementById('tap').value 
// actualizamos el contenido, haciendo peticiones de put

//refrescamos el contenido de la página
axios.get(url)
.then(response => {
    const data = response.data;
    console.log(`GET data`, data);
    // Recargamos el div que hay al final de pruebasPut.html
    document.getElementById("mensaje").innerHTML = JSON.stringify(data);
})
.catch(error => console.error(error));
};






