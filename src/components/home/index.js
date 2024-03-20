import React, { useState } from 'react'
import { Typography, Stack, Button, alpha, Grid, Box } from '@mui/material'
import Filter from './filter'
import HomeCard from '../cards/homeCard'
import NextLink from 'next/link'

// api
import * as api from '../../services'
import { useQuery } from 'react-query'

export default function Home() {
  const [state, setState] = useState(0)

  const { data, isLoading } = useQuery(['get-ads', state], () =>
    api.GetAds(
      state === 0
        ? 'items wanted'
        : state === 1
        ? 'items for sale'
        : 'academic services'
    )
  )

  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography
          variant='h5'
          fontWeight={600}
          color='text.primary'
        >
          My Ads
        </Typography>
        <Button
          variant='contained'
          size='large'
          color='primary'
          sx={{
            borderRadius: '12px',
            textTransform: 'capitalize',
          }}
          LinkComponent={NextLink}
          href='/create-ad'
        >
          New ad
        </Button>
      </Stack>
      <Stack
        direction='row'
        alignItems='center'
        spacing={0.5}
        sx={{
          borderRadius: '12px',
          bgcolor: '#fff',
          p: 0.5,
          mt: 3,
          button: {
            borderRadius: '12px',
            textTransform: 'capitalize',
          },
        }}
      >
        <Button
          variant='text'
          size='large'
          fullWidth
          color={state === 0 ? 'primary' : 'inherit'}
          sx={
            state === 0 && {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            }
          }
          onClick={() => setState(0)}
        >
          Items Wanted
        </Button>
        <Button
          variant='text'
          size='large'
          fullWidth
          onClick={() => setState(1)}
          sx={
            state === 1 && {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            }
          }
          color={state === 1 ? 'primary' : 'inherit'}
        >
          Items for Sale
        </Button>
        <Button
          variant='text'
          size='large'
          fullWidth
          onClick={() => setState(2)}
          sx={
            state === 2 && {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            }
          }
          color={state === 2 ? 'primary' : 'inherit'}
        >
          Academic Services
        </Button>
      </Stack>
      <Filter />
      <Box my={3}>
        <Grid
          container
          spacing={2}
        >
          {(isLoading ? Array.from(new Array(6)) : data?.data).map(
            (item, index) => (
              <Grid
                item
                xs={6}
                md={4}
                key={index}
              >
                <HomeCard
                  item={item}
                  isLoading={isLoading}
                />
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </>
  )
}
