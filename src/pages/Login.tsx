import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [loading, setLoading] = useState(false)

  const handleLogin = (values: { username: string; password: string }) => {
    setLoading(true)
    setTimeout(() => {
      if (login(values.username, values.password)) {
        message.success('Login successful')
        navigate('/patients')
      } else {
        message.error('Invalid credentials')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className='flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-10'>
      <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl dark:text-gray-200 font-bold mb-4 text-center'>{t('login')}</h2>
        <Form layout='vertical' onFinish={handleLogin}>
          <Form.Item label={t('username')} name='username' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('password')} name='password' rules={[{ required: true }]}>
            <Input.Password
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Button type='primary' htmlType='submit' className='w-full' loading={loading}>
            {t('login')}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login
