import React, { useEffect, useState } from 'react';
import { getRooms } from '../api';
import { RoomItem } from '../lib/interfaceses';
import Hero from '../components/Hero';
import Card from '../components/Card';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<RoomItem[]>([]);

  useEffect(() => {
    getRooms().then((_rooms) => setRooms(_rooms.items));
  }, []);

  return (
    <div>
      <section>
        <Hero roomImgs={rooms.map(({ imageUrl }) => imageUrl)} />
      </section>
      <section className={styles.rooms}>
        {rooms.map((room) => (
          <Card
            key={room.id}
            imgUrl={room.imageUrl}
            roomName={room.name}
            normalPrice={room.normalDayPrice}
            holidayPrice={room.holidayPrice}
            id={room.id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
