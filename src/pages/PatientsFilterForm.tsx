import { useTranslation } from 'react-i18next'
import { PatientFilterFormValues, PatientsFilterForm } from '../btypes/GeneralTypes'
import { statusOptions, statusOptionsKa } from '../bhelpers/SelectOptions'
import TextField from '../components/bui/binputs/TextField'
import PrimaryButton from '../components/bui/buttons/PrimaryButton'
import SecondaryButton from '../components/bui/buttons/SecondaryButton'
import DateRangeField from '../components/bui/binputs/DateRangeField'
import SelectField from '../components/bui/binputs/SelectField'

interface FilterFormProps {
  form: PatientsFilterForm
  onSubmit: (values: PatientFilterFormValues) => void
  onReset: () => void
}

const PatientFilterForm = ({ form, onSubmit, onReset }: FilterFormProps) => {
  const { t, i18n } = useTranslation()

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-3'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* სახელი */}
        <div className='w-full'>
          <TextField
            name='firstName'
            label={t('firstName')}
            placeholder={t('firstName')}
            value={form.values.firstName}
            handleChange={form.handleChange}
          />
        </div>

        {/* გვარი */}
        <div className='w-full'>
          <TextField
            name='lastName'
            label={t('lastName')}
            placeholder={t('lastName')}
            value={form.values.lastName}
            handleChange={form.handleChange}
          />
        </div>

        {/* პირადი ნომერი */}
        <div className='w-full'>
          <TextField
            name='personalId'
            label={t('personalId')}
            placeholder={t('personalId')}
            value={form.values.personalId}
            handleChange={form.handleChange}
          />
        </div>

        {/* რეგისტრაციის თარიღების რეინჯი */}
        <div className='w-full'>
          <DateRangeField
            name='DateRange'
            label={t('registrationRange')}
            startName='registrationStartDate'
            endName='registrationEndDate'
            startDate={form.values.registrationStartDate}
            endDate={form.values.registrationEndDate}
            setFieldValue={form.setFieldValue}
          />
        </div>

        {/* პაციენტის სტატუსი */}
        <div className='w-full'>
          <SelectField
            name='patientStatus'
            label={t('patientStatus')}
            value={form.values.patientStatus}
            onChange={form.setFieldValue}
            options={i18n.language === 'en' ? statusOptions : statusOptionsKa}
            placeholder={t('findByStatus')}
          />
        </div>
      </div>

      {/* ღილაკები */}
      <div className='flex justify-end gap-4 mt-4'>
        <PrimaryButton
          type='submit'
          onClick={() => onSubmit(form.values)}
          text={t('applyFilter')}
          disabled={!form.dirty}
        />
        <SecondaryButton type='button' onClick={() => onReset()} text={t('resetFilter')} />
      </div>
    </div>
  )
}

export default PatientFilterForm
