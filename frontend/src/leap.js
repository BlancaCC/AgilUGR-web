// FUNCIONES PROPIAS
/*
leftSwite recibe el valor de la coordenada x del dedo meñique y determina si está o no en posición <-0.5
Esto significa que la mano está girada hacia la izquierda
Las salidas posibles {NADA, IndicaIzquierda, IndicaDerecha}
*/
export function Indica(array_puntos) {
var movimiento = 0; //"NULL" ; 
const umbral = 0.6;

if(  array_puntos !== null){
  movimiento = 0; // "FRENTE"
  var digits = (array_puntos[1] +  array_puntos[2] +  array_puntos[3] +  array_puntos[0]) / 4.0;
    if (digits<(- umbral)){
      movimiento = -1; //"IndicaIzquierda";
    }
    else if (digits>(umbral)){
      movimiento = 1;//"IndicaDerecha";
    }
}
  return movimiento;   
}



/*
  Computa si la media de los datos están apuntando al frente
Salida {NO-COMPUTABLE, 0,1,2,3,4,5}
*/
export function NumeroDedosAbiertos (frame_pointables) {
  var salida = 'NO-COMPUTABLE';
  // tienen que estar apuntando al frente la media
  if( 0 === Indica(
  [frame_pointables[1]?.direction[0],
  frame_pointables[2]?.direction[0],
  frame_pointables[3]?.direction[0],
  frame_pointables[4]?.direction[0]] )) {

      // contmos los numeros de dedos extendidos 
      var contador = 0;
      for (var j = 0; j < frame_pointables.length; j++) {
        if( frame_pointables[j]?.extended === true){
          contador += 1;
        }
      }
      salida = contador
    }
  return salida 
}

export const VISTAS_STRUCTURA = {
    '/focus': 0, 
    '/profile' : 1, 
    '/stats' : 2, 
}

export const VISTAS_ARRAY = [ 'focus', 'profile','stats' ]


export const ValorIndice = (FRAMES) => {
  var  suma = 0;
  FRAMES.forEach(element => {
    suma += element.indice
  });
  
  var resultado = suma/FRAMES.length;
  if (resultado<-0.6){
    resultado=-1;
  }
  else {
    if (resultado>0.4){
      resultado=1;
    }
    else
      resultado=0;
  }
  //alert (resultado)
  return resultado;
}