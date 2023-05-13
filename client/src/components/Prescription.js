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


    useEffect(() => {
      dispatch(getPrescription())
    },[])

    
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
          <th>Element position</th>
          <th>Element name</th>
          <th>Symbol</th>
          <th>Atomic mass</th>
        </tr>
      </thead>
      <tbody>
        {
          prescriptions?.data?.data.map(({ description , _id , patientId}) => (
            <tr key={_id}>
              <td>{patientId.firstname}</td>
              <td>{patientId.lastname}</td>
              <td>{patientId.phone}</td>
              <td dangerouslySetInnerHTML={{__html : description}}/>
              <td>
                <AiOutlineDelete
                  onClick={() => setOuvre((open) => !open)}
                />
                {
                  ouvre && <ModalConfirm  
                  setOuvre={setOuvre} 
                  ouvre={ouvre} 
                  title={'Confirmer la suppréssion'} 
                  // handleDelete={handleDelete}
                  id={_id} />
                }
              </td>
            </tr>
          ))  
        }

      </tbody>
    </Table>
      </div>
    </div>
  )
}
