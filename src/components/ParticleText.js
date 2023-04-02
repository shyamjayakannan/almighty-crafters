import { useEffect, useRef } from "react";

class Particle {
    constructor(canvas, x, y, r, g, b, thickness) {
        this.x = Math.random() * canvas.width;
        this.origX = x;
        this.y = Math.random() * canvas.height;
        this.origY = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.thickness = thickness;
        this.ease = 0.1;
        this.distanceSquare = 0;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.friction = 0.2;
        this.force = 50;
        this.mouse = {
            // take large value for radius because we wont be doing distance square root as it is intensive
            radius: 5000,
            x: 0,
            y: 0
        };
        document.addEventListener('mousemove', e => {
            // VERY IMPORTANT 
            // inside arrow functions, this has context of the parent in which it is called 

            // make correction for the small size of the canvas so that mouse position is relative 
            // no need to do if canvas has window size 

            this.mouse.x = e.x - (window.innerWidth - canvas.width) / 2;
            this.mouse.y = e.y - (window.innerHeight - canvas.height) / 2;
        });
    };

    draw(c) {
        if (c.fillStyle !== `rgb(${this.r}, ${this.g}, ${this.b})`) c.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
        c.fillRect(this.x, this.y, this.thickness, this.thickness);
    };

    update() {
        this.distanceSquare = Math.pow(this.mouse.x - this.x, 2) + Math.pow(this.mouse.y - this.y, 2);

        if (this.distanceSquare < this.mouse.radius) {
            // do angle measure inside if because doing evertime is expensive and causes lag 
            this.angle = Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x);
            this.vx += -this.force * Math.cos(this.angle);
            this.vy += -this.force * Math.sin(this.angle);
        }

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx + (this.origX - this.x) * this.ease;
        this.y += this.vy + (this.origY - this.y) * this.ease;
    };
};

class Effect {
    constructor(fillStyle, font, text) {
        this.textSize = 0;
        this.fillStyle = fillStyle;
        this.font = font;
        this.text = text;
        this.particles = [];
        this.thickness = 3;
    };

    wrapText(c, canvas) {
        c.fillStyle = this.fillStyle;
        c.font = `${this.textSize}px ${this.font}`;
        c.textAlign = 'center';

        // VERY IMPORTANT FOR CENTERING BASED ON HOW WE HAVE DONE 
        c.textBaseline = 'top';

        const words = this.text.split(' '), lines = [''];
        let lineCount = 0, lineWidth = 0;

        for (let i = 0; i < words.length; i++) {
            if (c.measureText(`${words[i]} `).width + lineWidth > canvas.width) {
                lineCount++;
                lines.push('');
                lineWidth = 0;

                // if the first word itself is too large 
                if (i === 0) break;

                // to keep i same, subtract 1 here so that 1 will be added by for loop and net added = 0
                i--;
            }
            else {
                lines[lineCount] += `${words[i]} `;
                lineWidth += c.measureText(`${words[i]} `).width;
            }
        }

        lines.forEach((line, index, paragraph) => c.fillText(line, canvas.width / 2, canvas.height / 2 + this.textSize * (index - paragraph.length / 2)));
    };

    createParticles(c, canvas) {
    let pixels = c.getImageData(0, 0, canvas.width, canvas.height).data;
        
        // increment x and y by values greater than 1 to not take all pixels for better performance 
        for (let y = 0; y < canvas.height; y += this.thickness) {
            for (let x = 0; x < canvas.width; x += this.thickness) {
                if (pixels[(y * canvas.width + x) * 4 + 3] > 0)
                    this.particles.push(new Particle(canvas, x, y, pixels[(y * canvas.width + x) * 4], pixels[(y * canvas.width + x) * 4 + 1], pixels[(y * canvas.width + x) * 4 + 2], this.thickness));
            }
        }
    };

    removeParticles() {
        this.particles = [];
    };

    render(c) {
        this.particles.forEach(particle => {
            particle.draw(c);
            particle.update();
        });
    };
};

function ParticleText(props) {
    const canvasRef = useRef();
    const contextRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;

        contextRef.current = canvas.getContext('2d');

        let animationFrameId;

        function initialize() {
            canvas.width = parseFloat(getComputedStyle(document.getElementById('text')).width);
            canvas.height = parseFloat(getComputedStyle(document.getElementById('text')).height);

            effect.textSize = canvas.width * 0.12;
            effect.removeParticles();
            effect.wrapText(contextRef.current, canvas);
            effect.createParticles(contextRef.current, canvas);

            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animate();
        };

        window.addEventListener('resize', initialize);

        const effect = new Effect('rgb(248, 242, 242)', 'Roboto', props.text);

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);

            effect.render(contextRef.current);
        };

        initialize();

        return () => window.removeEventListener('resize', initialize);
    }, [props.text]);

    return <canvas ref={canvasRef} />;
};

export default ParticleText;