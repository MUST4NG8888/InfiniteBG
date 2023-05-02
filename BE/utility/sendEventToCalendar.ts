import axios, { AxiosResponse } from "axios";


export const sendEventToCalendar = async (key:string, event: object) => {
    const response: AxiosResponse = await axios.post(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${key}`,
      { event },
      { headers: { Authorization: `Bearer ${key}` } }
    );
    return response;
  };