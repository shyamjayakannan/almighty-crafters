import { useEffect, useRef } from "react";
import styles from "./sine.module.css";

let increment = 0, frequency = 1, friction = 0.02;
const height = window.innerWidth / window.innerHeight > 1.3 ? 700 : 1000;

function draw(c, canvas) {
    c.beginPath();
    c.fillStyle = document.documentElement.style.getPropertyValue('--theme');

    for (let i = 0; i < canvas.width; i++) {
        c.fillRect(i, 0, 1, height - Math.sin(i * 0.004 - increment) * 25);
    }

    c.closePath();

    // frequency
    if (frequency > 0.02) frequency -= friction;

    friction *= 0.98;
    increment += frequency;
};

function Sine(props) {
    const canvasRef = useRef();
    const contextRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;

        contextRef.current = canvas.getContext('2d');

        canvas.width = props.width * 2.5;
        canvas.height = props.height * 2.5;
        
        let animationFrameId;
        
        (function animate() {
            animationFrameId = requestAnimationFrame(animate);
            contextRef.current.fillStyle = 'rgba(0, 0, 0)';
            contextRef.current.fillRect(0, 0, canvas.width, canvas.height);

            draw(contextRef.current, canvas);
        })();

        return () => cancelAnimationFrame(animationFrameId);
    }, [props.width, props.height]);

    return <canvas className={styles.canvas} ref={canvasRef} />;
};

export default Sine;