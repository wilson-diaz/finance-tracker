import { useQuery } from '@apollo/client'
import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { Table } from 'semantic-ui-react'
import { GET_USER_TRANSACTIONS } from '../queries'

const TransactionTable = () => {
  const transactionsResult = useQuery(GET_USER_TRANSACTIONS)

  const data = useMemo(() => {
    if (transactionsResult.loading || !transactionsResult.data) {
      return []
    }

    return transactionsResult.data.userTransactions
      .map(t => {
        return {
          id: t.id,
          date: new Date(Number(t.date)).toLocaleDateString(),
          amount: t.amount,
          details: t.details,
          category: t.category.name
        }
      })
      // .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [transactionsResult.loading, transactionsResult.data])


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

  const myTable = useTable({ columns, data })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = myTable


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