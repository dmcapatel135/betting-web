import React from 'react';
import ActionButton from '../../components/ActionButton/ActionButton';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

function VaultAccountChart() {
  const options = {
    chart: {
      type: 'pie',
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
      //   margin: 25,
    },
    series: [
      {
        innerSize: '75%',
        data: [{ name: 'ASSETS', y: 20 }],
        colors: ['#167A9A'],
        dataLabels: {
          enabled: true,
          format: '0% APY', // {point.y} {point.name} Custom format for the inner text
          distance: -90, // Distance from the center of the chart
          style: {
            fontWeight: '600',
            fontSize: '20px',
            color: 'gray',
            textOutline: 'none',
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white py-3  h-96 boxshadow-lg rounded-lg relative border-[1px] border-lightestgray ">
      <div className="px-5  text-black items-center h-full pb-3">
        <div>
          <h1 className="text-bluewhalelight pb-5">Vault Account</h1>
        </div>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <div className="flex mt-3">
          <div>
            <sapn className="text-12 text-lightgray">Vault Account</sapn>
            <h1 className="text-20 font-extrabold py-3 text-dark">
              $21,000.00
            </h1>
            <span className="text-12 text-lightgray">No Assets</span>
          </div>
          <div className="px-5">
            <ActionButton
              btnName="VAULTS"
              btnClass="bg-bluewhale w-full px-4  my-2 py-1 text-white text-14 rounded-md"
            />
            <ActionButton
              btnName="HISTORY"
              btnClass="bg-bluewhale w-full px-4 my-2 py-1 text-white text-14 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VaultAccountChart;
