import { reactIcons } from '@utils/icons';
import React from 'react';

function JackpotPickMatchCard() {
  return (
    <div className=" rounded-md p-2 text-black my-2">
      <div className="flex">
        <div>
          <span className="text-black text-16 font-[700]">
            {reactIcons.arrowleft}
          </span>
        </div>
        <div className="flex-1 flex justify-center">
          <strong>ID: #157230221</strong>
          <span>30/03 PICK17 - 1X2</span>
        </div>
      </div>
      <div className="border border-t-blue border-b-blue bg-lightestgray p-2">
        <div className="flex justify-between">
          <p>Total tickets:</p>
          <strong>1</strong>
        </div>
        <div className="flex justify-between">
          <p>Total price:</p>
          <span>
            Tsh <strong>100</strong>
          </span>
        </div>
        <div className="flex justify-between">
          <p>Closing time:</p>
          <p>4:00 PM Sat 30/03</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p>Payout:</p>
            <span className="text-12">*Winings are subject to 15% tax</span>
          </div>
          <span>
            Tsh
            <strong>200,000,000</strong>
          </span>
        </div>
      </div>
      <div className="border-b-blue border p-2">
        <div className="flex justify-between">
          <p>4:00 pm Sat 30/03</p>
          <strong>Pick: X</strong>
        </div>
        <div>
          <span>Getafe CF - Sevilla Fc</span>
          <p>Laliga</p>
        </div>
      </div>
    </div>
  );
}

export default JackpotPickMatchCard;
