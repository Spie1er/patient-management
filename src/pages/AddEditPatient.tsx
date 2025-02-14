import TextField from '../components/ui/inputs/TextField'
import SelectField from '../components/ui/inputs/SelectField'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../components/ui/buttons/PrimaryButton'
import { useState } from 'react'
import { conditions, countries } from '../helpers/SelectOptions'
import OtpModal from '../components/ui/modals/OtpModal'
import ButtonWithIcon from '../components/ui/buttons/ButtonWithIcon'
import SuccessButton from '../components/ui/buttons/SuccessButton'
import { useParams } from 'react-router-dom'
import usePatient from '../hooks/usePatient'
import DatePickerField from '../components/ui/inputs/DatePickerField'
import { Gender, PatientForm } from '../Types/GeneralTypes'
import { useFormik } from 'formik'
import RadioField from '../components/ui/inputs/RadioField'
import { IoMdAddCircle, IoMdTrash } from 'react-icons/io'
import { toast } from 'react-toastify'
import FinancialRecordModal from '../components/ui/modals/FinancialRecordModal'

const AddEditPatient = () => {
  const [otpModalOpen, setOtpModalOpen] = useState(false)
  const [openFinancialRecord, setOpenFinancialRecord] = useState(false)

  const { t, i18n } = useTranslation()
  const { id } = useParams()

  const hook = usePatient(Number(id))

  const form: PatientForm = useFormik({
    initialValues: hook.state,
    enableReinitialize: true,
    onSubmit: () => {},
  })

  // დამი დეითა, შეიცვლება როცა წამოვა მონაცემები პროფილიდან
  const doctorName = 'ქეთევან ამილახვარი'
  const clinicName = 'კლინიკის სახელი'
  const validOtpCode = '45678'

  const handleAddSymptom = () => {
    form.setFieldValue('condition.symptoms', [
      ...form.values.condition.symptoms,
      { id: Date.now(), symptomName: '', symptomNameKa: '', symptomDate: null, painLevel: 50 },
    ])
  }

  const handleRemoveSymptom = (index: number) => {
    const updatedSymptoms = form.values.condition.symptoms.filter((_, i) => i !== index)
    form.setFieldValue('condition.symptoms', updatedSymptoms)
  }

  console.log(form.values)
  return (
    <>
      {otpModalOpen && (
        <OtpModal
          digitNumber={5}
          isOpen={otpModalOpen}
          onClose={() => setOtpModalOpen(false)}
          onConfirm={(value) => {
            if (value === validOtpCode) {
              form.setFieldValue('phoneVerified', true)
            } else {
              toast.error(t('otpFail'))
            }
          }}
        />
      )}

      {openFinancialRecord && (
        <FinancialRecordModal
          isOpen={openFinancialRecord}
          onClose={() => setOpenFinancialRecord(false)}
          existingRecords={form.values.financialRecords}
          setFieldValue={form.setFieldValue}
        />
      )}

      <div className='max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-10 mb-10'>
        <div className='mb-6 text-center'>
          <h2 className='text-xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('doctor')} {doctorName} - {clinicName}
          </h2>
        </div>

        <div className='p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md mb-6'>
          <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4'>
            {t('personalInformation')}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <TextField
                name='firstNameKa'
                label='სახელი'
                placeholder='შეიყვანეთ სახელი'
                handleChange={form.handleChange}
                value={form.values.firstNameKa}
                error={form.errors.firstNameKa}
              />
            </div>

            <div>
              <TextField
                name='lastNameKa'
                label='გვარი'
                placeholder='შეიყვანეთ გვარი'
                handleChange={form.handleChange}
                value={form.values.lastNameKa}
                error={form.errors.lastNameKa}
              />
            </div>

            <div>
              <TextField
                name='firstName'
                label='First Name (English)'
                placeholder='Enter first name'
                handleChange={form.handleChange}
                value={form.values.firstName}
                error={form.errors.firstName}
              />
            </div>

            <div>
              <TextField
                name='lastName'
                label='Last Name (English)'
                placeholder='Enter last name'
                handleChange={form.handleChange}
                value={form.values.lastName}
                error={form.errors.lastName}
              />
            </div>

            <div>
              <DatePickerField
                name='birthDate'
                label={t('birthDate')}
                setFieldValue={form.setFieldValue}
                value={form.values.birthDate}
                error={form.errors.birthDate}
              />
            </div>

            <div>
              <div>
                <label htmlFor='gender' className='block text-gray-700 dark:text-gray-300 mt-2'>
                  {t('gender')}
                </label>
                <div className='flex gap-4 mt-2'>
                  <RadioField
                    id='gender'
                    name='gender'
                    radiolabel={t('male')}
                    checked={form.values.gender === Gender.MALE}
                    onChange={form.setFieldValue}
                    value={Gender.MALE}
                  />
                  <RadioField
                    name='gender'
                    radiolabel={t('female')}
                    checked={form.values.gender === Gender.FEMALE}
                    onChange={form.setFieldValue}
                    value={Gender.FEMALE}
                  />
                </div>
              </div>
            </div>

            <div>
              <SelectField
                name='countryKa'
                label={t('country')}
                options={countries}
                onChange={form.setFieldValue}
                placeholder={t('selectCountry')}
                value={form.values.countryKa}
                error={form.errors.countryKa}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <TextField
                name='phoneNumber'
                label={t('phoneNumber')}
                placeholder='5XX XXX XXX'
                handleChange={form.handleChange}
                value={form.values.phoneNumber}
                error={form.errors.phoneNumber}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '74%',
                  right: '8px',
                  transform: 'translateY(-50%)',
                }}
              >
                {form.values.phoneVerified ? (
                  <span className='px-2 py-1 rounded text-xs bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100'>
                    {t('verified')}
                  </span>
                ) : (
                  <PrimaryButton
                    onClick={() => setOtpModalOpen(true)}
                    disabled={form.values.phoneNumber.length < 9}
                    text={t('sendCode')}
                    size='small'
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* პაციენტის მდგომარეობის ქარდი */}
        <div className='p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md mb-6'>
          <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4'>
            {t('patientCondition')}
          </h3>

          {/* Condition Selection */}
          <SelectField
            name='condition.conditionName'
            label={t('condition')}
            options={conditions}
            onChange={form.setFieldValue}
            placeholder={t('selectCondition')}
            value={form.values.condition.conditionName}
          />

          {/* Add Symptom Button (Visible Only When Condition is Selected) */}
          {form.values.condition.conditionName && (
            <div className='w-full flex justify-end mt-2'>
              <ButtonWithIcon
                type='button'
                size='small'
                onClick={handleAddSymptom}
                text={t('addSymptom')}
                icon={<IoMdAddCircle className='mr-2 text-lg' />}
              />
            </div>
          )}

          {form.values.condition.conditionName && form.values.condition.symptoms.length > 0 && (
            <div className='mt-4 space-y-4'>
              {form.values.condition.symptoms.map((symptom, index) => (
                <div
                  key={symptom.id}
                  className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md relative'
                >
                  {/* Delete ღილაკი */}
                  <button
                    type='button'
                    onClick={() => handleRemoveSymptom(index)}
                    className='absolute top-2 right-2 text-red-500 hover:text-red-700'
                  >
                    <IoMdTrash className='text-lg' />
                  </button>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <TextField
                        name={`condition.symptoms[${index}].symptomNameKa`}
                        label={t('symptomNameKa')}
                        value={symptom.symptomNameKa}
                        handleChange={form.handleChange}
                      />
                    </div>

                    <div>
                      <TextField
                        name={`condition.symptoms[${index}].symptomName`}
                        label={t('symptomName')}
                        value={symptom.symptomName}
                        handleChange={form.handleChange}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                    <div className='w-full'>
                      <DatePickerField
                        name={`condition.symptoms[${index}].symptomDate`}
                        label={t('symptomDate')}
                        value={symptom.symptomDate}
                        setFieldValue={form.setFieldValue}
                      />
                    </div>

                    <div>
                      <div className='flex flex-col'>
                        <label className='text-gray-700 dark:text-gray-300 mt-2'>
                          {t('painLevel')}
                        </label>
                        <input
                          type='range'
                          min='0'
                          max='100'
                          step='1'
                          value={symptom.painLevel}
                          onChange={(e) =>
                            form.setFieldValue(
                              `condition.symptoms[${index}].painLevel`,
                              +e.target.value,
                            )
                          }
                          className='w-full cursor-pointer mt-4'
                        />
                        <div className='text-right text-sm text-gray-600 dark:text-gray-400'>
                          {symptom.painLevel}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ფინანსური ჩანაწერების ქარდი */}
        <div className='p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200'>
              {t('financialRecords')}
            </h3>
            <ButtonWithIcon
              color='bg-blue-500'
              size='small'
              text={t('addRecord')}
              onClick={() => setOpenFinancialRecord(true)}
              icon={<IoMdAddCircle className='mr-2 text-lg' />}
            />
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden'>
              <thead>
                <tr className='bg-gray-200 dark:bg-gray-600'>
                  <th className='border border-gray-300 dark:border-gray-500 px-4 py-3 text-left text-gray-700 dark:text-gray-300'>
                    {t('service')}
                  </th>
                  <th className='border border-gray-300 dark:border-gray-500 px-4 py-3 text-left text-gray-700 dark:text-gray-300'>
                    {t('date')}
                  </th>
                  <th className='border border-gray-300 dark:border-gray-500 px-4 py-3 text-left text-gray-700 dark:text-gray-300'>
                    {t('fee')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {form.values.financialRecords.length === 0 ? (
                  <tr>
                    <td colSpan={3} className='text-center text-gray-500 dark:text-gray-400 py-4'>
                      {t('noRecordFound')}
                    </td>
                  </tr>
                ) : (
                  form.values.financialRecords.map((rec, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? 'bg-white dark:bg-gray-800'
                          : 'bg-gray-50 dark:bg-gray-900'
                      }`}
                    >
                      <td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
                        {i18n.language === 'en' ? rec.serviceDescription : rec.serviceDescriptionKa}
                      </td>
                      <td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
                        {rec.serviceDate}
                      </td>
                      <td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
                        {rec.serviceFee}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className='w-full flex justify-end mt-5'>
          <SuccessButton
            text={id ? t('updatePatient') : t('createPatient')}
            onClick={() => hook.savePatient(form.values)}
            disabled={!form.dirty}
          />
        </div>
      </div>
    </>
  )
}

export default AddEditPatient
