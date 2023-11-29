import React from 'react';
import ActionButton from '../ActionButton/ActionButton';
import InputField from '../InputField/InputField';

function Footer() {
  return (
    <div className="bg-bluewhale text-center md:text-left">
      <div className="grid grid-cols-6 p-2 md:p-12">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-16 md:text-20 font-bold">About Us</h3>
          <div className="text-16 py-4">
            <ul className="text-12 md:text-16 xl:text-18">
              <li className="md:py-1">
                <a href="#">About</a>
              </li>
              <li>
                <li className="md:py-1">
                  <a href="#">Business Contacts</a>
                </li>
              </li>
              <li className="md:py-1">
                <a href="#">Careers</a>
              </li>
              <li className="md:py-1">
                <a href="#" className="py-1">
                  Annoucements
                </a>
              </li>
              <li className="md:py-1">
                <a href="#" className="py-1">
                  News
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-16 md:text-20  font-bold">Products</h3>
          <div className="py-4">
            <ul className="text-12 md:text-16 xl:text-18">
              <li className="md:py-1">
                <a href="#">Exchange</a>
              </li>
              <li>
                <li className="md:py-1">
                  <a href="#">Buy Crypto</a>
                </li>
              </li>
              <li className="md:py-1">
                <a href="#">Token Swap</a>
              </li>
              <li className="md:py-1">
                <a href="#" className="py-1">
                  Staking
                </a>
              </li>
              <li className="md:py-1">
                <a href="#" className="py-1">
                  Academy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-16 md:text-20 font-bold">Business</h3>
          <div className="py-4">
            <ul className="text-12 md:text-16 xl:text-18">
              <li className="md:py-1">
                <a href="#">P2P Merchant</a>
              </li>
              <li>
                <li className="md:py-1">
                  <a href="#">Listing Coins</a>
                </li>
              </li>
              <li className="md:py-1">
                <a href="#">Priority Merchant Services</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-full md:col-span-3  order-1 md:order-4">
          <div className="px-4 md:px-10">
            <h1 className="text-20 md:text-32 xl:text-36 font-bold py-2 md:py-4">
              Join our newsletter program.
            </h1>
            <h1 className="text-20 md:text-32px xl:text-36 font-bold pb-5 sm:pb-10">
              Stay tuned with updates!!
            </h1>
            <div className="flex px-6 md:px-0">
              <InputField
                placeholder="Enter your email address"
                inpClass="w-[200px] md:w-[200px] lg:w-[300px] text-12 h:8 md:h-10 border-[1px] outline-none px-3 text-lightgray border-green rounded-lg bg-bluewhale"
              />
              <ActionButton
                btnClass="bg-green text-14 md:text-16 lg:text-22 text-white border-[1px] border-white rounded-lg px-1  md:px-3 md:py-2 ml-1 md:ml-5"
                btnName="Subscribe"
              />
            </div>
            <div className="my-5 ml-6 sm:ml-0 text-center flex">
              <h1 className="text-20 md:text-16 lg:text-24 font-extrabold ">
                Follow us :
              </h1>
              <img
                src="/images/icons/facebook.png"
                alt="icon"
                className="ml-7 mr-3"
              />
              <img
                src="/images/icons/twitter.png"
                alt="icon"
                className="mx-2"
              />
              <img src="/images/icons/chat.png" alt="icon" className="mx-2" />
              <img
                src="/images/icons/telegram.png"
                alt="icon"
                className="mx-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-12 md:text-18">
        <p>Crypto Cex @ 2023-2028 | All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
