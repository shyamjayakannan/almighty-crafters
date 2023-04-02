import { useEffect, useState } from "react";

function Delay(props) {
    const [ok, setOk] = useState(props.mount);

    useEffect(() => {
        let timer;

        // if unmount is not defined, we only want to mount after a delay 
        if (props.unmount === undefined) timer = setTimeout(() => setOk(true), props.delay);
        
        else if (props.mount && !ok) setOk(true);
        else if (props.unmount && ok) timer = setTimeout(() => setOk(false), props.delay);
        
        return () => clearTimeout(timer);
    }, [props.delay, props.mount, props.unmount, ok]);
    
    return <>{ok && props.children}</>;
};

export default Delay;