import { MouseEventHandler, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface ButtonWithIconProps {
  loading?: boolean
  disabled?: boolean
  text: string
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: 'small' | 'medium' | 'large' | 'xs'
  isFull?: boolean
  icon?: ReactNode
  iconDirection?: 'left' | 'right'
  color?: string
}

const ButtonWithIcon = (props: ButtonWithIconProps) => {
  const { t } = useTranslation()

  const getSizeClasses = () => {
    switch (props.size) {
      case 'xs':
        return 'p-1 text-xs gap-1'
      case 'small':
        return 'p-1 text-sm'
      case 'medium':
        return 'p-2 text-base gap-2'
      case 'large':
        return 'p-3 text-lg gap-2'
      default:
        return 'p-2 text-base gap-2'
    }
  }

  const colorClass = props.color || 'bg-blue-500 hover:bg-blue-600' // Default color

  return (
    <button
      type={props.type || 'submit'}
      className={`${colorClass} text-white rounded transition duration-300 flex items-center justify-center 
         ${getSizeClasses()} ${props.isFull ? 'w-full' : ''} 
         ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {!props.loading && props.icon && props.iconDirection !== 'right' && <span>{props.icon}</span>}
      {props.loading ? t('buttonLoading') : props.text}
      {!props.loading && props.icon && props.iconDirection === 'right' && <span>{props.icon}</span>}
    </button>
  )
}

export default ButtonWithIcon
