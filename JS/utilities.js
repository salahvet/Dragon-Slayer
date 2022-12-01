'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* *********************************** FONCTIONS UTILITAIRES *********************************** */
/*************************************************************************************************/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Number(Math.floor(Math.random() * (max - min + 1)) + min);
}

function throwDices(nDes,nFaces){
    let desRandom = 0;
    for (let y = 0; y < nDes; y++) {
        desRandom = desRandom + getRandomInt(1,nFaces);      
    }
    return desRandom;
    // return Number;
}