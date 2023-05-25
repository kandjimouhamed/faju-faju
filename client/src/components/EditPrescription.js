import { Alert, Container, Input, Loader, Select, createStyles } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPatients } from "../redux/services/patientService";
import ReactQuill from "react-quill";
import { IconAlertCircle } from "@tabler/icons";
import { btnStyle } from "../utils/linkStyle";
import {
  getPrescription,
  updatePrescription,
} from "../redux/services/prescriptionService";
import { toast } from "react-hot-toast";

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

function EditPrescription() {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [error, setError] = useState("");
  const currentUser = useSelector((state) => state.user);
  const patients = useSelector((state) => state.patients?.data);
  const prescriptions = useSelector((state) => state.prescription);
  const lePrescription = prescriptions?.data.find((item) => item._id === id);
  const [prescription, setPrescription] = useState({
    ...lePrescription,
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


  const handleSubmit = (e) => {
    e.preventDefault();
    const newPrescription = {
      ...prescription,
      userId: currentUser._id,
    };

    if (prescription.patientId === "" && prescription.description === "") {
      setError("Veillez remplire tous les champs.");
    } else if (prescription.patientId === "") {
      setError("Veillez selectionner un patient.");
    } else if (prescription.description === "") {
      setError("Veillez remplire la préscription.");
    } else {
      dispatch(updatePrescription(newPrescription))
        .then(() => {
          toast("Prescription modifié avec success", { icon: "👏" });
          setPrescription({
            description: "",
            patients: "",
            dataPatient: {},
          });
          navigate("/dashboard/prescription");
        })
        .catch((err) => {
          console.log(err);
          toast(err.data);
        });
    }
  };

  // ? ####################### DISPATCHER LA FONCTION QUI RECUPERE LES PATIENTS #########################
  useEffect(() => {
    dispatch(getPatients());
    dispatch(getPrescription());
  }, [dispatch]);

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
      <h1>Modifier Observation du patient {prescription.dataPatient.firstname} </h1>
      <Container size="sm">
        <form onSubmit={handleSubmit}>
          <Input.Wrapper
            className={classes.input}
            id={"3"}
            label="Selectionnez un patient"
            required
          >
            <Select
              placeholder={`${prescription.dataPatient.firstname} ${prescription.dataPatient.lastname}`}
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
          className={classes.ButtonAjoute}
            style={{ ...btnStyle, width: "100%", padding: "0.8rem" }}
            type="submit"
          >
            {prescriptions.updatePrescriptionStatus !== "pending" ? (
                "Modifier"
              ) : (
                <Loader color="white" variant="dots" />
              )}
          </button>
        </form>
      </Container>
    </div>
  );
}

export default EditPrescription;
