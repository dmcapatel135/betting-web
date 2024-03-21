import { init } from '@actions';
import { MyContext } from '@components/MyContext/MyContext';
// import { getReq } from '@utils/apiHandlers';
import { formatNumber } from '@utils/constants';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function Balance() {
  const { setTab, setSelectTournament } = useContext(MyContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userWallet = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row lg:flex-row  lg:items-center gap-2 justify-between border-b-[1px] border-blue p-3">
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
      <div className="flex justify-between md:flex-col 3xl:flex-row">
        <span className="text-black text-14 pr-2">Your Balance</span>
        <span className="text-black text-14 font-[700]">
          TSH{' '}
          {formatNumber(
            Object.values(userWallet)?.filter((item) => item.type == 'Main')[0]
              ?.amount,
          )}
        </span>
      </div>
    </div>
  );
}

export default Balance;
