import TextField from '../components/ui/inputs/TextField'
import SelectField from '../components/ui/inputs/SelectField'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../components/ui/buttons/PrimaryButton'
import { useState } from 'react'
import { conditions, countries } from '../helpers/SelectOptions'
import OtpModal from '../components/ui/modals/OtpModal'
import ButtonWithIcon from '../components/ui/buttons/ButtonWithIcon'
import { IoMdAddCircle } from 'react-icons/io'
import SuccessButton from '../components/ui/buttons/SuccessButton'

const AddEditPatient = () => {
  const { t } = useTranslation()
  const [otpModalOpen, setOtpModalOpen] = useState(false)

  // დამი დეითა, შეიცვლება როცა წამოვა მონაცემები პროფილიდან
  const doctorName = 'ქეთევან ამილახვარი'
  const clinicName = 'კლინიკის სახელი'

  return (
    <>
      {otpModalOpen && (
        <OtpModal
          digitNumber={5}
          isOpen={otpModalOpen}
          onClose={() => setOtpModalOpen(false)}
          onConfirm={() => {}}
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
                handleChange={() => {}}
              />
            </div>

            <div>
              <TextField
                name='lastNameKa'
                label='გვარი'
                placeholder='შეიყვანეთ გვარი'
                handleChange={() => {}}
              />
            </div>

            <div>
              <TextField
                name='firstName'
                label='First Name (English)'
                placeholder='Enter first name'
                handleChange={() => {}}
              />
            </div>

            <div>
              <TextField
                name='lastName'
                label='Last Name (English)'
                placeholder='Enter last name'
                handleChange={() => {}}
              />
            </div>

            <div>
              <TextField
                name='birthDate'
                label={t('birthDate')}
                placeholder='DD-MM-YYYY'
                handleChange={() => {}}
              />
            </div>

            <div>
              <div>
                <label className='block text-gray-700 dark:text-gray-300 mt-2'>{t('gender')}</label>
                <div className='flex gap-4 mt-2'>
                  <label className='inline-flex items-center'>
                    <input
                      type='radio'
                      name='gender'
                      value='1'
                      className='form-radio text-blue-500'
                    />
                    <span className='ml-2 text-gray-700 dark:text-gray-300'>{t('male')}</span>
                  </label>
                  <label className='inline-flex items-center'>
                    <input
                      type='radio'
                      name='gender'
                      value='2'
                      className='form-radio text-blue-500'
                    />
                    <span className='ml-2 text-gray-700 dark:text-gray-300'>{t('female')}</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <SelectField
                name='country'
                label={t('country')}
                options={countries}
                onChange={() => {}}
                placeholder={t('selectCountry')}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <TextField
                name='phoneNumber'
                label={t('phoneNumber')}
                placeholder='+995 5XX XXX XXX'
                handleChange={() => {}}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '70%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                }}
              >
                <PrimaryButton
                  onClick={() => setOtpModalOpen(true)}
                  text={t('sendCode')}
                  size='small'
                />
              </div>
            </div>
          </div>
        </div>

        {/* პაციენტის მდგომარეობის ქარდი */}
        <div className='p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md mb-6'>
          <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4'>
            {t('patientCondition')}
          </h3>
          <SelectField
            name='condition'
            label={t('condition')}
            options={conditions}
            onChange={() => {}}
            placeholder={t('selectCondition')}
          />

          {/* TODO  @KOTE დაავადების არჩევის შემდეგ უნდა გამოჩნდეს სიმპტომების ქარდი, რომელსაც ექნება ასევე გამრავლების + ღილაკი */}
        </div>

        {/* ფინანსური ჩანაწერების ქარდი */}
        <div className='p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md'>
          <div className='flex justify-between items-center mb-4    '>
            <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200'>
              {t('financialRecords')}
            </h3>
            <ButtonWithIcon
              color='bg-blue-500'
              size='small'
              text='ჩანაწერის დამატება'
              onClick={() => {}}
              icon={<IoMdAddCircle />}
            />
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
              <thead>
                <tr className='bg-gray-200 dark:bg-gray-600'>
                  <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-200'>
                    {t('service')}
                  </th>
                  <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-200'>
                    {t('date')}
                  </th>
                  <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-200'>
                    {t('fee')}
                  </th>
                </tr>
              </thead>
              <tbody>{/* აქ გაიმაპება რეკორდები */}</tbody>
            </table>
          </div>
        </div>
        <div className='w-full flex justify-end mt-5'>
          <SuccessButton
            //TODO @Kote შევამოწმოთ id, თუ ნალია, მაშინ შექმნაა, თუ არსებობს - განახლება
            // eslint-disable-next-line no-constant-condition
            text={true ? t('createPatient') : t('updatePatient')}
            onClick={() => {}}
            // disabled={patientHook.loading || !form.dirty} loading={patientHook.loading}
          />
        </div>
      </div>
    </>
  )
}

export default AddEditPatient
