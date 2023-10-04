import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";

import { formatMonthAndYear } from "../utils/formatMonthAndYear";
import { HeaderTitle } from "../responsivity/HeaderTitle";

const Header = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  height: "auto",
  width: "100%",
  border: "1px solid #dddddd",
});

const HeadTitle = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  minHeight: "36px",
  paddingLeft: "24px",
  paddingTop: "4px",
});

const HeadLine = styled("div")({
  width: "100%",
  borderBottom: "1px solid #dddddd",
});

const HeaderIcons = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const HeaderLeft = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
});

const HeaderRight = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
});

interface CalendarHeaderProps {
  handlePrevious: (params: any) => void;
  handleNext: (params: any) => void;
  handleChangeView: (params: any) => void;
  today: number;
}

const CalendarHeader = ({
  handlePrevious,
  handleNext,
  handleChangeView,
  today,
}: CalendarHeaderProps) => {
  const theme = useTheme();

  const iconStyle = {
    color: "#454545",
    margin: 0,
    [theme.breakpoints.up("xs")]: {
      height: "24px",
      width: "48px",
    },
    [theme.breakpoints.up("md")]: {
      height: "32px",
      width: "56px",
    },
  };

  return (
    <Header>
      <HeadTitle>
        <HeaderTitle text={formatMonthAndYear(today)} />
      </HeadTitle>

      <HeadLine/>

      <HeaderIcons>
        <HeaderLeft>
          <Button onClick={handlePrevious} variant="text">
            <ChevronLeftIcon sx={iconStyle} />
          </Button>

          <Button onClick={handleNext} variant="text">
            <ChevronRightIcon sx={iconStyle} />
          </Button>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={() => handleChangeView("day")} variant="text">
            <CalendarViewDayIcon sx={iconStyle} />
          </Button>

          <Button onClick={() => handleChangeView("week")} variant="text">
            <CalendarViewWeekIcon sx={iconStyle} />
          </Button>

          <Button onClick={() => handleChangeView("month")} variant="text">
            <CalendarViewMonthIcon sx={iconStyle} />
          </Button>
        </HeaderRight>
      </HeaderIcons>
    </Header>
  );
};

export default CalendarHeader;
