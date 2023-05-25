import { Container, Divider, Grid, Title, createStyles } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import { ImLocation2, ImPhone } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPrescription } from "../redux/services/prescriptionService";
import { getUsers } from "../redux/services/usersServices";
import { btnStyle } from "../utils/linkStyle";
import { useReactToPrint } from "react-to-print";
import { toast } from 'react-hot-toast';

const useStyles = createStyles((theme) => ({
  Container: {
    marginTop: "50px",
    padding: "20px 50px 0 50px",
  },
  Grid: {
    justifyContent: "space-between",
    margin: "0 20px",
  },
  GridCol: {
    // backgroundColor : "blue",
  },
  colonneHeader: {
    display: "flex",
    alignItems: "center",
    // justifyContent : 'space-between'
  },
  doctorName: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  Divider: {
    backgroundColor: "blue",
    margin: "20px 0",
    // color : "red"
  },
  colPatient: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: {
    margin : "20px 15px"
  },
  signature: {
    textDecoration: "underline",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    backgroundColor: "#DB3C4E",
    padding: "20px",
  },
}));

function DetailPrescription() {
  const { classes } = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const prescriptions = useSelector((state) => state.prescription);
  const medicins = useSelector((state) => state.users);
  const prescription = prescriptions?.data?.find(({ _id }) => _id === id);
  const medicin = medicins?.users?.find(
    ({ _id }) => _id === prescription?.userId
  );
  //   console.log(prescription);
  //   console.log(medicins);
  //   console.log(medicin);

  useEffect(() => {
    dispatch(getPrescription());
    dispatch(getUsers());
  }, [dispatch]);

  const conponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle : "consultation du patient",
    onAfterPrint : () => toast("Observation téléchargé en PDF avec success.")
  });
  return (
    <div className="table-container">
      <h1> Détail de l'observation du patient </h1>
      <Grid justify="flex-end">
        <button
          onClick={generatePDF}
          // onClick={() => navigate("/dashboard/addPrescription")
          // {
          // setPrescription({
          //   description  : "",
          //   patientId : "",
          //   dataPatient : {}
          // })
          // setOpenedModal((open) => !open)
          // setError("")
          // }
          // }
          style={btnStyle}
        >
          imprimer l'observation du patient {prescription.dataPatient.firstname}
        </button>
      </Grid>
      <div style={{ width: "100%" }}>
        <Container
            ref={conponentPDF}
          className={classes.Container}
          size="sm"
          px="xs"
          sx={{ boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.3)" }}
        >
          <Grid className={classes.Grid}>
            <Grid.Col className={classes.GridCol} span={12}>
            <div className={classes.doctorName}>Mr. {medicin?.lastname}</div>
              <div>Dentist</div>
              <div>
                <div className={classes.colonneHeader}>
                  <ImPhone />
                  <div style={{ marginLeft: "10px" }}>{medicin?.phone}</div>
                </div>
                {/* <div className={classes.colonneHeader}>
                  <ImLocation2 />
                  <div style={{ marginLeft: "10px" }}>Keur Massar</div>
                </div> */}
              </div>
            </Grid.Col>
            {/* <Grid.Col className={classes.GridCol} span={4}>
              <div className={classes.doctorName}>Mr. {medicin?.lastname}</div>
              <div>Dentist</div>
            </Grid.Col> */}
          </Grid>
          <Divider className={classes.Divider} size={7} />
          <div>
            <Grid
              style={{
                fontSize: "0.8rem",
                fontWeight: "650",
                margin: "2px 15px",
              }}
              mt="sm"
            >
              <Grid.Col className={classes.colPatient} span={12}>
                <div>Prénom : </div>
                <div>{prescription.dataPatient.firstname} </div>
              </Grid.Col>
              <Grid.Col className={classes.colPatient} span={12}>
                <div>Nom : </div>
                <div>{prescription.dataPatient.lastname} </div>
              </Grid.Col>
              <Grid.Col className={classes.colPatient} span={12}>
                <div>Teléphone : </div>
                <div>{prescription.dataPatient.phone} </div>
              </Grid.Col>
            </Grid>
          </div>
          <div className={classes.body} dangerouslySetInnerHTML={{__html :prescription.description}} />
          <Grid className={classes.Grid}>
            <Grid.Col span={6}>
              <div className={classes.signature}>Date</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className={classes.signature}>Signature</div>
            </Grid.Col>
          </Grid>
          <Divider my="md" variant="dashed" />
          <div className={classes.footer}></div>
        </Container>
      </div>
    </div>
  );
}

export default DetailPrescription;
