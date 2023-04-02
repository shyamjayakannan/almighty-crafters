import { isValidPhoneNumber } from "libphonenumber-js";
import { useState } from "react";

function useValidator(string, type) {
    const [state, setState] = useState(string);
    const [isValid, setIsValid] = useState(true);
    const [isFocussed, setIsFocussed] = useState(true);

    function check(flagCode) {
        if (type === 'TEXT') setIsValid(state !== '');
        else if (type === 'EMAIL') setIsValid(state.includes('@'));
        else if (type === 'PHONE') setIsValid(isValidPhoneNumber(state, flagCode));
        else if (type === 'PRICE') setIsValid(state !== '' && state !== '0');
    };

    return [state, setState, check, isValid, isFocussed, setIsFocussed];
};

export default useValidator;