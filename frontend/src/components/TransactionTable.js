/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import React, { useMemo } from 'react'
import { useFilters, usePagination, useSortBy, useTable } from 'react-table'
import { Table, Icon, Input, Button, Select, Grid } from 'semantic-ui-react'
import { GET_USER_TRANSACTIONS } from '../queries'

const TextFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <Input
      type='text'
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder='Search...'
    />
  )
}

// dropdown filter with options based on unique values in column
const SelectFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
  const selectOptions = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...options.values()].map((val, i) => ({ key: i, value: val, text: val }))
  }, [id, preFilteredRows])

  return (
    <Select
      value={filterValue}
      placeholder='Category'
      onChange={(e, { value }) => setFilter(value || undefined)}
      options={[
        { key: '-1', value: '', text: 'All' },
        ...selectOptions
      ]}
    />
  )
}

const createRangeFilter = inputType  => {
  const castFilterVal = val => {
    if (inputType === 'number') {
      return Number(val)
    } else if (inputType === 'date') {
      return Date.parse(val)
    }
  }

  // used to populate input prop with valid value to display
  const getInputValue = val => {
    if (inputType === 'date') {
      const date = new Date(val)
      const dayString = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const monthString = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      return `${date.getFullYear()}-${monthString}-${dayString}`
    }

    return val
  }

  // the 'between' filter filters based on two values set in the filterValue array
  return function RangeFilter({ column: { filterValue = [], setFilter } }) {
    return (
      <div>
        <Input
          type={inputType}
          value={getInputValue(filterValue[0]) || ''}
          placeholder='Min'
          onChange={e => {
            setFilter((old = []) => [e.target.value ? castFilterVal(e.target.value) : undefined, old[1]])
          }}
          style={{
            width: '135px',
            marginRight: '0.5rem'
          }}
        />
        to
        <Input
          type={inputType}
          value={getInputValue(filterValue[1]) || ''}
          placeholder='Max'
          onChange={e => {
            setFilter((old = []) => [old[0], e.target.value ? castFilterVal(e.target.value) : undefined])
          }}
          style={{
            width: '135px',
            marginLeft: '0.5rem'
          }}
        />
      </div>
    )
  }
}

// custom filter to handle dates
const dateRangeFilterFunc = (rows, id, filterValue) => {
  return rows.filter(row => {
    if (filterValue[0] && filterValue[1]) {
      return filterValue[0] <= Date.parse(row.values[id])
        && Date.parse(row.values[id]) <= filterValue[1]
    } else if (filterValue[0]) {
      return filterValue[0] <= Date.parse(row.values[id])
    } else if (filterValue[1]) {
      return Date.parse(row.values[id]) <= filterValue[1]
    } else {
      return true
    }
  })
}

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
        Footer: createRangeFilter('date'),
        filter: 'dateRange',
        accessor: 'date'
      },
      {
        Header: 'Amount ($)',
        Footer: createRangeFilter('number'),
        filter: 'between',
        accessor: 'amount'
      },
      {
        Header: 'Category',
        Footer: SelectFilter,
        accessor: 'category',
        disableSortBy: true
      },
      {
        Header: 'Details',
        Footer: TextFilter,
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
      },
      filterTypes: useMemo(() => ({
        dateRange: dateRangeFilterFunc
      }))
    },
    useFilters,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
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
        <Table.Footer>
          {
            footerGroups.map(group => (
              <Table.Row key={group.id} {...group.getFooterGroupProps()}>
                {
                  group.headers.map(column => (
                    <Table.HeaderCell key={column.id} {...column.getFooterProps()}>{column.render('Footer')}</Table.HeaderCell>
                  ))
                }
              </Table.Row>
            ))
          }
        </Table.Footer>
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