import styles from "./Heading.module.css";

function heading(props) {
    return (
        <div id={props.id} className={styles.container}>
            {!props.notriangle && <div className={props.right ? styles['right-triangle'] : styles['left-triangle']}></div>}
            <h1 className={`${props.left ? styles.left : props.right ? styles.right : styles.center} ${props.className ? props.className : undefined}`}>
                {props.first}{props.nospace ? '' : ' '}<span>{props.second}</span>
            </h1>
        </div>
    );
};

export default heading;