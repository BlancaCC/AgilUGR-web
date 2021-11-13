const fs = require('fs-extra')
const leapFile = './leapStateInit.json'
const lockfile = require('proper-lockfile');

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
    .then(() => {
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

const GESTOS = {
    swipe : 'swipe', 
    circle : 'circle', 
    fingers : 'fingers', 
    tap : 'tap'
}
// crea estado inicial dle ficherillo 

const date = new Date()
ModificaStateLeap(GESTOS.swipe, date)
ModificaStateLeap('swipe-balance', 1)
ModificaStateLeap(GESTOS.circle, date)
ModificaStateLeap(GESTOS.fingers, date)
ModificaStateLeap(GESTOS.tap, date)
