class rainDrops {
    constructor(x, y, weight, speed, dir) {
        this.weight = weight;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.dir = dir;
    }

    show() {
        stroke(255);
        strokeWeight(this.weight);
        line(this.x, this.y, this.x + this.dir.x * this.speed,
            this.y + this.dir.y * this.speed);
    }
    //drop width acceleration
    move(acc) {
        this.x += this.speed * this.dir.x;
        this.y += this.speed * this.dir.y;
        this.speed += acc;
    }
}
//create a raindrop starting between (0, 0) and (maxWidth, maxHeight) with
//direction dir
function createRainDrops(maxWidth, maxHeight){
    let x = random(maxWidth);
    let y = random(maxHeight);
    let speed = random(0.5, 4);
    let weight = random(0.5, 1.5);
    let dir = createVector(-0.3, 1);
    return(new rainDrops(x, y, weight, speed, dir));
}