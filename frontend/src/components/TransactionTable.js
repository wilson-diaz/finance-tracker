import { useQuery } from '@apollo/client'
import React, { useMemo } from 'react'
import { useFilters, usePagination, useSortBy, useTable } from 'react-table'
import { Table, Icon, Button, Select, Grid } from 'semantic-ui-react'
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
        Header: 'Amount ($)',
        accessor: 'amount'
      },
      {
        Header: 'Category',
        accessor: 'category',
        disableSortBy: true
      },
      {
        Header: 'Details',
        accessor: 'details',
        disableSortBy: true
      }
    ],
    []
  )

  const myTable = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: useMemo(() => [{ id: 'date', desc: true }])
      }
    },
    useFilters,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    previousPage,
    pageCount
  } = myTable


  return (
    <div>
      <Table celled {...getTableProps()}>
        <Table.Header>
          {
            headerGroups.map(headerGroup => (
              <Table.Row key={0} {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                    <Table.HeaderCell key={column.id}  {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? <Icon name='caret down' /> : <Icon name='caret up' />) : ''}</span>
                    </Table.HeaderCell>
                  ))
                }
              </Table.Row>
            ))
          }
        </Table.Header>
        <Table.Body {...getTableBodyProps()}>
          {
            page.map(row => {
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
      <Grid columns={3}>
        <Grid.Column>
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <Icon name='angle double left' />
          </Button>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <Icon name='angle left' />
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            <Icon name='angle right' />
          </Button>
          <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <Icon name='angle double right' />
          </Button>
        </Grid.Column>
        <Grid.Column></Grid.Column>
        <Grid.Column textAlign='right'>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <Select compact
            value={pageSize}
            onChange={(e, { value }) => {
              setPageSize(Number(value))
            }}
            options={[10, 25, 50, 100].map(pageSize => {
              return {
                key: pageSize,
                value: pageSize,
                text: `Show ${pageSize} rows`
              }
            })}
          />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default TransactionTable