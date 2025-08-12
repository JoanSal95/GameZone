import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import Navigation from './Components/Navigation'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Games from './Pages/Games'
import GameDetail from './Pages/GameDetail'
import Wishlist from './Pages/Wishlist'
import About from './Pages/About'
import Contact from './Pages/Contact'
import NotFound from './Pages/NotFound'

function App() {
  
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/:id" element={<GameDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
