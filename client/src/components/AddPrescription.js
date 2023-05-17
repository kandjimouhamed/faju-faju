import {
  Alert,
  Input,
  Loader,
  Modal,
  Select,
  createStyles,
} from "@mantine/core";
import { IconAlertCircle, IconChevronDown } from "@tabler/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../redux/services/patientService";
import ReactQuill from "react-quill";
import { btnStyle } from "../utils/linkStyle";
import {
  addPrescription,
  updatePrescription,
} from "../redux/services/prescriptionService";
import { toast } from "react-hot-toast";

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

function AddPrescription({
  opened,
  setOpened,
  title,
  prescription,
  setPrescription,
  mode,
  boutton,
  error,
  setError,
}) {
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

  // const SelectItem = (({ image, label, description, ...others }) => (
  //     <div ref={ref} {...others}>
  //       <Group noWrap>
  //         <Avatar src={image} />

  //         <div>
  //           <Text size="sm">{label}</Text>
  //           <Text size="xs" opacity={0.65}>
  //             {description}
  //           </Text>
  //         </div>
  //       </Group>
  //     </div>
  //   )
  // );

  const { classes } = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const prescriptionData = useSelector((state) => state.prescription);
  const patients = useSelector((state) => state.patients?.data);

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  // ! Foncion qui convertir le select en donnant value et label
  const optionItem = () => {
    return patients.map((patient) => ({
      value: patient._id,
      label: `${patient.firstname} ${patient.lastname}`,
    }));
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
      if (mode === "update") {
        dispatch(updatePrescription(newPrescription))
          .then((res) => {
            setOpened(false);
            toast("Prescription modifié avec success", { icon: "👏" });
            setPrescription({
              description: "",
              patients: "",
              dataPatient: {},
            });
          })
          .catch((err) => {
            console.log(err);
            toast(err.data);
          });
      } else {
        dispatch(addPrescription(newPrescription))
          .then((res) => {
            setOpened(false);
            toast("Prescription Ajouter avec success", { icon: "👏" });
            setPrescription({
              description: "",
              patients: "",
            });
          })
          .catch((err) => {
            console.log("error", err);
            toast(err.response.data.error);
          });
      }
    }
  };

  const handlePatientChange = (value) => {
    setPrescription({ ...prescription, patientId: value });
  };

  return (
    <div>
      <Modal
        radius="lg"
        overlayOpacity={0.43}
        overlayBlur={2}
        opened={opened}
        onClose={() => setOpened(false)}
        title={title}
      >
        <form onSubmit={handleSubmit}>
          <Select
            label="Selectionnez un patient"
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
            {prescriptionData.addPrescriptionStatus !== "pending" ? (
              boutton
            ) : (
              <Loader color="white" variant="dots" />
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default AddPrescription;
