import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../buttons/PrimaryButton'

interface OtpModalProps {
  isOpen: boolean
  onClose: () => void
  digitNumber: number
  onConfirm: (otp: string) => void
}

const OtpModal = ({ isOpen, onClose, digitNumber, onConfirm }: OtpModalProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(digitNumber).fill(''))
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    setIsButtonDisabled(otp.includes(''))
  }, [otp])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return //მხოლოდ ციფრები
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // 1 ციფრი 1 უჯრაში
    setOtp(newOtp)

    // ფოკუსი გადადის შემდეგ უჯრაზე თუ მიმდინარე უჯრა "შეივსო"
    if (value && index < digitNumber - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text').replace(/\D/g, '') // Only numbers
    if (!pastedText) return

    const newOtp = otp.map((char, i) =>
      i >= index && i < index + pastedText.length ? pastedText[i - index] : char,
    )
    setOtp(newOtp)

    // შემდეგ შევსებულ ციფრზე გადავიტანთ ფოკუსს
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === '')
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[digitNumber - 1]?.focus()
    }
  }

  const handleConfirm = () => {
    onConfirm(otp.join(''))
    onClose()
    setOtp(new Array(digitNumber).fill('')) // დახურვის მერე დავარესეტოთ
  }

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50'
      style={{ backgroundColor: 'rgba(55, 65, 81, 0.9)' }}
    >
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80'>
        <h2 className='text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center'>
          {t('enterOtp')}
        </h2>

        <div className='flex justify-center gap-2'>
          {otp.map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el
              }}
              type='text'
              inputMode='numeric'
              maxLength={1}
              className='w-10 h-12 text-center text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(index, e)}
            />
          ))}
        </div>

        <div className='mt-4 flex justify-center gap-2'>
          <button
            className='px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition text-sm'
            onClick={onClose}
          >
            {t('cancel')}
          </button>
          <PrimaryButton
            text={t('confirm')}
            disabled={isButtonDisabled}
            onClick={handleConfirm}
            size='small'
          />
        </div>
      </div>
    </div>
  )
}

export default OtpModal
