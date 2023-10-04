import { Typography, useTheme } from "@mui/material";

interface WeekCellTitleProps {
  text: string;
}

export const EventTitle = ({ text }: WeekCellTitleProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      sx={{
        color: "#454545",
        marginLeft: "4px",
        marginTop: "2px",
        [theme.breakpoints.up("xs")]: {
          fontSize: "12px",
        },
        [theme.breakpoints.up("sm")]: {
          fontSize: "14px",
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "16px",
        },
      }}
    >
      {text}
    </Typography>
  );
};
