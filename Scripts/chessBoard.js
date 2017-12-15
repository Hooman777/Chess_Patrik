const chessBoard = function () {
    const frame = function () {
        for (var i = 0; i <= 8; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * (canvas.height / 8));
            ctx.lineTo(0, i * (canvas.height / 8));
            ctx.lineTo(canvas.width, i * (canvas.height / 8));
            ctx.lineWidth = 3;
            ctx.lineStyle = "rgba(9, 43, 45, 0.3)";
            ctx.stroke();
        }
        for (var i = 0; i <= 8; i++) {
            ctx.beginPath();
            ctx.moveTo(i * (canvas.height / 8), 0);
            ctx.lineTo(i * (canvas.height / 8), 0);
            ctx.lineTo(i * (canvas.height / 8), canvas.width);
            ctx.lineWidth = 5;
            ctx.stroke();
        }
        for (var i = 0; i < 8; i++) {
            if (i % 2) {
                for (var j = 0; j < 8; j += 2) {
                    ctx.rect(j * (canvas.width / 8), i * (canvas.height / 8), (canvas.width / 8), (canvas.height / 8));
                    ctx.fillStyle = "rgba(9, 43, 45, 0.4)";
                    ctx.fill();
                }
            } else {
                for (var j = 1; j < 8; j += 2) {
                    ctx.rect(j * (canvas.width / 8), i * (canvas.height / 8), (canvas.width / 8), (canvas.height / 8));
                    ctx.fill();
                }
            }
        }
    }
    frame();
}
