import FastNoiseLite from "./modules/FastNoiseLite.js"

let speed = 20;
let scale = 0.1; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let logoColor;

let noise = new FastNoiseLite();
noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
noise.SetSeed(1337);
noise.SetFrequency(0.003);
noise.SetRotationType3D(FastNoiseLite.RotationType3D.None);

noise.SetFractalType(FastNoiseLite.FractalType.PingPong);
noise.SetFractalOctaves(2);
noise.SetFractalLacunarity(2);
noise.SetFractalGain(0.5);
noise.SetFractalWeightedStrength(0.0);
noise.SetFractalPingPongStrength(2.0);

noise.SetCellularDistanceFunction(FastNoiseLite.CellularDistanceFunction.EuclideanSq);
noise.SetCellularReturnType(FastNoiseLite.CellularReturnType.CellValue);
noise.SetCellularJitter(1);

let noise_dw = new FastNoiseLite();
noise_dw.SetDomainWarpType(FastNoiseLite.DomainWarpType.OpenSimplex2);
noise_dw.SetDomainWarpAmp(30);
noise_dw.SetSeed(1337);
noise_dw.SetFrequency(0.01);

let dvd = {
    x: 200,
    y: 300,
    xspeed: 2,
    yspeed: 2,
    img: new Image()
};

(function main(){
    canvas = document.getElementById("main-canvas");
    ctx = canvas.getContext("2d");
    dvd.img.src = 'dvd-logo.png';

    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    canvas.width = 720;
    canvas.height = 576;

    //pickColor();
    //update();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let noise_width = canvas.width;
    let noise_height = canvas.height;
    let noise_buffer = new Uint8ClampedArray(noise_width * noise_height * 4);

    for (let y = 0; y < noise_height; y++) {
        for (let x = 0; x < noise_width; x++) {
            let i = (y * noise_width + x) * 4;
            let noise_value_255 = Math.round(((noise.GetNoise(x,y,1) + 1) / 2) * 255);
            noise_buffer[i]   = noise_value_255;
            noise_buffer[i+1] = noise_value_255;
            noise_buffer[i+2] = noise_value_255;
            noise_buffer[i+3] = 255;
        }
    }

    var imgData = ctx.createImageData(noise_width, noise_height);
    imgData.data.set(noise_buffer);
    ctx.putImageData(imgData, 0, 0);
})();

window.onresize = function() {
    canvas = document.getElementById("main-canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update() {
    setTimeout(() => {
        //Draw the canvas background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Draw DVD Logo and his background
        ctx.fillStyle = logoColor;
        ctx.fillRect(dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
        ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);

        //Move the logo
        dvd.x += dvd.xspeed;
        dvd.y += dvd.yspeed;

        //Check for collision
        checkHitBox();
        update();
    }, speed)
}

//Check for border collision
function checkHitBox(){
    if(dvd.x + dvd.img.width*scale >= canvas.width || dvd.x <= 0){
        dvd.xspeed *= -1;
        pickColor();
    }

    if(dvd.y + dvd.img.height*scale >= canvas.height || dvd.y <= 0){
        dvd.yspeed *= -1;
        pickColor();
    }
}

//Pick a random color in RGB format
function pickColor(){
    let r = Math.random() * (254 - 0) + 0;
    let g = Math.random() * (254 - 0) + 0;
    let b = Math.random() * (254 - 0) + 0;

    logoColor = 'rgb('+r+','+g+', '+b+')';
}

function getNoiseArray(){
}
