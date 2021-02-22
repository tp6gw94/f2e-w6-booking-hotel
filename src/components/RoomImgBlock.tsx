import React from 'react';
import styles from '../styles/RoomInfo.module.css';
import { useHistory } from 'react-router-dom';

const RoomImgBlock: React.FC<{ imgUrls: string[] }> = ({ imgUrls }) => {
  const history = useHistory();

  return (
    <div className={styles['img-block']}>
      <img
        src={imgUrls[0]}
        className="col-span-3 row-span-3 w-full h-full object-cover object-center"
      />
      <img
        src={imgUrls[1]}
        className="col-span-2 row-span-1 w-full h-full object-cover object-center"
      />
      <img
        src={imgUrls[2]}
        className="col-span-2 row-span-1 w-full h-full object-cover object-center"
      />
      <div onClick={() => history.push('/')} className={styles.logo}>
        <span className="font-medium text-lg leading-10 tracking-widest text-center">
          WhiteSpace
        </span>
      </div>
    </div>
  );
};

export default RoomImgBlock;
