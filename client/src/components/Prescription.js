import { Grid, Table } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {btnStyle} from '../utils/linkStyle'
import AddPrescription from './AddPrescription';
import { useDispatch, useSelector } from 'react-redux';
import { getPrescription , deletePrescription } from '../redux/services/prescriptionService';
import { AiOutlineDelete } from "react-icons/ai";
import ModalConfirm from './ModalConfirm';

export default function Prescription() {
    const [openedModal, setOpenedModal] = useState(false);
    const [ouvre , setOuvre] = useState(false)
    const dispatch = useDispatch()
    const prescriptions = useSelector((state) => state.prescription)
    const [id , setId] = useState(null)
    
    
    
    useEffect(() => {
      console.log(prescriptions);
      dispatch(getPrescription())
    },[dispatch])


    // const handleDelete = (id) => {
    //   dispatch(deletePrescription(id))
    //   setOuvre(false)
    // }

  return (
    <div className='table-container'>
      <h1>Prescription</h1>
      <Grid justify="flex-end">
        <button
         onClick={() => setOpenedModal((open) => !open)} style={btnStyle}
         >
          Ajouter une préscription médicale
        </button>
      </Grid>
      {openedModal && <AddPrescription opened={openedModal} setOpened={setOpenedModal} />}

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
          prescriptions?.data.map(({ description , _id , patientId}) => (
            <tr key={_id}>
              <td>{patientId.firstname}</td>
              <td>{patientId.lastname}</td>
              <td>{patientId.phone}</td>
              <td dangerouslySetInnerHTML={{__html : description}}/>
              <td>
                <AiOutlineDelete
                  onClick={() => {
                    setOuvre((open) => !open)
                    setId(_id)
                  }}
                />
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
          // handleDelete={handleDelete}
          id={id} />
        }
      </div>
    </div>
  )
}
