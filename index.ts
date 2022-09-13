import { addHours, format, formatISO, startOfDay } from "date-fns";
import fetch from "node-fetch";
import { DateAndZone, DeepPartial, Reservation, Response } from "./types.js";
import env from "./env.js";

const token = env.TOKEN;
const org = 967478;
const userId = 1978685;
const locationLondon = 23224;
const space1 = 125171;
const space2 = 125170;
const bestDesks9196 = 175394; // 6 desks
const bestDesks9799 = 175393; // 2 other desks

const desk93 = 813890;
const desk94 = 813889;
const desk98 = 813894;
const desk99 = 813893;

const dateStart = "2022-09-18T00:00:00Z";
const dateEnd = "2022-09-19T00:00:00Z";

async function main() {
  getData("/me");
  // getData('/me/events?after=2022-09-01T00:00:00Z&page=1&per_page=100');
  // getData('/reservations/seats?after=2022-09-01T00:00:00Z&page=1&per_page=100&user_ids=1978685');

  const last = await getLastReservation();
  console.log("Last", last);
  //const zones = await getData("/spaces");

  await bookDesk(desk94, userId, new Date("2022-09-24"));
}

main();

async function getData<T>(endpoint: string): Promise<T> {
  const response = await fetch("https://api.robinpowered.com/v1.0" + endpoint, {
    headers: [["Authorization", `Access-Token ${token}`]],
  });
  if (response.ok) {
    console.log(" => all good");
    const result = (await response.json()) as Response<T>;
    return result.data;
  } else {
    console.log("Error");
    const result = await response.text();
    console.log(result);
    throw Error("Not working " + result);
  }
}

async function postData<T, P>(endpoint: string, payload: P): Promise<T> {
  const response = await fetch("https://api.robinpowered.com/v1.0" + endpoint, {
    method: "POST",
    body: JSON.stringify(payload, null, 2),
    headers: [
      ["Authorization", `Access-Token ${token}`],
      ["Content-Type", "application/json"],
    ],
  });
  if (response.ok) {
    const result = (await response.json()) as Response<T>;
    return result.data;
  } else {
    console.log("Error");
    const result = await response.text();
    console.log(result);
    throw Error("Not working " + result);
  }
}

async function getLastReservation(): Promise<Reservation> {
  const data = await getData<Reservation[]>(
    "/reservations/seats?after=2022-09-01T00:00:00Z&page=1&per_page=100&user_ids=1978685"
  );
  // console.log('Data:', data.data)
  const last = data[data.length - 1];
  return last;
}

async function getFreeDesks() {}

async function bookDesk(deskId: number, userId: number, date: Date) {
  const reservation: DeepPartial<Reservation> = {
    start: toDate(date, 7),
    end: toDate(date, 19),
    reservee: {
      user_id: userId,
    },
    type: "hoteled",
  };
  console.log("Res: ", reservation);
  const response = await postData<Reservation, DeepPartial<Reservation>>(
    `/seats/${deskId}/reservations`,
    reservation
  );
  console.log("Response:", response);
}

function toDate(date: Date, hour: number): DateAndZone {
  const time = formatISO(addHours(startOfDay(date), hour));
  return {
    date_time: time,
    time_zone: "Europe/London",
  };
}
