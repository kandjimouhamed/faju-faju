import { Modal } from '@mantine/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePrescription } from '../redux/services/prescriptionService'
import { deletePatients } from '../redux/services/patientService'

function ModalConfirm({ouvre , setOuvre , title  , id , contenu , patient }) {

    const dispatch = useDispatch()
    const handleDelete = (id) => {
        dispatch(deletePrescription(id))
        setOuvre(false)
      }

    const handleDeletePatients = (id) => {
      dispatch(deletePatients(id))
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
