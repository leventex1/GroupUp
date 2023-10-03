import { useColorSchema } from "@/contexts/ColorSchemaContext";
import { MessageType } from "../Types";

interface PropType {
    messages: MessageType[],
    username: string,
}

const ChatField = ({
    messages,
    username,
}: PropType) => {

    const Colors = useColorSchema();

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: '100%',
            height: '100%',
            paddingBottom: '2rem',
            paddingRight: '8px',

            display: 'flex',
            flexDirection: 'column-reverse',

            overflowY: 'auto',
        },

        messageContainer: {
            maxWidth: '80%',

            marginTop: '1rem',
            padding: '1rem 2rem',
            borderRadius: '8px',

            color: Colors?.text,
            background: Colors?.accent+'60',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
        },
        nameStyle: {
            fontSize: '0.75rem',
            color: Colors?.primary,
        },
        timeStyle: {
            fontSize: '0.75rem',
            color: Colors?.primary,
        }
    }

    const fillMessages = () => {
        let arr = [];
        for(let i = messages.length - 1; i >= 0; i--) {
            const isYou = messages[i].username === username;
            arr.push(
                <>
                    <span
                        key={messages[i].createdAt.toDateString()}
                        style={{...styles.timeStyle, textAlign: isYou ? 'right' : 'left' }}
                    >
                        {messages[i].createdAt.toDateString()}
                    </span>
                    <p
                        key={messages[i].id}
                        style={{...styles.messageContainer, alignSelf: isYou ? 'end' : 'start' }}
                    >
                        {messages[i].message}
                        <br />
                        <div style={{...styles.nameStyle, textAlign: isYou ? 'right' : 'left' }}>
                            {messages[i].username}
                        </div>
                    </p>
                </>

            )
        }
        return arr;
    }

    return (
        <div style={styles.container}>

            {fillMessages()}

        </div>
    )
}

export default ChatField;