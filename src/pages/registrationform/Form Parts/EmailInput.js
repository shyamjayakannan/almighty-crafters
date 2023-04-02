import { useEffect } from "react";
import useValidator from "../../../hooks/useValidator";
import styles from "./EmailInput.module.css";

function EmailInput(props) {
    const [email, setEmail, checkEmail, emailIsValid, emailIsFocussed, setEmailIsFocussed] = useValidator('', 'EMAIL');

    // return most recent value of IsValid when the re render is cause due to a change in only its value, not others
    const { onCheck, getData } = props;
    useEffect(() => onCheck(emailIsValid, 'email'), [emailIsValid, onCheck]);

    useEffect(checkEmail, [email, checkEmail]);

    useEffect(() => {
        if (props.submit) getData(email, 'email');
    }, [props.submit, getData, email]);

    return (
        <div className={styles.card}>
            <div>
                <label htmlFor="email">Email</label>
                <input className={`${emailIsFocussed || emailIsValid ? styles.cardinput : styles.incorrect}`} value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setEmailIsFocussed(true)} onBlur={() => setEmailIsFocussed(false)} type="email" id="email" />
                <div className={styles.line}></div>
                {(!emailIsValid && !emailIsFocussed) && <p>&#9888; Please Enter a valid Email</p>}
            </div>
            {emailIsValid && !emailIsFocussed && email !== '' &&
                <div className={emailIsValid && !emailIsFocussed && email !== '' ? styles.verify : styles.delay}>
                    <h2><span className={styles.tick}>&#10003;</span></h2>
                </div>
            }
        </div>
    );
};

export default EmailInput;