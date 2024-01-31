import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App, { EXCHANGE_RATES } from './App'
import { fetchConsolidatedProducts } from './services/productService'

jest.mock('./services/productService')

describe('App', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
  ]

  beforeEach(() => {
    fetchConsolidatedProducts.mockResolvedValue(mockProducts)
  })

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', async () => {
    render(<App />)
  })

  it('loads products on initial render', async () => {
    render(<App />)
    await waitFor(() => {
      expect(fetchConsolidatedProducts).toHaveBeenCalledTimes(1)
    })
  })

  it('displays product tables for each currency', async () => {
    await waitFor(() => {
      render(<App />)
      Object.keys(EXCHANGE_RATES).forEach(async (currency) => {
        expect(
          await screen.findByText(new RegExp(currency)),
        ).toBeInTheDocument()
      })
    })
  })

  it('converts product prices for each currency table', async () => {
    await waitFor(() => {
      render(<App />)
      Object.keys(EXCHANGE_RATES).forEach(async (currency) => {
        const currencyTableText = `Products (${currency})`
        const currencyTable = await screen.findByText(
          new RegExp(currencyTableText),
        )
        expect(currencyTable).toBeInTheDocument()

        const convertedProducts = mockProducts.map((product) => ({
          ...product,
          price: product.price * EXCHANGE_RATES[currency],
        }))

        convertedProducts.forEach((convertedProduct) => {
          expect(screen.getByText(convertedProduct.name)).toBeInTheDocument()
          expect(
            screen.getByText(
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency,
              }).format(convertedProduct.price),
            ),
          ).toBeInTheDocument()
        })
      })
    })
  })

  it('handles errors during product loading', async () => {
    fetchConsolidatedProducts.mockRejectedValue(new Error('Network error'))
    render(<App />)
    await waitFor(() => {
      expect(fetchConsolidatedProducts).toHaveBeenCalled()
    })

    // Check if console.error was called with the expected message
    expect(console.error).toHaveBeenCalledWith(
      'Error loading products:',
      expect.any(Error),
    )
  })
})
