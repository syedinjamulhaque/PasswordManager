import Navbar from "./components/Navbar"
import Manager from "./components/Manager"
import Footer from "./components/Footer"
import Grainient from "./components/Grainient"

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-1 relative">
          <div className="absolute inset-0">
            <Grainient/>
          </div>
          <Manager />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
