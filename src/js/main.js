let canvas, ctx;



//===============================Player===========================

let px,py;



function Player(xPos, yPos){
    
    this.x = xPos;
    this.y = yPos;



    this.drawPlayer = () => {

        ctx.clearRect(0, 0, 1024, 512);

        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI*2, false);
        ctx.stroke();
        ctx.closePath();
    
    }


}



Player.prototype.update = function(xPos, yPos){

    this.x += xPos;
    this.y += yPos;

    this.drawPlayer(this.x, this.y);

}



document.addEventListener("keypress", (event) => {

    if (event.key == 'w') {
        player.update(0, -10);
    }
    if (event.key == 'a') {
        player.update(-10, 0);
    }
    if (event.key == 's') {
        player.update(0, 10);
    }
    if (event.key == 'd') {
        player.update(10, 0);
    }

  });


//====================================================================================


//========================================Main========================================

function init(){

    canvas = document.getElementById('canvas');


    ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    player = new Player(150, 150);
    player.drawPlayer();
}



function draw(){


    ctx.clearRect(0, 0, 1024, 512);

    player.drawPlayer();
    
    
}

window.requestAnimationFrame(draw);

//==============================================================================

document.addEventListener('DOMContentLoaded', init)


