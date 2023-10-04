import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import { Button, Grid, Modal, TextField } from "@mui/material";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IDragEvent } from "../interfaces/IDragEvent";
import { IEvent } from "../interfaces/IEvent";
import { v4 as uuidv4 } from "uuid";

interface CalendarModalProps {
  open: boolean;
  close: () => void;
  event?: IDragEvent;
  setEvents: (params: any) => void;
  events: IEvent[];
  createEvent?: (event: IEvent) => void;
  updateEvent?: (event: IEvent, id: string) => void;
  deleteEvent?: (id: string) => void;
}

interface CalendarErrors {
  name: string | undefined;
  start: string | undefined;
  end: string | undefined;
  day: string | undefined;
}

export default function CalendarModal({
  open,
  close,
  event = undefined,
  setEvents,
  events,
  updateEvent,
  createEvent,
  deleteEvent,
}: CalendarModalProps) {
  const [name, setName] = useState("");
  const [start, setStart] = useState<Date | undefined>();
  const [end, setEnd] = useState<Date | undefined>();
  const [day, setDay] = useState<Date | undefined>();

  const [errors, setErrors] = useState<CalendarErrors>({
    name: undefined,
    start: undefined,
    end: undefined,
    day: undefined,
  });

  const clearStates = () => {
    setName("");
    setStart(undefined);
    setEnd(undefined);
    setDay(undefined);
    setErrors({
      name: undefined,
      start: undefined,
      end: undefined,
      day: undefined,
    });
  };

  const handleClose = () => {
    clearStates();
    close();
  };

  function setHourAndMinutesInDate(
    originalDate: Date,
    hour: number,
    minutes?: number
  ): Date {
    const newDate = new Date(originalDate);

    newDate.setHours(hour);

    if (minutes !== undefined) {
      newDate.setMinutes(newDate.getMinutes() + minutes);
    }

    return newDate;
  }

  const handleUpdateEvent = (events: IEvent[], updatedEvent: IEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
    );

    return updatedEvents;
  };

  const handleSave = () => {
    if (start && end) {
      if (!!event?.event) {
        close();

        const newEvent = {
          id: event?.event.id,
          name,
          start: new Date(start).toISOString(),
          end: new Date(end).toISOString(),
        };

        updateEvent && updateEvent(newEvent, event.event.id);

        clearStates();
        return setEvents(handleUpdateEvent(events, newEvent));
      } else {
        close();

        const newEvent = {
          id: uuidv4(),
          name,
          start: new Date(start).toISOString(),
          end: new Date(end).toISOString(),
        };

        createEvent && createEvent(newEvent);

        clearStates();
        return setEvents((oldState: IEvent[]) => [
          ...oldState,
          {
            id: uuidv4(),
            name,
            start: new Date(start).toISOString(),
            end: new Date(end).toISOString(),
          },
        ]);
      }
    }
  };

  const handleDelete = (id: string) => {
    const newEvents = events.filter((e: IEvent) => {
      return e.id !== id;
    });

    close();

    deleteEvent && deleteEvent(id);

    return setEvents(newEvents);
  };

  function isDateInEventsRange(
    date: Date,
    events: IEvent[],
    id?: string
  ): boolean {
    return events.some((event) => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      return date >= startDate && date <= endDate && id !== event.id;
    });
  }

  function combineDateAndTime(date: Date, time: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();

    const combinedDate = new Date(
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    );

    return combinedDate;
  }

  useEffect(() => {
    event && event.event && setName(event.event.name);
    event &&
      event.event &&
      setStart(
        setHourAndMinutesInDate(new Date(event.event.start), event.hour)
      );
    event &&
      event.event &&
      setEnd(
        setHourAndMinutesInDate(
          new Date(event.event.start),
          event.hour,
          event.interval
        )
      );

    event && setStart(setHourAndMinutesInDate(event.day, event.hour));
    event &&
      setEnd(setHourAndMinutesInDate(event.day, event.hour, event.interval));
  }, [event]);

  useEffect(() => {
    if (start && event?.cellEvents && event.event?.id) {
      if (isDateInEventsRange(start, event?.cellEvents, event.event?.id)) {
        setErrors({
          name: undefined,
          start: "Horário indisponível",
          end: "Horário indisponível",
          day: undefined,
        });
      } else {
        setErrors({
          name: undefined,
          start: undefined,
          end: undefined,
          day: undefined,
        });
      }
    }
  }, [start, end]);

  useEffect(() => {
    day && start && setStart(combineDateAndTime(day, start));
    day && end && setEnd(combineDateAndTime(day, end));
  }, [day]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Grid container>
          <Grid item xs={8}>
            <Typography
              id="modal-modal-title"
              component="h2"
              variant="h6"
              fontWeight={500}
              color={"#303030"}
            >
              {`Informações da grade`}
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {event?.event?.id !== undefined && (
              <Button
                variant="text"
                onClick={() => handleDelete(event.event?.id || "")}
              >
                <DeleteOutlineIcon
                  sx={{ xs: { mr: "none" }, sm: { mr: 1 }, color: "#cf0000" }}
                />
              </Button>
            )}
          </Grid>

          <Grid container marginTop={1} spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <DesktopDatePicker
                label="Data"
                inputFormat="dd/MM/yyyy"
                value={day ?? start}
                onChange={(e) => e && setDay(e)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TimePicker
                label={
                  <span>
                    Inicio do Atendimento
                    <span style={{ color: "red", fontWeight: 900 }}> *</span>
                  </span>
                }
                ampm={false}
                value={start}
                onChange={(e: any) => {
                  setStart(new Date(e));
                }}
                renderInput={({ inputProps, ...restParams }) => (
                  <TextField
                    {...restParams}
                    inputProps={{
                      ...inputProps,
                      placeholder: "",
                    }}
                    fullWidth
                    error={!!errors.start}
                    helperText={errors.start}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                )}
                InputProps={{
                  endAdornment: <AccessTimeIcon />,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TimePicker
                label={
                  <span>
                    Fim do Atendimento{" "}
                    <span style={{ color: "red", fontWeight: 900 }}> *</span>
                  </span>
                }
                ampm={false}
                value={end}
                onChange={(e: any) => {
                  setEnd(new Date(e));
                }}
                renderInput={({ inputProps, ...restParams }) => (
                  <TextField
                    {...restParams}
                    inputProps={{
                      ...inputProps,
                      placeholder: "",
                    }}
                    fullWidth
                    error={!!errors.end}
                    helperText={errors.end}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                )}
                InputProps={{
                  endAdornment: <AccessTimeIcon />,
                }}
              />
            </Grid>

            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
              marginTop={2}
            >
              <Button onClick={() => close()} variant="outlined" color="error">
                {`Cancelar`}
              </Button>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
              marginTop={2}
            >
              <Button
                disabled={
                  start &&
                  event?.cellEvents &&
                  isDateInEventsRange(start, event?.cellEvents, event.event?.id)
                }
                onClick={handleSave}
                variant="contained"
                color="primary"
              >
                {`Salvar`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
