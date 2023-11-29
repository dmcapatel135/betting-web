import React from 'react';

function Watchlist() {
  return (
    <div className="bg-white py-3  lg:mr-3 h-96  boxshadow-lg rounded-lg border-[1px] border-lightestgray relative ">
      <div className="px-3 block  items-center h-full">
        <div className="flex px-2">
          <h1 className="text-bluewhale">Watchlist</h1>
        </div>
        <div className="flex justify-between text-lightgray text-14 mt-2">
          <span>Watch</span>
          <span>Pair</span>
          <span>Price</span>
          <span>Change (24hr)</span>
          <span>Graph (24hr)</span>
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
