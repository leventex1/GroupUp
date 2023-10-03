import { useEffect, useState } from "react";

const useInnerSize = () => {

    const [ size, setSize ] = useState({ innerWidth: 0, innerHeight: 0 })

    const updateSize = () => {
        setSize({ 
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
        });
    }

    useEffect(() => {
        updateSize();

        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}

export default useInnerSize;