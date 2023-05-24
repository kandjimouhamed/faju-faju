import {
  Grid,
  Loader,
  ScrollArea,
  Table,
  Text,
  createStyles,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { btnStyle } from "../utils/linkStyle";
import AddPatient from "./AddPatient";
import { useDispatch, useSelector } from "react-redux";
import { deletePatients, getPatients } from "../redux/services/patientService";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ModalConfirm from "./ModalConfirm";
import { GrFormView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { openConfirmModal } from "@mantine/modals";
import { toast } from "react-hot-toast";

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.white,
    backgroundColor: theme.colors.blue[6],
    border: 0,
    borderRadius: theme.radius.md,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    cursor: "pointer",
    margin: theme.spacing.md,

    // Use pseudo-classes just like you would in Sass
    "&:hover": {
      backgroundColor: theme.colors.blue[9],
    },

    "&:not(:first-of-type)": {
      backgroundColor: theme.colors.violet[6],

      // pseudo-classes can be nested
      "&:hover": {
        backgroundColor: theme.colors.violet[9],
      },
    },
  },
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  },
  Table: {
    width: "100%",
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      width: 600,
    },
  },
}));

function Patients() {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [openedModal, setOpenedModal] = useState(false);
  const statePatients = useSelector((state) => state.patients);
  const currentUser = useSelector((state) => state.user);
  const [ouvre, setOuvre] = useState(false);
  const [id, setId] = useState(null);
  const [mode, setMode] = useState("");
  const dispatch = useDispatch();
  const [patients, setPatients] = useState({
    idMedecin: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "1234",
    role: "client",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  const handleDetail = (id) => {
    navigate(`/dashboard/detail-patient/${id}`);
  };

  //   const filterPatients = statePatients?.data?.filter((patient) => patient._id === )

  const openDeleteModal = (patient) =>
    openConfirmModal({
      title: "Supprimer la préscription",
      centered: true,
      children: (
        <Text size="sm">
          Êtes-vous sûr de vouloir supprimer la préscription de{" "}
          <strong>
            {patient.firstname} {patient.lastname}
          </strong>{" "}
          ?
        </Text>
      ),
      labels: { confirm: "Supprimé", cancel: "Annulé" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        dispatch(deletePatients(patient._id))
          .then(() => {
            toast("Patient supprimer avec success", { icon: "👏" });
          })
          .catch((error) => {
            console.log(error);
            toast("Error");
          });
      },
    });

  return (
    <>
      {patients.getPatientStatus === "pending" ? (
        <div className={classes.div}>
          <Loader color="red" size="xl" />
        </div>
      ) : (
        <div className="table-container">
          <h1>Patients</h1>
          <Grid justify="flex-end">
            <button
              onClick={() => {
                setOpenedModal((open) => !open);
                setPatients({
                  idMedecin: currentUser._id,
                  firstname: "",
                  lastname: "",
                  phone: "",
                  email: "",
                  password: "1234",
                  role: "client",
                });
                setError("");
              }}
              style={btnStyle}
            >
              Ajouter un patient
            </button>
          </Grid>
          {openedModal && mode === "update" ? (
            <AddPatient
              setOpened={setOpenedModal}
              opened={openedModal}
              title="Modifier un patient"
              patients={patients}
              setPatients={setPatients}
              setError={setError}
              error={error}
            />
          ) : (
            <AddPatient
              setOpened={setOpenedModal}
              opened={openedModal}
              title="Ajouter un patient"
              patients={patients}
              setPatients={setPatients}
              setError={setError}
              error={error}
            />
          )}

          <div>
            <ScrollArea>
              <Table className={classes.Table}>
                <thead>
                  <tr>
                    <th>Prénom patient</th>
                    <th>Nom patient</th>
                    <th>Numéro téléphone</th>
                    {/* <th>Email</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {statePatients?.data
                    ?.filter((patient) => patient.idMedecin === currentUser._id)
                    ?.map((patient) => (
                      <tr key={patient?._id}>
                        <td>{patient?.firstname}</td>
                        <td>{patient?.lastname}</td>
                        <td>{patient?.phone}</td>
                        {/* <td>{patient?.email}</td> */}
                        <td>
                          <Grid style={{padding : "5px"}}>
                            <Grid.Col span={4}>
                              <AiOutlineDelete
                                onClick={() => {
                                  openDeleteModal(patient);
                                }}
                              />
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <AiOutlineEdit
                                onClick={() => {
                                  setOpenedModal((open) => !open);
                                  setMode("update");
                                  setPatients(patient);
                                }}
                              />
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <GrFormView
                                onClick={() => handleDetail(patient?._id)}
                              />
                            </Grid.Col>
                          </Grid>
                          {/* <div>
                                    <AiOutlineDelete
                                        onClick={() => {
                                        // setOuvre((open) => !open)
                                        // setId(patient._id)
                                            openDeleteModal(patient)
                                        }}
                                    />
                                    </div> */}
                          {/* <div className=''>
                                        <AiOutlineEdit
                                        onClick={() => {
                                            setOpenedModal((open) => !open)
                                            setMode('update')
                                            setPatients(patient)
                                        }}
                                        />
                                    </div>
                                    <div>
                                        <GrFormView 
                                            onClick={() => handleDetail(patient?._id)}
                                        />
                                    </div> */}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </ScrollArea>
            {ouvre && (
              <ModalConfirm
                setOuvre={setOuvre}
                ouvre={ouvre}
                title={"Confirmer la suppréssion"}
                contenu={"Vous vous supprimer cette patient."}
                patient={"patient"}
                // handleDelete={handleDelete}
                id={id}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Patients;
