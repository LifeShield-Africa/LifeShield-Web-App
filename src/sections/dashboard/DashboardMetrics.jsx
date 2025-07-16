import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { fShortenNumber } from 'src/utils/format-number';

export default function DashboardMetrics({
  title,
  total,
  color,
  icon,
  subtext,
  percent_change,
  trend,
  moneyValue = true,
  sx,
  metricsVariant = 'default',
  arrowIcon,
  ...other
}) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 3,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 100, height: 100 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        <Typography variant="subtitle2" sx={{ color: { color } }}>
          {title}
        </Typography>
        <Typography variant="h4">
          {moneyValue && '$'} {fShortenNumber(total)}
        </Typography>

        {metricsVariant === 'default' && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.4,
            }}
          >
            {(arrowIcon !== undefined || percent_change !== undefined) && (
              <Typography
                variant="subtitle2"
                sx={{
                  color: trend === 'increased' ? '#00AC4F' : '#D0004B',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {arrowIcon !== undefined 
                  ? arrowIcon 
                  : trend && (trend === 'increased' ? <ArrowUpward /> : <ArrowDownward />)}
                {percent_change !== undefined && `${percent_change}%`}
              </Typography>
            )}

            {subtext && (
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.desabled',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {subtext}
              </Typography>
            )}
          </Box>
        )}

        {metricsVariant === 'avatar' && (
          <AvatarGroup
            sx={{
              '& .MuiAvatar-root': {
                width: 26,
                height: 26,
                cursor: 'pointer',
                border: '3px solid white',
              },
            }}
            max={5}
          >
            <Avatar alt="Person 1" src="https://randomuser.me/api/portraits/women/1.jpg" />
            <Avatar alt="Person 2" src="https://randomuser.me/api/portraits/men/2.jpg" />
            <Avatar alt="Person 3" src="https://randomuser.me/api/portraits/women/3.jpg" />
            <Avatar alt="Person 4" src="https://randomuser.me/api/portraits/men/4.jpg" />
            <Avatar alt="Person 5" src="https://randomuser.me/api/portraits/women/5.jpg" />
          </AvatarGroup>
        )}
      </Stack>
    </Card>
  );
}

DashboardMetrics.propTypes = {
  trend: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  subtext: PropTypes.string,
  moneyValue: PropTypes.bool,
  metricsVariant: PropTypes.string,
  percent_change: PropTypes.number,
  color: PropTypes.string,
  arrowIcon: PropTypes.element,
};