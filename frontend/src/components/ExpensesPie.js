import React, { useMemo } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'

const ExpensesPie = ({ categoryTotals }) => {
  const pieData = !categoryTotals  || categoryTotals.length === 0 || !categoryTotals.find(x => x.value > 0)
    ? [{ id: -1, name: 'No spending this month', y: 1 }]
    : useMemo(() => categoryTotals.filter(x => x.value > 0).map(x => ({ ...x, y: x.value })), [categoryTotals])

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

ExpensesPie.propTypes = {
  categoryTotals: PropTypes.array.isRequired
}

export default ExpensesPie