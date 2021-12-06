/* eslint-disable react/prop-types */
import React from 'react'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'
import { Header } from 'semantic-ui-react'

const AllocationChart = () => {
  const COLORS = ['#e1bc29', '#3bb273', '#e15554', '#4d9de0', '#7768ae']
  const data = [
    { name: 'Food', value: .15 },
    { name: 'Savings', value: .25 },
    { name: 'Investments', value: .2 },
    { name: 'Rent', value: .4 },
  ]

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <Header as='h3'>Budget Percentages</Header>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend align='center' verticalAlign='bottom' iconType='circle' />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AllocationChart