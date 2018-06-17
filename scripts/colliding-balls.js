var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var stop = false;
var frameCount = 0;
var balls = [];
var windowHeight, windowWidth;

class Ball {
    constructor() {
        this.height = random(15, 50);
        this.width = this.height;
        this.x = random(5, windowWidth);
        this.y = random(5, windowHeight);
        this.velocity = 5;
        this.yFactor = 1;
        this.xFactor = 1;
        this.color = 'rgba(' + random(15, 80) + ','+ random(90, 180) +',' + random(200, 255) + ')';
        this.getCoordinates = function () {
            if (this.x + (this.width / 2) > windowWidth) {
                this.xFactor = -1;
            }
            if (this.x < 0) {
                this.xFactor = 1;
            }
            if (this.y < 0) {
                this.yFactor = 1;
            }
            if (this.y + (this.height / 2) > windowHeight) {
                this.yFactor = -1;
            }

            this.x += (this.velocity * this.xFactor);
            this.y += (this.velocity * this.yFactor);
        }
        this.draw = function () {
            this.collision();
            this.getCoordinates();
            context.shadowBlur = 8;
            context.shadowColor = "#0008";
            context.shadowOffsetY = 2;
            context.shadowOffsetX = 2;
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.x, this.y, this.width, 0, Math.PI * 2, false);
            context.fill();
            //context.fillRect(this.x, this.y, this.width, this.height);
        }
        this.collision = function () {
            for (let i = 0; i < balls.length; i++) {
                const ball = balls[i];
                if (ball != this) {
                    if (this.intersects(ball)) {
                        this.xFactor = this.xFactor * -1;
                        this.yFactor = this.yFactor * -1;
                    }
                }
            }
        }
        this.intersects = function (rect) {
            return !(rect.x > (this.x + this.width) ||
                (rect.x + rect.width) < this.x ||
                rect.y > (this.y + this.width) ||
                (rect.y + rect.width) < this.y);
        }
    }
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeBalls() {
    for (let i = 0; i < 25; i++) {
        var ball = new Ball();
        console.log(ball)
        balls.push(ball);
    }
}

function drawBalls() {
    balls.forEach(ball => {
        ball.draw();
    });
}

function startAnimating() {
    setWindowSize();
    makeBalls();
    animate();
}

(function () {
    startAnimating();
})();

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBalls();
}

$(window).on('resize', () => {
    setWindowSize();
})

function setWindowSize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    context.canvas.width = windowWidth;
    context.canvas.height = windowHeight;
}
