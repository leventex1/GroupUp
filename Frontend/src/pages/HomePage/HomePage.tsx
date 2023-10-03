import Button from "@/components/ui/Button";

import InputText from "@/components/ui/InputText/InputText";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigator = useNavigate();

    const [ usernameInput, setUserameInput ] = useState<string>('');

    useEffect(() => {
        sessionStorage.removeItem('username');
    }, []);

    const onSubmit = () => {
        sessionStorage.setItem('username', usernameInput);
        navigator('/room');
    }

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',

            marginInline: 'auto',
            padding: '1rem',

            width: 'min(500px, calc(100%))',
            height: '100%',
        }
    }

    return (
        <div style={styles.container}>
            <InputText 
                value={usernameInput}
                onChange={setUserameInput}
                placeholder="Enter a username"
            />
            <Button
                onClick={onSubmit}
                disabled={usernameInput.length === 0}
            >
                {"Get Started"}
            </Button>
        </div>
    )
}

export default HomePage;