import MeNavbar from './components/MeNavbar/MeNavbar'
import { AppRouter } from './router/AppRouter'

function App() {

  return (
    <div>
      <MeNavbar />
      <div className="page">
        <AppRouter />
      </div>
    </div>
  )
}

export default App
