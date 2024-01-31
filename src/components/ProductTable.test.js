import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import ProductTable from './ProductTable'
import * as productService from '../services/productService'

describe('ProductTable', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', price: '100', type: 'Electronics' },
    { id: 2, name: 'Product 2', price: '200', type: 'Apparel' },
  ]
  beforeEach(() => {
    jest
      .spyOn(productService, 'fetchConsolidatedProducts')
      .mockResolvedValue(mockProducts)
  })

  it('renders the component with products', () => {
    render(<ProductTable products={mockProducts} currency="USD" />)

    // Check for table existence
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()

    // Check for correct currency label
    const currencyLabel = screen.getByText(/Products \(USD\)/)
    expect(currencyLabel).toBeInTheDocument()

    // Check for correct number of products
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument()
      expect(screen.getByText(product.price)).toBeInTheDocument()
      expect(screen.getByText(product.type)).toBeInTheDocument()
    })
  })
})
