import { reactIcons } from '@utils/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  const icons = [
    {
      icon: reactIcons.facebook2,
      path: 'https://www.facebook.com/bikosports',
    },
    {
      icon: reactIcons.instagram,
      path: 'https://www.instagram.com/bikosports',
    },
    { icon: reactIcons.twitter, path: 'https://www.twitter.com/bikosports' },
  ];
  const LinkData = [
    { link: 'Terms & Conditions', path: '/terms' },
    { link: 'FAQs', path: '/faqs' },
    { link: 'How to Play', path: '/dashboard/how-to-play' },
  ];
  return (
    <footer className="bg-gradient-color-1">
      <div className="container pt-10 pb-5">
        <div className="grid grid-cols-12">
          <div className="col-span-full md:col-span-6 lg:col-span-3 order-1">
            <div className="">
              <img
                src="/images/bikoicon/bikosports.png"
                alt="logo"
                className="w-[117px] md:w-[200px] 2xl:w-[280px]"
              />
            </div>
            <div className="mt-0 lg:mt-8">
              <div className="flex items-center gap-3 lg:justify-between mr-5 lg:block">
                <span className="lg:my-3 text-14 2xl:text-18">
                  Join our community :
                </span>
                <div className="flex gap-2 lg:gap-4 text-22 lg:text-36 text-primary-700 my-2 lg:my-5">
                  {icons.map((item, index) => (
                    // <a href={item.path} target="blank" key={index}>
                    <span key={index}>{item.icon}</span>
                    // </a>
                  ))}
                </div>
              </div>
              <h1 className="text-14 lg:text-16">
                Customer Care- Call 0222 220 100
              </h1>
            </div>

            <div className="my-3 md:hidden block">
              <hr className="border w-full"></hr>
            </div>
          </div>
          <div className="col-span-full lg:col-span-6 mt-2 lg:mt-0 lg:order-2 order-3 flex flex-col justify-end">
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
                SALAAM, P.O.BOX 3254. Tel: 0222 220 100
              </span>
            </div>
          </div>
          <div className="col-span-full md:col-span-6 lg:col-span-3 order-2 lg:order-3">
            <div className="md:text-end mb-2">
              <h1 className="text-16 font-[600] pb-3 cursor-pointer ">
                About Explain Bikosports
              </h1>

              <div className="flex flex-col justify-end">
                {LinkData.map((item, index) => (
                  <Link key={index} to={item.path}>
                    {item.link}
                  </Link> // Use Link component with 'to' prop
                ))}
              </div>
            </div>
            <hr className=" w-full"></hr>
            <div className="text-center lg:block flex items-center lg:text-end mt-0 md:mt-2">
              <div className="flex justify-center md:justify-end my-4">
                <img
                  src="/images/bikoicon/eighteenplus.png"
                  alt="18icon"
                  className="mr-3 md:mr-0"
                />
              </div>
              <p className="text-14 text-left lg:text-right leading-6 xxl:text-16">
                Please play responsibly. This site is open only to persons over
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
