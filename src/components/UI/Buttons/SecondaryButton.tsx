import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

interface SecondaryButtonProps {
  loading?: boolean
  disabled?: boolean
  text: string
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: 'small' | 'medium' | 'large'
  isFull?: boolean
}

const SecondaryButton = (props: SecondaryButtonProps) => {
  const { t } = useTranslation()

  const getSizeClasses = () => {
    switch (props.size) {
      case 'small':
        return 'p-1 text-sm'
      case 'medium':
        return 'p-2 text-base'
      case 'large':
        return 'p-3 text-lg'
      default:
        return 'p-2 text-base'
    }
  }

  return (
    <button
      type={props.type || 'submit'}
      className={`mt-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300 
        ${getSizeClasses()} ${props.isFull ? 'w-full' : ''}
        ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.loading ? t('buttonLoading') : props.text}
    </button>
  )
}

export default SecondaryButton
