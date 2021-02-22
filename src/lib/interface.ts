export interface BasicApi {
  success: boolean;
}

export interface RoomItem {
  id: string;
  imageUrl: string;
  normalDayPrice: number;
  holidayPrice: number;
  name: string;
}

export interface RoomsRes extends BasicApi {
  items: RoomItem[];
}

export interface DescriptionShort {
  GuestMin: number;
  GuestMax: number;
  Bed: string[];
  'Private-Bath': number;
  Footage: number;
}

export interface CheckInOut {
  checkInEarly: string;
  checkInLate: string;
  checkOut: string;
}

export interface Amenities {
  'Wi-Fi': boolean;
  Breakfast: boolean;
  'Mini-Bar': boolean;
  'Room-Service': boolean;
  Television: boolean;
  'Air-Conditioner': boolean;
  Refrigerator: boolean;
  Sofa: boolean;
  'Great-View': boolean;
  'Smoke-Free': boolean;
  'Child-Friendly': boolean;
  'Pet-Friendly': boolean;
}

export interface Booking {
  name: string;
  tel: string;
  date: string;
}

export interface Room {
  id: string;
  imageUrl: string[];
  normalDayPrice: number;
  holidayPrice: number;
  descriptionShort: DescriptionShort;
  description: string;
  checkInAndOut: CheckInOut;
  amenities: Amenities;
  name: string;
}

export interface RoomInfo {
  room: [Room];
  booking: Booking[];
}

export interface RoomInfoRes extends BasicApi, RoomInfo {}
