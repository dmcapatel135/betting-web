import {
  Betslip,
  CompanyContact,
  CustomerCareContact,
  TalkToUs,
} from '@components';
import React from 'react';

function MyTransactions() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">
        <div className="p-5">
          <div className="">
            <img src="/images/bikoicon/main.png" alt="main" />
          </div>
          <div className="my-3">
            <div className="border-[1px] border-[#A3A3A3]  shadow-md rounded-[8px]">
              <div className="flex justify-between p-3">
                <div>
                  <h1 className="text-black xl:text-16 xxl:text-20 font-[800] font-roboto">
                    MY TRANSACTIONS
                  </h1>
                  <p className="text-gray-900 xl:text-12 xxl:text-14 font-[500]">
                    As at 11/12/2023 11:36
                  </p>
                </div>
                <div>
                  <p className="text-gray-900 xl:text-12 xxl:text-14 font-[500]">
                    Account balance
                  </p>
                  <h1 className="text-black xl:text-16 xxl:text-20 font-[800] font-roboto">
                    16249.95
                  </h1>
                </div>
              </div>
            </div>
            <div className="border-[1px] my-3 p-3 border-[#A3A3A3]  shadow-md rounded-[8px]">
              <table className="w-full">
                <thead className="bg-gradient-color-2 text-14 h-10 rounded-[8px]">
                  <th className="rounded-l-[8px]">DATE & TIME</th>
                  <th>DESCRIPTION</th>
                  <th>CREDIT</th>
                  <th>DEBIT</th>
                  <th className="rounded-r-[8px]">BALANCE</th>
                </thead>
                <tbody className="text-gray-900 text-center text-12 font-[500]">
                  <tr>
                    <td>2023-12-09 10:48</td>
                    <td>Narration</td>
                    <td></td>
                    <td>50000</td>
                    <td>16250</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 mt-3 ml-1 mr-3">
        {/* <RightSideSection /> */}
        {/* <BetWallet /> */}
        <Betslip wallet="true" />
        <CompanyContact />
        <CustomerCareContact />
        <TalkToUs />
      </div>
    </div>
  );
}

export default MyTransactions;
