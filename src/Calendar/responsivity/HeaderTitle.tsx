import { Typography, useTheme } from "@mui/material";

interface WeekCellTitleProps {
  text: string;
}

export const HeaderTitle = ({ text }: WeekCellTitleProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      fontWeight={500}
      color={"#454545"}
      sx={{
        [theme.breakpoints.up("xs")]: {
          fontSize: "16px",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "20px",
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "24px",
        },
      }}
    >
      {text}
    </Typography>
  );
};
