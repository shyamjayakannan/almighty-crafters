import { useEffect } from "react";
import useValidator from "../../../hooks/useValidator";
import styles from "./PriceInput.module.css";

function PriceInput(props) {
    const [price, setPrice, checkPrice, priceIsValid, priceIsFocussed, setPriceIsFocussed] = useValidator('', 'PRICE');

    // return most recent value of IsValid when the re render is cause due to a change in only its value, not others
    const { onCheck, getData } = props;
    useEffect(() => onCheck(priceIsValid, props.id), [priceIsValid, props.id, onCheck]);

    useEffect(checkPrice, [price, checkPrice]);

    useEffect(() => {
        if (props.submit)  getData(price, props.id);
    }, [props.submit, getData, props.id, price]);

    return (
        <div className={`${styles.card} ${props.className}`}>
            <label htmlFor={props.id}>{props.children}</label>
            <input className={`${priceIsFocussed || priceIsValid ? styles.cardinput : styles.incorrect}`} value={price} onChange={e => setPrice(parseFloat(e.target.value) <= 0.1 && parseFloat(e.target.value) >= 0 ? e.target.value : '0.1')} onFocus={() => setPriceIsFocussed(true)} onBlur={() => setPriceIsFocussed(false)} type="number" id={props.id} />
            <div className={styles.line}></div>
            {(!priceIsValid && !priceIsFocussed) && <p>&#9888; {props.text}</p>}
        </div>
    );
};

export default PriceInput;