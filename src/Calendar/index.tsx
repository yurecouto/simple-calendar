import { Container, SubContainer } from "./styles";
import { Grid } from "@mui/material";

import {
  getDaysInMonth,
  startOfMonth,
  addDays,
  subMonths,
  addMonths,
} from "date-fns";
import { useEffect, useState } from "react";
import CalendarModal from "./components/CalendarModal";
import { IDragEvent } from "./interfaces/IDragEvent";
import { IEvent } from "./interfaces/IEvent";
import { CalendarWeekCell } from "./components/CalendarWeekCell";
import { maxEventsForHour } from "./utils/maxEventsForHour";
import { convertTimeToNumber } from "./utils/convertTimeToNumber";
import CalendarHeader from "./components/CalendarHeader";
import { weekDays } from "./constants/weekDays";
import { dayHours } from "./constants/dayHours";
import { WeekCellTitle } from "./responsivity/WeekCellTitle";
import { getDayOfMonth } from "./utils/getDayOfMonth";
import { IsSameDay } from "./utils/isSameDay";
import { CalendarMonthCell } from "./components/CalendarMonthCell";

interface CalendarProps {
  eventArray: IEvent[];
  createEvent?: (event: IEvent) => void;
  updateEvent?: (event: IEvent, id: string) => void;
  deleteEvent?: (id: string) => void;
}

export default function Calendar({ eventArray }: CalendarProps) {
  const info = {
    interval: 15,
  };

  const [today, setToday] = useState<number>(Date.now());
  const [monthDays, setMonthDays] = useState<Date[]>([]);
  const [prevMonthDays, setPrevMonthDays] = useState<Date[]>([]);
  const [nextMonthDays, setNextMonthDays] = useState<Date[]>([]);
  const [formatedMonth, setFormatedMonth] = useState<Date[]>([]);
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [currentDay, setCurrentDay] = useState<Date | undefined>(undefined);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState<IDragEvent>();
  const [events, setEvents] = useState<IEvent[]>(eventArray);

  function handleCreateEvent(day: Date, hour: number, cellEvents: IEvent[]) {
    setEventToEdit({
      event: undefined,
      day,
      hour,
      interval: info.interval,
      cellEvents,
    });
    setIsOpen(true);
  }

  function handleUpdateEvent(
    event: IEvent,
    day: Date,
    hour: number,
    cellEvents: IEvent[]
  ) {
    setEventToEdit({
      event,
      day,
      hour,
      interval: info.interval,
      cellEvents,
    });
    setIsOpen(true);
  }

  function getAllDaysOfMonth(timestamp: number) {
    const date = new Date(timestamp);
    const firstDayOfMonth = startOfMonth(date);
    const numDaysInMonth = getDaysInMonth(date);
    const daysOfMonth: Date[] = [];

    for (let day = 0; day < numDaysInMonth; day++) {
      const currentDate = addDays(firstDayOfMonth, day);
      daysOfMonth.push(currentDate);
    }

    return daysOfMonth;
  }

  function getDaysForPreviousAndNextMonth(date: Date) {
    const previousMonth = subMonths(date, 1);
    const nextMonth = addMonths(date, 1);

    const daysInPreviousMonth = getDaysInMonth(previousMonth);
    const daysInNextMonth = getDaysInMonth(nextMonth);

    const daysOfPreviousMonth: Date[] = [];
    const daysOfNextMonth: Date[] = [];

    const firstDayOfPreviousMonth = startOfMonth(previousMonth);
    for (let day = 0; day < daysInPreviousMonth; day++) {
      const currentDate = addDays(firstDayOfPreviousMonth, day);
      daysOfPreviousMonth.push(currentDate);
    }

    const firstDayOfNextMonth = startOfMonth(nextMonth);
    for (let day = 0; day < daysInNextMonth; day++) {
      const currentDate = addDays(firstDayOfNextMonth, day);
      daysOfNextMonth.push(currentDate);
    }

    return { previousMonth: daysOfPreviousMonth, nextMonth: daysOfNextMonth };
  }

  function getDayOfWeekIndex(date: Date): number {
    return date.getDay();
  }

  function handleNext() {
    if (view === "month") {
      const currentDate = new Date(today);
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      );
      setToday(newDate.getTime());
    }

    if (view === "week") {
      const nextWeekDay = new Date(today);
      nextWeekDay.setDate(nextWeekDay.getDate() + 7);
      setToday(nextWeekDay.getTime());
    }

    if (view === "day") {
      const currentDate = new Date(today);

      const tomorrow = new Date().setDate(currentDate.getDate() + 1);
      setToday(tomorrow);
    }
  }

  function handlePrevious() {
    if (view === "month") {
      const currentDate = new Date(today);
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      );
      setToday(newDate.getTime());
    }

    if (view === "week") {
      const nextWeekDay = new Date(today);
      nextWeekDay.setDate(nextWeekDay.getDate() - 7);
      setToday(nextWeekDay.getTime());
    }

    if (view === "day") {
      const currentDate = new Date(today);
      const yesterday = new Date(currentDate).setDate(
        currentDate.getDate() - 1
      );
      setToday(yesterday);
    }
  }

  function handleChangeView(v: "month" | "week" | "day") {
    setView(v);
  }

  function getDaysOfWeek(timestamp: number): Date[] {
    const date = new Date(timestamp);
    const daysOfWeek = [];
    const currentDay = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0); // Define a hora para zero

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      currentDate.setHours(0, 0, 0, 0); // Define a hora para zero
      daysOfWeek.push(currentDate);
    }

    return daysOfWeek;
  }

  useEffect(() => {
    const { previousMonth, nextMonth } = getDaysForPreviousAndNextMonth(
      new Date(today)
    );

    setMonthDays(getAllDaysOfMonth(today));
    setCurrentWeek(getDaysOfWeek(today));
    setCurrentDay(new Date(today));

    setPrevMonthDays(previousMonth);
    setNextMonthDays(nextMonth);
  }, [today]);

  useEffect(() => {
    if (monthDays.length !== 0) {
      const mirrorMonthDays: Date[] = [];

      const firstDay = getDayOfWeekIndex(monthDays[0]);
      const lastDay = getDayOfWeekIndex(monthDays[monthDays.length - 1]);

      const prevWeek: Date[] = prevMonthDays.slice(-7);
      const nextWeek: Date[] = nextMonthDays.slice(0, 7);

      if (firstDay !== 0) {
        for (let i = 0; i < prevWeek.length; i++) {
          const day = prevWeek[i];

          if (getDayOfWeekIndex(day) < firstDay) {
            mirrorMonthDays.push(day);
          }
        }
      }

      monthDays.map((d) => {
        mirrorMonthDays.push(d);
      });

      if (lastDay !== 6) {
        for (let i = 0; i < nextWeek.length; i++) {
          const day = nextWeek[i];

          if (getDayOfWeekIndex(day) > lastDay) {
            mirrorMonthDays.push(day);
          }
        }
      }

      setFormatedMonth(mirrorMonthDays);
    }
  }, [monthDays]);

  useEffect(() => {
    if (currentDay === undefined) {
      setCurrentDay(new Date(today));
    } else {
      setCurrentDay(undefined);
    }
  }, [view]);

  return (
    <Container>
      <SubContainer>
        <CalendarHeader
          handleChangeView={handleChangeView}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          today={today}
        ></CalendarHeader>

        <Grid container spacing={0} columns={view !== "week" ? 14 : 15}>
          {view === "week" && (
            <Grid
              item
              xs={1}
              display={"flex"}
              justifyContent={"center"}
              sx={{
                borderLeft: "1px solid #dddddd",
              }}
            ></Grid>
          )}

          {(view === "week" || view === "month") &&
            weekDays.map((day: string, index: number) => (
              <Grid
                key={day}
                item
                xs={2}
                display={"flex"}
                justifyContent={"center"}
                sx={{
                  borderRight: "1px solid #dddddd",
                  borderLeft: index === 0 ? "1px solid #dddddd" : "",
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <WeekCellTitle text={day} />
              </Grid>
            ))}

          <Grid
            container
            columns={14}
            style={{ width: "100%", maxHeight: 600, overflow: "auto" }}
          >
            {view === "month" &&
              formatedMonth.map((day: Date, index: number) => (
                <CalendarMonthCell
                  key={index}
                  day={day}
                  index={index}
                  monthDays={monthDays}
                  hour={8}
                  onClick={handleCreateEvent}
                />
              ))}
          </Grid>

          {view === "week" && (
            <Grid
              container
              columns={15}
              style={{ width: "100%", maxHeight: 620, overflow: "auto" }}
            >
              <Grid
                item
                xs={1}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                flexDirection={"column"}
                sx={{
                  borderLeft: "1px solid #dddddd",
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <Grid item xs={1} />

                <Grid container spacing={0} columns={1}>
                  {dayHours.map((h: number, index: number) => {
                    return (
                      <Grid
                        item
                        key={index}
                        xs={1}
                        sx={{
                          borderTop: "1px solid #dddddd",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: `${maxEventsForHour(events, h) * 72}px`,
                        }}
                      >
                        <WeekCellTitle text={h.toString()} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>

              {currentWeek.map((day: Date, index: number) => (
                <Grid
                  key={index}
                  item
                  xs={2}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  sx={{
                    borderBottom: "1px solid #dddddd",
                    borderRight: "1px solid #dddddd",
                    borderLeft:
                      index === 0 || index % 7 === 0 ? "1px solid #dddddd" : "",
                    minHeight: "600px",
                    backgroundColor: monthDays.includes(day) ? "#e0fcff" : "",
                  }}
                >
                  <WeekCellTitle text={getDayOfMonth(day).toString()} />

                  <Grid container spacing={0} columns={1}>
                    {dayHours.map((hour: number, index: number) => (
                      <Grid
                        item
                        key={index}
                        xs={1}
                        sx={{
                          borderTop: "1px solid #dddddd",
                          height: `${maxEventsForHour(events, hour) * 72}px`,
                        }}
                      >
                        <CalendarWeekCell
                          setEventToEdit={setEventToEdit}
                          setIsOpen={setIsOpen}
                          onClick={handleCreateEvent}
                          onClickEvent={handleUpdateEvent}
                          day={day}
                          events={events}
                          hour={hour}
                          key={hour}
                          info={info}
                          cellEvents={
                            (events.filter((event) => {
                              const startHour = Math.floor(
                                convertTimeToNumber(new Date(event.start))
                              );

                              if (
                                startHour === hour &&
                                IsSameDay(new Date(day), new Date(event.start))
                              ) {
                                return event;
                              }
                            }) as IEvent[]) || []
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}

          {view === "day" && (
            <Grid
              container
              columns={14}
              style={{ width: "100%", maxHeight: 645, overflow: "auto" }}
            >
              <Grid
                item
                xs={1}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                flexDirection={"column"}
                sx={{
                  borderLeft: "1px solid #dddddd",
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <Grid container spacing={0} columns={1}>
                  {dayHours.map((h: number, index: number) => {
                    return (
                      <Grid
                        item
                        key={index}
                        xs={1}
                        sx={{
                          borderTop: index !== 0 ? "1px solid #dddddd" : "",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minHeight: "42px",
                          height: `${maxEventsForHour(events, h) * 72}px`,
                        }}
                      >
                        <WeekCellTitle text={h.toString()} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>

              <Grid
                item
                xs={13}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                flexDirection={"column"}
                sx={{
                  borderLeft: "1px solid #dddddd",
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <Grid container spacing={0} columns={1}>
                  {dayHours.map((h: number, index: number) => {
                    return (
                      <Grid
                        item
                        key={index}
                        xs={1}
                        sx={{
                          borderTop: index !== 0 ? "1px solid #dddddd" : "",
                          borderRight: "1px solid #dddddd",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minHeight: "42px",
                          height: `${maxEventsForHour(events, h) * 72}px`,
                        }}
                      >
                        <CalendarWeekCell
                          setEventToEdit={setEventToEdit}
                          setIsOpen={setIsOpen}
                          onClick={handleCreateEvent}
                          onClickEvent={handleUpdateEvent}
                          day={currentDay || new Date()}
                          events={events}
                          hour={h}
                          key={h}
                          info={info}
                          cellEvents={
                            (currentDay &&
                              (events.filter((event) => {
                                const startHour = Math.floor(
                                  convertTimeToNumber(new Date(event.start))
                                );

                                if (
                                  startHour === h &&
                                  IsSameDay(currentDay, new Date(event.start))
                                ) {
                                  return event;
                                }
                              }) as IEvent[])) ||
                            []
                          }
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </SubContainer>

      <CalendarModal
        open={isOpen}
        event={eventToEdit}
        setEvents={setEvents}
        events={events}
        close={() => setIsOpen((prevState) => !prevState)}
      />
    </Container>
  );
}
