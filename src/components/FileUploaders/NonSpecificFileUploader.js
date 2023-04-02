import { useRef, useState } from "react";
import styles from "./NonSpecificFileUploader.module.css";

function NonSpecificFileUploader(props) {
    const fileInput = useRef();
    const [drag, setDrag] = useState(false);
    const [files, setFiles] = useState(props.files);

    function onDrag(e) {
        e.preventDefault();
        setDrag(true);
    };

    function onLeave(e) {
        e.preventDefault();
        setDrag(false);
    };

    function dropFiles(e) {
        e.preventDefault();

        setDrag(false);

        let i;

        for (const file of e.dataTransfer.files) {
            for (i = 0; i < files.length; i++) {
                if (file.name === files[i].name) break;
            }

            if (i === files.length) {
                if (props.single)
                    setFiles(files => {
                        files = [];

                        return files.concat(file);
                    });
                else setFiles(files => files.concat(file));
            }
        }
    };

    function addFiles() {
        let i;

        for (const file of fileInput.current.files) {
            for (i = 0; i < files.length; i++) {
                if (file.name === files[i].name) break;
            }

            // DONT JUST DO setFiles(files.concat(file)) it works for one file but not for multiple because the second time,
            // the files array is not yet updated with the first file. so only the last file appears. so use the function form
            // to get the most recent version of files array
            if (i === files.length) {
                if (props.single)
                    setFiles(files => {
                        files = [];

                        return files.concat(file);
                    });
                else setFiles(files => files.concat(file));
            }
        }

        // OR LIKE BELOW

        // setFiles(files => {
        //     let i;

        //     for (const file of fileInput.current.files) {
        //         for (i = 0; i < files.length; i++) {
        //             if (file.name === files[i].name) break;
        //         }

        //         if (i === files.length) files.push(file);
        //     }

        // VERY IMPORTANT
        // dont return files. return like below method otherwise 
        // react will treat files as the same as before and re render wont happen

        //     return [...files];
        // });
    };

    function removeFile(e) {
        setFiles(files => {
            // custom attribute data-key. custom attributes can be made by doing data-
            files.splice(e.target.getAttribute('data-key'), 1);

            return [...files];
        });
    };

    return (
        <div className={styles.backdrop}>
            <div className={`${styles['drop-zone']} ${drag ? styles['drop-zone__over'] : ''}`} onDrop={dropFiles} onDragOver={onDrag} onDragLeave={onLeave}>
                <div className={styles['file-container']}>
                    <ul>
                        {files.length > 0 && files.map((file, index) =>
                            <li className={styles.files} key={index}>
                                <a href={URL.createObjectURL(file)} target="_blank" rel="noreferrer">
                                    {file.type.substring(0, file.type.indexOf("/")) === "image" ?
                                        <img src="image-file-24.png" alt="" /> :
                                        file.type.substring(0, file.type.indexOf("/")) === "audio" ?
                                            <img src="audio-file-3-24.png" alt="" /> :
                                            file.type.substring(0, file.type.indexOf("/")) === "video" ?
                                                <img src="video-file-3-24.png" alt="" /> :
                                                <img src="report-3-24.png" alt="" />
                                    }
                                    {file.name}
                                    <button key={index} data-key={index} className={styles.close} onClick={removeFile}></button>
                                </a>
                            </li>)}
                    </ul>
                </div>
                <button className={styles.close} onClick={() => props.onClose(files)}></button>
                <label className={styles.label} htmlFor="file">BROWSE</label>
                <input ref={fileInput} id="file" type="file" className={styles['drop-zone__input']} multiple onChange={addFiles} />
                <span className={styles['drop-zone__prompt']}>Or Drag and Drop files here</span>
            </div>
        </div>
    );
};

export default NonSpecificFileUploader;