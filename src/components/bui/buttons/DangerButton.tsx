import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

interface DangerButtonProps {
  loading?: boolean
  disabled?: boolean
  text: string
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: 'small' | 'medium' | 'large'
  isFull?: boolean
}

const DangerButton = (props: DangerButtonProps) => {
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
      className={`bg-red-500 text-white rounded hover:bg-red-600 transition duration-300
         ${getSizeClasses()} ${props.isFull ? 'w-full' : ''} 
         ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.loading ? t('buttonLoading') : props.text}
    </button>
  )
}

export default DangerButton
