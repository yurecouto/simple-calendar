import { IEvent } from "./IEvent";

export interface IDragEvent {
  event?: IEvent;
  day: Date;
  hour: number;
  interval: number;
  cellEvents?: IEvent[];
}
