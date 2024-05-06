import { Dialog, DialogContent } from '@mui/material';
import React from 'react';
import { reactIcons } from '../../utils/icons';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FacebookShareButton } from 'react-share';

function ShareBetModal({
  openShareBetModal,
  setOpenShareBetModal,
  code,
  setCode,
}) {
  // const [copyLink, setCopyLink] = useState('');
  // const [copyCode, setCopyCode] = useState('');

  const handleCopyCode = async (type, code) => {
    try {
      await navigator.clipboard.writeText(code);
      // if (type == 'link') {
      //   setCopyLink(true);
      //   setCopyCode(false);
      // } else {
      //   setCopyCode(true);
      //   setCopyLink(false);
      // }
      toast.success('Copied successfully.');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (copyCode) {
  //       setCopyCode(false);
  //     }
  //     if (copyLink) {
  //       setCopyLink(false);
  //     }
  //   }, 2000);
  // }, [copyCode, copyLink]);

  return (
    <Dialog
      open={openShareBetModal}
      // onClose={{}}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[296px] md:w-[450px] rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center h-8 rounded-t-sm bg-blue px-3">
          <span className="flex-1 text-center text-white">SHARE BET</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => {
                setCode('');
                setOpenShareBetModal(false);
              }}
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
              <div className="flex-1">
                <a
                  href={
                    'https://api.whatsapp.com/send?text=Placed this bet on ' +
                    CLIENT_URL +
                    'cheki mkeka wangu na ubeti  ' +
                    CLIENT_URL +
                    '/dashboard/bet-slip/' +
                    code
                  }
                  target="blank"
                >
                  <button className="block text-center flex-1 md:flex bg-[#CDFFC7]  items-center mr-2 font-[700] text-[#29A71A]  py-1 px-2 text-12 rounded-lg">
                    <img
                      src="/images/bikoicon/whatsapp.png"
                      className="w-6 h-6 mr-3"
                    />
                    WhatsApp
                  </button>
                </a>
              </div>
              <div className="flex-1">
                <FacebookShareButton
                  url={CLIENT_URL + '/dashboard/bet-slip/' + code} // The URL you want to share
                  quote={
                    'Placed this bet on' +
                    CLIENT_URL +
                    'cheki mkeka wangu na ubeti  '
                  } // The quote or description for the shared link
                  hashtag={'#Bikosports'} // The hashtag to include in the shared post
                >
                  <button className="bg-[#D7E8FF]  block md:flex items-center mr-2 font-[700] text-[#1877F2]  py-1 px-2 text-12 rounded-lg">
                    <img
                      src="/images/bikoicon/facebookpop.png"
                      className="w-6 h-6 mr-3"
                    />
                    Facebook
                  </button>
                </FacebookShareButton>
              </div>
              <div className="flex-1">
                <a
                  href={
                    'https://twitter.com/intent/post?text=Placed this bet on ' +
                    CLIENT_URL +
                    'cheki mkeka wangu na ubeti  ' +
                    CLIENT_URL +
                    '/dashboard/bet-slip/' +
                    code
                  }
                  target="blank"
                >
                  <button className="bg-[#D4F4FF]  block md:flex items-center font-[700] text-[#03A9F4]  py-1 px-2 text-12 rounded-lg">
                    <img
                      src="/images/bikoicon/twitterpop.png"
                      className="w-6 h-6 mr-3"
                    />
                    Twitter
                  </button>
                </a>
              </div>
            </div>
            <div>
              <div className="my-2">
                <p className="text-black text-14">Copy Link</p>
                <div className="flex">
                  <input
                    type="text"
                    className="h-8 w-full border-[1px] text-12 px-2 border-yellow rounded-md"
                    value={CLIENT_URL + '/dashboard/bet-slip/' + code}
                  />
                  <button
                    onClick={() =>
                      handleCopyCode(
                        'link',
                        CLIENT_URL + '/dashboard/bet-slip/' + code,
                      )
                    }
                    className="py-1 px-3 ml-3 bg-yellow text-white font-[500] text-14 rounded-md"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="my-2">
                <p className="text-black text-14">Copy Code</p>
                <div className="flex">
                  <input
                    type="text"
                    value={code}
                    className="h-8 w-full px-2 text-12 border-[1px] border-yellow rounded-md"
                  />
                  <button
                    onClick={() => handleCopyCode('code', code)}
                    className="py-1 px-3 ml-3 bg-yellow text-white font-[500] text-14 rounded-md"
                  >
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
  setOpenShareBetModal: PropTypes.func,
  code: PropTypes.string,
  setCode: PropTypes.func,
};

export default ShareBetModal;
