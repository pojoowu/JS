function Cell(i, j, w) {
  this.w = w;
  this.i = i;
  this.j = j; //generations
  this.state = 0;
  let stateOn = 1;
  let stateOff = 0;


  this.show = function() {
    let x = this.j * w;
    let y = this.i * w;
    stroke(0);
    let halfGen = floor(m / 2);
    if (this.state === 0) {
      fill(51);
    } else if(m > 2){
      let r = floor((255 * m - 306 - 204 * this.state) / (m - 2));
      let g = floor((255*m - 280 -230*this.state)/(m-2));
      fill(r, g, 0);
    } else{
      fill(255);
    }
    rect(x, y, w, w);
  }

  this.renew = function() {
    let count = 0;
    for (let ni = -1; ni < 2; ni++) {
      for (let nj = -1; nj < 2; nj++) {
        if (ni != 0 || nj != 0) {
          if (cells[index(this.i + ni, this.j + nj, rownb, colnb)].state === stateOn) {
            count += 1;
          }
        }
      }
    }
    if (this.state === stateOn) {
      if (bArr.includes(count)) {
        return stateOn;
      } else {
        return 2 % m;
      }
    } else if (this.state === stateOff) {
      if (sArr.includes(count)) {
        return stateOn
      } else {
        return stateOff
      }
    } else {
      return (this.state + 1) % m;
    }
  }
}
