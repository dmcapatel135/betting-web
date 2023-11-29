import React, { useState } from 'react';
import SideBar from '../Sidebar/SideBar';
import { Drawer } from '@mui/material';
import SelectField from '../SelectField/SelectField';
import PropTypes from 'prop-types';

function DashboardTemplate({ active, children }) {
  const [open, setOpen] = useState(false);
  const [openOpt, setOpenOpt] = useState(false);
  return (
    <div className="grid grid-cols-12">
      <div className="hidden md:block md:col-span-3  lg:col-span-2">
        <SideBar active={active} />
      </div>
      <div className="col-span-full md:col-span-9 lg:col-span-10 overflow-y-auto h-100vh">
        <div className="h-20">
          <div className="flex text-black justify-between items-center py-2 px-5 bg-white">
            <div className="">
              <h1 className="text-24 lg:text-36 font-extrabold">{active}</h1>
            </div>
            <div className="flex justify-center items-center relative">
              <div className="px-5">
                <SelectField selectClass="bg-bluewhale text-white h-9 p-2 rounded-lg" />
              </div>
              <div
                className="block text-black md:hidden"
                onClick={() => setOpen(true)}
              >
                <p>menu</p>
              </div>
              <div className="hidden md:flex justify-center items-center shadow-lg opacity-9 py-3">
                <div className="px-2">
                  <img src="/images/icons/dummy.png" alt="prof_img" />
                </div>
                <div className="hidden lg:block">
                  <h1 className="text-20 font-bold">Krishnapal Patel</h1>
                  <span className="text-16 text-lightgray">
                    krishnapalpatel@gmail.com
                  </span>
                </div>
                <div className="px-2">
                  <img
                    src="/images/icons/expand_more.png"
                    alt="down_arrow"
                    onClick={() => setOpenOpt(!openOpt)}
                  />
                </div>
                {openOpt && (
                  <div className="bg-white w-64 h-32 rounded-md top-20 z-30 border-[1px] text-black absolute">
                    <div className="p-5">
                      <p>Logout</p>
                    </div>
                  </div>
                )}
              </div>
              <Drawer
                anchor="right"
                PaperProps={{
                  style: {
                    width: '350px',
                    zIndex: 999999,
                  },
                }}
                open={open}
                onClose={() => setOpen(false)}
                className=""
              >
                <SideBar active={active} />
              </Drawer>
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

DashboardTemplate.propTypes = {
  active: PropTypes.string,
  children: PropTypes.any,
};

export default DashboardTemplate;
