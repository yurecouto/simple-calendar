import { Grid } from "@mui/material";
import { useState } from "react";
import { WeekCellTitle } from "../responsivity/WeekCellTitle";
import { getDayOfMonth } from "../utils/getDayOfMonth";
import { IEvent } from "../interfaces/IEvent";

interface CalendarMonthCellProps {
  index: number;
  monthDays: Date[];
  day: Date;
  onClick: (day: Date, hour: number, cellEvents: IEvent[]) => void;
  hour: number;
}

export const CalendarMonthCell = ({
  index,
  monthDays,
  day,
  onClick,
  hour,
}: CalendarMonthCellProps) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Grid
      item
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      xs={2}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      onClick={() => onClick(day, hour, [])}
      sx={{
        borderBottom: "1px solid #dddddd",
        borderRight: "1px solid #dddddd",
        borderLeft: index === 0 || index % 7 === 0 ? "1px solid #dddddd" : "",
        height: "100px",
        backgroundColor: monthDays.includes(day) ? isHovered  ? "#f7f7f7" : "" : "#f7f7f7",
        cursor: "pointer",
      }}
    >
      <WeekCellTitle text={getDayOfMonth(day).toString()} />
    </Grid>
  );
};
