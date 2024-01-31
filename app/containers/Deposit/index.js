import {
  Betslip,
  CompanyContact,
  CustomerCareContact,
  MobileInputField,
  TalkToUs,
} from '@components';
import React, { useState } from 'react';

function Deposit() {
  const [paymentMethod, setPaymentMethod] = useState('Tigo');
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-12 md:col-span-8">
        <div className="md:p-5 p-0">
          <div className="">
            <img src="/images/bikoicon/main.png" alt="main" />
          </div>
          <div className="my-3 px-3 md:px-0 ">
            <div
              className="rounded-lg border  border-purple-300 bg-purple-100 shadow-lg"
              style={{
                boxShadow: '0px 0px 69.3px 0px rgba(118, 32, 243, 0.29)',
              }}
            >
              <div className="bg-blue text-center rounded-t-lg">
                <h1 className="text-16 py-2 font-[700]">
                  DEPOSIT FUNDS (MOBILE MONEY)
                </h1>
              </div>
              <div className="px-5 my-5">
                <div>
                  <label className="text-black text-12">
                    Your Mobile Number
                  </label>
                  <MobileInputField />
                </div>
                <div className="my-2">
                  <label className="text-black text-12">
                    Amount to Deposit
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    className="border-[1px] border-yellow text-14 outline-none text-gray-900 w-full h-10 rounded-lg px-3"
                  />
                </div>
                <div>
                  <button className="w-full bg-yellow h-10 font-[700] text-14 rounded-lg">
                    DEPOSIT
                  </button>
                </div>
              </div>
              <hr></hr>
              <div className="px-5 my-5 text-black">
                <h1 className="text-20 font-[500]">DEPOSIT INSTRUCTIONS</h1>
                <ol className="text-12">
                  <li>1. Enter the amount you want to deposit.</li>
                  <li>2. Click on the deposit button.</li>
                  <li>3. Check your phone for a Request.</li>
                  <li>4. Enter your Pin to confirm the transaction.</li>
                  <li>
                    5. On successful payment, you will receive a Confirmation.
                  </li>
                </ol>
                <div className="my-2">
                  <p className="font-[500] text-16">HOW TO DEPOSIT ON PHONE</p>
                  <div className="flex my-2">
                    <div
                      className={`mr-2 ${
                        paymentMethod === 'Tigo'
                          ? 'border-2 border-blue rounded-sm'
                          : 'border-none'
                      }`}
                    >
                      <img
                        src="/images/bikoicon/tigo.png"
                        className="w-14 h-14 cursor-pointer"
                        onClick={() => setPaymentMethod('Tigo')}
                      />
                    </div>
                    <div
                      className={`mr-2 ${
                        paymentMethod === 'Mpesa'
                          ? 'border-2 border-blue rounded-sm'
                          : 'border-none'
                      }`}
                    >
                      <img
                        src="/images/bikoicon/mpesa2.png"
                        className=" w-14 h-14 cursor-pointer"
                        onClick={() => setPaymentMethod('Mpesa')}
                      />
                    </div>
                    <div
                      className={`mr-2 ${
                        paymentMethod === 'Airtel'
                          ? 'border-2 border-blue rounded-sm'
                          : 'border-none'
                      }`}
                    >
                      <img
                        src="/images/bikoicon/airtel2.png"
                        className=" w-14 h-14 cursor-pointer"
                        onClick={() => setPaymentMethod('Airtel')}
                      />
                    </div>
                    <div
                      className={`mr-2 ${
                        paymentMethod === 'Hpesa'
                          ? 'border-2 border-blue rounded-sm'
                          : 'border-none'
                      }`}
                    >
                      <img
                        src="/images/bikoicon/halo2.png"
                        className="w-14 h-14 cursor-pointer"
                        onClick={() => setPaymentMethod('Hpesa')}
                      />
                    </div>
                  </div>
                </div>
                {paymentMethod === 'Tigo' && (
                  <div>
                    <p className="font-[500] text-16">
                      KUWEKA PESA KUPITIA TIGOPESA
                    </p>
                    <ol className="text-12">
                      <li>1. Piga *150*01#</li>
                      <li>2. Chagua 4 Lipa kwa TIGOPESA</li>
                      <li>
                        3. Chagua 3 Weka namba ya kampuni/biashara: 101010
                      </li>
                      <li>
                        4. Weka Namba yako ya Account (phone number) au Receipt
                        (kama unalipia bila account)
                      </li>
                      <li>
                        5. Weka kiasi: XX,XXX/= , Na namba ya siri kumalizia
                      </li>
                    </ol>
                  </div>
                )}
                {paymentMethod === 'Mpesa' && (
                  <div>
                    <p className="font-[500] text-16">
                      KUWEKA PESA KUPITIA MPESA
                    </p>
                    <ol className="text-12">
                      <li>1. Piga *150*01#</li>
                      <li>2. Chagua 4 Lipa kwa TIGOPESA</li>
                      <li>
                        3. Chagua 3 Weka namba ya kampuni/biashara: 101010
                      </li>
                      <li>
                        4. Weka Namba yako ya Account (phone number) au Receipt
                        (kama unalipia bila account)
                      </li>
                      <li>
                        5. Weka kiasi: XX,XXX/= , Na namba ya siri kumalizia
                      </li>
                    </ol>
                  </div>
                )}
                {paymentMethod === 'Airtel' && (
                  <div>
                    <p className="font-[500] text-16">
                      KUWEKA PESA KUPITIA AIRTEL
                    </p>
                    <ol className="text-12">
                      <li>1. Piga *150*01#</li>
                      <li>2. Chagua 4 Lipa kwa TIGOPESA</li>
                      <li>
                        3. Chagua 3 Weka namba ya kampuni/biashara: 101010
                      </li>
                      <li>
                        4. Weka Namba yako ya Account (phone number) au Receipt
                        (kama unalipia bila account)
                      </li>
                      <li>
                        5. Weka kiasi: XX,XXX/= , Na namba ya siri kumalizia
                      </li>
                    </ol>
                  </div>
                )}
                {paymentMethod === 'Hpesa' && (
                  <div>
                    <p className="font-[500] text-16">
                      KUWEKA PESA KUPITIA HALOPESA
                    </p>
                    <ol className="text-12">
                      <li>1. Piga *150*01#</li>
                      <li>2. Chagua 4 Lipa kwa TIGOPESA</li>
                      <li>
                        3. Chagua 3 Weka namba ya kampuni/biashara: 101010
                      </li>
                      <li>
                        4. Weka Namba yako ya Account (phone number) au Receipt
                        (kama unalipia bila account)
                      </li>
                      <li>
                        5. Weka kiasi: XX,XXX/= , Na namba ya siri kumalizia
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 pt-5 pl-3 ml-1 mr-3 md:block hidden border-[#A3A3A3] border-l-[1px] h-full">
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

export default Deposit;
