import React from 'react';

function TalkToUs() {
  return (
    <div className="flex justify-end">
      <div className="bg-gradient-color-1 h-10 flex justify-center items-center rounded-bl-lg rounded-tr-lg ">
        <div className="flex justify-center items-center px-5">
          <img
            src="/images/bikoicon/mail.png"
            alt="mail"
            className="w-5 h-6+ pt-1"
          />
          <span className="text-14 mx-2 ">Talk to us.</span>
        </div>
      </div>
    </div>
  );
}

export default TalkToUs;
