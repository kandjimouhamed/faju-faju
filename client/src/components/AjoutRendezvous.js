import { Alert, Container, Input, InputBase, Loader, Select, Textarea, createStyles } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { getPatients } from "../redux/services/patientService";
import { useDispatch, useSelector } from "react-redux";
import { btnStyle } from "../utils/linkStyle";
import { addPrescription } from "../redux/services/prescriptionService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IconAlertCircle } from "@tabler/icons";
import {addRendezvous,updateRendezvous, } from "../redux/services/rendezvousService";
  import { format } from 'date-fns';

// ? ################### STYLE MANTINE ############################
const useStyles = createStyles((theme) => ({
  // button: {
  //   color: theme.white,
  //   backgroundColor: theme.colors.blue[6],
  //   border: 0,
  //   borderRadius: theme.radius.md,
  //   padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  //   cursor: 'pointer',
  //   margin: theme.spacing.md,

  //   // Use pseudo-classes just like you would in Sass
  //   '&:hover': {
  //     backgroundColor: theme.colors.blue[9],
  //   },

  //   '&:not(:first-of-type)': {
  //     backgroundColor: theme.colors.violet[6],

  //     // pseudo-classes can be nested
  //     '&:hover': {
  //       backgroundColor: theme.colors.violet[9],
  //     },
  //   },
  // },
  input: {
    margin: "20px 0",
  },
  ButtonAjoute : {
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      marginTop : '100px'
    },

  }
}));


function AjoutRendezvous() {

  // ? ################## DECLARATION ###########################
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [error, setError] = useState("");
  const currentUser = useSelector((state) => state.user);
  const patients = useSelector((state) => state.patients?.data);
  const rendezVous = useSelector((state) => state.rendezvous);
  const [rendezvous, setRendezvous] = useState({
    description: "",
    dateRendezvous: "",
    patientId: "",
    dataPatient: {},
  });
  const modules = {
    toolbar: [
      [{ headers: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };

  // ? ####################### DISPATCHER LA FONCTION QUI RECUPERE LES PATIENTS #########################
  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  // ? ########################## ENVOIE DE LA PRESCRIPTION ##############################
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRendezvous = {
      ...rendezvous,
      userId: currentUser._id,
    };

    // ? ####################### AJOUTER UN RENDEZ-VOUS ######################################
    if (rendezvous.patientId === "" && rendezvous.description === "" && rendezvous.dateRendezvous === "") {
      setError("Veillez remplire tous les champs.");
    } else if (rendezvous.patientId === "") {
      setError("Veillez selectionner un patient.");
    } else if (rendezvous.description === "") {
      setError("Veillez remplire la description.");
    } else if (rendezvous.dateRendezvous === "") {
        setError("Veillez remplire la date de Rendez-vous.");
    } else {
      dispatch(addRendezvous(newRendezvous))
        .then(() => {
          toast("Rendez-vous ajouté avec success", { icon: "👏" });
          setRendezvous({
            description: "",
            dateRendezvous: "",
            patients: "",
          });
          navigate("/dashboard/rendezvous");
        })
        .catch((err) => {
          console.log("error", err);
          toast(err.response.data.error);
        });
    }
  };

  // ! Foncion qui convertir le select en donnant value et label
  const optionItem = () => {
    return patients
    .filter((patient) => patient.idMedecin === currentUser._id)
    .map((patient) => ({
      value: patient._id,
      label: `${patient.firstname} ${patient.lastname}`,
    }));
  };

  // ? #################### RECUPERER LE PATIENT SELECTIONNER ############################
  const handlePatientChange = (value) => {
    setRendezvous({ ...rendezvous, patientId: value });
  };

  const editorStyle = {
    height: "80vh",
  };

  return (
    <div className="table-container">
      <h1>Rendez-vous </h1>
      <Container size="sm">
        <form onSubmit={handleSubmit}>
          <Input.Wrapper
            className={classes.input}
            id={"3"}
            label="Selectionnez un patient"
            required
            // maw={320}
            // mx="auto"
          >
            <Select
              placeholder="Choisissez un patient"
              data={optionItem()}
              onChange={handlePatientChange}
            />
            {error === "Veillez remplire tous les champs." ? (
              <Alert icon={<IconAlertCircle size="1rem" />} color="red">
                {error}
              </Alert>
            ) : error === "Veillez selectionner un patient." ? (
              <Alert icon={<IconAlertCircle size="1rem" />} color="red">
                {error}
              </Alert>
            ) : null}
          </Input.Wrapper>
          {/* <Input.Wrapper
            className={classes.input}
            id={"3"}
            label="Description du rendez-vous"
            required
           
          >
            
            <InputBase
            type=""
              value={rendezvous.description}
              onChange={(e) =>
                setRendezvous({ ...rendezvous, description: e })
              }
            
            />
            {error === "Veillez remplire tous les champs." ? (
              <Alert icon={<IconAlertCircle size="1rem" />} color="red">
                {error}
              </Alert>
            ) : error === "Veillez remplire la préscription." ? (
              <Alert icon={<IconAlertCircle size="1rem" />} color="red">
                {error}
              </Alert>
            ) : null}
          </Input.Wrapper> */}
           <Input.Wrapper
            className={classes.input}
            id={"3"}
            label="Chioisir votre date de Rendez vous"
            required
          >
            <div>
            <input
              style={{
                fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                height: "2.25rem",
                color: "transparent",
                lineHeight: 'calc(2.25rem - 0.125rem)',
                border: '0.0625rem solid #ced4da',
                boxSizing: 'border-box',
                fontSize:' 0.875rem',
                width: '100%',
                color: '#000',
                display: 'block',
                textAlign: 'left',
                backgroundColor: '#fff',
                transition: 'border-color 100ms ease',
                minHeight: '2.25rem',
                paddingLeft: 'calc(2.25rem / 3)',
                paddingRight: '2.25rem',
                borderRadius: '0.25rem',
              }}
              type="date"
              placeholder="date de rendez vous"
              value={rendezvous._id ? format(new Date(rendezvous.dateRendezvous), 'yyyy-MM-dd') : rendezvous.dateRendezvous}
              onChange={(e) =>
                setRendezvous({ ...rendezvous, dateRendezvous: e.target.value })
              }
            />

            </div>
            {error === "Viellez remplire ce champ ." &&
              rendezvous.dateRendezvous === "" && (
                <Alert icon={<IconAlertCircle size="1rem" />} color="red">
                  {error}
                </Alert>
              )}
          </Input.Wrapper>

          <Textarea
            value={rendezvous.description}
            onChange={(e) =>
              setRendezvous({ ...rendezvous, description: e.target.value })
            }
           
            placeholder="Description"
            label="Entrez votre Description"
            autosize
            minRows={2}
          />
            {error === "Veillez remplire tous les champs." ? (
              <Alert icon={<IconAlertCircle size="1rem" />} color="red">
                {error}
              </Alert>
            ) : error === "Veillez remplire la préscription." ? (
              <Alert icon={<IconAlertCircle size="1rem" />} color="red">
                {error}
              </Alert>
            ) : null}

          <div className={classes.ButtonAjoute}>
          <button
            style={{ ...btnStyle, width: "100%", padding: "0.8rem" , }}
            type="submit"
          >
            {rendezvous.addPrescriptionStatus !== "pending" ? (
                "Ajouter"
              ) : (
                <Loader color="white" variant="dots" />
              )}
          
          </button>

          </div>
        </form>
      </Container>
    </div>
  );
}

export default AjoutRendezvous;
