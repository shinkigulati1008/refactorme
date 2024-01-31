import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #f2f2f2;
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`

export const TableCell = styled.td`
  padding: 12px;
`
