import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { styled, useTheme } from '@mui/material/styles';

import Chart, { useChart } from 'src/components/chart';

const CHART_HEIGHT = 400;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: '100% !important',
  },
  '& .apexcharts-donut-text': {
    fontSize: '28px !important',
    fontWeight: '700 !important',
    fill: `${theme.palette.text.primary} !important`
  },
  '& .apexcharts-donut-label': {
    fontSize: '14px !important',
    fontWeight: '600 !important',
    fill: `${theme.palette.text.secondary} !important`
  }
}));

export default function ActiveCustomers({ title, subheader, chart, ...other }) {
  const theme = useTheme();
  const { series, options } = chart;
  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    chart: {
      type: 'donut',
    },
    colors: ['#438EF2', '#40322E'],
    labels: [], // Empty array removes the legend labels
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      show: false, // This completely hides the legend
    },
    dataLabels: {
      enabled: false, // Disables labels on the chart segments
    },
    tooltip: {
      enabled: false, // Disables tooltips if you don't need them
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600,
              color: theme.palette.text.secondary,
              formatter: () => 'Total New Customers'
            },
            value: {
              show: true,
              fontSize: '28px',
              fontWeight: 700,
              color: theme.palette.text.primary,
              formatter: () => '65%'
            },
            total: {
              show: false
            }
          }
        }
      }
    },
    ...options,
  });

  return (
    <Card {...other} sx={{height: "485px"}}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <StyledChart
        dir="ltr"
        type="donut"
        series={chartSeries}
        options={chartOptions}
        width="100%"
        height={280}
      />
    </Card>
  );
}

ActiveCustomers.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};