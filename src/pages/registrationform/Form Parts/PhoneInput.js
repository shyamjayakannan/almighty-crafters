import useValidator from "../../../hooks/useValidator";
import { useEffect, useState } from "react";
import { getCountryDialCode } from "country-flags-dial-code";
import countryList from "react-select-country-list";
import styles from "./PhoneInput.module.css";

function PhoneInput(props) {
    const [flagCode, setFlagCode] = useState('AF');
    const [phone, setPhone, checkPhone, phoneIsValid, phoneIsFocussed, setPhoneIsFocussed] = useValidator('', 'PHONE');

    // return most recent value of IsValid when the re render is cause due to a change in only its value, not others
    const { onCheck, getData } = props;
    useEffect(() => onCheck(phoneIsValid, 'phone'), [phoneIsValid, onCheck]);

    useEffect(() => checkPhone(flagCode), [phone, checkPhone, flagCode])

    useEffect(() => {
        if (props.submit) getData(phone, 'phone');
    }, [props.submit, getData, phone]);

    return (
        <div className={styles.card}>
            <label htmlFor="phone">Phone Number</label>
            <div className={styles.phone}>
                <img src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flagCode}.svg`} alt="" />
                <div className={styles.arrow}></div>
                <select onChange={e => setFlagCode(countryList().getValue(e.target.value))}>
                    {countryList().getLabels().map((name, index) => <option key={index} value={name}>{name}</option>)}
                </select>
                <span>{getCountryDialCode(flagCode)}</span>
                <div>
                    <input className={`${phoneIsFocussed || phoneIsValid ? styles.cardinput : styles.incorrect}`} value={phone} onChange={e => setPhone(e.target.value)} onFocus={() => setPhoneIsFocussed(true)} onBlur={() => setPhoneIsFocussed(false)} type="tel" id="email" />
                    <div className={styles.line}></div>
                </div>
            </div>
            {(!phoneIsValid && !phoneIsFocussed) && <p>&#9888; Please Enter a valid Phone Number</p>}
        </div>
    );
};

export default PhoneInput;