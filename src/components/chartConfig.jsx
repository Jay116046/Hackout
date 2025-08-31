// This file centralizes common chart settings and helper functions

// Common colors for charts
export const chartColors = [
  'rgb(54, 162, 235)',
  'rgb(255, 99, 132)',
  'rgb(75, 192, 192)',
  'rgb(255, 206, 86)',
  'rgb(153, 102, 255)',
  'rgb(255, 159, 64)',
];

// Reusable options for time-series line charts
export const commonOptions = (yAxisTitle) => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: yAxisTitle,
      },
    },
    x: {
      title: {
        display: true,
        text: 'Time',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
  },
});

// Helper function to format time labels consistently
export const processTimeLabels = (data) => {
  return data.map(item =>
    new Date(item.time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
};