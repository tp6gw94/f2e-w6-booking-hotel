import React, { ReactElement, useState } from 'react';
import BookingForm from './BookingForm';
import Dialog from './Dialog';
import { Booking } from '../lib/interface';
import {
  getMonth,
  getYear,
  isBefore,
  add,
  sub,
  format,
  getDay,
  lastDayOfMonth,
  eachDayOfInterval,
  getDate,
} from 'date-fns';
import classNames from 'classnames';
import styles from '../styles/RoomInfo.module.css';

const Calendar: React.FC<{
  bookings: Booking[];
  price: { holiday: number; normalDay: number };
}> = ({ bookings, price }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookingDialogVisiable, setBookingDialogVisiable] = useState(false);

  const renderCalendarDate = (): ReactElement[] => {
    const y = getYear(currentDate);
    const m = getMonth(currentDate);
    const firstDate = new Date(y, m, 1);

    const dateRange = eachDayOfInterval({
      start: firstDate,
      end: lastDayOfMonth(new Date(y, m, 1)),
    });

    return Array.from({ length: getDay(firstDate) }, (_, k) => (
      <div key={k}></div>
    )).concat(
      dateRange.map((d) => (
        <div
          className={classNames('font-light text-sm text-center', {
            'text-gray-300': isBefore(d, new Date()),
            [styles.reserved]: isReserved(d) && !isBefore(d, new Date()),
          })}
          key={format(d, 'yyyymmdd')}
        >
          {getDate(d)}
        </div>
      ))
    );
  };

  const isReserved = (date: Date): boolean => {
    return bookings
      .map(({ date }) => date)
      .includes(format(date, 'yyyy-MM-dd'));
  };

  const onCloseDialog = (): void => {
    setBookingDialogVisiable(false);
  };

  return (
    <div className="ml-8">
      <div className="bg-gray-200 flex justify-around pt-7">
        <button
          className="focus:outline-none"
          onClick={() => setCurrentDate(sub(currentDate, { months: 1 }))}
        >
          <i className="gg-chevron-left" />
        </button>
        <div className="col-span-5 text-center font-middle text-lg tracking-wider">
          {format(currentDate, 'yyyy/MM')}
        </div>
        <button
          className="focus:outline-none"
          onClick={() => setCurrentDate(add(currentDate, { months: 1 }))}
        >
          <i className="gg-chevron-right" />
        </button>
      </div>
      <div className="bg-gray-200 grid grid-cols-7 gap-8 p-7">
        <div className="font-light text-lg text-gray-600">日</div>
        <div className="font-light text-lg text-gray-600">一</div>
        <div className="font-light text-lg text-gray-600">二</div>
        <div className="font-light text-lg text-gray-600">三</div>
        <div className="font-light text-lg text-gray-600">四</div>
        <div className="font-light text-lg text-gray-600">五</div>
        <div className="font-light text-lg text-gray-600">六</div>
        {renderCalendarDate()}
      </div>
      <button
        onClick={() => setBookingDialogVisiable(true)}
        className={styles['booking-btn']}
      >
        預約時段
      </button>
      <Dialog visiable={bookingDialogVisiable} title="預約時段">
        <BookingForm onCloseDialog={onCloseDialog} price={price} />
      </Dialog>
    </div>
  );
};

export default Calendar;
