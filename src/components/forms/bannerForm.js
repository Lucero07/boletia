import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addBanner, editBanner } from "../../features/banners/bannersSlice";
import { v4 as uuid } from "uuid";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Typography } from "@mui/material";
import ImageDialog from "../dialogs/ImageUpload";
import { Stack } from "@mui/system";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";

const validationSchema = yup.object({
  title: yup
    .string('Ingresa el título')
    .required('El título es requerido'),
  description: yup
    .string('Ingresa la descripcion')
    .required('La descripción es requerida'),
  purchase: yup
    .string('Ingresa la URL de compra')
    .url('URL invalida')
    .required('La descripción es requerida'),
  date: yup
    .date('Ingresa la fecha')
    .required('La fecha es requerida'),
  time: yup
    .date('Ingresa el horario')
    .required('El horario es requerido'),
  desktop: yup
    .string('Ingresa la imagen')
    .required('La image es requerida'),
  tablet: yup
    .string('Ingresa un título')
    .required('El título es requerido'),
  mobile: yup
    .string('Ingresa un título')
    .required('El título es requerido'),
});

function BannerForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const banners = useSelector((state) => state.banners);
  const [banner, setBanner] = useState(params.id ? banners.find((banner) => banner.id === params.id) : {
    title: '',
    description: '',
    purchase: '',
    date: new Date(),
    time: new Date(),
    desktop: '',
    tablet: '',
    mobile: ''
  });


  const formik = useFormik({
    initialValues: banner,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (params.id) {
        dispatch(editBanner({ ...values, id: params.id }));
      } else {
        dispatch(
          addBanner({
            ...values,
            id: uuid(),
          })
        );
      }
      navigate('/');
    },
  });
  const createURL = (value) => {
    formik.setFieldValue('desktop', value[0].file.name)
  }

  useEffect(() => {
    if (params.id) {
      setBanner(banners.find((banner) => banner.id === params.id));
    }
  }, [params, banners]);

  return (
    <Grid container justifyContent='center' spacing={2}>
      <Grid item>
      </Grid>
      <Grid item>
        <Paper
          sx={{
            padding: (theme) => theme.spacing(2),
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Typography variant='h5' align='center'> Por favor, ingresa los datos correspondientes al nuevo banner que deseas crear.</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} direction={{ xs: 'column' }}>
              <TextField
                size='small'
                fullWidth
                id='title'
                name='title'
                label='Título'
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                size='small'
                fullWidth
                id='description'
                name='description'
                label='Descripción del evento'
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              <TextField
                size='small'
                fullWidth
                id='purchase'
                name='purchase'
                label='Url para comprar'
                value={formik.values.purchase}
                onChange={formik.handleChange}
                error={formik.touched.purchase && Boolean(formik.errors.purchase)}
                helperText={formik.touched.purchase && formik.errors.purchase}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                <MobileTimePicker
                  label="Horario"
                  value={formik.values.time}
                  onChange={(newValue) => {
                    formik.setFieldValue('time', newValue);
                  }}
                  renderInput={(params) => <TextField {...params}
                    error={formik.touched.time && Boolean(formik.errors.time)}
                    helperText={formik.touched.time && formik.errors.time} />}
                />
                <MobileDatePicker
                  label="Fecha"
                  value={formik.values.date}
                  onChange={(newValue) => {
                    formik.setFieldValue('date', newValue);
                  }}
                  renderInput={(params) => <TextField {...params}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date} />}
                />
              </LocalizationProvider>
              <ImageDialog textButton='escritorio (L)' onChange={(value) => createURL(value)} imageName={formik.values.desktop ?? ''} />
              <ImageDialog textButton='tablet (M)' onChange={(value) => formik.setFieldValue('tablet', value[0].file.name)} imageName={formik.values.tablet ?? ''} />
              <ImageDialog textButton='mobile (S)' onChange={(value) => formik.setFieldValue('mobile', value[0].file.name)} imageName={formik.values.mobile ?? ''} />
            </Stack>
            <Stack spacing={2} mt={2}>
              <Button color='primary' variant='contained' fullWidth type='submit' >
                Guardar
              </Button>
            </Stack>
          </form>
        </Paper>
      </Grid>
      <Grid item>
      </Grid>
    </Grid>
  );
}

export default BannerForm;