import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import ProductTable from './components/ProductTable'
import {
  fetchConsolidatedProducts,
  convertPrices,
} from './services/productService'
import './App.css'

export const EXCHANGE_RATES = {
  NZD: 1,
  USD: 0.76,
  EUR: 0.67,
}

const App = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const consolidatedProducts = await fetchConsolidatedProducts()
        setProducts(consolidatedProducts)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }
    loadProducts()
  }, [])

  const navAndRoutes = Object.keys(EXCHANGE_RATES).map((currency) => ({
    nav: (
      <li key={currency}>
        <Link to={`/${currency}`}>{currency}</Link>
      </li>
    ),
    route: (
      <Route
        key={currency}
        path={`/${currency}`}
        element={
          <ProductTable
            products={convertPrices(products, EXCHANGE_RATES[currency])}
            currency={currency}
          />
        }
      />
    ),
  }))

  return (
    <Router>
      <div className="main-container">
        <nav>
          <ul>{navAndRoutes.map((item) => item.nav)}</ul>
        </nav>

        <Routes>
          {navAndRoutes.map((item) => item.route)}
          <Route path="/" element={<p>Please select a currency.</p>} />
        </Routes>
      </div>
    </Router>
  )
}

// Wrap the App component with React.memo
export default React.memo(App)
