import { Container, Divider, Grid, Title, Badge,createStyles, Box } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import { ImLocation2, ImPhone } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";   
import { getUsers } from "../redux/services/usersServices";
import { btnStyle } from "../utils/linkStyle";
import { useReactToPrint } from "react-to-print";
import { toast } from 'react-hot-toast';
import { getRendezvous } from "../redux/services/rendezvousService";

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

function DetailRendezvous() {
  const { classes } = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const rendezvous = useSelector((state) => state.rendezvous);
  const medecins = useSelector((state) => state.users);
  const rv = rendezvous?.data?.find(({ _id }) => _id === id);
  const medecin = medecins?.users?.find(
    ({ _id }) => _id === rv?.userId
  );
    console.log(rv);
    // console.log(rv.dataPatient);
    console.log(medecin);
    console.log(medecins);

  useEffect(() => {
    dispatch(getRendezvous());
    dispatch(getUsers());
  }, [dispatch]);

 
  return (
    // <div className="table-container">
    //   <h1> Détail Rendez-vous </h1>
      
    //   <div style={{ width: "100%" }}>
        
    //       <Grid className={classes.Grid}>
    //         <Grid.Col className={classes.GridCol} span={12}>
    //         <div className={classes.doctorName}>Mr. {medicin?.lastname}</div>
    //           <div>Dentist</div>
    //           <div>
    //             <div className={classes.colonneHeader}>
    //               <ImPhone />
    //               <div style={{ marginLeft: "10px" }}>{medicin?.phone}</div>
    //             </div>
    //             {/* <div className={classes.colonneHeader}>
    //               <ImLocation2 />
    //               <div style={{ marginLeft: "10px" }}>Keur Massar</div>
    //             </div> */}
    //           </div>
    //         </Grid.Col>
    //         {/* <Grid.Col className={classes.GridCol} span={4}>
    //           <div className={classes.doctorName}>Mr. {medicin?.lastname}</div>
    //           <div>Dentist</div>
    //         </Grid.Col> */}
    //       </Grid>
    //       <Divider className={classes.Divider} size={7} />
    //       <div>
    //         <Grid
    //           style={{
    //             fontSize: "0.8rem",
    //             fontWeight: "650",
    //             margin: "2px 15px",
    //           }}
    //           mt="sm"
    //         >
    //           <Grid.Col className={classes.colPatient} span={12}>
    //             <div>Prénom : </div>
    //             <div>{prescription.dataPatient.firstname} </div>
    //           </Grid.Col>
    //           <Grid.Col className={classes.colPatient} span={12}>
    //             <div>Nom : </div>
    //             <div>{prescription.dataPatient.lastname} </div>
    //           </Grid.Col>
    //           <Grid.Col className={classes.colPatient} span={12}>
    //             <div>Teléphone : </div>
    //             <div>{prescription.dataPatient.phone} </div>
    //           </Grid.Col>
    //         </Grid>
    //       </div>
        
         
    //       <Divider my="md" variant="dashed" />
    //       <div className={classes.footer}></div>
     
    //   </div>
    // </div>

    <Container p="sm" sx={{ boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)' }}>
    <h2 style={{ margin: '0' }}>Detail Rendez-vous</h2>
    <Box p="sm">
        <h4>Informations du Rendez-vous</h4>
        <Grid style={{ fontSize: '0.8rem', fontWeight: '700' }} mt="sm">
            <Grid.Col span={12} sm={6}>Date Rendez-vous : <Badge color="pink">
              {rv.dateRendezvous}
            </Badge></Grid.Col>
            <Grid.Col span={12} sm={6}>Description : <Badge color="pink">
              {rv.description}
            </Badge>
            </Grid.Col>
            
            {/* <Grid.Col span={12} sm={6}>Email : <Badge color="pink">
            {statePatients?.data?.data?.email}
            </Badge></Grid.Col>
            <Grid.Col span={12} sm={6}>Teléphone : <Badge color="pink">
            {statePatients?.data?.data?.phone}
            </Badge></Grid.Col> */}
        </Grid>
    </Box>
    <Divider></Divider>
    <Box p="sm">
      <h4>Informations du Medecin </h4>
      <Grid style={{ fontSize: '0.8rem', fontWeight: '700' }} mt="sm">
            <Grid.Col span={12} sm={6}>Prenom : <Badge color="pink">
                {medecin.firstname}
                </Badge>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>Nom : <Badge color="pink">
              {medecin.lastname}
            </Badge>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>Telephone : <Badge color="pink">
              {medecin.phone}
            </Badge>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>Email : <Badge color="pink">
              {medecin.email}
            </Badge>
            </Grid.Col>
       
         
        </Grid>
    </Box>
    <Divider></Divider>
    <Box p="sm">
        <h4>Informations du Patient</h4>
        <Grid style={{ fontSize: '0.8rem', fontWeight: '700' }} mt="sm">
            <Grid.Col span={12} sm={6}>Prenom : <Badge color="pink">
              {rv.dataPatient.lastname}
            </Badge></Grid.Col>
            <Grid.Col span={12} sm={6}>Nom : <Badge color="pink">
            {rv.dataPatient.firstname}
            </Badge>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>Telephone : <Badge color="pink">
            {rv.dataPatient.phone}
            </Badge>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>Email : <Badge color="pink">
            {rv.dataPatient.email}
            </Badge>
            </Grid.Col>
          
        </Grid>
    </Box>

</Container>
  );
}

export default DetailRendezvous;
