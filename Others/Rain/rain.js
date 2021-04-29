let canvas;
let dir,
    acc = 2;
let scale = 10,
    drops = [],
    dropsNb = 300;

function setup() {
    canvas = createCanvas(800, 600);
    canvas.parent('#canvasP');
    dir = createVector(-1 / 2, 1);
    for (let i = 0; i < dropsNb; i++) {
        let drop = createRainDrops(width, height);
        drops.push(drop);
    }
}

function draw() {
    frameRate(20);
    background(51);
    for (let drop of drops) {
        drop.show();
        drop.move(acc);
    }
    for(let i = 0; i < dropsNb; i++){
        if(drops[i].y >= height){
            drops[i] = createRainDrops(width, height);
        }
    }
}

