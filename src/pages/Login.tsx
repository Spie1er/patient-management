import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrimaryButton from '../components/ui/buttons/PrimaryButton'
import TextField from '../components/ui/inputs/TextField'
import PasswordField from '../components/ui/inputs/PasswordField'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [loading, setLoading] = useState(false)

  // useFormik Hook
  const loginForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string().required(t('username') + t('isRequired')),
      password: Yup.string().required(t('password') + t('isRequired')),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      setTimeout(() => {
        if (login(values.username.trim(), values.password)) {
          toast.success(t('loginSuccess'))
          navigate('/patients')
        } else {
          toast.error(t('loginFail'))
        }
        setLoading(false)
      }, 1000)
    },
  })

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4'>
      <div className='bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl dark:text-gray-200 font-bold mb-6 text-center'>{t('login')}</h2>

        <form onSubmit={loginForm.handleSubmit} className='space-y-4'>
          <div>
            <TextField
              id='username'
              name='username'
              label={t('username')}
              handleChange={loginForm.handleChange}
              value={loginForm.values.username}
              error={loginForm.errors.username}
            />
          </div>

          <div>
            <PasswordField
              id='password'
              name='password'
              label={t('password')}
              handleChange={loginForm.handleChange}
              value={loginForm.values.password}
              error={loginForm.errors.password}
            />
          </div>

          <div className='mt-6'>
            <PrimaryButton disabled={loading} loading={loading} text={t('login')} isFull />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
