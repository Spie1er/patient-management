import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import TextField from '../binputs/TextField'
import DatePickerField from '../binputs/DatePickerField'
import NumberField from '../binputs/NumberField'
import { FinancialRecord } from '../../../btypes/GeneralTypes'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface FinancialRecordModalProps {
  isOpen: boolean
  onClose: () => void
  existingRecords: FinancialRecord[]
  setFieldValue: (name: string, value: FinancialRecord[]) => void
}

const FinancialRecordModal = ({
  isOpen,
  onClose,
  existingRecords,
  setFieldValue,
}: FinancialRecordModalProps) => {
  const [financialRecord, setFinancialRecord] = useState<FinancialRecord>({
    id: existingRecords.length + 1,
    serviceDescriptionKa: '',
    serviceDescription: '',
    serviceDate: null,
    serviceFee: 0,
  })

  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50'
      style={{ backgroundColor: 'rgba(55, 65, 81, 0.9)' }}
    >
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center'>
          {t('addFinancialRecord')}
        </h2>
        <TextField
          label='სერვისის აღწერა (ქართ)'
          name='serviceDescriptionKa'
          value={financialRecord.serviceDescriptionKa}
          handleChange={(e) =>
            setFinancialRecord((prev) => ({
              ...prev,
              serviceDescriptionKa: e.target.value,
            }))
          }
        />

        <TextField
          label='Service Description (EN)'
          name='serviceDescription'
          value={financialRecord.serviceDescription}
          handleChange={(e) =>
            setFinancialRecord((prev) => ({
              ...prev,
              serviceDescription: e.target.value,
            }))
          }
        />

        <DatePickerField
          label={t('date')}
          name='serviceDate'
          value={financialRecord.serviceDate}
          setFieldValue={(name, value) =>
            setFinancialRecord((prev) => ({
              ...prev,
              [name]: value,
            }))
          }
        />

        <NumberField
          label={t('fee')}
          name='serviceFee'
          value={financialRecord.serviceFee}
          handleChange={(e) =>
            setFinancialRecord((prev) => ({
              ...prev,
              serviceFee: e.target.value ? Number(e.target.value) : 0,
            }))
          }
        />

        <div className='mt-4 flex justify-center gap-2'>
          <SecondaryButton text={t('cancel')} onClick={onClose} />

          <PrimaryButton
            text={t('addRecord')}
            type='submit'
            disabled={
              !financialRecord.serviceDate ||
              !financialRecord.serviceDescription ||
              !financialRecord.serviceDescriptionKa ||
              !financialRecord.serviceFee
            }
            onClick={() => {
              setFieldValue('financialRecords', [...existingRecords, financialRecord])
              onClose()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FinancialRecordModal
