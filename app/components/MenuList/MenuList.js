import React from 'react';
import PropTypes from 'prop-types';

function MenuList({ active }) {
  return (
    <div>
      <ul className="text-extrabold text-white text-16">
        <li
          className={`${
            active === 'Dashboard' ? 'bg-bluewhalelight' : ''
          } flex px-8  hover:bg-bluewhalelight m-2 py-2 rounded `}
        >
          <img src="/images/icons/dashboard_icon.png" alt="menu_item" />
          <span className="pl-2">Dashboard</span>
        </li>
        <li className="flex px-8 hover:bg-bluewhalelight m-2 py-2 rounded ">
          <img src="/images/icons/exchange_icon.png" alt="menu_item" />
          <span className="pl-2">Exchange</span>
        </li>
        <li className="flex px-8 hover:bg-bluewhalelight m-2 py-2 rounded ">
          <img src="/images/icons/markets.png" alt="menu_item" />
          <span className="pl-2">Markets</span>
        </li>
        <li className="flex px-8 hover:bg-bluewhalelight m-2 py-2 rounded ">
          <img src="/images/icons/quick_trade.png" alt="menu_item" />
          <span className="pl-2">Quick Trade</span>
        </li>
        <li className="flex px-8 hover:hover:bg-bluewhalelight m-2 py-2 rounded ">
          <img src="/images/icons/wallets.png" alt="menu_item" />
          <span className="pl-2">Wallets</span>
        </li>
        <li className="flex px-8 hover:bg-bluewhalelight m-2 py-2 rounded ">
          <img src="/images/icons/vaults.png" alt="menu_item" />
          <span className="pl-2">Vaults</span>
        </li>
        <li className="flex px-8 hover:bg-bluewhalelight m-2 py-2 rounded ">
          <img src="/images/icons/settings.png" alt="menu_item" />
          <span className="pl-2">Settings</span>
        </li>
      </ul>
    </div>
  );
}
MenuList.propTypes = {
  active: PropTypes.string,
};

export default MenuList;
