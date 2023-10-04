import { IEvent } from "../interfaces/IEvent";

export function handleOnDrag(e: React.DragEvent, event: IEvent) {
  e.dataTransfer.setData("event", JSON.stringify(event));
}
