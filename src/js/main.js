let canvas, ctx;


//==============================Map===============================

function Map(){
    this.map = [[1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,1],
                [1,0,1,0,0,0,0,1],
                [1,0,1,0,0,1,1,1],
                [1,0,0,0,0,0,0,1],
                [1,0,0,0,1,0,0,1],
                [1,0,0,0,0,0,0,1],
                [1,1,1,1,1,1,1,1]]
    this.mapX = 8;
    this.mapY = 8;

    
    this.drawMap = async () =>{
        let x,y;

        for(x=0; x<this.map.length; x++){
            for(y=0; y<this.map[0].length; y++){

                initY = canvas.height * (y/this.mapY);
                finalY = canvas.height * ( (y/this.mapY) + 1);
                initX = canvas.width * (x/this.mapX);
                finalX = canvas.width * ( (x/this.mapX) + 1);

                if( this.map[x][y] == 1){color = 'white';} else{color='black';}

                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.fillRect(initX, initY, (canvas.width/this.mapX)-1, (canvas.height/this.mapY)-1);
                ctx.stroke();
                ctx.closePath();
                

            }
        }


    }
}


Map.prototype.update = function(xPos, yPos){

    this.drawMap();

}


//===============================Player===========================

let px,py;



function Player(xPos, yPos){
    
    this.x = xPos;
    this.y = yPos;
    this.dx, this.dy = 0, 0;
    this.angle = 0;



    this.drawPlayer = async () => {

        ctx.clearRect(0, 0, 1024, 512);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI*2, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
    
    }

    this.drawRay = async () =>{
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + ( this.dx * 5), (this.y + this.dy * 5));
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.closePath();
    }

    this.draw3dRay = async () => {

        let rx , ry, ra; //Ray coordinates refered to the mapping and angle
        let xo, yo; //Offset from ray coordinate
        let r; //Number of rays

        let sizeY = canvas.height/map.mapY; //Pixel space between vertical lines
        let sizeX = canvas.width/map.mapX; //Pixel space between horizontal lines

        
        let dof = 0; //Number of offset drawing

        let mx, my, mp;

        for(r=0; r<1; r++){

            dof = 0;
            ra = this.angle;
            let aTan = -1/Math.tan(ra);

            //-------Checking horizontal lines

            if(ra>Math.PI){
                
                ry = Math.floor( this.y/sizeY );
                rx = ( (this.y - ry)/aTan ) + this.x;
                
                yo = -sizeY;
                xo = -sizeY*aTan;
                
                
            }

            if(ra<Math.PI){

                ry = Math.floor( this.y/sizeY ) + sizeY;
                console.log(ry)
                rx = ( (this.y - ry)/aTan ) + this.x;

                yo = sizeY;
                xo = -sizeY*aTan;
            }

            if(ra == 0 || ra == Math.PI){
                ry = this.y;
                rx = this.x;
                dof = map.mapY;
            }

            while(dof < map.mapY){

                mx = Math.floor(rx/map.mapX);
                my = Math.floor(ry/map.mapY);
                mp = (my * map.mapX) + mx


                if(mp < (map.mapX * map.mapY) && map.map[mx][my] == 1){dof = map.mapY;}
                else{rx += xo; ry += yo; dof+=1;}
                
            }
            
            console.log({mx, my, dof})

            
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(rx, ry);
            ctx.strokeStyle = 'yellow';
            ctx.stroke();
            ctx.closePath();


        }




    }

    this.assignedKey = async (keyword) => {

        if(keyword == 'w'){

            this.x += this.dx;
            this.y += this.dy;
        }

        if(keyword == 's'){

            this.x -= this.dx;
            this.y -= this.dy;

        }

    }


}

Player.prototype.update = function(xPos, yPos, angle, keyword){

    this.angle += angle;

    if(this.angle<0){
        this.angle += 2*Math.PI;
    }
    if(this.angle>2*Math.PI){
        this.angle -= 2*Math.PI;
    }

    this.dx = Math.cos(this.angle) * 5;
    this.dy = Math.sin(this.angle) * 5;

    this.assignedKey(keyword);

    this.drawPlayer();
    this.drawRay();
    this.draw3dRay();

}



document.addEventListener("keypress", (event) => {

    if (event.key == 'w') {
        
        player.update(0, -5, 0, 'w');
    }
    if (event.key == 'a') {

        
        player.update(0, 0, -0.1, 'a');

    }
    if (event.key == 's') {
        player.update(0, 5, 0, 's');
    }
    if (event.key == 'd') {
        player.update(0, 0, 0.1, 'd');
    }

  });


//====================================================================================


//========================================Main========================================

function init(){

    canvas = document.getElementById('canvas');

    ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';

    map = new Map();
    map.drawMap();


    player = new Player(150, 150, 0);
    player.drawPlayer();
    player.drawRay();


}



function draw(){


    ctx.clearRect(0, 0, 1024, 512);

    player.drawPlayer();
    player.drawRay();
    player.draw3dRay();
    map.drawMap();
    
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

//==============================================================================

document.addEventListener('DOMContentLoaded', init)


