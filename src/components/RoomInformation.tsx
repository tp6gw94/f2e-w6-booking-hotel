import React, { ReactElement } from 'react';
import { Amenities, Room, Booking } from '../lib/interface';
import BookingCalendar from './BookingCalendar';
import styles from '../styles/RoomInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind,
  faUtensils,
  faBaby,
  faMountain,
  faGlassCheers,
  faDog,
  faBell,
  faSmokingBan,
  faCouch,
  faTv,
  faWifi,
  faIcicles,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';

library.add(
  faWind,
  faUtensils,
  faBaby,
  faMountain,
  faGlassCheers,
  faDog,
  faBell,
  faSmokingBan,
  faCouch,
  faTv,
  faWifi,
  faIcicles
);

const RoomInformation: React.FC<{ info: Room; bookings: Booking[] }> = ({
  info,
  bookings,
}) => {
  const amenityMapping = (
    engName: string
  ): { icon: ReactElement; name: string } => {
    const amenities: { [key: string]: { icon: ReactElement; name: string } } = {
      'Air-Conditioner': {
        icon: <FontAwesomeIcon size="lg" icon="wind" />,
        name: '空調',
      },
      Breakfast: {
        icon: <FontAwesomeIcon size="lg" icon="utensils" />,
        name: '早餐',
      },
      'Child-Friendly': {
        icon: <FontAwesomeIcon size="lg" icon="baby" />,
        name: '適合兒童',
      },
      'Great-View': {
        icon: <FontAwesomeIcon size="lg" icon="mountain" />,
        name: '漂亮的視野',
      },
      'Mini-Bar': {
        icon: <FontAwesomeIcon size="lg" icon="glass-cheers" />,
        name: 'Mini Bar',
      },
      'Pet-Friendly': {
        icon: <FontAwesomeIcon size="lg" icon="dog" />,
        name: '寵物攜帶',
      },
      Refrigerator: {
        icon: <FontAwesomeIcon size="lg" icon="icicles" />,
        name: '冰箱',
      },
      'Room-Service': {
        icon: <FontAwesomeIcon size="lg" icon="bell" />,
        name: 'Room Service',
      },
      'Smoke-Free': {
        icon: <FontAwesomeIcon size="lg" icon="smoking-ban" />,
        name: '禁止吸煙',
      },
      Sofa: {
        icon: <FontAwesomeIcon size="lg" icon="couch" />,
        name: '沙發',
      },
      Television: {
        icon: <FontAwesomeIcon size="lg" icon="tv" />,
        name: '電視',
      },
      'Wi-Fi': {
        icon: <FontAwesomeIcon size="lg" icon="wifi" />,
        name: 'Wi-Fi',
      },
    };

    return amenities[engName];
  };

  const renderAmentity = (engName: keyof Amenities): ReactElement => {
    const { icon, name } = amenityMapping(engName);

    return (
      <span
        key={engName}
        className={classNames('flex items-center mb-6', {
          'text-gray-300': info.amenities[engName],
        })}
      >
        <span className="mr-5">{icon}</span>
        <span className="text-xs font-light">{name}</span>
      </span>
    );
  };

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex">
        <div className="flex-col mr-auto">
          {/* room name */}
          <div>
            <h2 className="text-4xl font-medium tracking-wide mr-auto">
              {info.name}
            </h2>
          </div>
          {/* room content */}
          <div className="mt-8 flex">
            <dl className="mr-auto font-light">
              <span className="flex mb-2">
                <dt>房客人數限制：</dt>
                <dd>
                  {info.descriptionShort.GuestMin}~
                  {info.descriptionShort.GuestMax}人
                </dd>
              </span>
              <span className="flex mb-2">
                <dt>床型：</dt>
                <dd> {info.descriptionShort.Bed.join(',')}</dd>
              </span>
              <span className="flex mb-2">
                <dt>衛浴數量：</dt>
                <dd>{info.descriptionShort['Private-Bath']} 間</dd>
              </span>
              <span className="flex">
                <dt>房間大小：</dt>
                <dd>{info.descriptionShort.Footage} 平方公尺</dd>
              </span>
            </dl>
          </div>
          {/* room description */}
          <div className="mt-4 max-w-lg">
            <p className="text-xs font-light leading-5 tracking-wide">
              {info.description}
            </p>
          </div>
          {/* 分隔 */}
          <div className="flex mt-4 mb-7">
            <span className={styles.backslash}></span>
            <span className={styles.backslash}></span>
            <span className={styles.backslash}></span>
          </div>
          {/* check in & out time */}
          <div className="flex justify-between max-w-sm">
            <span className="flex flex-col">
              <p className="font-light text-sm tracking-wide">Check In</p>
              <p className="text-xl tracking-wider font-light">
                {info.checkInAndOut.checkInEarly} －
                {info.checkInAndOut.checkInLate}
              </p>
            </span>
            <span className="flex flex-col">
              <p className="font-light text-sm tracking-wide">Check Out</p>
              <p className="text-xl tracking-wider font-light">
                {info.checkInAndOut.checkOut}
              </p>
            </span>
          </div>
          {/* amenities */}
          <div className="pt-8 mt-10 px-5 grid grid-cols-3 grid-rows-4 bg-gray-200">
            {Object.keys(info.amenities).map((engName) =>
              renderAmentity(engName as keyof Amenities)
            )}
          </div>
        </div>
        {/* room price */}
        <div>
          <p className="text-3xl font-light leading-7 tracking-wide text-right">
            NT.{info.normalDayPrice}
          </p>
          <p className="text-base font-light text-gray-400 text-right">
            平日(一~四)
          </p>
          <p className="text-base font-light leading-7 tracking-wide text-right mt-3">
            NT.{info.holidayPrice}
          </p>
          <p className="text-sm font-light text-gray-400 text-right">
            假日(五~日)
          </p>
        </div>
      </div>
      <BookingCalendar
        price={{ holiday: info.holidayPrice, normalDay: info.normalDayPrice }}
        bookings={bookings}
      />
    </div>
  );
};

export default RoomInformation;
