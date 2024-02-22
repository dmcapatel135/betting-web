import { Box, Skeleton } from '@mui/material';
import React from 'react';

function SkeletonLoader() {
  return (
    <div>
      {
        <div className="flex justify-between">
          <Box sx={{ width: 300 }}>
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
          </div>
        </div>
      }
    </div>
  );
}

export default SkeletonLoader;
