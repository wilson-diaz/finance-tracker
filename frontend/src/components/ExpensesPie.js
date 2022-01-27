import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { GET_USER_TRANSACTIONS } from '../queries'

const ExpensesPie = () => {
  const transactionsResult = useQuery(GET_USER_TRANSACTIONS)
  const [pieData, setPieData] = useState([])

  useEffect(() => {
    if (!transactionsResult.loading && transactionsResult.data) {
      const data = transactionsResult.data.userTransactions.reduce((acc, t) => {
        // only current month's transactions
        if (t.category.isEnabled && new Date(Number(t.date)).getMonth() === new Date().getMonth()) {
          // check if already aggregating for category, create new record if not
          const category = acc.find(cat => cat.id === t.category.id)
          if (category) {
            category.y += t.amount
          } else {
            acc.push({ id: t.category.id, name: t.category.name, y: t.amount })
          }
        }

        return acc
      }, [])

      // no transactions
      if (data.length === 0) {
        setPieData([{
          id: -1,
          name: 'No spending this month',
          y: 1
        }])
      } else {
        setPieData(data)
      }
    }
  }, [transactionsResult.loading, transactionsResult.data])



  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colors: pieData[0] && pieData[0].id === -1 ?  ['#B4BBC4'] : undefined,
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: pieData[0] && pieData[0].id === -1 ?  'Unspent' : 'Expenses',
      colorByPoint: true,
      data: pieData
    }]
    // series: [{
    //   name: 'Brands',
    //   colorByPoint: true,
    //   data: [{
    //     name: 'Chrome',
    //     y: 61.41,
    //     sliced: true,
    //     selected: true
    //   }, {
    //     name: 'Internet Explorer',
    //     y: 11.84
    //   }, {
    //     name: 'Firefox',
    //     y: 10.85
    //   }, {
    //     name: 'Edge',
    //     y: 4.67
    //   }, {
    //     name: 'Safari',
    //     y: 4.18
    //   }, {
    //     name: 'Other',
    //     y: 7.05
    //   }]
    // }]
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

export default ExpensesPie