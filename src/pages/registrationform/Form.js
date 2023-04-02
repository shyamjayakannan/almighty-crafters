import Card from "../../components/Card";
import FileUploadButton from "../../components/FileUploaders/FileUploadButton";
import TextInput from "./Form Parts/TextInput";
import PriceInput from "./Form Parts/PriceInput";
import EmailInput from "./Form Parts/EmailInput";
import PhoneInput from "./Form Parts/PhoneInput";
import styles from "./Form.module.css";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import FiletypeList from "./FiletypeList";
import Loader from "../../components/loader";
import Delay from "../../components/Delay";

let firstTime = true;

function sectionReducer(state, action) {
    switch (action.type) {
        case "SECOND":
            return { second: true, third: false };
        case "THIRD":
            return { second: false, third: true };
        case "BOTH":
            return { second: false, third: false };
        default:
            return state;
    }
}

function validReducer(state, action) {
    switch (action.type) {
        case "name":
            return { ...state, name: action.value };
        case "email":
            return { ...state, email: action.value };
        case "phone":
            return { ...state, phone: action.value };
        case "wallet":
            return { ...state, wallet: action.value };
        case "name1":
            return { ...state, name1: action.value };
        case "price":
            return { ...state, price: action.value };
        case "filetype":
            return { ...state, filetype: action.value };
        case "folder1":
            return { ...state, folder1: action.value };
        case "folder2":
            return { ...state, folder2: action.value };
        case "folder3":
            return { ...state, folder3: action.value };
        case "folder4":
            return { ...state, folder4: action.value };
        default:
            return state;
    }
}

function Form() {
    const [sections, dispatchSections] = useReducer(sectionReducer, {
        second: false,
        third: false,
    });
    const [valid, dispatchValid] = useReducer(validReducer, {
        name: false,
        email: false,
        phone: false,
        wallet: false,
        name1: false,
        price: false,
        filetype: { image: false, video: false, music: false, other: false },
        folder1: false,
        folder2: false,
        folder3: false,
        folder4: false,
    });
    const [submit, setSubmit] = useState(false);
    const [successfulUpload, setSuccessfulUpload] = useState();
    const counter = useRef(0);
    const counter2 = useRef(0);
    const sendcurrentFiles = useRef(new FormData()),
        files = useRef({
            text: {
                name: "",
                email: "",
                phone: "",
                wallet: "",
                name1: "",
                social: "",
                price: ""
            }
        });

    if (
        valid.filetype.image ||
        valid.filetype.video ||
        valid.filetype.music ||
        valid.filetype.other
    )
        firstTime = false;

    useEffect(() => {
        if (valid.filetype.image || valid.filetype.video || valid.filetype.music || valid.filetype.other) counter2.current += 1;
        else if ((!valid.filetype.image || !valid.filetype.video || !valid.filetype.music || !valid.filetype.other) && counter2.current > 0) counter2.current -= 1;
    }, [valid.filetype.image, valid.filetype.video, valid.filetype.music, valid.filetype.other]);

    useEffect(() => {
        window.addEventListener('beforeunload', warning);

        function warning(e) {
            e.returnValue = '';
        };

        return () => window.removeEventListener('beforeunload', warning);
    }, []);

    // to scroll into view on clicking the checkbox 
    useEffect(() => {
        if (valid.filetype.image || valid.filetype.video || valid.filetype.music || valid.filetype.other) window.scrollTo(0, document.body.scrollHeight);
    }, [valid.filetype.image, valid.filetype.video, valid.filetype.music, valid.filetype.other]);

    // VERY VERY VERY IMPORTANT
    // use useCallback otherwise dispatchValid will redefine check function on every render and infinite loop
    // with textinput component because check is passed as a prop to it and it will change on every render whcih
    // will make the useEffect inside textinput run on every render

    const check = useCallback(
        (isValid, id) => dispatchValid({ type: id, value: isValid }),
        []
    );

    function back() {
        if (sections.second) dispatchSections({ type: "BOTH" });
        else if (sections.third)
            setTimeout(() => dispatchSections({ type: "SECOND" }), 5);
    };

    function next() {
        if (!sections.second && !sections.third)
            setTimeout(() => dispatchSections({ type: "SECOND" }), 5);
        // setTimeout called so that the link can be fired before the section becomes visible. otherwise it
        // was turning into submit button and then opening the submit link
        else if (sections.second)
            setTimeout(() => dispatchSections({ type: "THIRD" }), 5);
    };

    const getData = useCallback(async (data, id) => {
        counter.current += 1;

        switch (id) {
            case "folder1": {
                for (var j1 = 0; j1 < data.length; j1++) {
                    sendcurrentFiles.current.append("file", data[j1]);
                }
                break;
            }
            case "folder2": {
                for (var j2 = 0; j2 < data.length; j2++) {
                    sendcurrentFiles.current.append("file", data[j2]);
                }
                break;
            }
            case "folder3": {
                for (var j3 = 0; j3 < data.length; j3++) {
                    sendcurrentFiles.current.append("file", data[j3]);
                }
                break;
            }
            case "folder4": {
                for (var j4 = 0; j4 < data.length; j4++) {
                    sendcurrentFiles.current.append("file", data[j4]);
                }
                break;
            }
            case "profile": {
                for (var j5 = 0; j5 < data.length; j5++) {
                    const newFile = new File([data[j5]], 'Profile-Picture', { type: data[j5].type });

                    sendcurrentFiles.current.append("file", newFile);
                }
                break;
            }
            case "name": {
                files.current.text.name = data;
                break;
            }
            case "email": {
                files.current.text.email = data;
                break;
            }
            case "phone": {
                files.current.text.phone = data;
                break;
            }
            case "wallet": {
                files.current.text.wallet = data;
                break;
            }
            case "name1": {
                files.current.text.name1 = data;
                break;
            }
            case "social": {
                files.current.text.social = data;
                break;
            }
            case "price": {
                files.current.text.price = data;
                break;
            }
            default:
                return;
        }

        if (counter.current === 8 + counter2.current) {
            counter.current = 0;

            let resData, resData1;

            try {
                const response = await fetch("http://localhost:8080/feed/post", {
                    method: "POST",
                    body: JSON.stringify(files.current),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                resData = await response.json();
                files.current = {
                    text: {
                        name: "",
                        email: "",
                        phone: "",
                        wallet: "",
                        name1: "",
                        social: "",
                        price: ""
                    }
                };
            }
            catch (error) {
                resData = { message: false };
                files.current = {
                    text: {
                        name: "",
                        email: "",
                        phone: "",
                        wallet: "",
                        name1: "",
                        social: "",
                        price: ""
                    }
                };
            }

            try {
                const response1 = await fetch("http://localhost:8080/feed/postfile", {
                    method: "POST",
                    body: sendcurrentFiles.current,
                });

                resData1 = await response1.json();
                sendcurrentFiles.current = new FormData();
            }
            catch (error) {
                resData1 = { message: false };
                sendcurrentFiles.current = new FormData();
            }

            if (!resData1.message || !resData.message) {
                setSuccessfulUpload(false);

                setTimeout(() => {
                    setSuccessfulUpload(undefined);
                    setSubmit(false);
                }, 2000);
            }
            else setSuccessfulUpload(true);
        }
    }, []);

    return (
        <section className={styles.encloser}>
            <h1 className={styles.h1}>Quick and Easy!</h1>
            <div className={styles["main-container"]}>
                <div className={styles.container}>
                    <Card
                        id="section1"
                        className={
                            sections.second || sections.third ? styles.invisible : styles["fade-in"]
                        }
                    >
                        <TextInput
                            submit={submit}
                            getData={getData}
                            onCheck={check}
                            id="name"
                            text="Please Enter a valid name"
                        >
                            Name
                        </TextInput>
                        <EmailInput submit={submit} getData={getData} onCheck={check} />
                        <PhoneInput submit={submit} getData={getData} onCheck={check} />
                    </Card>
                    <Card id="section2"
                        className={
                            !sections.second
                                ? styles.invisible
                                : styles["fade-in"]
                        }
                    >
                        <TextInput
                            submit={submit}
                            getData={getData}
                            onCheck={check}
                            id="wallet"
                            text="Please Enter a valid Key"
                        >
                            Crypto wallet public key
                            <br />
                            <span>(Your collection will be transferred to this account)</span>
                            <br />
                            <span>
                                It takes just 2 minutes to make one. Just install the extension!
                            </span>
                        </TextInput>
                        <TextInput
                            submit={submit}
                            getData={getData}
                            onCheck={check}
                            id="name1"
                            text="Please Enter a valid name"
                        >
                            Name to be displayed for your collection
                        </TextInput>
                        <TextInput
                            submit={submit}
                            getData={getData}
                            onCheck={check}
                            id="social"
                            noError
                        >
                            (Optional) link to your social media profiles to be linked to your
                            collections. (Instagram and twitter only)
                        </TextInput>
                        <PriceInput
                            submit={submit}
                            getData={getData}
                            onCheck={check}
                            id="price"
                            text="Please Enter a valid Price"
                        >
                            Enter the Price at which you want to sell your whole collection
                            (all files) in ETH* ( keep it below 0.1)
                            <br />
                            <span>
                                0.005 ETH* will be charged as fees only when you NFTs collection
                                is SOLD.
                            </span>
                            <br />
                            <span>
                                You can check ETH price in rupees{" "}
                                <a
                                    href="https://www.coinbase.com/converter/eth/inr"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    here
                                </a>
                            </span>
                        </PriceInput>
                    </Card>
                    <Card
                        id="section3"
                        className={
                            !sections.third
                                ? styles.invisible
                                : styles["fade-in"]
                        }
                    >
                        <FiletypeList onCheck={check} firstTime={firstTime} />
                    </Card>
                    <Card className={
                        !sections.third
                            ? styles.invisible
                            : styles["fade-in"]
                    }>
                        <div className={styles.card}>
                            (Optional) Upload the profile picture to be shown in your collection
                            <FileUploadButton
                                submit={submit}
                                getData={getData}
                                id="profile"
                                fileType="image"
                                single
                            />
                        </div>
                    </Card>
                    {(valid.filetype.image ||
                        valid.filetype.video ||
                        valid.filetype.music ||
                        valid.filetype.other) &&
                        <Card className={
                            !sections.third
                                ? styles.invisible
                                : undefined
                        } id="section4">
                            {valid.filetype.image && (
                                <div className={styles.card}>
                                    Please upload other  image files here
                                    <FileUploadButton
                                        submit={submit}
                                        getData={getData}
                                        id="folder1"
                                        onCheck={check}
                                        fileType="image"
                                    />
                                </div>
                            )}
                            {valid.filetype.video && (
                                <div className={styles.card}>
                                    Please upload video files here
                                    <FileUploadButton
                                        submit={submit}
                                        getData={getData}
                                        id="folder2"
                                        onCheck={check}
                                        fileType="video"
                                    />
                                </div>
                            )}
                            {valid.filetype.music && (
                                <div className={styles.card}>
                                    Please upload music files here
                                    <FileUploadButton
                                        submit={submit}
                                        getData={getData}
                                        id="folder3"
                                        onCheck={check}
                                        fileType="audio"
                                    />
                                </div>
                            )}
                            {valid.filetype.other && (
                                <div className={styles.card}>
                                    Please upload other files here
                                    <FileUploadButton
                                        submit={submit}
                                        getData={getData}
                                        id="folder4"
                                        onCheck={check}
                                    />
                                </div>
                            )}
                        </Card>
                    }
                </div>
            </div>
            <div className={styles["navigation-container"]}>
                <div
                    className={`${!(sections.second || sections.third) ? styles["current-step"] : ""
                        } ${styles.steps}`}
                >
                    <span>1</span>
                </div>
                <div
                    className={`${sections.second ? styles["current-step"] : ""} ${styles.steps
                        }`}
                >
                    <span>2</span>
                </div>
                <div
                    className={`${sections.third ? styles["current-step"] : ""} ${styles.steps
                        }`}
                >
                    <span>3</span>
                </div>
                <div className={styles.navigate}>
                    {sections.third ?
                        <a
                            href="#section2"
                            onClick={back}
                            className={styles["navigate-link"]}
                        >
                            Back
                        </a> :
                        <a
                            href="#section1"
                            onClick={back}
                            className={sections.second ? styles["navigate-link"] : styles["disabled-link"]}
                        >
                            Back
                        </a>
                    }
                    {!sections.third ? sections.second ?
                        <a
                            href="#section3"
                            onClick={next}
                            className={
                                (!(sections.second || sections.third) &&
                                    !(valid.name && valid.email && valid.phone)) ||
                                    (sections.second &&
                                        !(
                                            valid.wallet &&
                                            valid.name1 &&
                                            valid.price
                                        ))
                                    ? styles["disabled-link"]
                                    : styles["navigate-link"]
                            }
                        >
                            Next
                        </a> :
                        <a
                            href="#section2"
                            onClick={next}
                            className={
                                (!(sections.second || sections.third) &&
                                    !(valid.name && valid.email && valid.phone)) ||
                                    (sections.second &&
                                        !(
                                            valid.wallet &&
                                            valid.name1 &&
                                            valid.price
                                        ))
                                    ? styles["disabled-link"]
                                    : styles["navigate-link"]
                            }
                        >
                            Next
                        </a> :
                        <button
                            onClick={() => setSubmit(true)}
                            className={
                                (valid.filetype.image && !valid.folder1) ||
                                    (valid.filetype.video && !valid.folder2) ||
                                    (valid.filetype.music && !valid.folder3) ||
                                    (valid.filetype.other && !valid.folder4) ||
                                    !(valid.filetype.image || valid.filetype.video || valid.filetype.music || valid.filetype.other)
                                    ? styles["disabled-link"]
                                    : styles["navigate-link"]
                            }
                        >
                            Submit
                        </button>
                    }
                </div>
            </div>
            <Delay mount={submit} unmount={!submit} delay={200}>
                <div className={styles.backdrop}>
                    {!successfulUpload ?
                        successfulUpload === undefined && submit ?
                            <div id="loader" className={styles.loader}>
                                <Loader />
                            </div> :
                            <div className={`${styles['backdrop-inner']} ${!submit ? styles.exit : ''}`}>
                                <img src="pictures\x-mark-5-128.png" alt="" />
                                <h2>Files were not uploaded! Please try again.</h2>
                            </div> :
                        <div className={styles['backdrop-inner']}>
                            <img src="pictures\check-mark-8-128.png" alt="" />
                            <h2>Files Uploaded Successfully!<br />You may now close this tab.</h2>
                        </div>
                    }
                </div>
            </Delay>
        </section>
    );
}

export default Form;