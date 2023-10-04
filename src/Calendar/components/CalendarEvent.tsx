import { Box } from "@mui/system";
import { IEvent } from "../interfaces/IEvent";
import { handleOnDrag } from "../utils/handleOnDrag";
import { Grid } from "@mui/material";
import { EventTitle } from "../responsivity/EventTitle";
import { EventTime } from "../responsivity/EventTime";
import { formatTimeFromStringDate } from "../utils/formatTimeFromStringDate";
import { useState } from "react";

interface CalendarEventProps {
  event: IEvent;
  onHover: (isHover: boolean) => void;
  onClick: () => void;
}

export const CalendarEvent = ({
  event,
  onHover,
  onClick,
}: CalendarEventProps) => {
  const [isHovered, setHovered] = useState(false);

  const handleClick = () => {
    onClick();
  };

  const handleMouseEnter = () => {
    onHover(false);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Box
      draggable
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragStart={(e) => handleOnDrag(e, event)}
      onClick={() => handleClick()}
      sx={{
        background: isHovered ? "#5bff58" : "#7ffa7d",
        height: `42px`,
        borderColor: "blue",
        borderRadius: "4px",
        marginTop: "4px",
        width: "96%",
        cursor: "pointer",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <EventTitle text={event.name} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EventTime
            orientation={"left"}
            text={formatTimeFromStringDate(event.start)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <EventTime
            orientation={"right"}
            text={formatTimeFromStringDate(event.end)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
