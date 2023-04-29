import { Badge, Grid, Modal } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { convertDate, getTodayDate } from "../utils/functions/dates";
import { btnStyle } from "../utils/linkStyle";
import DetailCalendarList from "./DetailCalendarList";

const CalendarDetails = ({ opened, setOpened, event }) => {
  const Allusers = useSelector((state) => state.users);
  const users = Allusers?.users;
  const user = users?.find((user) => user._id === event.takenBy);
  const today = getTodayDate()

  return (
    <Modal opened={opened} onClose={() => setOpened(false)}>
      <h2
        style={{
          fontSize: "0.8rem",
          border: "1px solid gray",
          padding: "0.5rem",
          marginBottom: "1rem"
        }}
      >
        Détails du rendez-vous
      </h2>
      <div>
        <DetailCalendarList
          title="Choisi par"
          description={user.firstname + " " + user.lastname}
        />
        <DetailCalendarList title="Objet" description={event.title} />
        <DetailCalendarList
          title="Durée"
          description="1h"
        />
        <DetailCalendarList
          title="De"
          description={event.time.startedAt + " à " + event.time.endedAt}
        />
      </div>
      <Grid justify="flex-end">
        <Grid.Col span={4}>
            {
                today <= convertDate(event.start) ? <button style={{...btnStyle, margin: "1rem 0 0 0"}} type="">
                Annuler
              </button> : 
                <Badge sx={{display: 'flex', marginTop: '1rem'}}>Passé</Badge>
              
            }
        </Grid.Col>
      </Grid>
    </Modal>
  );
};

export default CalendarDetails;
