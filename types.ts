export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type Response<T> = {
  meta: Meta;
  data: T;
};

export type Meta = {
  status_code: number;
  status: string;
  message: string;
  more_info: unknown;
  errors: string[];
};

export type DateAndZone = {
  date_time: string;
  time_zone: string;
};

export type Reservee = {
  email: string;
  user_id: number;
  visitor_id: number | null;
  participation_status: string;
};

export type Reservation = {
  id: string;
  seat_id: number;
  reserver_id: number;
  type: string;
  title: string | null;
  start: DateAndZone;
  end: DateAndZone;
  created_at: string;
  updated_at: string;
  reservee: Reservee;
};
