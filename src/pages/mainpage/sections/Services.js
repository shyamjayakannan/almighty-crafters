import { Link } from "react-router-dom";
import BorderAnimation from "../../../components/BorderAnimation";
import Delay from "../../../components/Delay";
import Heading from "../../../components/Heading";
import styles from "./Services.module.css";

function Services() {
    return (
        <section className={styles.section}>
            <Heading first="Serv" second="ices" right nospace />
            <div className={styles.content}>
                <div id="steps" className={styles.steps}>
                    <BorderAnimation heading="01">Organize your content</BorderAnimation>
                    <Delay mount={false} delay={1000}><BorderAnimation heading="02">Send your creations to us</BorderAnimation></Delay>
                    <Delay mount={false} delay={2000}><BorderAnimation heading="03">The sale will be listed</BorderAnimation></Delay>
                    <Delay mount={false} delay={3000}><BorderAnimation heading="04">You will recieve sales</BorderAnimation></Delay>
                </div>
                <div className={styles.text}>
                    <div className={styles.container}>
                        <h1>Now</h1>
                        <p align="justify">
                            you can convert your art to <span>NFTs</span> and own or <span>EARN</span> from them.
                            We will convert your art forms to NFTs and transfer complete ownership to you for <span>FREE</span>.
                            Just click on the button below.
                        </p>

                        <Link className={styles["link-container"]} to="/registration" target="_blank" rel="noreferrer">
                            <div className={styles.s1}></div>
                            <div className={styles.s2}></div>
                            <span>Register Now</span>
                        </Link>

                        <p align="justify">
                            WE ALSO CRAFT NFTs FOR YOU. So if you want to turn your family photograph into digital art or want NFTs of your product,
                            just drop us an EMAIL at <a href="mailto:almightycrafters@gmail.com" target="_blank" rel="noreferrer">almightycrafters@gmail.com</a> and we will enjoy making them for you.
                            {/* <a href="https://mail.google.com/mail/?view=cm&source=mailto&to=almightycrafters@gmail.com" target="_blank" rel="noreferrer">almightycrafters@gmail.com</a> */}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;