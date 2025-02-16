import { Patient, PatientFormErrors } from '../types/GeneralTypes'

export const patientValidation = (values: Patient): PatientFormErrors => {
  const formErrors: PatientFormErrors = {
    firstNameKa: requiredGeorgian(values.firstNameKa),
    lastNameKa: requiredGeorgian(values.lastNameKa),
    firstName: values.firstName ? requiredEnglish(values.firstName) : undefined,
    lastName: values.lastName ? requiredEnglish(values.lastName) : undefined,
    countryKa: required(values.countryKa?.id),
    birthDate: required(values.birthDate),
    phoneNumber: requiredPhoneNumber(values.phoneNumber),
    personalId: requiredPersonalNumber(values.personalId),
    patientStatus: required(values.patientStatus),
  }
  const errors: PatientFormErrors = {} as PatientFormErrors
  Object.entries(formErrors).forEach(([key, value]) => {
    if (value) errors[key as keyof PatientFormErrors] = value
  })

  return errors
}

export const required = (value: unknown): string | undefined =>
  value === undefined || value === null || value === '' ? 'სავალდებულო ველი' : undefined

export const requiredPhoneNumber = (value: string | null): string | undefined =>
  value === null || !/^\d{9,}$/.test(value) ? 'შეიყვანეთ მინიმუმ 9 ციფრი' : undefined

export const requiredPersonalNumber = (value: number | null): string | undefined =>
  value === null || !/^\d{11}$/.test(value.toString()) ? 'სავალდებულოა 11 ნიშნა რიცხვი' : undefined

export const requiredGeorgian = (value?: string | null): string | undefined => {
  if (value === undefined || value === null || value.trim() === '') {
    return 'სავალდებულო ველი'
  } else if (!/^[\u10A0-\u10FF]+$/.test(value)) {
    return 'დასაშვებია მხოლოდ ქართული ანბანი'
  }
  return undefined
}

export const requiredEnglish = (value?: string | null): string | undefined => {
  if (value === undefined || value === null || value.trim() === '') {
    return 'This field is required'
  } else if (!/^[a-zA-Z]+$/.test(value)) {
    return 'Only English letters are allowed'
  }
  return undefined
}
