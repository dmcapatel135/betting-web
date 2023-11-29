import React, { useState } from 'react';
import ActionButton from '../ActionButton/ActionButton';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '@mui/material';

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-white  md:h-20 flex items-center">
      <div className="grid grid-cols-12 xl:grid-cols-6 md:p-6 relative">
        <div className="col-span-6 md:col-span-2 xl:col-span-1  text-black">
          <div className="py-5 px-3 md:px-0 md:py-0">
            <img src="/images/icons/Crypto CEX.png" alt="logo" className="" />
          </div>
        </div>
        <div className="md:col-span-7 xl:col-span-4  md:block hidden text-black">
          <div className="flex md:text-[16px] xl:[text-40px] justify-evenly py-1 px-10">
            <a href="#">Buy Crypto</a>
            <a href="#">Market</a>
            <a href="#">Trade</a>
            <a href="#">Resources</a>
            <div className="flex">
              <a href="#">More</a>
              <img
                src="/images/icons/down_arrow.png"
                alt="arrow"
                className="mx-2 h-1 mt-2"
              />
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 xl:col-span-1 text-black">
          <div className="md:hidden block p-5 text-end ">
            <img src="" alt="menu" onClick={() => setOpen(!open)} />
          </div>
          <div className="md:flex justify-between hidden">
            <ActionButton
              btnClass="bg-green text-white rounded-lg px-5 py-2"
              btnName="Login"
              onClick={() => navigate('/login')}
            />
            <p
              className="py-2 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register
            </p>
            <div className="py-2">
              <img
                src="/images/icons/search_icon.png"
                alt="search_icon"
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>
        <div className="col-span-full  block w-full top-0 absolute">
          {open && (
            <Drawer
              anchor="right"
              PaperProps={{
                style: {
                  width: '350px',
                  border: '1px solid white',
                  zIndex: 999999,
                },
              }}
              open={open}
              onClose={() => setOpen(false)}
              className=""
            >
              <div className="h-[300px] text-black opacity-80 ">
                <div className="text-end">
                  <img src="" alt="close_icon" onClick={() => setOpen(false)} />
                </div>
                <ul className="pt-4 px-5">
                  <li className="py-1">
                    <a href="#">Buy Crypto</a>
                  </li>
                  <li className="py-1">
                    <a href="#">Markets</a>
                  </li>
                  <li className="py-1">
                    <a href="#">Trade</a>
                  </li>
                  <li className="py-1">
                    <a href="#">Resources</a>
                  </li>
                  <li className="py-1">
                    <a href="#">More</a>
                  </li>
                </ul>
              </div>
            </Drawer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
