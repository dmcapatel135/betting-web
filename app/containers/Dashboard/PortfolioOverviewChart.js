import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import Highcharts from 'highcharts';

function PortfolioOverviewChart() {
  const options = {
    chart: {
      type: 'spline',
      backgroundColor: 'white',
      height: '200px',
      plotBorderColor: 'blue',
      margin: 0,
    },
    credits: {
      enabled: false, // Disable the Highcharts.com tag
    },
    title: {
      text: '',
    },
    series: [
      {
        innerSize: '75%',
        data: [
          { name: 'ASSETS', y: 20 },
          { name: 'ASSETS', y: 5 },
          { name: 'ASSETS', y: 15 },
          { name: 'ASSETS', y: 20 },
          { name: 'ASSETS', y: 10 },
        ],
        colors: '#167A9A',
        dataLabels: {
          enabled: true,
          format: '0% APY', // {point.y} {point.name} Custom format for the inner text
          distance: -90, // Distance from the center of the chart
          style: {
            fontWeight: '300',
            fontSize: '12px',
            color: 'gray',
            textOutline: 'none',
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white py-3  h-96 boxshadow-lg rounded-lg relative border-[1px] border-lightestgray ">
      <div className="px-5  text-black items-center h-full">
        <div className="flex justify-between">
          <div>
            <h1 className="text-bluewhalelight pb-5">Portfolio Overview</h1>
          </div>
          <div className="flex">
            <div className="w-8 h-8 flex mx-1 text-bluewhale justify-center items-center rounded-sm bg-gray-300 shadow-sm">
              <span className="text-12">1W</span>
            </div>
            <div className="w-8 h-8 flex mx-1 text-bluewhale justify-center items-center rounded-sm bg-gray-300 shadow-sm">
              <span className="text-12">1M</span>
            </div>
            <div className="w-8 h-8 flex mx-2 text-bluewhale justify-center items-center rounded-sm bg-gray-300 shadow-sm">
              <span className="text-12">1Y</span>
            </div>
            <div className="w-8 h-8 flex mx-2 text-bluewhale justify-center items-center rounded-sm bg-gray-300 shadow-sm">
              <span className="text-12">All</span>
            </div>
          </div>
        </div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}

export default PortfolioOverviewChart;
