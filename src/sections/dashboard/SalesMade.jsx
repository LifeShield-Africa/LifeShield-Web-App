import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

export default function SalesMade({ title, subheader, chart, ...other }) {
  const { labels, series, options } = chart;
  const [timeRange, setTimeRange] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [selectedYear, setSelectedYear] = useState('2023');

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const years = ['2021', '2022', '2023', '2024'];

  const chartOptions = useChart({
    colors: ['#438EF2'],
    plotOptions: {
      bar: {
        columnWidth: '80%',
        endingShape: 'rounded',
        states: {
          hover: {
            filter: {
              type: 'darken',
              value: 50,
            },
          },
        },
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)}`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader}
        action={
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              size="small"
              sx={{
                minWidth: 120,
                '& .MuiSelect-select': {
                  py: 0.5,
                  fontSize: '0.875rem'
                }
              }}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
            
            {timeRange === 'monthly' ? (
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                size="small"
                sx={{
                  minWidth: 100,
                  '& .MuiSelect-select': {
                    py: 0.5,
                    fontSize: '0.875rem'
                  }
                }}
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
              </Select>
            ) : (
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                size="small"
                sx={{
                  minWidth: 100,
                  '& .MuiSelect-select': {
                    py: 0.5,
                    fontSize: '0.875rem'
                  }
                }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            )}
          </Box>
        }
        sx={{
          '& .MuiCardHeader-action': {
            alignSelf: 'center',
            mt: 0
          }
        }}
      />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="bar"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

SalesMade.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};