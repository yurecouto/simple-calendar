import { useState } from "react";
import { IEvent } from "../interfaces/IEvent";
import { maxEventsForHour } from "../utils/maxEventsForHour";
import { Box } from "@mui/system";
import { handleOnDrop } from "../utils/handleOnDrop";
import { handleDragOver } from "../utils/handleDragOver";
import { convertTimeToNumber } from "../utils/convertTimeToNumber";
import { CalendarEvent } from "./CalendarEvent";
import { IsSameDay } from "../utils/isSameDay";

interface CalendarWeekCellProps {
  day: Date;
  hour: number;
  events: IEvent[];
  onClick: (day: Date, hour: number, cellEvents: IEvent[]) => void;
  cellEvents: IEvent[];
  setEventToEdit: (params?: any) => void;
  setIsOpen: (params?: any) => void;
  info: any;
  onClickEvent: (
    event: IEvent,
    day: Date,
    hour: number,
    cellEvents: IEvent[]
  ) => void;
}

export const CalendarWeekCell = ({
  day,
  hour,
  events,
  onClick,
  cellEvents,
  setEventToEdit,
  setIsOpen,
  info,
  onClickEvent,
}: CalendarWeekCellProps) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isHovered ? () => onClick(day, hour, cellEvents) : () => {}}
      sx={{ backgroundColor: isHovered ? "#dddddd" : "" }}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      paddingBottom={"16px"}
      justifyContent={"flex-start"}
      minHeight={56}
      height={`${maxEventsForHour(events, hour) * 56}px`}
      onDrop={(e) =>
        handleOnDrop(e, day, hour, info, setEventToEdit, setIsOpen, cellEvents)
      }
      onDragOver={handleDragOver}
    >
      {events.map((event) => {
        const startHour = Math.floor(
          convertTimeToNumber(new Date(event.start))
        );

        if (
          startHour === hour &&
          IsSameDay(new Date(day), new Date(event.start))
        ) {
          return (
            <CalendarEvent
              key={event.id}
              event={event}
              onHover={handleMouseLeave}
              onClick={() => onClickEvent(event, day, hour, cellEvents)}
            />
          );
        }

        return null;
      })}
    </Box>
  );
};
