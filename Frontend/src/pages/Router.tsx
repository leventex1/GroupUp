import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { useColorSchema } from '@/contexts/ColorSchemaContext'
import HomePage from './HomePage';
import RoomPage from './RoomPage';
import useInnerSize from '@/hooks/useInnerSize';

const Router = () => {

    const Colors = useColorSchema();
    const { innerHeight } = useInnerSize();

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: `100%`,
            height: `${innerHeight - 0.01}px`,
            overflowY: 'hidden',
            background: Colors?.background,
        }
    }

    return (
        <>
            <div style={styles.container}>

                <BrowserRouter>
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route path='/room' element={<RoomPage />} />
                    </Routes>
                </BrowserRouter>

            </div>
        </>
    )
}

export default Router