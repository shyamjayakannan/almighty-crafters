import Heading from "../../../components/Heading";
import styles from "./AIcollection.module.css";

function AIcollection() {
    return (
        <section className={styles.section}>
            <Heading first="AI" second="Collection" right />
            <div className={styles.images}>
                <div className={styles["imgpreview-top"]}>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/theenchantedcastles" rel="noreferrer">
                                <img alt="" src="pictures\castles.png" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/thebonapes" rel="noreferrer">
                                <img alt="" src="/pictures/bonapetite_17.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/thelighteningdaemon" rel="noreferrer">
                                <img alt="" src="/slider/4.png" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/theskyscrapingestablishments" rel="noreferrer">
                                <img alt="" src="/pictures/Copy of science fiction(026)_0003 2587083096.png" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles["imgpreview-bottom"]}>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/thejokerjeopardy" rel="noreferrer">
                                <img alt="" src="/pictures/The Joker(009)_0019 282686930.png" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/theetherealangels" rel="noreferrer">
                                <img alt="" src="/pictures/Nyx goddess of(003)_0007 1065911151.png" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/theskeletalmanga" rel="noreferrer">
                                <img alt="" src="/pictures/anime manga(015)_0011 537515347.png" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/thevicioussorceress" rel="noreferrer">
                                <img alt="" src="pictures\sorceress goddess(013)_0007 3456871387_out.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["btn_description"]}>
                <div>
                    <div className={styles.description}>
                        <p>
                            Our handmade collections are result of hardwork of our artists
                            and designers in Almighty Crafters. These are drawn with hands
                            based on imagination and thoughts of artists. Thus resulting
                            in precise conversion of one's thoughts into lively images.
                            Therefore, these arts have special place in our hearts.
                        </p>
                    </div>
                    <a href="https://opensea.io/Almighty_Crafters?tab=created" target="_blank" rel="noreferrer">
                        <button className={styles.button}>SEE ALL COLLECTIONS</button>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AIcollection;