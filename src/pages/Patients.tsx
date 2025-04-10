import { PatientsFilterForm, PatientStatuses } from '../types/GeneralTypes'
import { useTranslation } from 'react-i18next'
import { FaFilter, FaUserPen, FaUserXmark } from 'react-icons/fa6'
import { useAuthStore } from '../store/authStore'
import usePatients from '../hooks/usePatients'
import { useFormik } from 'formik'
import Filter from './PatientsFilterForm'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import SweetAlert from '../components/ui/modals/SweetAlert'

//TODO @KOTE დასაწერია ცალკე ფეგინეიშენის კომპონენტი, რომელსაც perPage ექნება ასარჩევი
const ITEMS_PER_PAGE = 5

const PatientsPage = () => {
  const [openAlert, setOpenAlert] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { t, i18n } = useTranslation()
  const { user } = useAuthStore()
  const patientsHook = usePatients()

  const filterForm: PatientsFilterForm = useFormik({
    initialValues: patientsHook.filterOptions,
    enableReinitialize: true,
    onSubmit: () => {},
  })

  // ვამოწმებთ როლებს, რომ შესაბამისად გამოვაჩინოთ/დავმალოთ წაშლა-ედიტირების ღილაკები
  const isAdminOrDoctor = user?.role === 'admin' || user?.role === 'doctor'

  const totalPages = Math.ceil(patientsHook.state.length / ITEMS_PER_PAGE)
  const paginatedPatients = patientsHook.state.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <>
      {openAlert && (
        <SweetAlert
          key={`patient-${openAlert}`}
          isOpen={openAlert}
          onClose={() => setOpenAlert(null)}
          onConfirm={patientsHook.deletePatient}
          firstText={t('areYouSure')}
          text={t('deteleWarningPatient')}
        />
      )}
      <div className='p-4 sm:p-8'>
        <div className='max-w-full sm:max-w-4xl mx-auto'>
          {/* სათაური და ფილტრის ღილაკი */}
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100'>
              {t('patientsLIst')}
            </h1>
            <button
              onClick={() => patientsHook.setShowFilter((prevState) => !prevState)}
              className='flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition text-sm'
              aria-label={t('toggleFilter')}
            >
              <FaFilter className='text-base' />
              <span className='hidden sm:inline'>
                {patientsHook.showFilter ? t('hideFilter') : t('showFilter')}
              </span>
            </button>
          </div>

          {/* ფილტრი */}
          {patientsHook.showFilter && (
            <Filter
              form={filterForm}
              onSubmit={patientsHook.onFilter}
              onReset={() => {
                filterForm.resetForm()
                patientsHook.onReset()
              }}
            />
          )}

          {/* პაციენტების ლისტინგი */}
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[300px] sm:min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600'>
              <thead className='bg-gray-200 dark:bg-gray-800'>
                <tr>
                  <th className='px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300'>
                    #
                  </th>
                  <th className='px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300'>
                    {t('firstName')}
                  </th>
                  <th className='px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300'>
                    {t('lastName')}
                  </th>
                  <th className='px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:table-cell'>
                    {t('birthDate')}
                  </th>
                  <th className='px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:table-cell'>
                    {t('patientStatus')}
                  </th>
                  {isAdminOrDoctor && (
                    <>
                      <th className='px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300'>
                        <span className='hidden sm:inline'>{t('edit')}</span>
                      </th>
                      <th className='px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300'>
                        <span className='hidden sm:inline'>{t('delete')}</span>
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedPatients.length > 0 ? (
                  paginatedPatients.map((patient, index) => (
                    <tr key={patient.id} className='border-b dark:border-gray-700'>
                      <td className='px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-900 dark:text-gray-100'>
                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td className='px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-900 dark:text-gray-100'>
                        {i18n.language === 'en' ? patient.firstName : patient.firstNameKa}
                      </td>
                      <td className='px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-900 dark:text-gray-100'>
                        {i18n.language === 'en' ? patient.lastName : patient.lastNameKa}
                      </td>
                      <td className='px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-900 dark:text-gray-100 hidden md:table-cell'>
                        {patient.birthDate}
                      </td>
                      <td className='px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-900 dark:text-gray-100 hidden md:table-cell'>
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
                          <td className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-gray-100'>
                            <div className='flex justify-center items-center'>
                              <Link to={`/patients/edit/${patient.id}`}>
                                <FaUserPen className='cursor-pointer hover:text-green-500 text-base sm:text-lg' />
                              </Link>
                            </div>
                          </td>
                          <td className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-gray-100'>
                            <div className='flex justify-center items-center'>
                              <FaUserXmark
                                className='cursor-pointer hover:text-red-500 text-base sm:text-lg'
                                onClick={() => setOpenAlert(patient.id)}
                              />
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
          {totalPages > 1 && (
            <div className='mt-4 flex justify-center space-x-2'>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PatientsPage
