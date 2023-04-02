import styles from "./About.module.css";
import Heading from "../../../components/Heading";
import Counter from "../../../components/Counter";

function About() {
    return (
        <section className={styles.performance}>
            <Heading className={styles.heading} first="About" second="Us" left />
            <div className={styles.factlist}>
                <ul>
                    <li>
                        <div className={styles.items}>
                            <h3 className={styles.data}>
                                <Counter no total={2500} from={0} to={250} decimals={0} />
                            </h3>
                            <p>Total Items</p>
                        </div>
                    </li>
                    <li>
                        <div className={styles.items}>
                            <h3 className={styles.data}>
                                <Counter total={5000} from={0} to={1} decimals={1} />
                            </h3>
                            <p>Total Owners</p>
                        </div>
                    </li>
                    <li>
                        <div className={styles.items}>
                            <h3 className={styles.data}>
                                <Counter total={5000} from={0} to={0.005} decimals={4} />
                            </h3>
                            <p>Floor Price (ETH)</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles.information}>
                <p>
                    Almighty Crafters was founded with the intention of
                    producing high-caliber digital artwork and selling it to
                    individuals who are interested in buying it in the form
                    of NFTs, so granting them sole ownership of the entire
                    work.
                </p>
                <p>
                    Soon, we realized that not many people had
                    taken advantage of the ability to create Non-Fungible
                    Tokens for their artistic endeavors. The main cause being the
                    lack of knowledge about concepts like Blockchain, Web3,
                    cryptocurrency, NFTs, etc.
                </p>
                <p>
                    Consequently, we made the decision to support people with
                    creating and registering their NFTs. So send us any type of
                    content—pictures, artwork, music, videos, or anything
                    else—we'll create your NFTs and transfer them to your
                    account. Most importantly, we will do it for
                    absolutely FREE. Then you may sell your NFTs and make
                    money off them.
                </p>
                <p>
                    Don't delay; turn anything you want into an NFT and start
                    earning!
                </p>
            </div>
        </section>
    );
};

export default About;