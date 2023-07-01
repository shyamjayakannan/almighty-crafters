import { useEffect, useRef, useState } from "react";
import styles from "./ImageSlider.module.css";
import Card from "../../../components/Card";

const images = ["./slider/0.png", "./slider/1.jpg", "./slider/2.png", "./slider/3.jpg", "./slider/4.png", "./slider/5.jpg", "./slider/6.jpeg", "./slider/7.jpg", "./slider/8.png", "./slider/9.jpg"],
    links = [
        "https://opensea.io/collection/theetherealangels",
        "https://opensea.io/collection/thechimprealm",
        "https://opensea.io/collection/theskeletalmanga",
        "https://opensea.io/collection/thecrookedcactus",
        "https://opensea.io/collection/thelighteningdaemon",
        "https://opensea.io/collection/theblackfederation",
        "https://opensea.io/collection/thebonapes",
        "https://opensea.io/collection/theclassicchameleons",
        "https://opensea.io/collection/theskyscrapingestablishments",
        "https://opensea.io/collection/thefeminasupremacy"
    ];

function plusOne(arr) {
    let newArr = [];

    newArr[0] = arr[arr.length - 1];
    for (let i = 0; i < arr.length - 1; i++) newArr[i + 1] = arr[i];

    return newArr;
};

function minusOne(arr) {
    let newArr = [];

    newArr[arr.length - 1] = arr[0];
    for (let i = 0; i < arr.length - 1; i++) newArr[i] = arr[i + 1];

    return newArr;
};

function ImageSlider() {
    const interval = useRef(),
        count = useRef(4),
        slide = useRef();

    const [boxClasses, setBoxClasses] = useState([styles.box5, styles.box1, styles.box2, styles.box3, styles.box4]);
    const [imgs, setImgs] = useState([{ image: images[0], link: links[0] }, { image: images[1], link: links[1] }, { image: images[2], link: links[2] }, { image: images[3], link: links[3] }, { image: images[4], link: links[4] },]);

    function moveUp() {
        clearInterval(interval.current);

        for (let i in boxClasses) {
            if (boxClasses[i] === styles.box4) {
                setImgs(imgs => {
                    imgs[i] = { image: images[count.current - 5 < 0 ? count.current + 5 : count.current - 5], link: links[count.current - 5 < 0 ? count.current + 5 : count.current - 5] };

                    // VERY IMPORTANT 
                    // MODIFY COUNT INSIDE THE FOR LOOP, OTHERWISE IF DONE BELOW, IT IS RUNNINING
                    // THE IF LOOP BELOW FIRST INSTEAD OF THE FOR LOOP 
                    // MUST BE BECAUSE SETIMGS IS SCHEDULED TO RUN LATER AND ASYNCHRONOUS EXECUTION OCCURS 

                    if (--count.current < 0) count.current += 10;

                    // VERY IMPORTANT 
                    // RETURN A NEW ARRAY AFTER MODIFICATION, NOT SAME 
                    return [...imgs];
                });
            }
        }

        setBoxClasses(boxClasses => minusOne(boxClasses));

        interval.current = setInterval(() => slide.current(), 4000);
    };

    function moveDown() {
        clearInterval(interval.current);

        slide.current();

        interval.current = setInterval(() => slide.current(), 4000);
    };

    slide.current = () => {
        if (++count.current > 9) count.current -= 10;

        for (let i in boxClasses) {
            if (boxClasses[i] === styles.box5) {
                setImgs(imgs => {
                    imgs[i] = { image: images[count.current], link: links[count.current] };

                    // VERY IMPORTANT 
                    // RETURN A NEW ARRAY AFTER MODIFICATION, NOT SAME 
                    return [...imgs];
                });
            }
        }

        setBoxClasses(boxClasses => plusOne(boxClasses));
    };

    useEffect(() => {
        interval.current = setInterval(() => slide.current(), 4000);

        function visibility() {
            // in the beginning variable interval is not defined so add the below if check
            if (interval.current) clearInterval(interval.current);

            interval.current = setInterval(() => slide.current(), 4000);
        };

        document.addEventListener('visibilitychange', visibility);

        return () => {
            document.removeEventListener('visibilitychange', visibility);
            clearInterval(interval.current);
        };
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <Card className={styles.card} noshadow>
                    <h1>We</h1>
                    <p align="justify">create some amazing <span>NFTs.</span> Check out some of our work directly on Opensea by clicking on the images!</p>
                </Card>
            </div>
            <div className={styles['image-slider']}>
                <div className={styles.inner}>
                    <div className={styles.move}>
                        <button id="b1" onClick={moveUp}><div /></button>
                        <button id="b2" onClick={moveDown}><div /></button>
                    </div>
                    <div className={styles.container}>
                        <div className={boxClasses[0]}><a href={imgs[0].link} target="_blank" rel="noreferrer"><img src={imgs[0].image} alt="" /></a></div>
                        <div className={boxClasses[1]}><a href={imgs[1].link} target="_blank" rel="noreferrer"><img src={imgs[1].image} alt="" /></a></div>
                        <div className={boxClasses[2]}><a href={imgs[2].link} target="_blank" rel="noreferrer"><img src={imgs[2].image} alt="" /></a></div>
                        <div className={boxClasses[3]}><a href={imgs[3].link} target="_blank" rel="noreferrer"><img src={imgs[3].image} alt="" /></a></div>
                        <div className={boxClasses[4]}><a href={imgs[4].link} target="_blank" rel="noreferrer"><img src={imgs[4].image} alt="" /></a></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImageSlider;