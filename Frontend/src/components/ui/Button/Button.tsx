import { useColorSchema } from "@/contexts/ColorSchemaContext";
import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void,   // Either onClick or to parameter. Triggerd when the button is clicked.
    to?: string,                                            // Either onClick or to parameter. Navigate 'to' when the button is clicked.
    children: any,
    useHover?: boolean,                                     // Use the hover effect on the button.
    disabled?: boolean,                                     // Disable the button.
}

const Button = forwardRef(function Button({ 
    children, 
    onClick, 
    to,
    useHover=true,
    disabled=false,
}: ButtonProps, ref: any) {

    const Colors = useColorSchema();

    const [ isHover, setIsHover ] = useState(false);

    const stlyes = {
        container: {
            padding: '1rem 2rem',
            borderRadius: '8px',
            border: 'none',

            fontFamily: 'Poppins',
            fontSize: '1rem',
            textDecoration: 'none',

            background: Colors?.secondary,
            color: disabled ? Colors?.accent : Colors?.text,

            cursor: disabled ? 'not-allowed' : 'pointer',  

            transform: isHover && useHover && !disabled ? 'translateY(-4px)' : 'none',
            transition: 'all 300ms ease',
        }
    }

    return (
        <>
            {   to &&
                <Link
                    ref={ref}
                    to={!disabled ? to : ''}
                    style={stlyes.container}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {children}
                </Link>
            }
            {   !to &&
                <button
                    ref={ref}
                    onClick={!disabled ? onClick : () => {}}
                    style={stlyes.container}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {children}
                </button>
            }
        </>
    )
})

export default Button;