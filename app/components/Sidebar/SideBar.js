import React from 'react';
import MenuList from '../MenuList/MenuList';
import PropTypes from 'prop-types';

function SideBar({ active }) {
  return (
    <div className="bg-bluewhale h-screen fixed ">
      <div className="px-10  md:py-10 flex justify-center">
        <h1 className="text-bluewhalelight text-24 font-bold underline">
          Crypto <span className="text-green"> CEX</span>
        </h1>
      </div>
      <MenuList active={active} />
      <div className="block md:hidden px-5">
        <hr></hr>
        <div className="text-white px-3">
          <li className="flex hover:bg-bluewhalelight m-2 py-2 rounded ">
            <img src="/images/icons/vaults.png" alt="menu_item" />
            <span className="pl-2">Logout</span>
          </li>
        </div>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  active: PropTypes.string,
};

export default SideBar;
