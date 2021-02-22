import axios, { AxiosError } from 'axios';
import { RoomsRes, RoomInfoRes } from '../lib/interface';

export const req = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    Authorization: process.env.REACT_APP_API_TOKEN,
    Accept: 'application/json',
  },
});

export const getRooms = async (): Promise<RoomsRes> => {
  const res = await req.get<RoomsRes>('/rooms');
  return res.data;
};

export const getRoomInfo = async (id: string): Promise<RoomInfoRes> => {
  const res = await req.get<RoomInfoRes>(`/room/${id}`);
  return res.data;
};

export const reserveRoom = async (
  id: string,
  name: string,
  tel: string,
  date: string[]
) => {
  try {
    await req.post<RoomInfoRes | { message: string }>(`/room/${id}`, {
      name,
      tel,
      date,
    });
    return { success: true, message: 'success' };
  } catch (e) {
    const err = e as AxiosError;
    return { success: false, message: err.response?.data.message as string };
  }
};
