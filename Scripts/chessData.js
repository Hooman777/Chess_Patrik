// Inserting image files ***************************/
/***************************************************/
const tick = new Audio ();
tick.src = 'Sounds/Tick.mp3';
const tack = new Audio ();
tack.src = 'Sounds/Tack.mp3';
const not = new Audio ();
not.src = 'Sounds/Not.mp3';
const backgroundMusic = new Audio ();
backgroundMusic.src = 'Sounds/chess.mp3';
const background = new Image();
background.src = 'Img/background2.jpg';
// White pieces
const whitePawn = new Image();
whitePawn.src = 'Img/sefid/sarbaz.png';
const whiteRook = new Image();
whiteRook.src = 'Img/sefid/rokh.png';
const whiteBishop = new Image();
whiteBishop.src = 'Img/sefid/fil.png';
const whiteKnight = new Image();
whiteKnight.src = 'Img/sefid/asb.png';
const whiteQueen = new Image();
whiteQueen.src = 'Img/sefid/vazir.png';
const whiteKing = new Image();
whiteKing.src = 'Img/sefid/shah.png';
// Black pieces
const blackPawn = new Image();
blackPawn.src = 'Img/siah/sarbaz.png';
const blackRook = new Image();
blackRook.src = 'Img/siah/rokh.png';
const blackBishop = new Image();
blackBishop.src = 'Img/siah/fil.png';
const blackKnight = new Image();
blackKnight.src = 'Img/siah/asb.png';
const blackQueen = new Image();
blackQueen.src = 'Img/siah/vazir.png';
const blackKing = new Image();
blackKing.src = 'Img/siah/shah.png';

// Assigning Initial Variables *********************/
/***************************************************/
var game = {
    boardSize: 600,
    padding: (10 /* Pieces padding */ ),
    /**
                * List of chess pieces.
                *
                * @param l           Stands for white side.
                * @param d           Stands for black side.
                * @param p           Stands for Pawn.
                * @param r           Stands for Rook.
                * @param b           Stands for Bishop.
                * @param n           Stands for Knight.
                * @param q           Stands for Queen.
                * @param k           Stands for King.

                */
    board: [['lr','lb','ln', 'lk', 'lq', 'ln', 'lb', 'lr'],
             ['lp','lp','lp', 'lp', 'lp', 'lp', 'lp', 'lp'],
              ['  ','  ','  ', ' ', '  ', '  ', '  ', '  '],
               ['  ','  ','  ', '  ', '  ', '  ', '  ', '  '],
                ['  ','  ','  ', '  ', '  ', '  ', '  ', '  '],
                 ['  ','  ','  ', '  ', '  ', '  ', '  ', '  '],
                  ['dp','dp','dp', 'dp', 'dp', 'dp', 'dp', 'dp'],
                   ['dr','db','dn', 'dk', 'dq', 'dn', 'db', 'dr']]
}
var pauseDark = true;
var pauseLight = true;
var error = false;
var start = false;
const space = 32;
var overAllPause = false;
var firstTimePushstart = true;
var transferee, killedPiece;
var departPose, arrivePose;
var extendedTime = 0;
/***************************************************/
const canvas = document.getElementById("chessBoard");
const canvas2 = document.getElementById("showCase");
const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");
//
canvas.width = game.boardSize;
canvas.height = game.boardSize;
canvas.style.left = `${window.innerWidth/40}px`;//`${window.innerWidth/2 - canvas.width/2}px`;
canvas.style.top = `${window.innerWidth/40}px`;
canvas.style.position = "absolute";
//
canvas2.width = game.boardSize;
canvas2.height = game.boardSize;
canvas2.style.left = `${window.innerWidth - canvas.width - window.innerWidth/40}px`;//"700px";
canvas2.style.top = `${window.innerWidth/40}px`;
canvas2.style.position = "absolute";
//
//
const utility = {
    deepClone: (obj) => {
        return deepClone(obj, true);
    },
    isEmptyStringOrNull: (str) => /\s+|^$/g.test(str),
    isEmptyString: (str) => /\s+/g.test(str)
};
