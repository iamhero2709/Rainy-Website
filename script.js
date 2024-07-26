class RainDrop {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.init();
    }

    init() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height; 
        this.length = Math.random() * 20 + 40; // length 
        this.speed = Math.random() * 5 + 22; // speed 
    }

    update() {
        this.y += this.speed;
        if (this.y > this.canvas.height) {
            this.init();
            this.y = 0;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x, this.y - this.length);
        this.ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
    }
}

class Lightning {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.flash();
    }

    flash() {
        setTimeout(() => {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            setTimeout(() => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }, 100);
            this.flash();
        }, Math.random() * 5000 + 2000); // Flash every 2-7 seconds
    }
}

function initRain() {
    const canvas = document.getElementById('rain-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const rainDrops = Array.from({ length: 100 }, () => new RainDrop(canvas));
    const lightning = new Lightning(canvas);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rainDrops.forEach(drop => {
            drop.update();
            drop.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById('rain-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.onload = () => {
    initRain();

    const playButton = document.getElementById('play-button');
    const rainAudio = document.getElementById('rain-audio');
    const toggleRainButton = document.getElementById('toggle-rain');
    const volumeControl = document.getElementById('volume-control');

    playButton.addEventListener('click', () => {
        rainAudio.play();
        playButton.style.display = 'none';
    });

    toggleRainButton.addEventListener('click', () => {
        const canvas = document.getElementById('rain-canvas');
        const display = canvas.style.display;
        canvas.style.display = display === 'none' ? 'block' : 'none';
    });

    volumeControl.addEventListener('input', (e) => {
        rainAudio.volume = e.target.value;
    });
};
