import React from 'react'
// mui
import {
  Card,
  Box,
  Stack,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Skeleton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import Image from 'next/image'

export default function HomeCard({ item, isLoading }) {
  const [openDialog, setOpenDialog] = React.useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  return (
    <>
      <Card
        sx={{
          p: 2,
          boxShadow: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
        }}
        onClick={handleOpenDialog}
      >
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px',
            height: 200,
          }}
        >
          {isLoading ? (
            <Skeleton
              variant='rounded'
              height={200}
              width='100%'
            />
          ) : (
            <Image
              src={item?.image?.url}
              alt={item.title}
              fill
              objectFit='cover'
            />
          )}

          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            px={1}
            pt={1}
          >
            {!isLoading && (
              <IconButton
                sx={{
                  borderRadius: '12px !important',
                  bgcolor: 'common.white',
                  ':hover': {
                    bgcolor: 'common.white',
                  },
                }}
              >
                <MoreVertOutlinedIcon />
              </IconButton>
            )}

            {!isLoading && (
              <Box
                sx={{
                  borderRadius: '12px',
                  bgcolor: 'rgb(196 251 199)',
                  zIndex: 999,
                  height: 30,
                  minWidth: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant='body2'
                  color='success.main'
                >
                  {item.status}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
        <Typography
          variant='subtitle1'
          fontWeight={600}
          mt={1}
          color='text.primary'
          noWrap
        >
          {isLoading ? <Skeleton variant='text' /> : item.title}
        </Typography>
        <Typography
          variant='h6'
          color='text.primary'
          fontWeight={600}
          noWrap
        >
          {isLoading ? (
            <Skeleton
              variant='text'
              width={120}
            />
          ) : (
            item.price
          )}
        </Typography>
      </Card>
      {!isLoading && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <DialogContent>
            <IconButton
              aria-label='close'
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Stack
              direction='row'
              alignItems='center'
              spacing={4}
            >
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  height: 200,
                  minWidth: 200,
                  maxWidth: 200,
                }}
              >
                <Image
                  src={item.image.url}
                  alt={item.name}
                  fill
                  objectFit='cover'
                />
              </Box>
              <Stack spacing={1}>
                <Typography
                  variant='subtitle1'
                  fontWeight={600}
                  color='text.primary'
                >
                  {item.title}
                </Typography>
                <Typography
                  variant='body1'
                  color='text.primary'
                >
                  {item.description}
                </Typography>
                <Typography
                  variant='h6'
                  color='text.primary'
                  fontWeight={600}
                  noWrap
                >
                  {item.price}
                </Typography>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
