import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import { AppWrapper } from './AppWrapper';

// ReactDOM.render(
//   <React.StrictMode>
//     <AppWrapper />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

var pStart = {x: 0, y:0};
var pStop = {x:0, y:0};

function swipeStart(e) {
    if (typeof e['targetTouches'] !== "undefined"){
        var touch = e.targetTouches[0];
        pStart.x = touch.screenX;
        pStart.y = touch.screenY;
    } else {
        pStart.x = e.screenX;
        pStart.y = e.screenY;
    }
}

function swipeEnd(e){
    if (typeof e['changedTouches'] !== "undefined"){
        var touch = e.changedTouches[0];
        pStop.x = touch.screenX;
        pStop.y = touch.screenY;
    } else {
        pStop.x = e.screenX;
        pStop.y = e.screenY;
    }

    swipeCheck();
}

function swipeCheck(){
    var changeY = pStart.y - pStop.y;
    var changeX = pStart.x - pStop.x;
    if (isPullDown(changeY, changeX) ) {
        alert('Swipe Down!');
    }
}

function isPullDown(dY, dX) {
    // methods of checking slope, length, direction of line created by swipe action 
    return dY < 0 && (
        (Math.abs(dX) <= 100 && Math.abs(dY) >= 300)
        || (Math.abs(dX)/Math.abs(dY) <= 0.3 && dY >= 60)
    );
}

document.addEventListener('touchstart', function(e){ swipeStart(e); }, false);
document.addEventListener('touchend', function(e){ swipeEnd(e); }, false);

ReactDOM.render(<AppWrapper />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



