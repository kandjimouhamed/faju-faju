import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Grid } from "@mantine/core";
import { Link } from "react-router-dom";
import { btnStyle, linkStyle } from "../utils/linkStyle";
import { useSelector } from "react-redux";
import CalendarDetails from "./CalendarDetails";
import AddAvaiblityModal from "./AddAvaiblityModal";

const events = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2022, 8, 26),
    end: new Date(2022, 8, 26)
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10)
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0)
  }
];

const CalendarUser = () => {
  const [opened, setOpened] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);
  const allAvaiblities = useSelector((state) => state.unavaiblities);
  const allAppointments = useSelector((state) => state.appointments);
  const appointments = allAppointments.appointments;
  const avaiblities = allAvaiblities.data;
  const [eventsData, setEventsData] = useState([]);
  const [event, setEvent] = useState([])
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const events = appointments
      ?.filter((appointment) => appointment.isConfirmed === true)
      .map((appointment) => {
        const avaiblity = avaiblities.find(
          (avaiblity) => avaiblity._id === appointment.unAvaiblityId
        );

        const event = {
          avaiblityId: avaiblity._id,
          appointmentId: appointment._id,
          title: appointment.description,
          start: new Date(avaiblity.day),
          end: new Date(avaiblity.day),
          time: { startedAt: appointment.startedAt, endedAt: appointment.endedAt },
          takenBy: appointment.userId,
          duration: avaiblity.duration
        };
        return event;
      });
    setEventsData(events);
  }, [allAvaiblities.loading, avaiblities, appointments]);

  const handleDetails = (event) => {
    setOpened(true)
    setEvent(event)
  }

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
          id: 1
        }
      ]);
  };

  const eventPropGetter = () => {
    let newStyle = {
      backgroundColor: "#E29897",
      color: 'white',
      borderRadius: "0px",
      border: "none",
      marginBottom: '0.5rem',
      padding: '0.5rem 0.3rem'
    };

    return {
      style: newStyle
    };
  }


  return (
    <div>
      <Grid justify="flex-end">
        <button onClick={() => setOpenedModal((open) => !open)} style={btnStyle}>
          Ajouter une indisponibilité
        </button>
      </Grid>
      <Calendar
        views={["month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date(2022, 8, 26)}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => handleDetails(event)}
        eventPropGetter={eventPropGetter}
      // onSelectSlot={handleSelect}
      />
      {
        opened && <CalendarDetails opened={opened} setOpened={setOpened} event={event} />
      }
      {openedModal && <AddAvaiblityModal opened={openedModal} setOpened={setOpenedModal} />}
    </div>
  );
};

export default CalendarUser;
