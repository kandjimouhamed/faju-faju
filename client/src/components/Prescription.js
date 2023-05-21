import { Button, Grid, Loader, Table, Text, createStyles } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {btnStyle} from '../utils/linkStyle'
import AddPrescription from './AddPrescription';
import { useDispatch, useSelector } from 'react-redux';
import { deletePrescription, getPrescription } from '../redux/services/prescriptionService';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ModalConfirm from './ModalConfirm';
import { getPatients } from '../redux/services/patientService';
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { openConfirmModal } from '@mantine/modals';
import { toast } from 'react-hot-toast';


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

  const navigate = useNavigate()
  const {classes}  = useStyles()
  const [openedModal, setOpenedModal] = useState(false);
  const [ouvre , setOuvre] = useState(false)
  const dispatch = useDispatch()
  const prescriptions = useSelector((state) => state.prescription)
  const currentUser = useSelector((state) => state.user);
  const [id , setId] = useState(null)
  const [ mode , setMode] = useState('') 
  const [error , setError] = useState("")
  const [prescription , setPrescription ] = useState({
    description  : "",
    patientId : "",
    dataPatient : {}
  })

  
  useEffect(() => {
    dispatch(getPatients())
    dispatch(getPrescription())
  },[dispatch])


  const openDeleteModal = (prescription) =>
    openConfirmModal({
      title: 'Supprimer la préscription',
      centered: true,
      children: (
        <Text size="sm">
          Êtes-vous sûr de vouloir supprimer la préscription de <strong>{prescription?.dataPatient?.firstname} {prescription?.dataPatient?.lastname}</strong>  ?
        </Text>
      ),
      labels: { confirm: 'Supprimé', cancel: "Annulé" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        dispatch(deletePrescription(prescription._id))
        .then(() => {
          toast('Prescription supprimer avec success', {icon: '👏',});
        })
        .catch((error) => {
          console.log(error);
          toast('Error')
        })
      },
  });

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
            onClick={() => navigate("/dashboard/addPrescription")
              // {
              // setPrescription({
              //   description  : "",
              //   patientId : "",
              //   dataPatient : {}
              // })
              // setOpenedModal((open) => !open)
              // setError("")
              // }
            } 
            style={btnStyle}
            >
              Effectuer une préscription médicale
            </button>
          </Grid>
          {/* {openedModal  && mode === "update" ? (
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
              
            )} */}

          <div>
          <Table>
          <thead>
            <tr>
              <th>Prénom patient</th>
              <th>Nom patient</th>
              <th>Numéro téléphone</th>
              {/* <th>Prescription</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              prescriptions?.data
              ?.filter((item) => item.userId === currentUser._id)
              ?.map((prescription) => (
                <tr key={prescription?._id}>
                  <td>{prescription?.dataPatient?.firstname}</td>
                  <td>{prescription?.dataPatient?.lastname}</td>
                  <td>{prescription?.dataPatient?.phone}</td>
                  {/* <td dangerouslySetInnerHTML={{__html :prescription.description}}/> */}
                  <td className='d-flex'>
                    {/* <div>
                    <Button onClick={openDeleteModal} color="red">Delete account</Button>;
                    </div> */}
                    <div>
                      <AiOutlineDelete
                        
                        onClick={ 
                          // openDeleteModal
                          () => {
                          // setOuvre((open) => !open)
                          // setId(prescription._id)
                          openDeleteModal(prescription)
                        }
                      }
                      />
                    </div>
                    <div className=''>
                    <AiOutlineEdit 
                      onClick={() => navigate(`/dashboard/prescription/${prescription?._id}`)
                        // {
                        // setOpenedModal((open) => !open)
                        // setMode('update')
                        // setPrescription(prescription)
                        // }
                      }
                    />
                    </div>
                    <div className=''>
                      <GrFormView 
                        onClick={() => navigate(`/dashboard/detail-prescription/${prescription?._id}`)}
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
