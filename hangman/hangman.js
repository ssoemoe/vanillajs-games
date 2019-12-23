function init() {
    let players = {};
    let wrongWords = [];

    drawHangman();

    function drawHangman() {
        let canvas = document.getElementById("hangman");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(20, 40);
        ctx.lineTo(20, 100);
        ctx.lineTo(70, 100);
        ctx.stroke();
    }

    function clearHangman() {
        let canvas = document.getElementById("hangman");
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function restart() {
        wrongWords = [];
    }

}

init();

