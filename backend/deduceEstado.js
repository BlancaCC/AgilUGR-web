/** Dado un estado 
 * y un nuevo valor actualiza el estado 
 * El Nombre de la función indica el gesto que se ha actualizado*/

// umbral de tiempo en milisegundos
const umbralTiempoMs = 1200;
const vistas = ['focus', 'profile', 'stats']

const leapFile = './leapState.json'

const GESTOS = {
    swipe : 'swipe', 
    circle : 'circle', 
    fingers : 'fingers', 
    tap : 'tap'
}

const retryOptions = {
    retries: {
        retries: 5,
        factor: 3,
        minTimeout: 1 * 50,
        maxTimeout: 1 * 1000,
        randomize: false,
    }
};

const ModificaStateLeap = ( attribute, value ) => {
    lockfile.lock(leapFile, retryOptions)
.   then(() => {
        // leemos contenido actual a sobreescribir
        const state = fs.readJSON(leapFile, {throws: false})
        .then(obj => {
        // actualizamos el valor del Json
        const newState = obj
        newState[attribute] = value
        fs.writeJson(leapFile, newState)
        return obj
        })
        .catch(err => console.error(err))  
    return lockfile.unlock(leapFile);
    })
    .catch((e) => {
        // either lock could not be acquired
        // or releasing it failed
        console.error(e)
    });
}


// ------------ SWIPE -------
// según la documentación de leap estas son las direcciones de SWIPE
const SWIPE_DIRECTION = {
    right : "right",
    left : "left",
    up : "up", 
    down : "down"
}
/**
 * 
 * @param {*} leapState : json leído del fichero
 * @param {*} frontendState : json 
 * @param {*} value String con un valor de SWIPE_DIRECCION
 */
export const Swipe = (leapState, frontendState, value) => {
    // Comprobamos que ha pasado el tiempo suficiente como para actualizar 
    var horaActual = new Date(); 
    if( horaActual - leapState.Swipe > umbralTiempoMs ) {
        const leapActual = ModificaStateLeap(GESTOS.swipe, horaActual)

    }
}