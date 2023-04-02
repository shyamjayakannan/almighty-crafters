import { useEffect, useRef, useState } from "react";
import SpecificFileUploader from "./SpecificFileUploader";
import NonSpecificFileUploader from "./NonSpecificFileUploader";
import styles from "./FileUploadButton.module.css";


function FileUploadButton(props) {
    const [show, setShow] = useState(false);
    const [folder, setFolder] = useState(false);
    const currentFiles = useRef([]);

    function close(files) {
        setShow(false);

        if (files.length > 0) {
            setFolder(true);
            currentFiles.current = files;
        }
        else setFolder(false);
    };

    const { onCheck, getData } = props;
    useEffect(() => {
        if (onCheck) onCheck(folder, props.id);
    }, [onCheck, folder, props.id]);

    useEffect(() => {
        if (props.submit) getData(currentFiles.current, props.id);
    }, [props.submit, getData, props.id]);

    return (
        <div className={styles.card}>
            {folder && <button className={styles["folder-button"]} onClick={() => setShow(true)}><div></div>Uploaded files</button>}
            <button onClick={() => setShow(true)}><div></div>Add Files</button>
            {show && (props.fileType ? <SpecificFileUploader single={props.single} files={currentFiles.current} onClose={close} fileType={props.fileType} /> : <NonSpecificFileUploader single={props.single} files={currentFiles.current} onClose={close} />)}
        </div>
    );
};

export default FileUploadButton;