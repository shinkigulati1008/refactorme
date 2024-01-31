import LawnmowerRepository from '../repositories/LawnmowerRepository'
import PhoneCaseRepository from '../repositories/PhoneCaseRepository'
import TShirtRepository from '../repositories/TShirtRepository'

const fetchData = async (repo) => {
  try {
    return await repo.getAll()
  } catch (error) {
    console.error(`Error fetching data from ${repo.constructor.name}:`, error)
    throw error
  }
}

export const fetchConsolidatedProducts = async () => {
  try {
    const repositories = [
      { repo: new LawnmowerRepository(), type: 'Lawnmower' },
      { repo: new PhoneCaseRepository(), type: 'Phone Case' },
      { repo: new TShirtRepository(), type: 'T-Shirt' },
    ]

    const products = await Promise.all(
      repositories.map(({ repo }) => fetchData(repo)),
    )

    // Use flatMap to flatten the array and map each product to a new object
    return products
      .flatMap((productArray, index) => {
        const { type } = repositories[index]
        return productArray.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price.toFixed(2),
          type,
        }))
      })
      .filter((product) => !!product)
  } catch (error) {
    console.error('Error fetching consolidated products:', error)
    throw error
  }
}

export const convertPrices = (products, exchangeRate) => {
  return products.map((product) => ({
    ...product,
    price: (product.price * exchangeRate).toFixed(2),
  }))
}
