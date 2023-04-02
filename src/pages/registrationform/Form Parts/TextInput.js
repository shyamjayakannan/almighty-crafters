import { useEffect } from "react";
import useValidator from "../../../hooks/useValidator";
import styles from "./TextInput.module.css";

function TextInput(props) {
    const [text, setText, checkText, textIsValid, textIsFocussed, setTextIsFocussed] = useValidator('', 'TEXT');

    // VERY VERY VERY IMPORTANT!!!!!!!!!!!!!!
    // after using useCallback we made sure that props.onCheck stays the same. but, since TextInput re renders 
    // everytime, the props argument received changes (as it is a local variable). so props object itself is different in 
    // every render, but its contents stay the same. so, in the dependencies array, place individual elemens not props as
    // a whole

    // return most recent value of text when the re render is caused due to a change in only its value, not others
    const { onCheck, getData } = props;
    useEffect(() => {
        if (!props.noError) onCheck(textIsValid, props.id);
    }, [textIsValid, props.noError, props.id, onCheck]);

    // done this way to remove terminal warning. otherwise everything is same 

    // OR 

    // useEffect(() => {
    //     if (!props.noError) props.onCheck(textIsValid, props.id);
    // }, [textIsValid, props.noError, props.id, props.onCheck]);

    // BUT NOT 

    // useEffect(() => {
    //     if (!props.noError) props.onCheck(textIsValid, props.id);
    // }, [textIsValid, props]);

    useEffect(checkText, [text, checkText]);

    useEffect(() => {
        if (props.submit) getData(text, props.id);
    }, [props.submit, text, props.id, getData]);


    return (
        <div className={`${styles.card} ${props.className}`}>
            <label htmlFor={props.id}>{props.children}</label>
            {props.noError ? <input className={styles.cardinput} /> :
                <input className={`${textIsFocussed || textIsValid ? styles.cardinput : styles.incorrect}`} value={text} onChange={e => setText(e.target.value)} onFocus={() => setTextIsFocussed(true)} onBlur={() => setTextIsFocussed(false)} type="text" id={props.id} />
            }
            <div className={styles.line}></div>
            {(!props.noError && !textIsValid && !textIsFocussed) && <p>&#9888; {props.text}</p>}
        </div>
    );
};

export default TextInput;