import Sine from "../../../components/sine";
import styles from "./Start.module.css";

function Start(props) {
    return (
        <section className={`${styles.section} ${props.className ? props.className : ''}`}>
            <div id="text" className={styles.text}>
                ALMIGHTY CRAFTERS
            </div>
            <Sine height={window.innerHeight} width={window.innerWidth} />
        </section>
    );
};

export default Start;