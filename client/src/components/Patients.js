import { Grid, Table } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { btnStyle } from '../utils/linkStyle'
import AddPatient from './AddPatient';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients } from '../redux/services/patientService';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import ModalConfirm from './ModalConfirm';

function Patients() {
    const [openedModal, setOpenedModal] = useState(false);
    const statePatients = useSelector((state) => state.patients?.data)
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



  useEffect(() => {
    dispatch(getPatients())
  },[dispatch])


  return (
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
            />
        ) : (
            <AddPatient
            setOpened={setOpenedModal}
            opened={openedModal}
            title='Ajouter un patient'
            patients={patients}
            setPatients={setPatients}
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
                <th>Email</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    statePatients.map((patient) => (
                        <tr key={patient._id}>
                            <td>{patient.firstname}</td>
                            <td>{patient.lastname}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.email}</td>
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

export default Patients
