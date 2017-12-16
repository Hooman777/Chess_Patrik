const Initial = [
    ['lr', 'lb', 'ln', 'lk', 'lq', 'ln', 'lb', 'lr'],
    ['lp', 'lp', 'lp', 'lp', 'lp', 'lp', 'lp', 'lp'],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['dp', 'dp', 'dp', 'dp', 'dp', 'dp', 'dp', 'dp'],
    ['dr', 'db', 'dn', 'dk', 'dq', 'dn', 'db', 'dr']
];


setTimeout(function() {
    MoveAnimator.chessPieces(game.boardSize, game.padding, Initial);
}, 1000);

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        X: evt.clientX - rect.left,
        Y: evt.clientY - rect.top
    };
}
//
const castling = function (transferee, departPose, arrivePose) {
    if (error) {
        return;
    }
    if (!(transferee[0] === 'l' && !pauseDark) && !(transferee[0] === 'd' && !pauseLight)) {
        return;
    }
    const rivisor = function(transferee, departPose, arrivePose) {
        var revisedBoard = utility.deepClone(game.board);
        const _transferee = transferee;
        const _departPose = departPose;
        const _arrivePose = arrivePose;
        revisedBoard[_departPose[0]][_departPose[1]] = '  ';
        revisedBoard[_arrivePose[0]][_arrivePose[1]] = _transferee;
        game.board = revisedBoard;
    }
    if (transferee[1] === 'k') {
        if (departPose[1] === 3 && departPose[0] === 0) {

            if (arrivePose[1] === 5 && arrivePose[0] === 0) {
                for (var i = 4; i < 7; i++) {
                    if (game.board[0][i] != '  ') {
                        return;
                    }
                }
                if (game.board[0][7] === 'lr') {
                    extendedTime = 400;
                    rivisor('lr', [0, 7], [0, 4]);
                    MoveAnimator.chessPieces(game.boardSize, game.padding, game.board);
                }
            }
            if (arrivePose[1] === 1 && arrivePose[0] === 0) {
                for (var i = 1; i < 3; i++) {
                    if (game.board[0][i] != '  ') {
                        return;
                    }
                }
                if (game.board[0][0] === 'lr') {
                    extendedTime = 400;
                    rivisor('lr', [0, 0], [0, 2]);
                    MoveAnimator.chessPieces(game.boardSize, game.padding, game.board);
                }
            }
        }
        if (departPose[1] === 3 && departPose[0] === 7) {

            if (arrivePose[1] === 5 && arrivePose[0] === 7) {
                for (var i = 4; i < 7; i++) {
                    if (game.board[7][i] != '  ') {
                        return;
                    }
                }
                if (game.board[7][0] === 'dr') {
                    extendedTime = 400;
                    rivisor('dr', [7, 7], [7, 4]);
                    MoveAnimator.chessPieces(game.boardSize, game.padding, game.board);
                }
            }
            if (arrivePose[1] === 1 && arrivePose[0] === 7) {
                for (var i = 1; i < 3; i++) {
                    if (game.board[7][i] != '  ') {
                        return;
                    }
                }
                if (game.board[7][0] === 'dr') {
                    extendedTime = 400;
                    rivisor('dr', [7, 0], [7, 2]);
                    MoveAnimator.chessPieces(game.boardSize, game.padding, game.board);
                }
            }
        }
    }
}
//
const promotion = function (transferee, departPose, arrivePose) {
    if (error) {
        return;
    }
    const rivisor = function(transferee, departPose, arrivePose) {
        var revisedBoard = utility.deepClone(game.board);
        const _transferee = transferee;
        const _departPose = departPose;
        const _arrivePose = arrivePose;
        revisedBoard[_departPose[0]][_departPose[1]] = '  ';
        revisedBoard[_arrivePose[0]][_arrivePose[1]] = _transferee;
        game.board = revisedBoard;
    }
    if (transferee === 'lp' && arrivePose[0] === 7) {
        rivisor('lq', arrivePose, arrivePose);
        setTimeout(function(){MoveAnimator.chessPieces(game.boardSize, game.padding, game.board);}, 2000);

    }
    if (transferee === 'dp' && arrivePose[0] === 0) {
        rivisor('dq', arrivePose, arrivePose);
        setTimeout(function(){MoveAnimator.chessPieces(game.boardSize, game.padding, game.board);}, 2000);

    }
}
//
const select = function(i, j) {
    tick.play();
    const _side = game.boardSize / 8;
    _X = j * _side;
    _Y = i * _side;

    ctx.strokeStyle = "#D8D8F6";
    ctx.strokeRect(_X, _Y, _side, _side);

}
//
const reSelect = function(i, j) {
    tack.play();
    pauseDark = !pauseDark;
    pauseLight = !pauseLight;
    const _side = game.boardSize / 8;
    _X = j * _side;
    _Y = i * _side;
    ctx.strokeStyle = "#D8D8F6";
    ctx.strokeRect(_X, _Y, _side, _side);
    ctx.strokeStyle = "black";
}
//
const rivisorBoard = function(transferee, departPose, arrivePose, killedPiece) {
    var revisedBoard = utility.deepClone(game.board);
    const _transferee = transferee;
    const _departPose = departPose;
    const _arrivePose = arrivePose;
    const _killedPiece = killedPiece;
	// To avoid picking void space in the board.
    if (transferee === '  ') {
        pauseDark = !pauseDark;
        pauseLight = !pauseLight;
        not.play();
        return;
    }
    // To control which side's turn is and avoid to do game consequently.
    if (!(transferee[0] === 'l' && !pauseDark) && !(transferee[0] === 'd' && !pauseLight)) {
        pauseDark = !pauseDark;
        pauseLight = !pauseLight;
        not.play();
        error = !error;
        setTimeout(function() {error = !error;}, 1500)
        return;
    }
    // To let user to cancel the first choosed piece by selecting again.
    if (_departPose[0] === _arrivePose[0] && _departPose[1] === _arrivePose[1]) {
        pauseDark = !pauseDark;
        pauseLight = !pauseLight;
        return;
    }
    // To avoid starting game before starting the counteres.
    if (!start) {
        pauseDark = !pauseDark;
        pauseLight = !pauseLight;
        return;
    }
    // To avoid invalid movement which each side kill the same side.
    if (_transferee[0] === _killedPiece[0] ) {
        pauseDark = !pauseDark;
        pauseLight = !pauseLight;
        return;
    }
    revisedBoard[_departPose[0]][_departPose[1]] = '  ';
    revisedBoard[_arrivePose[0]][_arrivePose[1]] = _transferee;
    game.board = revisedBoard;
}

//
const eachRectSide = game.boardSize / 8;
var undone1 = true;
var undone2 = false;
canvas.addEventListener('click', function(evt) {
    var i, j;
    const mousePose1 = utility.deepClone(getMousePos(canvas, evt));
    j = Math.floor(mousePose1.X / eachRectSide);
    i = Math.floor(mousePose1.Y / eachRectSide);
    if (undone1 && !overAllPause) {
        departPose = [i, j];
        transferee = game.board[i][j];
        select(i, j);
        undone1 = !undone1;
        setTimeout(function() {
            undone2 = !undone2;
        }, 10);
        canvas.addEventListener('click', function(evt) {
            var ii, jj;
            const mousePose2 = utility.deepClone(getMousePos(canvas, evt));
            jj = Math.floor(mousePose2.X / eachRectSide);
            ii = Math.floor(mousePose2.Y / eachRectSide);
            if (undone2) {
                killedPiece = game.board[ii][jj];
                arrivePose = [ii, jj];
                undone2 = !undone2;
                undone1 = !undone1;
                reSelect(ii, jj);
                castling(transferee, departPose, arrivePose);
                rivisorBoard(transferee, departPose, arrivePose, killedPiece);
                setTimeout(function(){MoveAnimator.chessPieces(game.boardSize, game.padding, game.board);}, (200+extendedTime));
                promotion(transferee, departPose, arrivePose);
                extendedTime = 0;
            }
        });
    }
});
//
canvas2.addEventListener('click', function(evt) {
    const mousePose1 = utility.deepClone(getMousePos(canvas2, evt));

    backgroundMusic.volume = 0.1;
    j = Math.floor(mousePose1.X / eachRectSide);
    i = Math.floor(mousePose1.Y / eachRectSide);
    if (mousePose1.X > 0 && mousePose1.X < game.boardSize) {
        if (mousePose1.Y > 0 && mousePose1.Y < game.boardSize/3 ) {
            if (!start) {
                pauseDark = !pauseDark;
                start = !start;
                firstTimePushstart = false;
            }
        }
    }
        }, 10);
//
document.addEventListener("keydown", function(event){
    if (firstTimePushstart) {
        backgroundMusic.volume = 0.1;
        pauseDark = !pauseDark;
        start = !start;
        firstTimePushstart = false;
    } else {
        if (event.keyCode === space) {
            overAllPause = !overAllPause;
        }
        if (overAllPause) {
            backgroundMusic.volume = 0;
        } else {
            backgroundMusic.volume = 0.1;
        }
    }

}, true);
