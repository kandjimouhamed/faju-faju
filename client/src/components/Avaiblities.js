import { Badge, Grid, Loader, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { btnStyle } from "../utils/linkStyle";
import AddAvaiblityModal from "./AddAvaiblityModal";
import { useDispatch, useSelector } from "react-redux";
import EmptyList from "./EmptyList";
import { convertDate } from "../utils/functions/dates";
import { getAppointments } from "../redux/services/appointmentsServices";
import { getUnAvaiblities } from "../redux/services/unAvaiblitiesServices";
import { getUsers } from "../redux/services/usersServices";

const Avaiblities = () => {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false);
  const allAvaiblities = useSelector((state) => state.unavaiblities);
  const avaiblities = allAvaiblities?.data;

  useEffect(() => {
    // get all avaiblities && appointments % && users
    dispatch(getAppointments());
    dispatch(getUnAvaiblities());
    dispatch(getUsers())
}, []);

  return (
    <div>
      <Grid justify="flex-end">
        
      </Grid>
      {!allAvaiblities.loading ? (
        avaiblities.length !== 0 ? (
          <Table>
            <thead className="t-head">
              <tr className="t-head--avaiblities">
                <th>Motifs</th>
                <th>Date</th>
                <th>Horaires</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                avaiblities.map(avaiblity => (
                  <tr key={avaiblity._id}>
                    <td>
                      <Badge>{avaiblity.motif}</Badge>
                    </td>
                    <td>
                      <Badge color='pink'>{convertDate(avaiblity.day)}</Badge>
                    </td>
                    <td>
                      <Badge color='indigo'>
                        {/* {avaiblity.hours.timeStart + ' - ' + avaiblity.hours.timeEnd} */}
                      </Badge>
                    </td>
                    <td>E - S</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        ) : (
          <EmptyList text="Pas encore de disponibilites" />
        )
      ) : (
        <Loader color="pink" variant="dots" />
      )}
      
    </div>
  );
};

export default Avaiblities;
