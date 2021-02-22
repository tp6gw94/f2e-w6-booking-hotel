import React, { ReactElement, useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  format,
  parse,
  eachDayOfInterval,
  addDays,
  isSunday,
  isSaturday,
  isFriday,
} from 'date-fns';
import { reserveRoom } from '../api';
import { useParams, useHistory } from 'react-router-dom';
import Dialog from './Dialog';

const BookingForm: React.FC<{
  onCloseDialog: () => void;
  price: { normalDay: number; holiday: number };
}> = ({ onCloseDialog, price }) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [reverseDialog, setReverseDialog] = useState<{
    visiable: boolean;
    content: ReactElement | null;
    title: string;
  }>({
    visiable: false,
    content: null,
    title: '',
  });

  const [bookingData, setBookingData] = useState<{
    name: string;
    phone: string;
    date: string[];
  }>({
    name: '',
    phone: '',
    date: [],
  });

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [summaryBooking, setSummaryBooking] = useState({
    normal: 0,
    holiday: 0,
    price: 0,
  });

  const pareToDate = (dateString: string): Date => {
    return parse(dateString, 'yyyy-MM-dd', new Date());
  };

  const formatDateString = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };

  const maxCheckInInputDate = (): string => {
    return checkOutDate ? formatDateString(pareToDate(checkOutDate)) : '';
  };

  const minCheckOutInputDate = (): string => {
    return checkInDate
      ? formatDateString(addDays(pareToDate(checkInDate), 1))
      : formatDateString(addDays(new Date(), 1));
  };

  const isHoliday = (date: Date): boolean => {
    return isSunday(date) || isSaturday(date) || isFriday(date);
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const dates = eachDayOfInterval({
        start: pareToDate(checkInDate),
        end: pareToDate(checkOutDate),
      });
      setBookingData({
        ...bookingData,
        date: dates.map((d) => formatDateString(d)),
      });
      const holidayCount = dates.filter((date) => isHoliday(date)).length;
      const normalDayCount = dates.length - holidayCount;

      setSummaryBooking({
        normal: normalDayCount,
        holiday: holidayCount,
        price: price.holiday * holidayCount + price.normalDay * normalDayCount,
      });
    }
  }, [checkInDate, checkOutDate]);

  const renderReverseMessage = (): ReactElement => {
    return (
      <Dialog visiable={reverseDialog.visiable} title={reverseDialog.title}>
        {reverseDialog.content}
      </Dialog>
    );
  };

  const checkInputName = (): boolean => {
    return !!bookingData.name.length;
  };

  const checkPhone = (): boolean => {
    const regex = new RegExp(/^09\d{8}$/);
    return regex.test(bookingData.phone);
  };

  const checkDate = (): boolean => {
    return !!bookingData.date.length;
  };

  const onBooking = async () => {
    const { name, phone, date } = bookingData;

    const { success, message } = await reserveRoom(id, name, phone, date);

    if (success) {
      setReverseDialog({
        visiable: true,
        content: (
          <div className="px-10 font-medium text-sm mt-6">
            <i className="gg-check-o text-3xl"></i>
            <div className="clear-right">
              <button
                onClick={() => history.push('/')}
                className="bg-gray-700 mt-8 py-2 px-8 float-right mb-9 text-white focus:outline-none"
              >
                回首頁
              </button>
            </div>
          </div>
        ),
        title: '訂房成功',
      });
    } else {
      setReverseDialog({
        visiable: true,
        content: (
          <div className="px-10 font-medium text-sm mt-6">
            <p>{message}</p>
            <div className="clear-right">
              <button
                onClick={() =>
                  setReverseDialog({ ...reverseDialog, visiable: false })
                }
                className="bg-gray-700 mt-8 py-2 px-8 float-right mb-9 text-white focus:outline-none"
              >
                返回
              </button>
            </div>
          </div>
        ),
        title: '訂房失敗',
      });
    }
  };

  return (
    <>
      <form className="flex flex-col px-10 mt-8">
        {/* name */}
        <div className="flex items-center mb-4 justify-between">
          <label className="font-medium text-sm" htmlFor="name">
            姓名
          </label>
          <input
            className={classNames(
              'border rounded p-1 focus:outline-none text-sm',
              {
                'border-gray-400': checkInputName(),
                'border-red-500': !checkInputName(),
              }
            )}
            type="text"
            id="name"
            value={bookingData.name}
            onChange={(e) =>
              setBookingData({ ...bookingData, name: e.target.value })
            }
          />
        </div>
        {/* phone */}
        <div className="flex items-center justify-between mb-4">
          <label className="font-medium text-sm" htmlFor="phone">
            手機
          </label>
          <input
            className={classNames(
              'border rounded p-1 focus:outline-none text-sm',
              {
                'border-gray-400': checkPhone(),
                'border-red-500': !checkPhone(),
              }
            )}
            type="text"
            id="phone"
            value={bookingData.phone}
            onChange={(e) =>
              setBookingData({ ...bookingData, phone: e.target.value })
            }
          />
        </div>
        {/* date picker */}
        <div className="flex items-center justify-between">
          <label
            className="font-medium text-sm mr-auto whitespace-nowrap"
            htmlFor="booking"
          >
            預約起迄
          </label>

          <input
            type="date"
            placeholder="入住日"
            id="booking"
            className={classNames('rounded p-1 text-sm', {
              'border-gray-400': checkDate(),
              'border-red-500': !checkDate(),
            })}
            min={format(new Date(), 'yyyy-MM-dd')}
            onChange={(e) => setCheckInDate(e.target.value)}
            value={checkInDate}
            max={maxCheckInInputDate()}
          />
          <span className="mx-2">~</span>
          <input
            type="date"
            placeholder="退房日"
            className={classNames('rounded p-1 text-sm', {
              'border-gray-400': checkDate(),
              'border-red-500': !checkDate(),
            })}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={minCheckOutInputDate()}
            value={checkOutDate}
          />
        </div>
      </form>
      {/* summary day */}
      <div className="bg-gray-300 mt-8 py-4 px-10 flex-col text-xs font-medium text-gray-600">
        <div className="flex justify-between">
          <span>平日時段</span>
          <span>{summaryBooking.normal}夜</span>
        </div>
        <div className="flex justify-between">
          <span>假日時段</span>
          <span>{summaryBooking.holiday}夜</span>
        </div>
      </div>
      {/* price */}
      <div className="mt-2 w-full px-10">
        <p className="font-medium text-3xl text-red-400 text-right">
          <span className="mr-8">=</span>
          NT.{summaryBooking.price}
        </p>
      </div>
      {/* btns */}
      <div className="mt-7 px-10 mb-8 flex justify-between">
        <button
          onClick={() => onCloseDialog()}
          className="bg-gray-300 text-gray-600 font-medium text-sm tracking-wider py-2 px-8 focus:outline-none"
        >
          取消
        </button>
        <button
          onClick={() => onBooking()}
          className={classNames(
            'bg-gray-600 text-white font-medium text-sm tracking-wider py-2 px-8 focus:outline-none',
            {
              'cursor-not-allowed': !(
                checkDate() &&
                checkInputName() &&
                checkPhone()
              ),
            }
          )}
          disabled={!(checkDate() && checkInputName() && checkPhone())}
        >
          確定預約
        </button>
      </div>
      {renderReverseMessage()}
    </>
  );
};

export default BookingForm;
