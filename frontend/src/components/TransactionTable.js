import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { Table } from 'semantic-ui-react'

const TransactionTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date'
      },
      {
        Header: 'Category',
        accessor: 'category'
      },
      {
        Header: 'Amount ($)',
        accessor: 'amount'
      },
      {
        Header: 'Details',
        accessor: 'details'
      }
    ],
    []
  )
  const data = useMemo(
    () => [
      { date: '12-6-2021', category: 'Food', amount: 50.87, details: 'went grocery shopping' },
      { date: '12-6-2021', category: 'Investments', amount: 200.00, details: 'bought some stock' },
      { date: '12-7-2021', category: 'Savings', amount: 20.00, details: 'found $20 bill' },
    ],
    []
  )

  const myTable = useTable({ columns, data })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = myTable

  console.log(headerGroups, rows)

  return (
    <Table celled {...getTableProps()}>
      <Table.Header>
        {
          headerGroups.map(headerGroup => (
            <Table.Row key={0} {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                  <Table.HeaderCell key={column.id}  {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </Table.HeaderCell>
                ))
              }
            </Table.Row>
          ))
        }
      </Table.Header>
      <Table.Body {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row)
            return (
              <Table.Row  key={row.id} {...row.getRowProps()}>
                {
                  row.cells.map(cell => {
                    return (
                      <Table.Cell key={cell.column.id} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Table.Cell>
                    )
                  })
                }
              </Table.Row>
            )
          })
        }
      </Table.Body>
    </Table>
  )
}

export default TransactionTable