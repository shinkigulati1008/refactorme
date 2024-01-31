import React from 'react'
import {
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
} from './ProductTableStyles'

// Wrap the ProductTable component with React.memo
const ProductTable = React.memo(({ products, currency }) => {
  if (!products || products.length === 0) {
    return <p>No products available.</p>
  }
  return (
    <>
      <h1>Products ({currency})</h1>
      <StyledTable className="product-table-container table table-striped">
        <thead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Type</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const { id, name, price, type } = product
            return (
              <TableRow key={`${id}-${index}`}>
                <TableCell>{name}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{type}</TableCell>
              </TableRow>
            )
          })}
        </tbody>
      </StyledTable>
    </>
  )
})

export default ProductTable
