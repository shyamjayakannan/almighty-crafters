import Services from "./sections/Services";
import ImageSlider from "./sections/ImageSlider";
import Start from "./sections/Start";
import Navbar from "../../components/Navbar";
import About from "./sections/About";
import Handcrafted from "./sections/Handcrafted";
import AIcollection from "./sections/AIcollection";
import Community from "./sections/Community";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.css";

function MainPage() {
    const [show, setShow] = useState([true, false, false, false, false, false, false]);
    const div1 = useRef(),
        div2 = useRef(),
        div3 = useRef(),
        div4 = useRef(),
        div5 = useRef(),
        div6 = useRef(),
        div7 = useRef(),
        observer = useRef(),
        elements = useRef();

    useEffect(() => {
        window.addEventListener('beforeunload', scroll);

        function scroll() {
            window.scrollTo(0, 0);
        };

        window.scrollTo(0, 0);

        return () => window.removeEventListener('beforeunload', scroll);
    }, []);
    
    const intersect = useCallback(entries => {
        if (entries.length > 1) return;

        const entry = entries[0];
        const index = elements.current.indexOf(entry.target);

        if (entry.isIntersecting) {
            setShow(show => {
                if (!show[index]) show[index] = true;

                return [...show];
            });

            if (index !== 0) observer.current.unobserve(entry.target);
        }
        else {
            setShow(show => {
                if (show[index]) show[index] = false;

                return [...show];
            });
        }
    }, []);


    useEffect(() => {
        elements.current = [div1.current, div2.current, div3.current, div4.current, div5.current, div6.current, div7.current];

        observer.current = new IntersectionObserver(intersect, { threshold: 0.2 });
        elements.current.forEach(element => observer.current.observe(element));
    }, [intersect]);

    function navigate(index) {
        if (show[index]) elements.current[index].scrollIntoView(true);
        else {
            setShow(show => {
                for (let i = 1; i <= index; i++) {
                    if (!show[i]) show[i] = true;
                    observer.current.unobserve(elements.current[i]);
                }

                return [...show];
            });

            setTimeout(() => elements.current[index].scrollIntoView(true), 200)
        }
    };

    return (
        <div>
            <Navbar navigate={navigate} />
            <div ref={div1} className={styles.container}>
                <Start className={show[0] ? styles.visible : styles.hidden} />
            </div>
            <div id="home" ref={div2} className={styles.container}>
                {show[1] && <ImageSlider />}
            </div>
            <div id="about" ref={div3} className={styles.container}>
                {show[2] && <About />}
            </div>
            <div id="services" ref={div4} className={styles.container}>
                {show[3] && <Services />}
            </div>
            <div id="handcrafted" ref={div5} className={styles.container}>
                {show[4] && <Handcrafted />}
            </div>
            <div id="ai" ref={div6} className={styles.container}>
                {show[5] && <AIcollection />}
            </div>
            <div id="community" ref={div7} className={styles.container}>
                {show[6] && <Community />}
            </div>
        </div>
    );
};

export default MainPage;