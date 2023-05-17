import { Box, Container, Divider, Grid } from '@mantine/core'
import React from 'react'
import { Badge } from 'tabler-icons-react'

function DetailPatient() {
  return (
    <div>
      <Container p="sm" sx={{ boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)' }}>
                <h2 style={{ margin: '0' }}>Detail du patient :</h2>
                <Box p="sm">
                    <h4>Informations personnelles du patient</h4>
                    <Grid style={{ fontSize: '0.8rem', fontWeight: '700' }} mt="sm">
                        <Grid.Col span={12} sm={6}>Prénom : <Badge color="pink">kljfhjt</Badge></Grid.Col>
                        <Grid.Col span={12} sm={6}>Nom : <Badge color="pink"></Badge></Grid.Col>
                        <Grid.Col span={12} sm={6}>Email : <Badge color="pink"></Badge></Grid.Col>
                        <Grid.Col span={12} sm={6}>Teléphone : <Badge color="pink"></Badge></Grid.Col>
                    </Grid>
                </Box>
                <Divider></Divider>
                <Box p="sm">
                <h4>Informations du consultation </h4>
                </Box>

        </Container>
    </div>
  )
}

export default DetailPatient
