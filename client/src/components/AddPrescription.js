import { Input, Modal, createStyles } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPatients } from '../redux/services/patientService';
import ReactQuill from 'react-quill'
import { btnStyle } from '../utils/linkStyle';
import { addPrescription } from '../redux/services/prescriptionService';
import { set } from 'mongoose';


const useStyles = createStyles((theme) => ({
  // button: {
  //   color: theme.white,
  //   backgroundColor: theme.colors.blue[6],
  //   border: 0,
  //   borderRadius: theme.radius.md,
  //   padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  //   cursor: 'pointer',
  //   margin: theme.spacing.md,

  //   // Use pseudo-classes just like you would in Sass
  //   '&:hover': {
  //     backgroundColor: theme.colors.blue[9],
  //   },

  //   '&:not(:first-of-type)': {
  //     backgroundColor: theme.colors.violet[6],

  //     // pseudo-classes can be nested
  //     '&:hover': {
  //       backgroundColor: theme.colors.violet[9],
  //     },
  //   },
  // },

  input : {
    margin : "20px 0"
  }
}));



function AddPrescription({opened, setOpened}) {

  const modules = {
    toolbar : [
      [{ headers : [1, 2 , 3 , 4 , 5 ,6 ,false] }],
      [{font : []}],
      [{  size : [] }],
      ['bold' , 'italic' , 'underline' , 'strike' , "blockquote"],
      [
        {list : "ordered"},
        {list : "bullet"},
        {indent : "-1"},
        {indent : "+1"}
      ],
      ["link" , "image" , "video"]
    ]
  }
  
  const {classes} = useStyles()
  const dispatch = useDispatch()
  const [patientId , setPatientId] = useState()
  const [description , setDescription] = useState('')
  const currentUser = useSelector(state => state.user)
  const prescription = useSelector(state => state.prescription?.data)

  const patients = useSelector((state) => state.patients?.data)

  useEffect(() => {
    dispatch(getPatients())
  },[dispatch])


  const handleSubmit = (e) => {
    e.preventDefault()
    const newPrescription = {
      patientId : patientId ,
      userId : currentUser._id,
      description : description
    }
    
    dispatch(addPrescription(newPrescription))
    .then((res) => {
      setPatientId("")
      setDescription("")
      setOpened(false)
      if(res.type === 'prescription/getPrescription/fulfilled') {
        setOpened(false)
        
      }
    }) .catch((error) => {
      console.log('error' , error);
    })
  }


  return (
    <div>
      <Modal 
      radius="lg"
      overlayOpacity={0.43}
      overlayBlur={2}
      opened={opened}
      onClose={() => setOpened(false)} 
      title="Ajouter une préscription"
    >
    <form onSubmit={handleSubmit}>
      <Input.Wrapper id={'3'} label="Selectionnez un patient" required maw={320} mx="auto">
        <Input component="select" value={patientId} onChange={(e) => setPatientId(e.target.value)} rightSection={<IconChevronDown size={14} stroke={1.5} />}>
            <option value=''>default</option>
            {
              patients && patients.map(({_id , firstname , lastname}) => (
                <option key={_id} value={_id}>{firstname} {lastname}</option>
              ))
            }
        </Input>
      </Input.Wrapper>
      <Input.Wrapper className={classes.input} id={'3'} label="Description du medecin" required maw={320} mx="auto">
      {/* <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      /> */}
      <ReactQuill
        theme='snow'
        value={description}
        onChange={setDescription}
        className='editor-input'
        modules={modules}
      />
      </Input.Wrapper>
      <button 
        // disabled={loading}
       style={{ ...btnStyle, width: '100%', padding: '0.8rem' }} type="submit">
                        {/* {
                            !loading ? "Ajouter" : <Loader color="white" variant="dots" />
                        } */}
                        Ajouter
      </button>
    </form>
      </Modal>
    </div>
  )
}

export default AddPrescription
