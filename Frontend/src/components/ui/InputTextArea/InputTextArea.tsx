import { useColorSchema } from "@/contexts/ColorSchemaContext";
import useDeviceMatch from "@/hooks/useDeviceMatch";
import { forwardRef, ForwardedRef, useState, useEffect } from "react";

interface PropType {
    value: string | null,
    onChange: (newValue: string) => void,
    placeholder?: string,
}

const InputTextArea = forwardRef(function InputTextArea({
    value,
    onChange,
    placeholder
}: PropType, ref: ForwardedRef<HTMLDivElement>) {

    const Colors = useColorSchema();
    const { matchesMobile } = useDeviceMatch();

    const [ isShiftDown, setIsShiftDown ] = useState<boolean>(false);

    useEffect(() => {
    }, []);

    const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Shift') {
            setIsShiftDown(true);
        }

        if(e.key === 'Enter' && !isShiftDown && !matchesMobile) {
            e.preventDefault();
        }
    }

    const onKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Shift') {
            setIsShiftDown(false);
        }
    }

    const styles: { [key: string]: React.CSSProperties } = {
        mainContainer: {
            position: 'relative',
            width: '100%',
        },

        container: {
            display: 'block',
            maxHeight: '140px',
            overflowY: 'auto',
            
            padding: '1rem 2rem',
            borderRadius: '8px',
            border: 'none',

            fontFamily: 'Poppins',
            fontSize: '1rem',
            textDecoration: 'none',

            background: Colors?.secondary,
            color: Colors?.text,

            resize: 'none',
            whiteSpace: 'pre-wrap',
            /* overflowWrap: 'break-word', */
            wordBreak: 'break-word',
        },

        placeholderStyle: {
            position: 'absolute',
            left: '2rem',
            top: '1rem',
            color: Colors?.accent,
        }
    }

    return (
        <div style={styles.mainContainer}>
            <div
                ref={ref}
                style={styles.container}
                contentEditable={true}
                onInput={e => onChange(e.currentTarget.textContent ? e.currentTarget.textContent : '')}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
            />
            {   !value &&
                <p style={styles.placeholderStyle}>
                    {placeholder}
                </p>
            }
        </div>
    )
})

export default InputTextArea;