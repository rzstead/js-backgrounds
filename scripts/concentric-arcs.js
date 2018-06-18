var canvas = document.getElementById('canvas');
var minDSlider = document.getElementById('minD');
var minLWSlider = document.getElementById('minLW');
var maxLWSlider = document.getElementById('maxLW');
var minVSlider = document.getElementById('minV');
var maxVSlider = document.getElementById('maxV');
var arcAmountSlider = document.getElementById('arcAmount');
var context = canvas.getContext("2d");
var arcs = [];
var windowHeight, windowWidth, minD, maxD, minLW, maxLW, minV, maxV, arcAmount;

minDSlider.oninput = () => {
    minD = this.value;
    resetArcs();
}

minLWSlider.oninput = function()  {
    minLW = this.value;
    resetArcs();
}

maxLWSlider.oninput = function() {
    maxLW = this.value;
    resetArcs();
}

minVSlider.oninput = function() {
    minV = this.value;
    resetArcs();
}

maxVSlider.oninput = function() {
    maxV = this.value;
    resetArcs();
}

arcAmountSlider.oninput = function() {
    arcAmount = this.value;
    resetArcs();
}

class Arc{
    constructor(){
        this.x = windowWidth / 2;//random(0, windowWidth);
        this.y = windowHeight / 2; //random(0, windowHeight);
        this.sA = Math.PI * random(0, 2);
        this.eA = Math.PI * random(1, 2);
        this.lW = random((minLW || 1), (maxLW || 2));
        this.diameter = random((minD || 25), (windowHeight/2 - 50));
        this.velocity = random((minV || .01), (maxV || .05)) / 100
        this.draw = () => {
            context.beginPath();
            context.strokeStyle = "white";
            context.lineWidth = this.lW;
            context.arc(this.x, this.y, this.diameter, this.sA += this.velocity, this.eA += this.velocity, false);
            context.stroke();
        }

        this.adjustParams = () =>{
            this.x = windowWidth / 2;
            this.y = windowHeight / 2;
        }
    }
}

(function () {
    arcAmount = 150 ;
    startAnimating();
})();

function startAnimating() {
    setWindowSize();
    makeArcs();
    animate();
}

function resetArcs(){
    arcs = [];
    console.log(arcAmount)
    makeArcs();
}

function makeArcs(){
    for (let i = 0; i < arcAmount; i++) {
        arcs.push(new Arc());    
        console.log("created arc")
    }
}

function drawArcs(){
    arcs.forEach(arc => {
        arc.draw();
    });
}

function adjustParams(){
    arcs.forEach(arc => {
        arc.adjustParams();
    });
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawArcs();
}

$(window).on('resize', () => {
    setWindowSize();
    adjustParams();
})

function setWindowSize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    context.canvas.width = windowWidth;
    context.canvas.height = windowHeight;
}

function random(min, max) {
    return Math.random() * (max - min + 1) + min;
}
