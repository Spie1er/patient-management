import { useTranslation } from 'react-i18next'

interface PrimaryButtonProps {
  loading: boolean
  disabled: boolean
  text: string
  type?: 'button' | 'reset' | 'submit'
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { t } = useTranslation()
  return (
    <button
      type={props.type || 'submit'}
      className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300'
      disabled={props.loading}
    >
      {props.loading ? t('buttonLoading') : props.text}
    </button>
  )
}

export default PrimaryButton
