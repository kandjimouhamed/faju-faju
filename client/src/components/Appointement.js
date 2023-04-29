import { Badge, Input, Loader, Modal, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { convertDate, getTodayDate } from "../utils/functions/dates";
import { FcApproval, FcCancel } from "react-icons/fc";
import instance from "../axios/globalInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAppointment,
  validateAppointment
} from "../redux/slices/appointmentsSlice";
import EmptyList from "./EmptyList";
import successMsg from "../utils/functions/successMsg";
import { getAppointments, updateAppointment } from "../redux/services/appointmentsServices";
import localFrFormat from "../utils/functions/localFrFormat";
import { getUnAvaiblities } from "../redux/services/unAvaiblitiesServices";
import { btnStyle } from "../utils/linkStyle";
// import Table from 'react-bootstrap/Table';

const Appointement = () => {
  const dispatch = useDispatch();
  const today = getTodayDate();
  const [isActive, setIsActive] = useState("today");
  const allUsers = useSelector((state) => state.users);
  const users = allUsers.users;
  // const user = useSelector(state => state.user)
  const allAvaiblities = useSelector((state) => state.unavaiblities);
  const unAvaiblities = allAvaiblities?.data;
  const allAppointments = useSelector((state) => state.appointments);
  const [appointments, setAppointments] = useState(allAppointments?.appointments
    ?.filter(appointment => appointment.userId !== null)
    .map((appointment) => {
      const data = unAvaiblities?.find(
        (avaiblity) => avaiblity._id === appointment.unAvaiblityId
      );
      // if (convertDate(data?.day) === today) {
      //   return(appointment);
      // }
      return convertDate(data?.day) === today ? appointment : null;
    }))
  const isValidDate = [];
  const [id, setId] = useState(null)
  const [opened, setOpened] = useState(false)
  const [motif, setMotif] = useState('')
  // console.log(appointments );


  const [passedOrComingAppointments, setPassedOrComingAppointments] =
    useState(isValidDate);

  const cancel = async (id) => {
    dispatch(updateAppointment({ id, data: { isConfirmed: false, motif } }))
    successMsg("Rendez-vous annulé");
    setOpened(false)
    setId(null)
  };

  const validate = async (id) => {
    dispatch(updateAppointment({ id, data: { isConfirmed: true } }))
    successMsg("Rendez-vous confirmé");
  };

  const passedAppointment = () => {
    setIsActive("passed");
    const today = getTodayDate();

    // !on recupere les dates inferieur a aujourd'hui
    const isValidDate = [];
    appointments
      ?.filter((appointment) => appointment.userId !== null)
      .map((appointment) => {
        const data = unAvaiblities?.find(
          (unAvaiblity) => unAvaiblity._id === appointment.unAvaiblityId
        );
        if (convertDate(data.day) < today) {
          isValidDate.push(appointment);
        }
        return isValidDate;
      });
    setPassedOrComingAppointments(isValidDate);
  };

  const todayAppointments = () => {
    setIsActive('today');
    const today = getTodayDate();

    // !on recupere les dates egales a aujourd'hui
    const isValidDate = [];
    appointments
      ?.filter((appointment) => appointment.userId !== null)
      .map((appointment) => {
        const data = unAvaiblities?.find(
          (avaiblity) => avaiblity._id === appointment.unAvaiblityId
        );

        if (convertDate(data?.day) === today) {
          isValidDate.push(appointment);
        }
        return isValidDate;
      });
    setPassedOrComingAppointments(isValidDate);
  }

  function tomorrowAppointments() {
    setIsActive('tomorrow');
    const today = getTodayDate();

    // !on recupere les dates superieur a aujourd'hui
    const isValidDate = [];
    appointments
      ?.filter((appointment) => appointment.userId !== null)
      .map((appointment) => {
        const data = unAvaiblities?.find(
          (avaiblity) => avaiblity._id === appointment.unAvaiblityId
        );
        let [year, month, day] = today.split('-')
        let [dataYear, dataMonth, dataDay] = convertDate(data?.day).split('-')

        if ((Number(dataDay) - Number(day) === 1)) {
          isValidDate.push(appointment);
        }
        return isValidDate;
      });
    setPassedOrComingAppointments(isValidDate);
  }


  const comingAppointments = () => {
    setIsActive("coming");
    const today = getTodayDate();

    // !on recupere les dates inferieur a aujourd'hui
    const isValidDate = [];
    appointments
      ?.filter((appointment) => appointment.userId !== null)
      .map((appointment) => {
        const data = unAvaiblities?.find(
          (unAvaiblity) => unAvaiblity._id === appointment.unAvaiblityId
        );
        if (convertDate(data.day) > today) {
          isValidDate.push(appointment);
        }
        return isValidDate;
      });
    setPassedOrComingAppointments(isValidDate);
  };

  const canceledAppointments = () => {
    setIsActive('canceled');
    const today = getTodayDate();

    // !on recupere les dates superieur a aujourd'hui
    const isValidDate = [];
    appointments
      ?.filter(appointment => appointment.userId !== null)
      ?.filter((appointment) => appointment.isConfirmed === false)
      .map((appointment) => {
        const data = unAvaiblities?.find(
          (avaiblity) => avaiblity._id === appointment.unAvaiblityId
        );
        if (convertDate(data?.day) >= today) {
          isValidDate.push(appointment);
        }
        return isValidDate;
      });
    setPassedOrComingAppointments(isValidDate);
  }

  useEffect(() => {
    dispatch(getAppointments());
    dispatch(getUnAvaiblities());
  }, [])

  return (
    <div className="table-container">
      <h1>Mes rendez-vous</h1>
      {!allAppointments.loading &&
        !allAvaiblities.loading
        ? (
          allAppointments?.appointments?.filter(appointment => appointment?.userId !== null).length !== 0 ? (
            <>
              <div className="table-container--time">
                <button
                  style={{
                    borderBottom:
                      isActive === "passed" ? "2px solid #DB3C4E" : null,
                    color: isActive === "passed" ? "#DB3C4E" : null
                  }}
                  onClick={() => setIsActive('passed')}
                >
                  Passés
                </button>
                <button
                  style={{
                    borderBottom:
                      isActive === "today" ? "2px solid #DB3C4E" : null,
                    color: isActive === "today" ? "#DB3C4E" : null
                  }}
                  onClick={() => setIsActive('today')}
                >
                  Aujourd'hui
                </button>
                {/* <button
                style={{
                  borderBottom:
                    isActive === "tomorrow" ? "2px solid #DB3C4E" : null,
                  color: isActive === "tomorrow" ? "#DB3C4E" : null
                }}
                onClick={tomorrowAppointments}
              >
                Demain
              </button> */}
                <button
                  style={{
                    borderBottom:
                      isActive === "coming" ? "2px solid #DB3C4E" : null,
                    color: isActive === "coming" ? "#DB3C4E" : null
                  }}
                  onClick={() => setIsActive('coming')}
                >
                  A venir
                </button>
                <button
                  style={{
                    borderBottom:
                      isActive === "canceled" ? "2px solid #DB3C4E" : null,
                    color: isActive === "canceled" ? "#DB3C4E" : null
                  }}
                  onClick={() => setIsActive('canceled')}
                >
                  Annulés
                </button>
              </div>
              <Table striped size="lg" variant="dark">
                <thead className="a-thead">
                  <tr>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Durée</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allAppointments?.appointments?.filter(appointment => appointment.userId !== null)
                    .filter(appointment => {
                      if (isActive === 'today') {
                        const data = unAvaiblities?.find(
                          (avaiblity) => avaiblity._id === appointment.unAvaiblityId
                        );
                        return (convertDate(data.day) === today) && appointment
                      }
                      if (isActive === 'coming') {
                        const data = unAvaiblities?.find(
                          (avaiblity) => avaiblity._id === appointment.unAvaiblityId
                        );
                        return (convertDate(data.day) > today) && appointment
                      }
                      if (isActive === 'passed') {
                        const data = unAvaiblities?.find(
                          (avaiblity) => avaiblity._id === appointment.unAvaiblityId
                        );
                        return (convertDate(data.day) < today) && appointment
                      }
                      if (isActive === 'canceled') {
                        return appointment.isConfirmed === false
                      }
                    })?.length !== 0 ? (
                    allAppointments?.appointments
                      ?.filter(appointment => appointment.userId !== null)
                      .filter(appointment => {
                        if (isActive === 'today') {
                          const data = unAvaiblities?.find(
                            (avaiblity) => avaiblity._id === appointment.unAvaiblityId
                          );
                          return (convertDate(data.day) === today) && appointment
                        }
                        if (isActive === 'coming') {
                          const data = unAvaiblities?.find(
                            (avaiblity) => avaiblity._id === appointment.unAvaiblityId
                          );
                          return (convertDate(data.day) > today) && appointment
                        }
                        if (isActive === 'passed') {
                          const data = unAvaiblities?.find(
                            (avaiblity) => avaiblity._id === appointment.unAvaiblityId
                          );
                          return (convertDate(data.day) < today) && appointment
                        }
                        if (isActive === 'canceled') {
                          return appointment.isConfirmed === false
                        }
                      })
                      ?.map((element, index) => (
                        // console.log(users.filter(user => user._id === element.userId)[0].lastname)
                        <tr key={index}>
                          <td style={{ fontWeight: "600" }}>
                            {
                              users?.find(
                                (user) => user._id === element?.userId
                              )?.firstname
                            }
                            {"   "}
                            {
                              users.filter(
                                (user) => user._id === element?.userId
                              )[0]?.lastname
                            }
                            <Badge variant="dot" color={element.isConfirmed === null ? 'orange' : element.isConfirmed === true ? 'green' : element.isConfirmed === false ? 'pink' : null} sx={{ marginLeft: "0.5rem" }}>
                              {element.isConfirmed === null
                                ? "En attente"
                                : element.isConfirmed
                                  ? "Confirmé"
                                  : "Annulé"}
                            </Badge>
                          </td>
                          <td>
                            <span
                              style={{
                                border: "2px solid #bd9999",
                                padding: "0.5rem",
                                borderRadius: "5px",
                                color: "black"
                              }}
                            >
                              {
                                localFrFormat(new Date(unAvaiblities?.filter(
                                  (avaiblity) =>
                                    avaiblity._id === element.unAvaiblityId
                                )[0]?.day))
                              }
                            </span>
                          </td>
                          <td>
                            <span
                              style={{
                                border: "2px solid #bd9999",
                                padding: "0.5rem",
                                borderRadius: "5px",
                                color: "black"
                              }}
                            >{`${element.startedAt} - ${element.endedAt}`}</span>
                          </td>
                          <td>
                            {
                              (element.isConfirmed || element.isConfirmed === null) && <button
                                onClick={() => {
                                  setOpened(true)
                                  setId(element._id)
                                }}
                                title="Annuler"
                                style={{
                                  backgroundColor: "transparent",
                                  borderRadius: "5px",
                                  marginRight: "0.5rem",
                                  border: "none",
                                  cursor: "pointer"
                                }}
                              >
                                <FcCancel size={30} />
                              </button>
                            }
                            {
                              (element.isConfirmed === null || element.isConfirmed === false) && <button
                                onClick={() => validate(element._id)}
                                title="Valider"
                                style={{
                                  backgroundColor: "transparent",
                                  borderRadius: "5px",
                                  padding: "0.3rem",
                                  border: "none",
                                  cursor: "pointer"
                                }}
                              >
                                <FcApproval size={30} />
                              </button>
                            }
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr style={{ marginTop: '0.5rem' }}>
                      <td>
                        {isActive === "passed"
                          ? "Pas encore de rendez-vous passés"
                          : isActive === "today"
                            ? "Pas encore de rendez-vous pour aujourd'hui"
                            : isActive === "coming"
                              ? "Pas encore de rendez-vous à venir"
                              : isActive === "canceled"
                                ? "Pas encore de rendez-vous annulés"
                                : null}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Motif de l'annulation"
              >
                <form onSubmit={() => cancel(id)}>
                  <Input
                    // icon={<Lettt />}
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                    placeholder="Votre motif"
                  />
                  <button style={{ ...btnStyle, backgroundColor: '#008F7A', margin: " 0.6rem 0", width: '100%' }} type="submit">Envoyer</button>
                </form>
              </Modal>
            </>
          ) : (
            <EmptyList text="Pas encore de rendez-vous" />
          )
        ) : (
          <Loader color="pink" variant="dots" />
        )}
    </div>
  );
};

export default Appointement;
