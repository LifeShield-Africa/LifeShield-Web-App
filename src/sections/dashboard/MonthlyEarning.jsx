import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

// Sample quarterly data for bar chart
const quarterlyData = {
  Q1: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [{ 
      name: 'Earnings',
      data: [12000, 19000, 15000, 18000, 21000, 9000, 21000, 19000, 15000, 26000, 4000, 18000]
    }],
    colors: ['#438EF2']
  },
  Q2: {
    labels: [],
    series: [{ 
      name: 'Earnings',
      data: []
    }],
    colors: ['#10B981']
  },
  Q3: {
    labels: [],
    series: [{ 
      name: 'Earnings',
      data: []
    }],
    colors: ['#EF4444']
  },
  Q4: {
    labels: [],
    series: [{ 
      name: 'Earnings',
      data: []
    }],
    colors: ['#8B5CF6']
  }
};

export default function MonthlyEarnings({ title, subheader, ...other }) {
  const [quarter, setQuarter] = useState('Q1');
  const { labels, series, colors } = quarterlyData[quarter];

  const chartOptions = useChart({
    colors,
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        borderRadius: 4
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      title: {
        text: 'Amount ($)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val.toLocaleString()}`
      }
    }
  });

  return (
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader}
        action={
          <Select
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
            size="small"
            sx={{
              minWidth: 100,
              '& .MuiSelect-select': {
                py: 0.5,
                fontSize: '0.875rem'
              }
            }}
          >
            <MenuItem value="Q1">Q1</MenuItem>
            <MenuItem value="Q2">Q2</MenuItem>
            <MenuItem value="Q3">Q3</MenuItem>
            <MenuItem value="Q4">Q4</MenuItem>
          </Select>
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

MonthlyEarnings.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};