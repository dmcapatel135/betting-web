import { MyContext } from '@components/MyContext/MyContext';
// import { getReq } from '@utils/apiHandlers';
import { formatNumber } from '@utils/constants';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function Balance() {
  const { setTab, setSelectTournament, wallet } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between border-b-[1px] border-blue items-center px-3">
      <div
        onClick={() => {
          setSelectTournament(null);
          setTab(null);
          navigate('/dashboard/my-bets');
        }}
        className="px-3 h-8 flex justify-center items-center rounded-[8px] bg-yellow"
      >
        {/* <Link to="/dashboard/my-bets"> */}
        <p className="text-12 text-white font-[600] cursor-pointer">
          View My Bets
        </p>
        {/* </Link> */}
      </div>
      <div className="flex my-2">
        <span className="text-black text-14">Your Balance</span>
        <span className="text-black text-14 font-[700]">
          TSH {formatNumber(wallet?.amount)}
        </span>
      </div>
    </div>
  );
}

export default Balance;
