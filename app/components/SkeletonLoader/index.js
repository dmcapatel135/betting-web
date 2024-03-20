import { Skeleton } from '@mui/material';
import React from 'react';

function SkeletonLoader() {
  return (
    <>
      {/* <Box sx={{ width: 300 }}>
        <Skeleton width={260} />
        <Skeleton animation="wave" width={240} />
        <Skeleton animation={false} width={280} />
        <Skeleton animation="wave" />
      </Box>
      <div className="flex justify-between px-5 flex-1">
        <Skeleton
          variant="rectangular"
          width={100}
          marginRight="10"
          height={80}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={80}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={80}
          animation="wave"
        />
      </div> */}
      <div className="border rounded-[8px] border-[#A3A3A3] text-black">
        <div className="flex items-center w-full md:pr-2">
          <div className="flex-grow-0 xxl:flex-1 pl-2 py-2">
            <div className=" w-36 md:w-52 xxl:w-full">
              <div className="">
                <Skeleton width="100%" animation="wave" />
              </div>
              <h2 className="">
                <Skeleton width="100%" animation="wave" />
              </h2>
              <h2 className="">
                <Skeleton width="100%" animation="wave" />
              </h2>
              <span className="">
                <Skeleton width="100%" animation="wave" />
              </span>
            </div>
          </div>
          <div className="flex-1 border-black">
            <div className="flex justify-end gap-4 pr-3 xl2:pr-5 2xl:pr-6">
              <div className="flex justify-end md:justify-center gap-2 w-full max-w-[156px] ">
                <Skeleton
                  height={36}
                  className="border-[1px]  rounded-[4px] md:rounded-[4px]  w-[40px] !h-6 md:!h-8  md:w-[45px] 2xl:w-[48px] 2xl:!h-[36px] "
                  width="100%"
                  animation="wave"
                />
                <Skeleton
                  className="border-[1px]  rounded-[4px] md:rounded-[4px]  w-[40px] !h-6 md:!h-8  md:w-[45px] 2xl:w-[48px] 2xl:!h-[36px] "
                  width="100%"
                  animation="wave"
                />
                <Skeleton
                  className="border-[1px]  rounded-[4px] md:rounded-[4px]  w-[40px] !h-6 md:!h-8  md:w-[45px] 2xl:w-[48px] 2xl:!h-[36px] "
                  width="100%"
                  animation="wave"
                />
              </div>
              <div className="hidden xl:block ">
                <div className="flex mx-auto justify-center gap-2 max-w-[110px] 2xl:min-w-[110px]">
                  <Skeleton
                    className="border-[1px]  rounded-[4px] md:rounded-[4px]  w-[40px] !h-6 md:!h-8  md:w-[45px] 2xl:w-[48px] 2xl:!h-[36px] "
                    width="100%"
                    animation="wave"
                  />

                  <Skeleton
                    className="border-[1px]  rounded-[4px] md:rounded-[4px]  w-[40px] !h-6 md:!h-8  md:w-[45px] 2xl:w-[48px] 2xl:!h-[36px] "
                    width="100%"
                    animation="wave"
                  />
                </div>
              </div>
              <div className="hidden xl:block  ">
                <div className="flex 2xl:px-2 justify-center gap-2 w-full min-w-[110px] 2xl:max-w-[110px]">
                  <Skeleton
                    className="border-[1px]  rounded-[4px] md:rounded-[4px]  w-[40px] !h-6 md:!h-8  md:w-[45px] 2xl:w-[48px] 2xl:!h-[36px] "
                    width="100%"
                    animation="wave"
                  />

                  <Skeleton
                    className="border-[1px]  rounded-[4px] md:rounded-[4px]  w-[40px] !h-6 md:!h-8  md:w-[45px] 2xl:w-[48px] 2xl:!h-[36px] "
                    width="100%"
                    animation="wave"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow-0">
            <div className=" border-solid md:w-16 2xl:w-[72px] ">
              <Skeleton
                className="border mr-2 w-[40px] h-6 md:h-8 md:min-w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:max-w-fit rounded-[4px]"
                width="100%"
                animation="wave"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonLoader;
