import { useEffect, useRef, useState } from "react";

function Counter(props) {
    const data = useRef();
    const [text, setText] = useState(0);

    const { from, to, decimals, total, no } = props;
    
    useEffect(() => {
        let timeout;

        if (data.current) {
            // VERY IMPORTANT 
            // use parsefloat while getting decimal values
            if (text === parseFloat(from)) setText(text => Math.round((text + 1 / Math.pow(10, parseFloat(decimals)) + Number.EPSILON) * Math.pow(10, parseFloat(decimals))) / Math.pow(10, parseFloat(decimals)));
            else if (text < parseFloat(to))
                if (!no) timeout = setTimeout(() => setText(text => Math.round((text + 1 / Math.pow(10, parseFloat(decimals)) + Number.EPSILON) * Math.pow(10, parseFloat(decimals))) / Math.pow(10, parseFloat(decimals))), parseFloat(total) / ((parseFloat(to) - parseFloat(from)) * Math.pow(10, parseFloat(decimals))));
                else timeout = setTimeout(() => setText(text => Math.round((text + 1 / Math.pow(10, parseFloat(decimals)) + Number.EPSILON) * Math.pow(10, parseFloat(decimals))) / Math.pow(10, parseFloat(decimals))), 0);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [text, from, to, decimals, total, no]);

    return <span ref={data}>{parseFloat(decimals) !== 0 ? text.toFixed(parseFloat(decimals)) : text}</span>;
};

export default Counter;