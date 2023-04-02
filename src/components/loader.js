import { useEffect, useRef } from "react";

const colors = ['green', 'red', 'blue', 'brown', 'orange', 'purple'];

class Circle {
    constructor(radius, color, index, total, distance, width, height, c, speed) {
        this.c = c;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.startAngle = index * Math.PI * 2 / total;
        this.increment = 0;
        this.centerX = width / 2 + distance * Math.cos(this.startAngle);
        this.centerY = height / 2 + distance * Math.sin(this.startAngle);
        this.x = width / 2;
        this.y = height / 2;
        this.distance = distance;
    };

    draw() {
        this.c.beginPath();
        this.c.fillStyle = this.color;
        this.c.strokeStyle = this.color;
        this.c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.c.fill();
        this.c.stroke();
        this.c.closePath();
    };

    update(canvas) {
        if (Math.abs(this.x - canvas.width / 2) < 2 && Math.abs(this.y - canvas.height / 2) < 2) {
            setTimeout(() => {
                this.increment += this.speed;

                this.x = this.centerX + this.distance * Math.cos(this.startAngle + Math.PI + this.increment);
                this.y = this.centerY + this.distance * Math.sin(this.startAngle + Math.PI + this.increment);
            }, 200);
        }
        else {
            this.increment += this.speed;

            this.x = this.centerX + this.distance * Math.cos(this.startAngle + Math.PI + this.increment);
            this.y = this.centerY + this.distance * Math.sin(this.startAngle + Math.PI + this.increment);
        }
    };
};

function Loader() {
    const canvasRef = useRef();
    const contextRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;

        contextRef.current = canvas.getContext('2d');

        const array = [];
        let animationFrameId;

        function initialize() {
            canvas.width = parseFloat(getComputedStyle(document.getElementById('loader')).width);
            canvas.height = parseFloat(getComputedStyle(document.getElementById('loader')).height);

            for (let i = 0; i < 6; i++) {
                array.push(new Circle(25, colors[i], i, 6, 50, canvas.width, canvas.height, contextRef.current, 0.08));
            }

            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animate();
        };


        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);

            array.forEach(circle => {
                circle.draw();
                circle.update(canvas);
            });
        };

        initialize();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return <canvas ref={canvasRef} />;
};

export default Loader;