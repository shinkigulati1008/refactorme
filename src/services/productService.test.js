import { fetchConsolidatedProducts, convertPrices } from './productService'
import LawnmowerRepository from '../repositories/LawnmowerRepository'
import PhoneCaseRepository from '../repositories/PhoneCaseRepository'
import TShirtRepository from '../repositories/TShirtRepository'

jest.mock('../repositories/LawnmowerRepository')
jest.mock('../repositories/PhoneCaseRepository')
jest.mock('../repositories/TShirtRepository')

describe('fetchConsolidatedProducts', () => {
  it('should consolidate products from different repositories', async () => {
    const mockLawnmowerProducts = [{ id: 1, name: 'Lawnmower', price: 150 }]
    const mockPhoneCaseProducts = [{ id: 2, name: 'Phone Case', price: 20 }]
    const mockTShirtProducts = [{ id: 3, name: 'T-Shirt', price: 30 }]

    LawnmowerRepository.mockImplementation(() => ({
      getAll: jest.fn().mockResolvedValue(mockLawnmowerProducts),
    }))

    PhoneCaseRepository.mockImplementation(() => ({
      getAll: jest.fn().mockResolvedValue(mockPhoneCaseProducts),
    }))

    TShirtRepository.mockImplementation(() => ({
      getAll: jest.fn().mockResolvedValue(mockTShirtProducts),
    }))

    const products = await fetchConsolidatedProducts()

    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'Lawnmower',
          price: '150.00',
          type: 'Lawnmower',
        }),
        expect.objectContaining({
          id: 2,
          name: 'Phone Case',
          price: '20.00',
          type: 'Phone Case',
        }),
        expect.objectContaining({
          id: 3,
          name: 'T-Shirt',
          price: '30.00',
          type: 'T-Shirt',
        }),
      ]),
    )
  })
})

describe('convertPrices', () => {
  it('should convert product prices to the given exchange rate', () => {
    const products = [
      { id: 1, name: 'Product 1', price: '10.00', type: 'Type 1' },
      { id: 2, name: 'Product 2', price: '20.00', type: 'Type 2' },
    ]
    const exchangeRate = 0.76
    const convertedProducts = convertPrices(products, exchangeRate)

    expect(convertedProducts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, price: '7.60' }),
        expect.objectContaining({ id: 2, price: '15.20' }),
      ]),
    )
  })
})
