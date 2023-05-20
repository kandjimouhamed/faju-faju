import { Alert, Container, Input, Loader, Select, createStyles } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { getPatients } from "../redux/services/patientService";
import { useDispatch, useSelector } from "react-redux";
import { btnStyle } from "../utils/linkStyle";
import { addPrescription } from "../redux/services/prescriptionService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IconAlertCircle } from "@tabler/icons";

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
}));

function AjoutPrescription() {

  // ? ################## DECLARATION ###########################
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [error, setError] = useState("");
  const currentUser = useSelector((state) => state.user);
  const patients = useSelector((state) => state.patients?.data);
  const prescriptions = useSelector((state) => state.prescription);
  const [prescription, setPrescription] = useState({
    description: "",
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
    const newPrescription = {
      ...prescription,
      userId: currentUser._id,
    };

    // ? ####################### AJOUTER UNE PRESCRIPTION ######################################
    if (prescription.patientId === "" && prescription.description === "") {
      setError("Veillez remplire tous les champs.");
    } else if (prescription.patientId === "") {
      setError("Veillez selectionner un patient.");
    } else if (prescription.description === "") {
      setError("Veillez remplire la préscription.");
    } else {
      dispatch(addPrescription(newPrescription))
        .then(() => {
          toast("Prescription Ajouter avec success", { icon: "👏" });
          setPrescription({
            description: "",
            patients: "",
          });
          navigate("/dashboard/prescription");
        })
        .catch((err) => {
          console.log("error", err);
          toast(err.response.data.error);
        });
    }
  };

  // ! Foncion qui convertir le select en donnant value et label
  const optionItem = () => {
    return patients.map((patient) => ({
      value: patient._id,
      label: `${patient.firstname} ${patient.lastname}`,
    }));
  };

  // ? #################### RECUPERER LE PATIENT SELECTIONNER ############################
  const handlePatientChange = (value) => {
    setPrescription({ ...prescription, patientId: value });
  };

  const editorStyle = {
    height: "350px",
  };

  return (
    <div className="table-container">
      <h1>Observation du patient </h1>
      <Container size="sm">
        <form onSubmit={handleSubmit}>
          <Input.Wrapper
            className={classes.input}
            id={"3"}
            label="Selectionnez un patient"
            required
            maw={320}
            mx="auto"
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

          <Input.Wrapper
            className={classes.input}
            id={"3"}
            label="Description du medecin"
            required
            maw={320}
            mx="auto"
          >
            <ReactQuill
              theme="snow"
              value={prescription.description}
              onChange={(e) =>
                setPrescription({ ...prescription, description: e })
              }
              className="editor-input"
              modules={modules}
              style={editorStyle}
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
          </Input.Wrapper>
          <button
            style={{ ...btnStyle, width: "100%", padding: "0.8rem" }}
            type="submit"
          >
            {prescriptions.addPrescriptionStatus !== "pending" ? (
                "Ajouter"
              ) : (
                <Loader color="white" variant="dots" />
              )}
          </button>
        </form>
      </Container>
    </div>
  );
}

export default AjoutPrescription;
