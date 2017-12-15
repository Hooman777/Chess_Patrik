var MoveAnimator = (function() {
    var previousBoard = [
        [
            ['lr', 'lb', 'ln', 'lk', 'lq', 'ln', 'lb', 'lr'],
            ['lp', 'lp', 'lp', 'lp', 'lp', 'lp', 'lp', 'lp'],
            ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
            ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
            ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
            ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
            ['dp', 'dp', 'dp', 'dp', 'dp', 'dp', 'dp', 'dp'],
            ['dr', 'db', 'dn', 'dk', 'dq', 'dn', 'db', 'dr']
        ]
    ];

    var diedPiecePose = {
        L: [],
        D: []
    };

    const _pieceShape = function(code) {
        const _first = function(code) {
            if (!code || utility.isEmptyStringOrNull(code)) {
                console.error("First of code Error!");
            } else if (code[0] === 'l') {
                return 'white';
            } else if (code[0] === 'd') {
                return 'black';
            } else {
                throw new Error("Error in color!");
            }
        }
        const _second = function(code) {
            if (!code || utility.isEmptyStringOrNull(code)) {
                console.error("Second of code Error!");
            } else if (code[1] === 'p') {
                return 'Pawn';
            } else if (code[1] === 'r') {
                return 'Rook';
            } else if (code[1] === 'b') {
                return 'Bishop';
            } else if (code[1] === 'n') {
                return 'Knight';
            } else if (code[1] === 'q') {
                return 'Queen';
            } else if (code[1] === 'k') {
                return 'King';
            } else {
                throw new Error("Error in shape!");
            }
        }
        return _first(code) + _second(code);
    }
    const _dim = function(i, j, _boardSize, _padding) {
        var _size = _boardSize / 8;
        return {
            X: j * _size + _padding / 2,
            Y: i * _size + _padding / 2
        }
    }
    const _dimDP = function (code) {
        var _x;
        var _y;
        if (code[0] === 'd') {
            if (diedPiecePose.D.length > 7) {
                _x = (diedPiecePose.D.length-8)*game.boardSize/16+game.boardSize/2;
                _y = game.boardSize/3*2+game.boardSize/6+game.boardSize/12;
            } else if (diedPiecePose.D.length <= 7) {
                _x = diedPiecePose.D.length*game.boardSize/16+game.boardSize/2;
                _y = game.boardSize/3*2+game.boardSize/12;
            } else {
                throw new Error ("Error in line 69!");
            }
            diedPiecePose.D.unshift(1);
            return {X: _x,
            Y: _y};
        } else if (code[0] === 'l') {
            if (diedPiecePose.L.length > 7) {
                _x = (diedPiecePose.L.length-8)*game.boardSize/16;
                _y = game.boardSize/3*2+game.boardSize/6+game.boardSize/12;
            } else if (diedPiecePose.L.length <= 7) {
                _x = diedPiecePose.L.length*game.boardSize/16;
                _y = game.boardSize/3*2+game.boardSize/12;
            } else {
                throw new Error ("Error in line 69!");
            }
            diedPiecePose.L.unshift(1);
            return {X: _x,
            Y: _y};
        } else {
            throw new Error ('Line 69!');
        }
    }
    const _size = function(_boardSize, _padding) {
        var _size = _boardSize / 8 - _padding;
        return _size;
    }
    const _changeControl = function(_freshBoard) {
        var _intersection = utility.deepClone(_freshBoard);
        var _oldBoard = utility.deepClone(previousBoard[0]);
        var _piece;
        var _pieceStart;
        var _pieceEnd;
        var _diedPiece;
        var _start;
        var _end;

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (_freshBoard[i][j] != _oldBoard[i][j]) {
                    if (utility.isEmptyStringOrNull(_freshBoard[i][j])) {
                        _start = [j, i];
                        _pieceStart = _oldBoard[i][j];
                        _intersection[i][j] = '  ';
                    } else if (utility.isEmptyStringOrNull(_oldBoard[i][j])) {
                        _end = [j, i];
                        _pieceEnd = _freshBoard[i][j];
                        _intersection[i][j] = '  '; //    Error dastan!
                    } else {
                        _end = [j, i];
                        _diedPiece = _oldBoard[i][j];
                        _intersection[i][j] = '  ';
                    }
                }
            }
        }

        if (_pieceStart === _pieceEnd) {
            _piece = _pieceEnd;
        } else {
            _piece = _pieceStart;
        }

        if (!_piece) {
        }
        return {
            intersection: _intersection,
            lone: {
                start: _start,
                end: _end,
                piece: _piece,
                diedPiece: _diedPiece
            }
        }
    }
    const _draw = function(_boardSize, _padding, _board) {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (_board[i][j] != '' && _board[i][j] != ' ' && _board[i][j] != '  ') {
                    const _shape = eval(_pieceShape(_board[i][j]));
                    const _X = _dim(i, j, _boardSize, _padding).X;
                    const _Y = _dim(i, j, _boardSize, _padding).Y;
                    const _side = _size(_boardSize, _padding);
                    // _shape.setAttribute("draggable", true);

                    ctx.drawImage(_shape, _X, _Y, _side, _side);
                }
            }
        }
    }
    const _diedBoard = function (code, boardSize, padding) {
        if (code != undefined && code != '  ' && code != ' ' && code != '') {
            var _shape;
            const _boardSize = boardSize;
            const _padding = padding;
            const _dim = utility.deepClone(_dimDP(code));
            const _X = _dim.X;
            const _Y = _dim.Y;
            const _side = _size(_boardSize, _padding)/3*2;
            _shape = eval(_pieceShape(code));
            ctx2.drawImage(_shape, _X, _Y, _side, _side);
        }
    }

    const _movie = function(_boardSize, _padding, _board, _obj) {
        if (_obj.start === undefined || _obj.end === undefined) {
            _draw(_boardSize, _padding, _board);
            return;
        }
        var _shape;
        const _start = {
            X: _dim(_obj.start[1], _obj.start[0], _boardSize, _padding).X,
            Y: _dim(_obj.start[1], _obj.start[0], _boardSize, _padding).Y
        }
        const _end = {
            X: _dim(_obj.end[1], _obj.end[0], _boardSize, _padding).X,
            Y: _dim(_obj.end[1], _obj.end[0], _boardSize, _padding).Y
        }
        var inc = {
            X: 1,
            Y: 1
        }
        if (_start.X < _end.X) {
            inc.X = 15;
        } else {
            inc.X = -15;
        }
        if (_start.Y < _end.Y) {
            inc.Y = 15;
        } else {
            inc.Y = -15;
        }
        if (_obj.piece != '  ' && _obj.piece != ' ' && _obj.piece != '') {
            _shape = eval(_pieceShape(_obj.piece));
        }  else {
            throw new Error("line 137");
        }
        var _X = _start.X;
        var _Y = _start.Y;
        const _render = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            chessBoard();
            const _side = _size(_boardSize, _padding);
            ctx.drawImage(_shape, _X, _Y, _side, _side);
            _draw(_boardSize, _padding, _board);
        }
        var isReached = false;
        const _modifier = function() {
            if (_X >= (_end.X - _padding/2) && _X <= (_end.X + _padding/2)) {
                _X = _end.X;
            } else {
                _X += inc.X;
            }
            if (_Y >= (_end.Y - _padding/2) && _Y <= (_end.Y + _padding/2)) {
                _Y = _end.Y;
            } else {
                _Y += inc.Y;
            }
            if (_X === _end.X && _Y === _end.Y) {
                setTimeout(function(){isReached = !isReached;}, 10)

            }
        }

        var requestid = null;
        const _animator = function() {
            _render();
            _modifier();
            if (!isReached) {//!_.isEqual(_start, _end)
                requestid = requestAnimationFrame(_animator);
            } else {
                cancelAnimationFrame(requestid);
                requestid = null;
            }

            return;
        }
        _animator();
    }

    const chessPieces = function(_boardSize, _padding, _freshBoard) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        chessBoard();
        _board = _changeControl(_freshBoard).intersection;
        _movie(_boardSize, _padding, _board, _changeControl(_freshBoard).lone);
        _diedBoard(_changeControl(_freshBoard).lone.diedPiece, _boardSize, _padding);
        previousBoard.unshift(_freshBoard);
        previousBoard.splice(1);

    };

    return {
        chessPieces: chessPieces
    }
})()
