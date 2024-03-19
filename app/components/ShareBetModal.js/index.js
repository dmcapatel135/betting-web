import { Dialog, DialogContent } from '@mui/material';
import React from 'react';
import { reactIcons } from '../../utils/icons';
import PropTypes from 'prop-types';

function ShareBetModal({ openShareBetModal, setOpenShareBetModal }) {
  return (
    <Dialog
      open={openShareBetModal}
      // onClose={{}}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[450px] rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center h-8 rounded-t-sm bg-blue px-3">
          <span className="flex-1 text-center text-white">SHARE BET</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => setOpenShareBetModal(false)}
            >
              {reactIcons.close}
            </span>
          </div>
        </div>
        {/* </DialogTitle> */}
        <DialogContent>
          <div>
            <p className="text-12 text-black text-[900]">
              SHARE THE LOVE, TELL YOUR FRIEND TO BET ON THIS BET
            </p>
            <div className="flex">
              <button className="bg-[#CDFFC7] flex items-center mr-2 font-[700] text-[#29A71A]  py-1 px-2 text-12 rounded-lg">
                <img
                  src="/images/bikoicon/whatsapp.png"
                  className="w-6 h-6 mr-3"
                />
                WhatsApp
              </button>
              <button className="bg-[#D7E8FF] flex items-center mr-2 font-[700] text-[#1877F2]  py-1 px-2 text-12 rounded-lg">
                <img
                  src="/images/bikoicon/facebookpop.png"
                  className="w-6 h-6 mr-3"
                />
                Facebook
              </button>
              <button className="bg-[#D4F4FF] flex items-center font-[700] text-[#03A9F4]  py-1 px-2 text-12 rounded-lg">
                <img
                  src="/images/bikoicon/twitterpop.png"
                  className="w-6 h-6 mr-3"
                />
                WhatsApp
              </button>
            </div>
            <div>
              <div className="my-2">
                <p className="text-black text-14">Copy Link</p>
                <div className="flex">
                  <input
                    type="text"
                    className="h-8 w-full border-[1px] border-yellow rounded-md"
                  />
                  <button className="py-1 px-3 ml-3 bg-yellow text-white font-[500] text-14 rounded-md">
                    Copy
                  </button>
                </div>
              </div>
              <div className="my-2">
                <p className="text-black text-14">Copy Code</p>
                <div className="flex">
                  <input
                    type="text"
                    className="h-8 w-full border-[1px] border-yellow rounded-md"
                  />
                  <button className="py-1 px-3 ml-3 bg-yellow text-white font-[500] text-14 rounded-md">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
ShareBetModal.propTypes = {
  openShareBetModal: PropTypes.bool,
  setOpenShareBetModal: PropTypes.bool,
};

export default ShareBetModal;
