import { IEvent } from "../interfaces/IEvent";

export function handleOnDrop(
  e: React.DragEvent,
  day: Date,
  hour: number,
  info: any,
  setEventToEdit: (params: any) => void,
  setIsOpen: (params: any) => void,
  cellEvents: IEvent[]
) {
  const event = JSON.parse(e.dataTransfer.getData("event" as string));

  setEventToEdit({ event, day, hour, interval: info.interval, cellEvents });
  setIsOpen(true);
}
