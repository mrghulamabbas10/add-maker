import React, { useState } from 'react'
// mui
import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  FormHelperText,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

// icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import styled from '@emotion/styled'
import { useFormik, Form, FormikProvider } from 'formik'

// yup
import * as Yup from 'yup'
import UploadSingleFile from '../UploadSingleFile'

// api
import * as api from '../../services'
import { useMutation } from 'react-query'
// axios
import axios from 'axios'
import { useRouter } from 'next/navigation'

// style
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.PRIMARY,
  lineHeight: 3,
  fontWeight: 600,
  display: 'block',
}))

const STATUS_OPTIONS = ['Free', 'Paid']
const CATEGORY_OPTIONS = ['items wanted', 'items for sale', 'academic services']

export default function CreateAddForm() {
  const router = useRouter()
  const [state, setstate] = useState({
    loading: false,
    name: '',
    search: '',
    open: false,
  })

  const AddEvents = Yup.object().shape({
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required.'),
    title: Yup.string().required('Title is required.'),
    price: Yup.string().required('price is required.'),
    phone: Yup.string().required('Phone Number is required.'),
    description: Yup.string().required('description is required.'),
    slug: Yup.string().required('Slug is required.'),
    status: Yup.mixed().required('Status is required.'),
    category: Yup.string().required('Category is required.'),
    image: Yup.mixed().required('Image is required.'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      email: '',
      price: '',
      phone: '',
      description: '',
      slug: '',
      status: 'Free',
      category: 'items wanted',
      file: '',
      image: null,
    },
    enableReinitialize: true,
    validationSchema: AddEvents,
    onSubmit: async (values) => {
      try {
        mutate({
          ...values,
        })
      } catch (error) {
        console.log('error')
      }
    },
  })

  // event api
  const { mutate, isLoading } = useMutation(api.CreateAds, {
    retry: false,
    onSuccess: (data) => {
      alert('post done')
      router.push('/')
    },
    onError: (error) => {
      console.log('something went wrong')
    },
  })

  const {
    errors,
    values,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik

  const handleDrop = async (acceptedFiles) => {
    setstate({ ...state, loading: 2 })
    const file = acceptedFiles[0]
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    }
    setFieldValue('file', file)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'my-uploads')
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        const percentage = Math.floor((loaded * 100) / total)
        setstate({ ...state, loading: percentage })
      },
    }
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        config
      )
      .then(({ data }) => {
        setFieldValue('image', {
          _id: data.public_id,
          url: data.secure_url,
        })
        setstate({ ...state, loading: false })
      })
      .then(() => {
        setstate({ ...state, loading: false })
      })
  }

  const handleTitleChange = (event) => {
    const title = event.target.value
    const slug = title.toLowerCase().replace(/\s+/g, '-')
    formik.setFieldValue('slug', slug)
    formik.handleChange(event)
  }

  return (
    <FormikProvider value={formik}>
      <Form
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Typography
            variant='h1'
            color='text.primary'
            fontWeight={700}
            fontSize={36}
            mb={2}
          >
            Create New Ad
          </Typography>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
            >
              <LabelStyle
                component='label'
                htmlFor='title'
              >
                Title
              </LabelStyle>
              <TextField
                id='title'
                placeholder='Enter Your Title'
                fullWidth
                type='text'
                {...getFieldProps('title')}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <LabelStyle
                component='label'
                htmlFor='price'
              >
                price
              </LabelStyle>
              <TextField
                placeholder='Enter Your price'
                id='price'
                type='number'
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
                {...getFieldProps('price')}
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <LabelStyle
                component='label'
                htmlFor='slug'
              >
                Slug
              </LabelStyle>
              <TextField
                placeholder='Enter Your Slug'
                id='slug'
                type='slug'
                fullWidth
                {...getFieldProps('slug')}
                error={Boolean(touched.slug && errors.slug)}
                helperText={touched.slug && errors.slug}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <LabelStyle
                component='label'
                htmlFor='Category'
              >
                Category
              </LabelStyle>
              <RadioGroup
                aria-label='category'
                name='category'
                defaultValue={CATEGORY_OPTIONS[0]} // Set default value here
                {...getFieldProps('category')}
                error={Boolean(touched.category && errors.category)}
              >
                {CATEGORY_OPTIONS.map((category) => (
                  <FormControlLabel
                    key={category}
                    value={category}
                    control={<Radio />}
                    label={category}
                  />
                ))}
              </RadioGroup>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Box>
                <LabelStyle
                  component='label'
                  htmlFor='contact'
                >
                  Contact No
                </LabelStyle>
                <TextField
                  placeholder='Contact Number'
                  id='contact'
                  type='number'
                  fullWidth
                  {...getFieldProps('phone')}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Box>
              <Box>
                <LabelStyle
                  component='label'
                  htmlFor='email'
                >
                  Email
                </LabelStyle>
                <TextField
                  placeholder='Enter Your Email'
                  id='email'
                  type='email'
                  fullWidth
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>
              <Box>
                <LabelStyle
                  component='label'
                  htmlFor='Status'
                >
                  Status
                </LabelStyle>
                <Select
                  id='status'
                  fullWidth
                  native
                  {...getFieldProps('status')}
                  error={Boolean(touched.status && errors.status)}
                >
                  <option
                    value=''
                    style={{ display: 'none' }}
                  />
                  {STATUS_OPTIONS.map((status) => (
                    <option
                      key={status}
                      value={status}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {status}
                    </option>
                  ))}
                </Select>
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <LabelStyle
                component='label'
                htmlFor='description'
              >
                description
              </LabelStyle>
              <TextField
                placeholder='Enter Your description'
                id='description'
                type='text'
                fullWidth
                multiline
                rows={9}
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <LabelStyle
                component='label'
                htmlFor='image'
              >
                Image
              </LabelStyle>
              <UploadSingleFile
                id='image'
                file={values.image}
                onDrop={handleDrop}
                error={Boolean(touched.image && errors.image)}
                category
                accept='image/*'
                loading={state.loading}
              />
              {touched.image && errors.image && (
                <FormHelperText
                  error
                  sx={{ px: 2, mx: 0 }}
                >
                  {touched.image && errors.image}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Box mt={2}>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
              loading={isLoading}
            >
              Submit
            </LoadingButton>
          </Box>
        </Paper>
      </Form>
    </FormikProvider>
  )
}
