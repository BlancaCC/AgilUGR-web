// Store frame for motion functions
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};


//---------------------------------------------------------------------------
// VARIABLES GLOBALES PARA LOS DATOS DE VISTA

/*
   Asigna a cada vista un valor entero
*/
const VISTAS_STRUCTURA = {
    'focus': 0, 
    'profile' : 1, 
    'stats' : 2, 
}

/*
   Asigna a cada valor (posición en el array) una vista
*/
export const VISTAS_ARRAY = [ 'focus', 'profile','stats' ]

/*
  En función de los valores recogidos en el FRAME,
  determina si la mano está posicionada a la izquierda o derecha
  en función de la cantidad de veces que se estima ese resultado
  en los 20 últimos datos aportados por el Leap
*/
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

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {
  if (paused) {
    return; // Skip this update
  }

  // Display Frame object data
  var frameOutput = document.getElementById("frameData");

  var frameString = "Frame ID: " + frame.id  + "<br />"
                  + "Timestamp: " + frame.timestamp + " &micro;s<br />"
                  + "Hands: " + frame.hands.length + "<br />"
                  + "Fingers: " + frame.fingers.length + "<br />"
                  + "Tools: " + frame.tools.length + "<br />"
                  + "Gestures: " + frame.gestures.length + "<br />";

  // Frame motion factors
  if (previousFrame && previousFrame.valid) {
    var translation = frame.translation(previousFrame);
    frameString += "Translation: " + vectorToString(translation) + " mm <br />";

    var rotationAxis = frame.rotationAxis(previousFrame);
    var rotationAngle = frame.rotationAngle(previousFrame);
    frameString += "Rotation axis: " + vectorToString(rotationAxis, 2) + "<br />";
    frameString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";

    var scaleFactor = frame.scaleFactor(previousFrame);
    frameString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
  }
  frameOutput.innerHTML = "<div style='width:300px; float:left; padding:5px'>" + frameString + "</div>";

  // Display Hand object data
  var handOutput = document.getElementById("handData");
  var handString = "";
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];

      handString += "<div style='width:300px; float:left; padding:5px'>";
      handString += "Hand ID: " + hand.id + "<br />";
      handString += "Type: " + hand.type + " hand" + "<br />";
      handString += "Direction: " + vectorToString(hand.direction, 2) + "<br />";
      handString += "Palm position: " + vectorToString(hand.palmPosition) + " mm<br />";
      handString += "Grab strength: " + hand.grabStrength + "<br />";
      handString += "Pinch strength: " + hand.pinchStrength + "<br />";
      handString += "Confidence: " + hand.confidence + "<br />";
      handString += "Arm direction: " + vectorToString(hand.arm.direction()) + "<br />";
      handString += "Arm center: " + vectorToString(hand.arm.center()) + "<br />";
      handString += "Arm up vector: " + vectorToString(hand.arm.basis[1]) + "<br />";

      // Hand motion factors
      if (previousFrame && previousFrame.valid) {
        var translation = hand.translation(previousFrame);
        handString += "Translation: " + vectorToString(translation) + " mm<br />";

        var rotationAxis = hand.rotationAxis(previousFrame, 2);
        var rotationAngle = hand.rotationAngle(previousFrame);
        handString += "Rotation axis: " + vectorToString(rotationAxis) + "<br />";
        handString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";

        var scaleFactor = hand.scaleFactor(previousFrame);
        handString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
      }

      // IDs of pointables associated with this hand
      if (hand.pointables.length > 0) {
        var fingerIds = [];
        for (var j = 0; j < hand.pointables.length; j++) {
          var pointable = hand.pointables[j];
            fingerIds.push(pointable.id);
        }
        if (fingerIds.length > 0) {
          handString += "Fingers IDs: " + fingerIds.join(", ") + "<br />";
        }
      }

      handString += "</div>";
    }
  }
  else {
    handString += "No hands";
  }
  handOutput.innerHTML = handString;

  // Display Pointable (finger and tool) object data
  var pointableOutput = document.getElementById("pointableData");
  var pointableString = "";
  if (frame.pointables.length > 0) {
    var fingerTypeMap = ["Thumb", "Index finger", "Middle finger", "Ring finger", "Pinky finger"];
    var boneTypeMap = ["Metacarpal", "Proximal phalanx", "Intermediate phalanx", "Distal phalanx"];
    for (var i = 0; i < frame.pointables.length; i++) {
      var pointable = frame.pointables[i];

      pointableString += "<div style='width:250px; float:left; padding:5px'>";

      if (pointable.tool) {
        pointableString += "Pointable ID: " + pointable.id + "<br />";
        pointableString += "Classified as a tool <br />";
        pointableString += "Length: " + pointable.length.toFixed(1) + " mm<br />";
        pointableString += "Width: "  + pointable.width.toFixed(1) + " mm<br />";
        pointableString += "Direction: " + vectorToString(pointable.direction, 2) + "<br />";
        pointableString += "Tip position: " + vectorToString(pointable.tipPosition) + " mm<br />"
        pointableString += "</div>";
      }
      else {
        pointableString += "Pointable ID: " + pointable.id + "<br />";
        pointableString += "Type: " + fingerTypeMap[pointable.type] + "<br />";
        pointableString += "Belongs to hand with ID: " + pointable.handId + "<br />";
        pointableString += "Classified as a finger<br />";
        pointableString += "Length: " + pointable.length.toFixed(1) + " mm<br />";
        pointableString += "Width: "  + pointable.width.toFixed(1) + " mm<br />";
        pointableString += "Direction: " + vectorToString(pointable.direction, 2) + "<br />";
        pointableString += "Extended?: "  + pointable.extended + "<br />";
        pointable.bones.forEach( function(bone){
          pointableString += boneTypeMap[bone.type] + " bone <br />";
          pointableString += "Center: " + vectorToString(bone.center()) + "<br />";
          pointableString += "Direction: " + vectorToString(bone.direction()) + "<br />";
          pointableString += "Up vector: " + vectorToString(bone.basis[1]) + "<br />";
        });
        pointableString += "Tip position: " + vectorToString(pointable.tipPosition) + " mm<br />";
        pointableString += "</div>";
      }
    }
  }
  else {
    pointableString += "<div>No pointables</div>";
  }
  pointableOutput.innerHTML = pointableString;

  // Display Gesture object data
  var gestureOutput = document.getElementById("gestureData");
  var gestureString = "";
  if (frame.gestures.length > 0) {
    if (pauseOnGesture) {
      togglePause();
    }
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      gestureString += "Gesture ID: " + gesture.id + ", "
                    + "type: " + gesture.type + ", "
                    + "state: " + gesture.state + ", "
                    + "hand IDs: " + gesture.handIds.join(", ") + ", "
                    + "pointable IDs: " + gesture.pointableIds.join(", ") + ", "
                    + "duration: " + gesture.duration + " &micro;s, ";

      switch (gesture.type) {
        case "circle":
          gestureString += "center: " + vectorToString(gesture.center) + " mm, "
                        + "normal: " + vectorToString(gesture.normal, 2) + ", "
                        + "radius: " + gesture.radius.toFixed(1) + " mm, "
                        + "progress: " + gesture.progress.toFixed(2) + " rotations";
          break;
        case "swipe":
          gestureString += "start position: " + vectorToString(gesture.startPosition) + " mm, "
                        + "current position: " + vectorToString(gesture.position) + " mm, "
                        + "direction: " + vectorToString(gesture.direction, 1) + ", "
                        + "speed: " + gesture.speed.toFixed(1) + " mm/s";
                        
          break;
        case "screenTap":
        case "keyTap":
          gestureString += "position: " + vectorToString(gesture.position) + " mm";
          break;
        default:
          gestureString += "unkown gesture type";
      }
      gestureString += "<br />";
    }
  }
  else {
    gestureString += "No gestures";
  }
  gestureOutput.innerHTML = gestureString;

  // Store frame for motion functions
  previousFrame = frame;


  /******************** CÓDIGO NUESTRO ****************************/
  
  // ZONA DE DATOS DE VISTA

  var datosVistaOutput = document.getElementById("datosVista");


  var datosVistaString = "<h3> Vista: </h3>"+
        "Indica: " + Indica(
        [frame?.pointables[1]?.direction[0],
        frame?.pointables[2]?.direction[0],
        frame?.pointables[3]?.direction[0],
        frame?.pointables[4]?.direction[0]]) + "</br>"
        + 'Indice x: ' +  frame?.pointables[1]?.direction[0]+ "</br>"
        + 'Corazón x: ' + frame?.pointables[2]?.direction[0]+ "</br>"
        + 'Anular x: ' + frame?.pointables[3]?.direction[0]+ "</br>"
        + 'Meñique x: ' + frame?.pointables[4]?.direction[0] + "</br>"
        + '<h4> Número de dedos estirados </h4>' + "</br>" 
        + 'Número de dedos estirados: ' + NumeroDedosAbiertos (frame?.pointables)
        + "</br>";

 datosVistaOutput.innerHTML = datosVistaString;



 // ZONA DE DATOS DE TIEMPO

})

function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

function togglePause() {
  paused = !paused;

  if (paused) {
    document.getElementById("pause").innerText = "Resume";
  } else {
    document.getElementById("pause").innerText = "Pause";
  }
}

function pauseForGestures() {
  if (document.getElementById("pauseOnGesture").checked) {
    pauseOnGesture = true;
  } else {
    pauseOnGesture = false;
  }
}



//----------------------------------------------------------------------
//{"view":"focus", "tiempo": 3, "timeAction" : "EN-MOVIMIENTO"}


// FUNCIONES PARA LOS DATOS DE VISTA
/*
    Detecta la posición de la mano, y en función de ello devuelve un valor
    Actúa sobre la variable de estado "Vista"
    Salida {0 (de frente), 1 (girada a derecha, -1 (girada a izquierda))}
*/

function Indica(array_puntos) {
  var movimiento = 0;//"NULL" ; 
  const umbral = 0.5;

  if(  array_puntos !== null){
    movimiento = 0;//"FRENTE"
    var digits = (array_puntos[1] +  array_puntos[2] +  array_puntos[3] +  array_puntos[0]) / 4.0;
      if (digits<(- umbral)){
        movimiento = -1;//"IndicaIzquierda";
      }
      else if (digits>(umbral)){
        movimiento = 1;//"IndicaDerecha";
      }
  }
    return movimiento;   
}







// FUNCIONES PARA LOS DATOS DE TIEMPO

/*
    Computa si la media de los datos están apuntando al frente
    Determina cuantos dedos están extendidos sobre el Leap
    Actúa sobre la variable de estado "Tiempo"
    Salida {NO-COMPUTABLE, 0,1,2,3,4,5}
*/
  function NumeroDedosAbiertos (frame_pointables) {
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
        salida = contador;
    }
    return salida 
}





//------------------------------------------------------------------------





