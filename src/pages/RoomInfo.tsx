import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomInfo } from '../api';
import RoomImgBlock from '../components/RoomImgBlock';
import RoomInformation from '../components/RoomInformation';
import { RoomInfo } from '../lib/interfaceses';

const RoomInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);

  useEffect(() => {
    getRoomInfo(id).then((_roomInfo) => {
      setRoomInfo(_roomInfo);
    });
  }, [id]);

  if (!roomInfo) return null;

  return (
    <div>
      <section>
        <RoomImgBlock imgUrls={roomInfo.room[0].imageUrl} />
      </section>
      <section className="mt-12 px-16 pb-16 container mx-auto">
        <RoomInformation info={roomInfo.room[0]} bookings={roomInfo.booking} />
      </section>
    </div>
  );
};

export default RoomInfoPage;
