import React from 'react'

const LeapSensor = () => {  
    
    return(
        <div>
            <h1>Leap Motion JavaScript Sample</h1>
            <p> El número que nos salvará la vida es <div id="numeroAleatorio"></div></p>
            <div id="main">
            <button id="pause" onClick="togglePause()">Pause</button>
            <input type="checkbox" id="pauseOnGesture" onClick="pauseForGestures()"/>Pause on gesture
            <div id="nuestrosDatos"></div>
            <h3>Frame data:</h3>
            <div id="frameData"></div>
            <h3>Hand data:</h3>
            <div id="handData"></div>
            <h3>Finger and tool data:</h3>
            <div id="pointableData"></div>
            <h3>Gesture data:</h3>
            <div id="gestureData"></div>          
            </div>
        </div>
    )
}

export default LeapSensor