import styles from "./BorderAnimation.module.css";
import Delay from "./Delay";

function BorderAnimation(props) {
    return (
        <div className={`${styles.outside} ${props.className}`}>
            <div className={styles.content}>
                <Delay when={true} delay={500}>
                    <div className={styles.inner}>
                        <h3>{props.heading}</h3>
                        <p>{props.children}</p>
                    </div>
                </Delay>
            </div>
        </div>
    );
};

export default BorderAnimation;