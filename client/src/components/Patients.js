import { Grid, Loader, Table, createStyles } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { btnStyle } from '../utils/linkStyle'
import AddPatient from './AddPatient';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients } from '../redux/services/patientService';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import ModalConfirm from './ModalConfirm';
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';


const useStyles = createStyles((theme) => ({
    button: {
      color: theme.white,
      backgroundColor: theme.colors.blue[6],
      border: 0,
      borderRadius: theme.radius.md,
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      cursor: 'pointer',
      margin: theme.spacing.md,
  
      // Use pseudo-classes just like you would in Sass
      '&:hover': {
        backgroundColor: theme.colors.blue[9],
      },
  
      '&:not(:first-of-type)': {
        backgroundColor: theme.colors.violet[6],
  
        // pseudo-classes can be nested
        '&:hover': {
          backgroundColor: theme.colors.violet[9],
        },
      },
    },
    div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height: "100vh"
    }
  }));

function Patients() {

    const navigate = useNavigate()
    const {classes}  = useStyles()
    const [openedModal, setOpenedModal] = useState(false);
    const statePatients = useSelector((state) => state.patients)
    const [ouvre , setOuvre] = useState(false)
    const [id , setId] = useState(null)
    const [mode , setMode] = useState("")
    const dispatch = useDispatch()
    const [patients , setPatients] = useState({
        firstname : "",
        lastname : "",
        phone : "",
        email : "",
        password : "1234",
        role: 'client'
    })
    const [error , setError] = useState("")

  useEffect(() => {
    dispatch(getPatients())
  },[dispatch])


  const handleDetail = (id) => {
    navigate(`/dashboard/detail-patient/${id}`)
  }

  return (
    <>
        {
            patients.getPatientStatus === "pending" ? (
                <div className={classes.div}>
                    <Loader color="red" size="xl" />
                </div>
            ) : (
                <div className='table-container'>
                    <h1>Patients</h1>
                    <Grid justify="flex-end">
                    <button
                    onClick={
                        () => {
                            setOpenedModal((open) => !open)
                            setPatients({
                                firstname : "",
                                lastname : "",
                                phone : "",
                                email : "",
                                password : "1234",
                                role: 'client'
                            })
                            setError("")
                        }
                    } 
                    style={btnStyle}
                    >
                    Ajouter un patient
                    </button>
                </Grid>
                {
                    openedModal && mode === "update" ? (
                        <AddPatient
                            setOpened={setOpenedModal}
                            opened={openedModal}
                            title='Modifier un patient'
                            patients={patients}
                            setPatients={setPatients}
                            setError={setError}
                            error={error}
                        />
                    ) : (
                        <AddPatient
                            setOpened={setOpenedModal}
                            opened={openedModal}
                            title='Ajouter un patient'
                            patients={patients}
                            setPatients={setPatients}
                            setError={setError}
                            error={error}
                        />
                    )
                }

                <div>
                    <Table>
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
                            {
                                statePatients?.data.map((patient) => (
                                    <tr key={patient?._id}>
                                        <td>{patient?.firstname}</td>
                                        <td>{patient?.lastname}</td>
                                        <td>{patient?.phone}</td>
                                        {/* <td>{patient?.email}</td> */}
                                        <td className='d-flex'>
                                    <div>
                                    <AiOutlineDelete
                                        onClick={() => {
                                        setOuvre((open) => !open)
                                        setId(patient._id)
                                        }}
                                    />
                                    </div>
                                    <div className=''>
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
                                    </div>

                                </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </Table>
                    {   
                    ouvre && <ModalConfirm 
                    setOuvre={setOuvre} 
                    ouvre={ouvre}
                    title={'Confirmer la suppréssion'} 
                    contenu={'Vous vous supprimer cette patient.'}
                    patient={"patient"}
                    // handleDelete={handleDelete}
                    id={id} />
                    }
                </div>
                </div>
            )
        }
    </>


  )
}

export default Patients
