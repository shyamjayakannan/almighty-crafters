import { useEffect, useReducer } from "react";
import styles from "./FiletypeList.module.css";
import Checkbox from "./Form Parts/Checkbox";
import TextInput from "./Form Parts/TextInput";

function optionReducer(state, action) {
    // make the user scroll to bottom if the box is checked 
    if (action.value) window.scrollTo(0, document.body.scrollHeight);

    switch (action.type) {
        case 'IMAGE': return { ...state, image: action.value };
        case 'VIDEO': return { ...state, video: action.value };
        case 'MUSIC': return { ...state, music: action.value };
        case 'OTHER': return { ...state, other: action.value };
        default: return state;
    }
};

function FiletypeList(props) {
    const [options, dispatchOptions] = useReducer(optionReducer, { image: false, video: false, music: false, other: false });

    // return most recent value of IsValid when the re render is cause due to a change in only its value, not others
    const { onCheck } = props;

    useEffect(() => onCheck(options, 'filetype'), [options, onCheck]);

    return (
        <>
            <h2 className={styles.h2}>Please select the type of files you wish to upload</h2>
            <ul className={`${styles.unstyled} ${styles.card}`}>
                <Checkbox onChange={e => dispatchOptions({ type: 'IMAGE', value: e.target.checked })} id="first" label="Images" />
                <Checkbox onChange={e => dispatchOptions({ type: 'VIDEO', value: e.target.checked })} id="second " label="Videos" />
                <Checkbox onChange={e => dispatchOptions({ type: 'MUSIC', value: e.target.checked })} id="third" label="Music" />
                <Checkbox onChange={e => dispatchOptions({ type: 'OTHER', value: e.target.checked })} id="fourth" label="Other :">
                    <TextInput noError className={styles.other} id="other" />
                </Checkbox>
                {(!(options.image || options.video || options.music || options.other) && !props.firstTime) && <p>&#9888; Please select at least one</p>}
            </ul>
        </>
    );
};

export default FiletypeList;