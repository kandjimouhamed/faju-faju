import { Modal } from '@mantine/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePrescription } from '../redux/services/prescriptionService'

function ModalConfirm({ouvre , setOuvre , title  , id  }) {

    const dispatch = useDispatch()
    const handleDelete = (id) => {
        dispatch(deletePrescription(id))
        setOuvre(false)
      }
    
  return (
    <div>
      <Modal onClose={() => setOuvre(false)}  opened={ouvre} title={title}>
        Voulez-vous supprimée cette préscription.
        <button onClick={() => handleDelete(id)}>Oui</button>
        <button onClick={() => setOuvre(false)}>Non</button>
      </Modal>
    </div>
  )
}

export default ModalConfirm
