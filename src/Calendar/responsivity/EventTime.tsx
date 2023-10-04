import { Typography, useTheme } from "@mui/material";

interface WeekCellTitleProps {
  text: string;
  orientation: "left" | "right";
}

export const EventTime = ({ text, orientation }: WeekCellTitleProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      sx={{
        color: "#454545",
        marginLeft: orientation === "left" ? "4px" : "0px",
        marginRight: orientation === "right" ? "4px" : "0px",
        [theme.breakpoints.up("xs")]: {
          fontSize: "8px",
        },
        [theme.breakpoints.up("sm")]: {
          fontSize: "12px",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "14px",
        },
      }}
    >
      {text}
    </Typography>
  );
};
