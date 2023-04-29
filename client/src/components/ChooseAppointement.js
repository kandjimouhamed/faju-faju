import { Badge, Collapse, Grid, Loader, Textarea } from "@mantine/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { Calendar } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { btnStyle } from "../utils/linkStyle";
import instance from "../axios/globalInstance";
import successMsg from "../utils/functions/successMsg";
import { chooseAppointment } from "../redux/slices/appointmentsSlice";
import { convertDate } from "../utils/functions/dates";
import { getAppointments } from '../redux/services/appointmentsServices';
import { getUnAvaiblities } from '../redux/services/unAvaiblitiesServices';
import { getUsers } from '../redux/services/usersServices';

const ChooseAppointement = () => {
  const dispatch = useDispatch();
  const [showDescription, setShowDescription] = useState(false)
  const [value, setValue] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const user = useSelector((state) => state.user);
  const unAvaiblities = useSelector((state) => state.unavaiblities.data);
  const [unAvaiblity, setUnAvaiblity] = useState(null);
  const allAppointments = useSelector((state) => state.appointments);
  const userId = user._id;
  const [appointments, setAppointments] = useState([]);
  const form = useForm({
    initialValues: { description: "" },
    validate: {
      description: (value) =>
        value === "" ? "Veuillez donner une description" : null
    }
  });

  const addAppointment = form.onSubmit(async (values) => {
    const { description } = values;
    if (!selectedAppointment) {
      form.setErrors({
        description: "Veuillez choisir un rendez-vous"
      });
      return;
    }
    try {
      const id = selectedAppointment._id;
      dispatch(chooseAppointment({ id, userId, description }));
      await instance.put(`/appointments/choose/${id}`, {
        ...selectedAppointment,
        userId,
        description
      });
      setSelectedAppointment(null);
      form.reset();
      setShowDescription(false)
      successMsg("Rendez-vous fixé");
    } catch (error) {
      console.log(error);
    }
  });

  const handleAppointment = (appointment) => {
    const btn = document.getElementById(appointment._id);
    setShowDescription(true)
    btn.style.backgroundColor = "#B5D7FF";
    btn.style.color = "#ffffff";
    let nextSibling = btn.nextSibling;

    while (nextSibling) {
      if (!nextSibling.disabled) {
        nextSibling.style.backgroundColor = "#EFEFEF";
        nextSibling.style.color = "#4B4453";
        nextSibling = nextSibling.nextSibling;
        continue;
      }
      nextSibling = nextSibling.nextSibling;
    }

    let prevSibling = btn.previousSibling;
    while (prevSibling) {
      if (!prevSibling.disabled) {
        prevSibling.style.backgroundColor = "#EFEFEF";
        prevSibling.style.color = "#4B4453";
        prevSibling = prevSibling.previousSibling;
        continue;
      }

      prevSibling = prevSibling.previousSibling;
    }

    const selectedAppointment = {
      ...appointment
    };

    setSelectedAppointment(selectedAppointment);
    // console.log(selectedAppointment, appointmentsCopy, index);
  };



  useEffect(() => {
    // get all avaiblities && appointments
    dispatch(getUnAvaiblities())
    dispatch(getAppointments())
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    const unAvaiblity = unAvaiblities.find(
      (avaiblity) => convertDate(avaiblity.day) === convertDate(value)
    );
    if (!unAvaiblity) {
      setShowDescription(false)
    }
    // else {
    //   setShowDescription(true)
    // }

    const appointments = allAppointments?.appointments?.filter(
      (appointment) => appointment.unAvaiblityId === unAvaiblity?._id
    );

    setUnAvaiblity(unAvaiblity);
    setAppointments(appointments);
  }, [allAppointments?.appointments, unAvaiblities, value]);

  return (
    <div>
      <h1>Fixer votre rendez-vous</h1>
      <h5>
        Durée des rendez-vous :{" "}
        {unAvaiblity ? (
          <Badge>
            {
              unAvaiblity.duration === 60 ? '1h' : `${unAvaiblity.duration} '`
            }
          </Badge>
        ) : (
          <Badge color="pink">Select date</Badge>
        )}
      </h5>
      <h5 style={{ marginTop: "0.5rem" }}>
        Pause entre les rendez-vous :{" "}
        {unAvaiblity ? (
          <Badge>
            {
              unAvaiblity.breakBetweenAppoints === 60 ? '1h' : `${unAvaiblity.breakBetweenAppoints} '`
            }
          </Badge>
        ) : (
          <Badge color="pink">Select date</Badge>
        )}{" "}
      </h5>
      <Grid p="lg" justify="">
        <Grid.Col sm={6} md={4} span={12}>
          <Calendar
            fullWidth
            value={value}
            onChange={setValue}
            excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
          />
        </Grid.Col>
        <Grid.Col px="sm" sm={6} md={4} span={12}>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: "600",
              textAlign: "center",
              display: "block",
              marginBottom: "0.5rem",
              borderRadius: "5px",
              backgroundColor: "#EFEFEF"
            }}
          >
            Choisissez l'heure qui vous convient
          </span>
          <span></span>
          {!allAppointments.loading ? (
            appointments?.length !== 0 ? (
              appointments?.map((appointment, index) => (
                <button
                  id={appointment._id}
                  title={
                    appointment.userId && appointment.userId !== userId
                      ? "Rendez-vous non disponible"
                      : appointment.userId && appointment.userId === userId
                        ? "Vous avez déjà pris ce rendez-vous"
                        : null
                  }
                  disabled={appointment.userId}
                  key={index}
                  onClick={() => handleAppointment(appointment)}
                  style={{
                    backgroundColor:
                      appointment.userId && appointment.userId !== userId
                        ? "#CF445E"
                        : appointment.userId && appointment.userId === userId
                          ? "#9CA8DF"
                          : "#EFEFEF",
                    color: appointment.userId && "white",
                    cursor: appointment.userId ? "not-allowed" : "pointer",
                    // borderRadius: "10px",
                    padding: "0.5rem",
                    marginBottom: "1rem",
                    fontWeight: "600",
                    textAlign: "center",
                    border: "none",
                    display: "block",
                    width: "100%"
                  }}
                >
                  {appointment.startedAt + " - " + appointment.endedAt}
                </button>
              ))
            ) : (
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                  textAlign: "center"
                }}
              >
                Pas de rendez-vous pour cette date
              </p>
            )
          ) : (
            <Loader variant="dots" />
          )}
        </Grid.Col>

        <Grid.Col sm={6} md={4} span={12}>
          <Collapse in={showDescription}>
            <form onSubmit={addAppointment}>
              <Textarea
                placeholder="L'objet du rendez-vous"
                label="L'objet du rendez-vous"
                withAsterisk
                {...form.getInputProps("description")}
              />
              <button
                style={{ ...btnStyle, backgroundColor: "#3F73D7", width: "100%" }}
                type="submit"
              >
                Choisir
              </button>
            </form>
          </Collapse>
        </Grid.Col>

      </Grid>
    </div>
  );
};

export default ChooseAppointement;
