import { useColorSchema } from "@/contexts/ColorSchemaContext";
import { forwardRef } from "react";

interface InputTextProps {
    value: string,                              // The current value of the input text.
    onChange: (newValue: string) => void,       // The setter function of the value.
    placeholder?: string                        // Placeholder value.
}

const InputText = forwardRef(function InputText({
    value,
    onChange,
    placeholder,
}: InputTextProps, ref: any) {

    const Colors = useColorSchema();

    const styles = {
        container: {
            display: 'block',
            width: '100%',

            padding: '1rem 2rem',
            borderRadius: '8px',
            border: 'none',

            fontFamily: 'Poppins',
            fontSize: '1rem',
            textDecoration: 'none',

            background: Colors?.secondary,
            color: Colors?.text,
        }
    }

    return (
        <input 
            ref={ref}
            type="text" 
            value={value}
            onChange={e => onChange(e.target.value)}
            style={styles.container}
            placeholder={placeholder}
        />
    )
})

export default InputText