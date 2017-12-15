ctx2.fillStyle = "rgba(9, 43, 45, 0.6)";
ctx2.strokeStyle = "rgba(9, 43, 45, 0.6)";
ctx2.beginPath();
ctx2.lineWidth = game.padding/2;
ctx2.lineCap = "round";
ctx2.moveTo(0, game.boardSize/3*2);
ctx2.lineTo(0, game.boardSize/3*2);
ctx2.lineTo(game.boardSize-game.padding/4, game.boardSize/3*2);
ctx2.lineTo(game.boardSize-game.padding/4, game.boardSize-game.padding/4);
ctx2.lineTo(game.boardSize/2, game.boardSize-game.padding/4);
ctx2.lineTo(game.boardSize/2, game.boardSize/3*2);
ctx2.moveTo(game.boardSize/2, game.boardSize-game.padding/4);
ctx2.lineTo(game.boardSize/2, game.boardSize-game.padding/4);
ctx2.lineTo(0, game.boardSize-game.padding/4);
ctx2.lineTo(0, game.boardSize/3*2);
ctx2.stroke();
ctx2.fillRect(0, game.boardSize/3*2, game.boardSize/2, game.boardSize);
//

ctx2.fillStyle = "rgba(9, 43, 45, 0.6)";
ctx2.strokeStyle = "rgba(9, 43, 45, 0.6)";
ctx2.beginPath();
ctx2.lineWidth = game.padding/2;
ctx2.lineCap = "round";
ctx2.moveTo(0, game.boardSize/10*3);
ctx2.lineTo(0, game.boardSize/10*3);
ctx2.lineTo(game.boardSize-game.padding/4, game.boardSize/10*3);
ctx2.lineTo(game.boardSize-game.padding/4, game.boardSize/10*4-game.padding/4);
ctx2.lineTo(game.boardSize/2, game.boardSize/10*4-game.padding/4);
ctx2.lineTo(game.boardSize/2, game.boardSize/10*3);
ctx2.moveTo(game.boardSize/2, game.boardSize/10*4-game.padding/4);
ctx2.lineTo(game.boardSize/2, game.boardSize/10*4-game.padding/4);
ctx2.lineTo(0, game.boardSize/10*4-game.padding/4);
ctx2.lineTo(0, game.boardSize/10*3);
ctx2.stroke();
//
const timerBoxDark = function () {
    ctx2.fillStyle = "rgba(9, 43, 45, 0.6)";
    ctx2.strokeStyle = "rgba(9, 43, 45, 0.6)";
    ctx2.clearRect(0, game.boardSize/10*3, game.boardSize/2, game.boardSize/10);
    ctx2.fillRect(0, game.boardSize/10*3, game.boardSize/2, game.boardSize/10);
}
//
const timerBoxLight = function () {
    ctx2.fillStyle = "rgba(154, 231, 247, 0.3)";
    ctx2.strokeStyle = "rgba(154, 231, 247, 0.3)";//A2B5C6
    ctx2.clearRect(game.boardSize/2+game.padding/4, game.boardSize/10*3+game.padding/4, game.boardSize/2-game.padding, game.boardSize/10-game.padding);
    ctx2.fillRect(game.boardSize/2+game.padding/4, game.boardSize/10*3+game.padding/4, game.boardSize/2-game.padding, game.boardSize/10-game.padding);
}
//
ctx2.font = `${40*game.boardSize/600}px Times`;
ctx2.fillStyle = "rgba(9, 43, 45, 0.8)";
ctx2.strokeStyle = "rgba(9, 43, 45, 0.8)";
ctx2.textAlign = "left";
ctx2.fillText("Dismissed Pieces:", game.boardSize/40, game.boardSize*13/20);
//
ctx2.fillText("Timers:", game.boardSize/40, game.boardSize/14*4);
// Timers
const TimerDark = function (time) {
    var _time = time;
    var _hour = 0, _minute = 0, _second = 0;
    setInterval(function () {
        if (!pauseDark && !overAllPause) {
            _time ++;
        }
        _hour = Math.floor(_time / (60*60));
        _minute = Math.floor((_time - _hour * (60*60)) / 60);
        _second = Math.floor(_time - _hour * (60*60) - _minute * 60);
    }, 1000);
    const timer = function () {
        timerBoxDark();
        ctx2.fillStyle = "#D8D8F6";
        ctx2.strokeStyle = "#D8D8F6";

        ctx2.fillText(`${_hour}  :  ${_minute}  :  ${_second}`, game.boardSize/15, game.boardSize/16*6);
        requestAnimationFrame(timer);
    }
    timer();
}
TimerDark(0);
//
const TimerLight = function (time) {
    var _time = time;
    var _hour = 0, _minute = 0, _second = 0;
    setInterval(function () {
        if (!pauseLight && !overAllPause) {
            _time ++;
        }
        _hour = Math.floor(_time / (60*60));
        _minute = Math.floor((_time - _hour * (60*60)) / 60);
        _second = Math.floor(_time - _hour * (60*60) - _minute * 60);
    }, 1000);
    const timer = function () {
        timerBoxLight();
        ctx2.fillStyle = "rgba(9, 43, 45, 0.8)";
        ctx2.strokeStyle = "rgba(9, 43, 45, 0.8)";
        ctx2.fillText(`${_hour}  :  ${_minute}  :  ${_second}`, game.boardSize/2+game.boardSize/10, game.boardSize/16*6);
        requestAnimationFrame(timer);
    }
    timer();
}
TimerLight(0);
/////////////////////////////////////
const banner = function () {
    ctx2.clearRect(game.boardSize/10+game.boardSize/20, game.boardSize/16,game.boardSize/2+game.boardSize/4, game.boardSize/16*2);
    if (pauseLight && !error && start) {
        ctx2.fillStyle = "rgba(9, 43, 45, 0.8)";
        ctx2.strokeStyle = "rgba(9, 43, 45, 0.8)";
        ctx2.fillText(`Waiting For Dark Side... `, game.boardSize/10+game.boardSize/10, game.boardSize/16*2);
    } else if (pauseDark && !error && start) {
        ctx2.fillStyle = "rgba(9, 43, 45, 0.8)";
        ctx2.strokeStyle = "rgba(9, 43, 45, 0.8)";
        ctx2.fillText(`Waiting For Light Side... `, game.boardSize/10+game.boardSize/10, game.boardSize/16*2);
    } else if (error && start) {
        ctx2.fillText(`It Is Not Your Turn!`, game.boardSize/10+game.boardSize/10, game.boardSize/16*2);
    }
    if (!start) {
        const changColor = function () {
            var output = '#';
            const color = '0123456789abcdef';
            for (var i = 0; i < 6; i++) {
                output += color[Math.floor(16*Math.random())];
            }
            return output;
        }
        if (Math.random() > 0.8) {
            ctx2.fillStyle = changColor();
        }
        ctx2.fillText(`Click Here To Start Chess.`, game.boardSize/10+game.boardSize/20, game.boardSize/16*2);
    }
requestAnimationFrame(banner);
}
banner();

//
const banner2 = function () {
ctx2.clearRect(game.boardSize/10, game.boardSize/7*3,game.boardSize/2+game.boardSize/4, game.boardSize/20*3);
    if (overAllPause) {
        const changColor = function () {
            var output = '#';
            const color = '0123456789abcdef';
            for (var i = 0; i < 6; i++) {
                output += color[Math.floor(16*Math.random())];
            }
            return output;
        }
        if (Math.random() > 0.9) {
            ctx2.fillStyle = changColor();
        }

        ctx2.fillText(`Paused!`, game.boardSize/10+game.boardSize/7*2, game.boardSize/4*2);
    }
requestAnimationFrame(banner2);
}
banner2();
//
backgroundMusic.loop = true;
backgroundMusic.play();
//


//////////////////////////////////////
