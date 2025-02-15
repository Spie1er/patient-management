import qs from 'qs'
import { PatientFilterFormValues, PatientsParamsForUrl } from '../btypes/GeneralTypes'

export const parse = (url: string, options = {}): unknown => {
  return qs.parse(url, {
    ignoreQueryPrefix: true,
    ...options,
  })
}

export const transformPatientsUrlToFilterParams = (url: string): PatientFilterFormValues => {
  const values = parse(url) as PatientsParamsForUrl
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    personalId: values.personalId,
    registrationStartDate: values.registrationStartDate,
    registrationEndDate: values.registrationEndDate,
    patientStatus:
      values.patientStatusId && values.patientStatusLabel
        ? { id: values.patientStatusId, label: values.patientStatusLabel }
        : undefined,
  }
}
export const transformPatientsFilterParamsToUrl = (filters: PatientFilterFormValues) => {
  const params = new URLSearchParams()

  // ცარიელი ველიუები რომ არ გვქონდეს სერჩში, მხოლოდ ისეთს ვამატებთ ლინკში, რომელი ფილტრიც არჩეულია
  if (filters.firstName) params.append('firstName', filters.firstName)
  if (filters.lastName) params.append('lastName', filters.lastName)
  if (filters.personalId) params.append('personalId', filters.personalId)
  if (filters.registrationStartDate)
    params.append('registrationStartDate', filters.registrationStartDate)
  if (filters.registrationEndDate) params.append('registrationEndDate', filters.registrationEndDate)
  if (filters.patientStatus?.id && filters.patientStatus.label) {
    params.append('patientStatusId', filters.patientStatus.id.toString())
    params.append('patientStatusLabel', filters.patientStatus.label.toString())
  }

  return params.toString()
}
