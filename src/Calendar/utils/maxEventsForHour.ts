import { IEvent } from "../interfaces/IEvent";
import { convertTimeToNumber } from "./convertTimeToNumber";

export function maxEventsForHour(events: IEvent[], targetHour: number): number {
  const eventsCountPerDay: Record<string, number> = {};

  for (const event of events) {
    const startHour = Math.floor(convertTimeToNumber(new Date(event.start)));

    if (startHour === targetHour) {
      const eventDate = new Date(event.start).toLocaleDateString();

      if (!eventsCountPerDay[eventDate]) {
        eventsCountPerDay[eventDate] = 1;
      } else {
        eventsCountPerDay[eventDate]++;
      }
    }
  }

  const daysWithMaxEvents = Object.keys(eventsCountPerDay).filter(
    (day) =>
      eventsCountPerDay[day] === Math.max(...Object.values(eventsCountPerDay))
  );

  if (daysWithMaxEvents.length === 0) {
    return 1;
  }

  const maxEventsDay = daysWithMaxEvents[0];
  return eventsCountPerDay[maxEventsDay];
}
