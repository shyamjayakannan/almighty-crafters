import styles from "./Checkbox.module.css";

function Checkbox(props) {
    return (
        <li>
            <input onChange={props.onChange} type="checkbox" id={props.id} className={styles['styled-checkbox']} />
            <label htmlFor={props.id}>{props.label}</label>
            {props.children}
        </li>
    );
};

export default Checkbox;