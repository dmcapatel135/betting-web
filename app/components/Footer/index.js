import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-color-1">
      <div className="container py-12">
        <div className="grid grid-cols-12">
          <div className="col-span-full md:col-span-6 lg:col-span-3 order-1">
            <div>
              <div className="text-12 mt-2 lg:mt-6">
                <img
                  src="/images/bikoicon/bikosports.png"
                  alt="logo"
                  className="w-[117px] h-[30px] md:w-[200px] md:h-[50px]"
                />
              </div>
              <div className="mt-0 lg:mt-8">
                <div className="flex items-center justify-between mr-5 lg:block">
                  <span className="lg:my-3 text-12 md:text-14">
                    Join our community :
                  </span>
                  <div className="flex my-2 lg:my-5">
                    <img
                      src="/images/bikoicon/facebook.png"
                      alt="icon"
                      className="mr-4 cursor-pointer md:w-10  md:h-10 w-8 h-8"
                    />
                    <img
                      src="/images/bikoicon/instagram.png"
                      alt="icon"
                      className="mr-4 cursor-pointer md:w-10  md:h-10 w-8 h-8"
                    />
                    <img
                      src="/images/bikoicon/twitter.png"
                      alt="icon"
                      className="cursor-pointer md:w-10  md:h-10 w-8 h-8"
                    />
                  </div>
                </div>
                <h1 className="text-14 md:text-16">
                  Customer Care- Call 022 222 0100{' '}
                </h1>
              </div>
            </div>
            <div className="my-3 md:hidden block">
              <hr className="border-[1px] w-full"></hr>
            </div>
          </div>
          <div className="col-span-full lg:col-span-6 mt-2 md:mt-0 lg:order-2 order-3">
            <div className="text-center text-14 lg:text-[14px] xxl:text-16 px-3 md:px-0 lg:px-16">
              <span>
                All correspondence to Director General 27th Floor, PSPF Towers,
                Mission Street Postal Address: PO Box 1717, Dar es Salaam,
                TANZANIA Gaming Board of Tanzania License Number SBI 000000016
              </span>
              <div className="flex justify-center my-5">
                <img src="/images/bikoicon/gtb.png" alt="icon" />
              </div>
              <span>
                © 2023 All rights Reserved. BIKOSPORTS, a trade mark of MOBIBET
                COMPANY LTD. TIN: 127-321-361. Reg. Company N: 118069 Tanzania,
                Dar es Salaam. Office Address: 45 MIGOMBANI STREET 116, DAR ES
                SALAAM, P.O.BOX 3254. Tel: 022 222 0100
              </span>
            </div>
          </div>
          <div className="col-span-full md:col-span-6 lg:col-span-3 order-2 lg:order-3">
            <div className="text-center md:text-end mb-2">
              <h1 className="text-16 font-[600] pb-3 cursor-pointer ">
                About Explain Bikosports
              </h1>
              <div className="lg:block flex justify-around">
                <p className="text-14 py-1 cursor-pointer">
                  Terms & Conditions
                </p>
                <p className="text-14 py-1 cursor-pointer">FAQs</p>
                <p className="text-14 py-1 cursor-pointer">How to Play</p>
              </div>
            </div>
            <hr></hr>
            <div className="text-center lg:block flex items-center lg:text-end mt-0 md:mt-2">
              <div className="flex justify-center md:justify-end my-4">
                <img
                  src="/images/bikoicon/eighteenplus.png"
                  alt="18icon"
                  className="mr-3 md:mr-0"
                />
              </div>
              <p className="text-14 text-left lg:text-right leading-6 xxl:text-16">
                Please Play responsibly. This site is open only to persons over
                the age of 18 years.
              </p>
            </div>
            <div className="my-3 md:hidden block">
              <hr className="border-[1px] w-full"></hr>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
