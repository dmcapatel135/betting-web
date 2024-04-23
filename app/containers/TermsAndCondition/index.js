import React from 'react';
import { termsAndCondition } from './constant';

function TermsAndCondition() {
  return (
    <div className="sticky">
      <div>
        {termsAndCondition.map((item, index) => {
          return (
            <li
              key={item.id}
              className="text-black my-3 hover:text-yellow  list-none"
            >
              <h1 className="text-18 font-[700]">
                {index + 1}.
                <a href={`#${item.id}`} className="underline">
                  {item.rule}
                </a>
              </h1>
            </li>
          );
        })}
      </div>

      <div className="mt-5">
        {termsAndCondition.map((item) => {
          return (
            <>
              <div
                id={item.id}
                key={item.id}
                className="text-black my-3 scroll-top-12  lg:scroll-top-10"
              >
                <div className="flex mt-3 mb-5">
                  <h1 className="text-18 font-[700]">{item.rule}</h1>
                </div>
                {item.description.map((_item, innerIndex) => {
                  return (
                    <div key={innerIndex} className="my-1">
                      <h1 className="text-16">{_item.heading}</h1>
                      <p className="text-14">{_item.content}</p>
                    </div>
                  );
                })}
              </div>
              <br></br>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default TermsAndCondition;
