import React, { useRef, useMemo } from 'react';
import styles from '../styles/Home.module.css';

const Hero: React.FC<{ roomImgs: string[] }> = React.memo(({ roomImgs }) => {
  const roomImgRef = useRef<HTMLImageElement>(null);

  useMemo(() => {
    if (roomImgRef.current && roomImgs.length) {
      let currentRoomImgIndex = 0;
      const imgElement = roomImgRef.current;
      imgElement.setAttribute('src', roomImgs[currentRoomImgIndex]);
      imgElement.classList.remove('hidden');

      window.setInterval(() => {
        currentRoomImgIndex =
          currentRoomImgIndex === roomImgs.length - 1
            ? 0
            : (currentRoomImgIndex += 1);

        imgElement.setAttribute('src', roomImgs[currentRoomImgIndex]);
      }, 10000);
    }
  }, [roomImgs]);

  return (
    <div className={styles.hero}>
      <img
        className="w-full h-full object-cover object-bottom transition absolute top-0 left-0 hidden"
        ref={roomImgRef}
        alt="room img"
      />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className={styles.logo}>
          <h1 className="text-white leading-10 tracking-wider block text-3xl">
            White
            <br />
            Space
          </h1>
        </div>
        <div className="flex flex-row items-center mt-12 text-white">
          <div className="flex pr-9">
            <i className="gg-instagram"></i>
            <i className="gg-facebook ml-3"></i>
          </div>
          <div className="flex flex-col pl-7 border-l border-white">
            <div className="flex items-center pb-3">
              <i className="gg-phone inline-block mr-5"></i>
              <span>02-17264937</span>
            </div>
            <div className="flex items-center pb-3">
              <i className="gg-mail inline-block mr-5"></i>
              <span>whitespace@whitespace.com.tw</span>
            </div>
            <div className="flex items-center">
              <i className="gg-home-alt inline-block mr-5"></i>
              <span>台北市羅斯福路十段30號</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Hero;
