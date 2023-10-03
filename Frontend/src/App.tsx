import '@/App.css'

import Router from './pages/Router'
import ColorSchemaProvider from './contexts/ColorSchemaContext'

function App() {

  return (
    <>
      <ColorSchemaProvider>
          <Router />
      </ColorSchemaProvider>
    </>
  )
}

export default App
