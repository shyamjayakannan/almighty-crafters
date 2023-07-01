import Heading from "../../../components/Heading";
import styles from "./Handcrafted.module.css";

function Handcrafted() {
    return (
        <section className={styles.section}>
            <Heading first="Handcrafted" second="Collection" left />
            <div className={styles.images}>
                <div className={styles["imgpreview-top"]}>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/thechimprealm" rel="noreferrer">
                                <img alt="" src="./pictures/cigarchimp.jpg" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/thecrookedcactus" rel="noreferrer">
                                <img alt="" src="./slider/3.jpg" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/thefeminasupremacy" rel="noreferrer">
                                <img alt="" src="./pictures/aestheticariana.jpg" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/thelordlylionsclub" rel="noreferrer">
                                <img alt="" src="./pictures/hcol_lion.jpg" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles["imgpreview-bottom"]}>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/thehearteninghippos" rel="noreferrer">
                                <img alt="" src="./pictures/BABY Hippo tududududu.jpg" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/theblackfederation" rel="noreferrer">
                                <img alt="" src="./slider/5.jpg" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/thechimprealm" rel="noreferrer">
                                <img alt="" src="./pictures/chulbul chimp.jpg" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageboundary}>
                        <div>
                            <a target="_blank" href="https://opensea.io/collection/theclassicchameleons" rel="noreferrer">
                                <img alt="" src="./pictures/ferocious.jpg" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["btn_description"]}>
                <div>
                    <div className={styles.description}>
                        <p>
                            Our AI based collections are made with help of technology. We
                            think that imagination plays a major role in making arts. AI
                            helps to convert those thoughts into mind-blowing digital art
                            forms. Output of these AI, you can see, are really
                            spectacular. They may not be handmade but still are worth
                            exploring as well as owning.
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

export default Handcrafted;