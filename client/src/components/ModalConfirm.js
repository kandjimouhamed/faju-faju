import { Modal } from '@mantine/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePrescription } from '../redux/services/prescriptionService'
import { deletePatients } from '../redux/services/patientService'
import { toast } from 'react-hot-toast'

function ModalConfirm({ouvre , setOuvre , title  , id , contenu , patient }) {

    const dispatch = useDispatch()
    const handleDelete = (id) => {
        dispatch(deletePrescription(id))
        .then(() => {
          setOuvre(false)
          toast('Prescription supprimer avec success', {icon: '👏',});
        })
        .catch((error) => {
          console.log(error);
          toast('Error')
        })
      }

    const handleDeletePatients = (id) => {
      dispatch(deletePatients(id))
      .then(() => {
        setOuvre(false)
        toast('Patient supprimer avec success', {icon: '👏',});
      })
      .catch((error) => {
        console.log(error);
        toast('Error')
      })
      setOuvre(false)
    }
    
  return (
    <div>
      <Modal onClose={() => setOuvre(false)}  opened={ouvre} title={title}>
        {contenu}
        <button onClick={ patient ?  () => handleDeletePatients(id)  : () => handleDelete(id)}>Oui</button>
        <button onClick={() => setOuvre(false)}>Non</button>
      </Modal>
    </div>
  )
}

export default ModalConfirm
