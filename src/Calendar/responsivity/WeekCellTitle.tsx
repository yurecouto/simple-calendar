import { Typography, useTheme } from "@mui/material";

interface WeekCellTitleProps {
  text: string;
}

export const WeekCellTitle = ({ text }: WeekCellTitleProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      sx={{
        color: "#454545",
        [theme.breakpoints.up("xs")]: {
          fontSize: "10px",
        },
        [theme.breakpoints.up("sm")]: {
          fontSize: "14px",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "18px",
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "20px",
        },
      }}
    >
      {text}
    </Typography>
  );
};
