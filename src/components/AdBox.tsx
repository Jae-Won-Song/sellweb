'use client';

import { useState } from 'react';

type MessageProps = {
  content: string;
};

const AdBox = ({ content }: MessageProps) => {
  const [isShow, setIsShow] = useState<boolean>(true);
  return (
    <>
      {isShow ? (
        <div className=" h-10 flex justify-between items-center bg-customPink px-3 ">
          <span></span>
          <span className="text-white">{content}</span>
          <span
            onClick={() => {
              setIsShow(isShow ? false : true);
            }}
            className="cursor-pointer"
          >
            X
          </span>
        </div>
      ) : null}
    </>
  );
};

export default AdBox;
