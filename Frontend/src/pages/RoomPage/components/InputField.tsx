import InputTextArea from "@/components/ui/InputTextArea"
import Button from "@/components/ui/Button"
import SendIcon from "@/components/widgets/SendIcon"
import { useColorSchema } from "@/contexts/ColorSchemaContext"
import { useRef, useState } from "react"
import useDeviceMatch from "@/hooks/useDeviceMatch"

interface PropType {
    input: string,
    setInput: (newValue: string) => void,
    onSubmit: (e: React.MouseEvent<HTMLElement> | null) => void,
}

const InputField = ({
    input,
    setInput,
    onSubmit,
}: PropType) => {

    const Colors = useColorSchema();
    const { matchesMobile } = useDeviceMatch();

    const inputRef = useRef<HTMLDivElement>(null);

    const [ isShiftDown, setIsShiftDown ] = useState<boolean>(false);


    const handleOnSubmit = (e: React.MouseEvent<HTMLElement> | null) => {
        /* Set the input div's content back to an empty string */
        if(inputRef.current?.innerHTML) {
            inputRef.current.innerHTML="";
            inputRef.current.focus();
        }
        onSubmit(e);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Shift') {
            setIsShiftDown(true);
        }
        if(e.key === 'Enter' && !isShiftDown && !matchesMobile) {
            handleOnSubmit(null);
        }
    }

    const onKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Shift') {
            setIsShiftDown(false);
        }
    }

    const styles = {
        container: {
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'end',

            width: '100%',
        },

        inputTextAreaContainer: {
            flexGrow: '2',
        },
    }

    return (
        <form 
            style={styles.container}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
        >   
            <div style={styles.inputTextAreaContainer}>
                <InputTextArea 
                    ref={inputRef}
                    value={input}
                    onChange={setInput}
                    placeholder="Send a message"
                />
            </div>


            <Button
                onClick={handleOnSubmit}
                useHover={false}
            >
                <SendIcon 
                    color={`${Colors?.primary}`}
                    size={16}
                />
            </Button>
        </form>
    )
}

export default InputField;