import { Badge, Box, Button, Card, Grid, Group, Text } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'

const CardAvaiblity = ({ hours, _id, duration, motif }) => {
    return (
        <Grid.Col sm={6} lg={4}>
            <Box sx={{
                backgroundColor: '#80A7FF',
                textAlign: 'center',
                padding: '0.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
            }} >
                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Group position="apart" mt="md" mb="xs">
                        <Text
                            size={12}
                            weight={600}
                        >
                            {Number(duration) === 60 ? '1 h' : `${duration} '`}
                        </Text>
                        <Badge
                            color="pink"
                            variant="light"
                        >
                            {hours.timeStart + ' - ' + hours.timeEnd}
                        </Badge>
                    </Group>
                    <Text
                        size="sm"
                        color="dimmed"
                    >
                        {motif}
                    </Text>
                    <Button
                        component={Link}
                        to={_id}
                        variant="outline"
                        color="blue"
                        fullWidth
                        mt="md"
                        radius="md"
                    >
                        Choisir
                    </Button>
                </Card>
            </Box>
        </Grid.Col>
    )
}

export default CardAvaiblity