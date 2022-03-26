import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Input,
} from '@mui/material';
import '../styles/stars.css';
import InputField from '../../general/inputField';
import SelectField from '../../general/selectField';
import {
  ASSIGNEES,
  BAZ_COMPUTERS,
  BLOCKS,
  PLATFORMS,
  RAAM_COMPUTERS,
  SEVERITIES,
} from '../../../types/enums';

interface starProps {
  isOpen: boolean;
  toggleModal: (param: boolean) => void;
  addStar: (star: unknown) => void;
}

const AddStar = ({ isOpen, toggleModal, addStar }: starProps) => {
  const [computers, setComputers] = useState<
    RAAM_COMPUTERS[] | BAZ_COMPUTERS[]
  >(Object.values(RAAM_COMPUTERS));

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('נא למלא את שם הסטאר')
      .max(40, 'שם הסטאר לא יעלה על 40 תווים'),
    severity: Yup.string().required('נא למלא חומרה'),
    assignee: Yup.string().required('נא למלא אחראי'),
    block: Yup.string().required('נא למלא בלוק'),
    event: Yup.string().required('נא למלא שם אירוע/גיחה'),
    desc: Yup.string()
      .required('נא למלא תיאור')
      .max(100, 'תיאור הסטאר לא יכול לעלות על 100 תווים'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const fields = [
    {
      field: 'name',
      type: 'input',
    },
    {
      field: 'severity',
      type: 'select',
    },
    {
      field: 'event',
      type: 'input',
    },
    {
      field: 'block',
      type: 'select',
    },
    {
      field: 'desc',
      type: 'input',
    },
    {
      field: 'assignee',
      type: 'select',
    },
    {
      field: 'computer',
      type: 'select',
    },
  ];

  const handleAddStar = (data: any) => {
    toggleModal(false);
    addStar(data);
    fields.map((f) => resetField(f.field));
  };

  const handlePlatformChange = (e: any) => {
    if (e.target.value === PLATFORMS.RAAM) {
      setComputers(Object.values(RAAM_COMPUTERS));
    } else {
      setComputers(Object.values(BAZ_COMPUTERS));
    }
  };

  return (
    <Dialog
      className="addStar"
      sx={{ textAlign: 'right' }}
      open={isOpen}
      onClose={() => toggleModal(false)}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '100%',
        justifyContent: 'space-between' }}
      >
        <DialogTitle sx={{ flexGrow: 1 }}>הוסף סטאר חדש</DialogTitle>
        <FormControl sx={{ width: '20%', margin: '10px' }}>
          <InputLabel>פלטפורמה</InputLabel>
          <Select
            variant="standard"
            input={<Input />}
            defaultValue={PLATFORMS.RAAM}
            {...register('platform')}
            onChange={handlePlatformChange}
            error={errors.platform?.message}
          >
            {_.map(PLATFORMS, (value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="inherit" color="textSecondary">
          {errors.platform?.message}
        </Typography>
      </div>
      <Divider />
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={8}>
              <InputField
                fullWidth
                field="name"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="severity"
                fieldValues={SEVERITIES}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <InputField
                fullWidth
                field="event"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                field="block"
                fieldValues={BLOCKS}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: '15px' }}>
            <InputField
              fullWidth
              field="desc"
              register={register}
              errors={errors}
            />
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <SelectField
                field="assignee"
                fieldValues={ASSIGNEES}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                field="computer"
                fieldValues={computers}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => toggleModal(false)}
        >
          בטל
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(handleAddStar)}
        >
          הוסף
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStar;
