import { Grid, Loader, Table, createStyles } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {btnStyle} from '../utils/linkStyle'
import AddPrescription from './AddPrescription';
import { useDispatch, useSelector } from 'react-redux';
import { getPrescription } from '../redux/services/prescriptionService';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ModalConfirm from './ModalConfirm';
import { getPatients } from '../redux/services/patientService';


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

export default function Prescription() {

  const {classes}  = useStyles()
  const [openedModal, setOpenedModal] = useState(false);
  const [ouvre , setOuvre] = useState(false)
  const dispatch = useDispatch()
  const prescriptions = useSelector((state) => state.prescription)
  const [id , setId] = useState(null)
  const [ mode , setMode] = useState('') 
  const [prescription , setPrescription ] = useState({
    description  : "",
    patientId : ""
  })
  const [error , setError] = useState("")
  
  
  useEffect(() => {
    dispatch(getPatients())
    dispatch(getPrescription())
  },[dispatch])


  return (
    <>
    {
      prescriptions.getPrescriptionStatus ==="pending" ? (
        <div className={classes.div}>
          <Loader color="red" size="xl" />
        </div>
      ) : (
        <div className='table-container'>
          <h1>Prescription</h1>
          <Grid justify="flex-end">
            <button
            onClick={() => {
              setPrescription({
                description  : "",
                patientId : ""
              })
              setOpenedModal((open) => !open)
              setError("")
            }} 
            style={btnStyle}
            >
              Ajouter une préscription médicale
            </button>
          </Grid>
          {openedModal  && mode === "update" ? (
            <AddPrescription opened={openedModal}
              setOpened={setOpenedModal}
              title="Modifier une préscription"
              mode={mode}
              prescription={prescription}
              setPrescription={setPrescription}
              boutton="Modifier"
              error={error}
              setError={setError}
            />
          ) : (
            <AddPrescription 
              opened={openedModal}
              prescription={prescription}
              setPrescription={setPrescription}
              setOpened={setOpenedModal}
              title="Ajouter une préscription"
              boutton="Ajouter"
              error={error}
              setError={setError}
            />
              
            )}

          <div>
          <Table>
          <thead>
            <tr>
              <th>Prénom patient</th>
              <th>Nom patient</th>
              <th>Numéro téléphone</th>
              <th>Prescription</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              prescriptions?.data.map((prescription) => (
                <tr key={prescription?._id}>
                  <td>{prescription?.patientId?.firstname}</td>
                  <td>{prescription?.patientId?.lastname}</td>
                  <td>{prescription?.patientId?.phone}</td>
                  <td dangerouslySetInnerHTML={{__html :prescription.description}}/>
                  <td className='d-flex'>
                    <div>
                      <AiOutlineDelete
                        onClick={() => {
                          setOuvre((open) => !open)
                          setId(prescription._id)
                        }}
                      />
                    </div>
                    <div className=''>
                    <AiOutlineEdit 
                      onClick={() => {
                        setOpenedModal((open) => !open)
                        setMode('update')
                        setPrescription(prescription)
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
              contenu={'Vous vous supprimer cette préscription.'}
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
