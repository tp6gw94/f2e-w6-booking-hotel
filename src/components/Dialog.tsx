import React from 'react';
import styles from '../styles/RoomInfo.module.css';
import classNames from 'classnames';

const Dialog: React.FC<{
  visiable: boolean;
  title: string;
}> = ({ visiable, children, title }) => {
  return (
    <div
      className={classNames(
        'fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center',
        {
          hidden: !visiable,
        }
      )}
    >
      <div className={styles.dialog}>
        <div className="pt-7 px-10">
          <h2 className="font-medium text-2xl tracking-wider">{title}</h2>
          <div className="flex pl-2 mt-3">
            <div className={styles.backslash}></div>
            <div className={styles.backslash}></div>
            <div className={styles.backslash}></div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
