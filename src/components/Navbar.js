import { useEffect, useReducer, useRef, useState } from "react";
import styles from "./Navbar.module.css";

function scrollReducer(state, action) {
    switch (action.type) {
        case 'HOME': return { ...initialState, home: true };
        case 'ABOUT': return { ...initialState, about: true };
        case 'SERVICES': return { ...initialState, services: true };
        case 'HANDCRAFTED': return { ...initialState, handcrafted: true };
        case 'AI': return { ...initialState, ai: true };
        case 'COMMUNITY': return { ...initialState, community: true };
        default: return state;
    }
};

const initialState = { home: false, about: false, services: false, handcrafted: false, ai: false, community: false };

function Navbar(props) {
    const [scroll, dispatchScroll] = useReducer(scrollReducer, initialState);
    const [hamburgerChecked, setHamburgerChecked] = useState(false);
    const sections = useRef();

    useEffect(() => {
        document.addEventListener('scroll', change);

        // if defined outside, not reading values 
        sections.current = [
            { element: document.getElementById('home'), type: 'HOME' },
            { element: document.getElementById('about'), type: 'ABOUT' },
            { element: document.getElementById('services'), type: 'SERVICES' },
            { element: document.getElementById('handcrafted'), type: 'HANDCRAFTED' },
            { element: document.getElementById('ai'), type: 'AI' },
            { element: document.getElementById('community'), type: 'COMMUNITY' }
        ];

        function change() {
            // Get current scroll position
            let scrollY = window.pageYOffset;
            // Now we loop through sections.current to get height, top and ID values for each
            sections.current.forEach(current => {
                if (current.element) {
                    const sectionHeight = current.element.offsetHeight;
                    let sectionTop = -50, element = current.element;

                    // offsettop returns distance from parent. but we want distance from page top 
                    // so, keep finding the parent and adding distance till you reach root div
                    do {
                        sectionTop += element.offsetTop;
                        
                        element = element.offsetParent;
                    } while (element);
                    
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) dispatchScroll({ type: current.type });
                }
            });
        };

        return () => document.removeEventListener('scroll', change);
    }, []);

    return (
        <nav className={styles.nav}>
            <a className={styles.logo} href="#home"><img src="pictures\AC Icon (1).png" alt="" /></a>
            <ul className={`${styles.ul} ${hamburgerChecked ? styles.translate : undefined}`}>
                <li><button onClick={() => props.navigate(1)} className={`${styles.links} ${scroll.home ? styles.active : ''}`}>Home</button></li>
                <li><button onClick={() => props.navigate(2)} className={`${styles.links} ${scroll.about ? styles.active : ''}`}>About Us</button></li>
                <li><button onClick={() => props.navigate(3)} className={`${styles.links} ${scroll.services ? styles.active : ''}`}>Services</button></li>
                <li><button onClick={() => props.navigate(4)} className={`${styles.links} ${scroll.handcrafted ? styles.active : ''}`}>Handcrafted Collection</button></li>
                <li><button onClick={() => props.navigate(5)} className={`${styles.links} ${scroll.ai ? styles.active : ''}`}>AI Collection</button></li>
                <li><button onClick={() => props.navigate(6)} className={`${styles.links} ${scroll.community ? styles.active : ''}`}>Community</button></li>
            </ul>
            <a href="https://opensea.io/Almighty_Crafters?search[sortBy]=LAST_SALE_PRICE&search[toggles][0]=BUY_NOW" rel="noreferrer" className={styles.label} target="_blank" htmlFor="file">BUY NOW</a>
            <div className={styles.hamburger}>
                <input type="checkbox" onChange={e => setHamburgerChecked(e.target.checked)} />
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default Navbar;