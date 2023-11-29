import React from 'react';

function News() {
  return (
    <div className="bg-white py-3 h-96 boxshadow-lg rounded-lg border-[1px] border-lightestgray relative ">
      <div className="px-5  items-center h-full">
        <div className="flex justify-between">
          <h1 className="text-bluewhale">News</h1>
          <span className="text-tealishblue text-14">See All</span>
        </div>
        <div className="flex mt-3 pr-10">
          <div>
            <div className="text-riverbed">
              <span>Bitcoin, Etherum, Crypto, News and price Data</span>
            </div>
            <div className="flex mt-3 text-lightgray">
              <sapn>News Media</sapn>
              <sapn className="h-6 w-[2px] mx-3 bg-lightestgray border-spacing-2 border-lightgray"></sapn>
              <sapn>4h ago</sapn>
            </div>
          </div>
          <div>
            <img src="" alt="img" className="w-12 h-12 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
