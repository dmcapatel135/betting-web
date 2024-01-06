import React from 'react';

function RightSideSection() {
  return (
    <div className="md:col-span-3 col-span-full">
      <div className="bg-white border-l-[1px] h-full py-2 md:p-2 border-[#A3A3A3]">
        <img src="/images/bikoicon/appimg.png" alt="app" className="md:p-2" />
        <img src="/images/bikoicon/hello.png" alt="app" className="md:p-2" />
        {/* <BetWallet />
            <CompanyContact />
            <CustomerCareContact /> */}
      </div>
    </div>
  );
}

export default RightSideSection;
