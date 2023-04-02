import styles from "./Card.module.css";

function Card(props) {
    return <div id={props.id} className={`${props.className ? props.className : ''} ${props.noshadow ? styles['without-shadow'] : styles.container}`}>{props.children}</div>;
};

export default Card;