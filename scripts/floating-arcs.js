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
        this.lineWidth = random(.5, 1.3);
        this.x = random(5, windowWidth);
        this.y = random(5, windowHeight);
        this.velocity = random(.1, .2) / 10
        this.sVelocity = random(.01, .08) / 100;
        this.eVelocity = random(.01, .02) / 100;
        this.starting = Math.PI * random(0, 2);
        this.ending = Math.PI * random(0, 2);
        this.yFactor = 1;
        this.xFactor = 1;
        this.velocityFactor = 1;
        //this.color = 'rgba(' + random(15, 80) + ','+ random(90, 180) +',' + random(200, 255) + ')';
        this.getCoordinates = function() {
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
        this.draw = function() {
            this.collision();
            this.getCoordinates();
            context.shadowBlur = 12;
            context.shadowColor = "#a0c4ff";
            context.beginPath();
            context.strokeStyle = "white";
            context.lineWidth = this.lineWidth;

            context.arc(this.x, this.y, this.width, this.starting += this.sVelocity, this.ending += this.sVelocity, false);

            context.stroke();
            //context.fillRect(this.x, this.y, this.width, this.height);
        }

        this.fadeOut = function(){
            context
        }

        this.collision = function() {
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
    return Math.random() * (max - min + 1) + min;
}

function makeBalls() {
    for (let i = 0; i < 85; i++) {
        var ball = new Ball();
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
    context.clearRect(0, 0, canvas.width, canvas.height)
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
