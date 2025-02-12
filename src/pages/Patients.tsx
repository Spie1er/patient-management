import { useEffect, useState } from 'react'
import patients from '../database/patients.json'
import { transformPatientsForListing } from '../Helpers/DataFunctions'
import { Patient, PatientsListing, PatientStatuses } from '../Types/GeneralTypes'
import { useTranslation } from 'react-i18next'
import { FaUserPen, FaUserXmark } from 'react-icons/fa6'
import { useAuthStore } from '../store/authStore'

const PatientsPage = () => {
  const [patientList, setPatientList] = useState<PatientsListing>([])
  const { t, i18n } = useTranslation()
  const { user } = useAuthStore()

  useEffect(() => {
    const transformedPatients = transformPatientsForListing(patients as Patient[])
    setPatientList(transformedPatients)
  }, [])

  // ვამოწმებთ როლებს, რომ შესაბამისად გამოვუჩინოთ/დავუმალოთ სვეტები მომხმარებელს
  const isAdminOrDoctor = user?.role === 'admin' || user?.role === 'doctor'

  return (
    <div className='p-8'>
      <div className='overflow-x-auto max-w-full sm:max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100'>
          {t('patientsLIst')}
        </h1>
        <table className='min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600'>
          <thead className='bg-gray-200 dark:bg-gray-800'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                #
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                {t('firstName')}
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                {t('lastName')}
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:table-cell'>
                {t('birthDate')}
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:table-cell'>
                {t('patientStatus')}
              </th>
              {isAdminOrDoctor && (
                <>
                  <th className='px-3 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                    <span className='hidden md:inline'>{t('edit')}</span>
                  </th>
                  <th className='px-3 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                    <span className='hidden md:inline'>{t('delete')}</span>
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {patientList?.length > 0 ? (
              patientList.map((patient) => (
                <tr key={patient.id} className='border-b dark:border-gray-700'>
                  <td className='px-6 py-3 text-sm text-gray-900 dark:text-gray-100'>
                    {patient.id}
                  </td>
                  <td className='px-6 py-3 text-sm text-gray-900 dark:text-gray-100'>
                    {i18n.language === 'en' ? patient.firstName : patient.firstNameKa}
                  </td>
                  <td className='px-6 py-3 text-sm text-gray-900 dark:text-gray-100'>
                    {i18n.language === 'en' ? patient.lastName : patient.lastNameKa}
                  </td>
                  <td className='px-6 py-3 text-sm text-gray-900 dark:text-gray-100 hidden md:table-cell'>
                    {patient.birthDate}
                  </td>
                  <td className='px-6 py-3 text-sm text-gray-900 dark:text-gray-100 hidden md:table-cell'>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        patient.patientStatus === 1
                          ? 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100'
                          : patient.patientStatus === 2
                          ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100'
                          : patient.patientStatus === 3
                          ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
                          : patient.patientStatus === 4
                          ? 'bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-purple-100'
                          : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                      }`}
                    >
                      {t(`${PatientStatuses[patient.patientStatus]}`)}
                    </span>
                  </td>
                  {isAdminOrDoctor && (
                    <>
                      <td className='px-3 py-3 text-sm text-gray-900 dark:text-gray-100'>
                        <div className='flex justify-center items-center'>
                          <FaUserPen className='cursor-pointer hover:text-green-500' />
                        </div>
                      </td>
                      <td className='px-3 py-3 text-sm text-gray-900 dark:text-gray-100'>
                        <div className='flex justify-center items-center'>
                          <FaUserXmark className='cursor-pointer hover:text-red-500' />
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className='px-6 py-3 text-center text-sm text-gray-900 dark:text-gray-100'
                >
                  {t('noRecordFound')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientsPage
