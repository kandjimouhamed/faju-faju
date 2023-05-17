import { Badge, Box, Container, Divider, Grid } from '@mantine/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailPatient } from '../redux/services/patientService';

function DetailPatient() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const statePatients = useSelector((state) => state.patients)

  useEffect(() => {
    dispatch(detailPatient(id))
  },[dispatch])
  
  return (
    <div>
      <Container p="sm" sx={{ boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)' }}>
                <h2 style={{ margin: '0' }}>Detail du patient :</h2>
                <Box p="sm">
                    <h4>Informations personnelles du patient</h4>
                    <Grid style={{ fontSize: '0.8rem', fontWeight: '700' }} mt="sm">
                        <Grid.Col span={12} sm={6}>Prénom : <Badge color="pink">
                          {statePatients?.data?.data?.firstname}
                        </Badge></Grid.Col>
                        <Grid.Col span={12} sm={6}>Nom : <Badge color="pink">
                          {statePatients?.data?.data?.lastname}
                        </Badge>
                        </Grid.Col>
                        <Grid.Col span={12} sm={6}>Email : <Badge color="pink">
                        {statePatients?.data?.data?.email}
                        </Badge></Grid.Col>
                        <Grid.Col span={12} sm={6}>Teléphone : <Badge color="pink">
                        {statePatients?.data?.data?.phone}
                        </Badge></Grid.Col>
                    </Grid>
                </Box>
                <Divider></Divider>
                <Box p="sm">
                  <h4>Informations du consultation </h4>
                  <Grid style={{ fontSize: '0.8rem', fontWeight: '700' }} mt="sm">
                        <Grid.Col span={12} sm={6}>Prénom : <Badge color="pink"></Badge></Grid.Col>
                        <Grid.Col span={12} sm={6}>Nom : <Badge color="pink"></Badge></Grid.Col>
                        <Grid.Col span={12} sm={6}>Email : <Badge color="pink"></Badge></Grid.Col>
                        <Grid.Col span={12} sm={6}>Teléphone : <Badge color="pink"></Badge></Grid.Col>
                    </Grid>
                </Box>

        </Container>
    </div>
  )
}

export default DetailPatient
