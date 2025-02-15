import { IoWarningOutline } from 'react-icons/io5'
import DangerButton from '../buttons/DangerButton'
import SecondaryButton from '../buttons/SecondaryButton'
import { useTranslation } from 'react-i18next'

interface ConfirmDeleteModalProps {
  isOpen: number | null
  onClose: () => void
  onConfirm: (id: number) => void
  firstText: string
  text: string
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  firstText,
  text,
}: ConfirmDeleteModalProps) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50'
      style={{ backgroundColor: 'rgba(55, 65, 81, 0.9)' }}
    >
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center'>
        <div className='flex justify-center mb-3'>
          <IoWarningOutline className='text-red-500 text-5xl' />
        </div>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>{firstText}</h2>

        <p className='text-gray-600 dark:text-gray-300 text-sm mb-5'>{text}</p>

        <div className='flex justify-center gap-5'>
          <DangerButton
            size='medium'
            text={t('confirm')}
            onClick={() => {
              onConfirm(isOpen)
              onClose()
            }}
          />
          <SecondaryButton size='medium' text={t('cancel')} onClick={onClose} />
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
