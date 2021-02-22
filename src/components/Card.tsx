import React, { ReactElement, useState } from 'react';
import styles from '../styles/Home.module.css';
import { useHistory } from 'react-router-dom';

const roomNameMapping: { [roomName: string]: string } = {
  'Single Room': '單人房',
  'Deluxe Single Room': '豪華單人房',
  'Double Room': '雙人房',
  'Deluxe Double Room': '豪華雙人房',
  'Twin Room': '雙床雙人房',
  'Deluxe Twin Room': '豪華雙床雙人房',
};

const Card: React.FC<{
  imgUrl: string;
  roomName: string;
  normalPrice: number;
  holidayPrice: number;
  id: string;
}> = ({ imgUrl, roomName, normalPrice, holidayPrice, id }) => {
  const history = useHistory();

  const [isShowInfo, setIsShowInfo] = useState(false);

  const renderRoomInfo = (): ReactElement | null => {
    if (!isShowInfo) return null;

    return (
      <>
        <small className="text-gray-400 mt-1">
          {roomNameMapping[roomName]}
        </small>
        <div className="mt-6 flex justify-between items-baseline">
          <span className="font-light text-xl tracking-widest leading-8">
            NT.{normalPrice}
            <span className="text-xs font-light">平日</span>
          </span>
          <span className="text-xs font-light text-gray-400">
            NT.{holidayPrice} 假日
          </span>
        </div>
      </>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsShowInfo(true)}
      onMouseLeave={() => setIsShowInfo(false)}
      onClick={() => history.push(`/room_info/${id}`)}
      className={styles.card}
    >
      <div className={styles['card-img']}>
        <img
          className="w-full h-full object-cover object-center"
          src={imgUrl}
        />
      </div>
      <div className={styles['card-content']}>
        <h3 className="font-light text-sm tracking-wider">{roomName}</h3>
        {renderRoomInfo()}
      </div>
    </div>
  );
};

export default Card;
