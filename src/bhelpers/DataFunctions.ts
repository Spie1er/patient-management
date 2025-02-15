import { Patient, PatientFilterFormValues, PatientsListing } from '../btypes/GeneralTypes'
import { format, parse } from 'date-fns'

export const transformPatientsForListing = (patients: Patient[]): PatientsListing => {
  return patients.map(
    ({
      id,
      firstName,
      firstNameKa,
      lastName,
      lastNameKa,
      birthDate,
      patientStatus,
      dateOfRegistration,
      personalId,
    }) => ({
      id,
      firstName,
      firstNameKa,
      lastName,
      lastNameKa,
      birthDate,
      patientStatus,
      dateOfRegistration,
      personalId,
    }),
  )
}

export const filterPatientsListing = (
  values: PatientsListing,
  params: PatientFilterFormValues,
): PatientsListing => {
  let filteredValues = values

  if (params.firstName) {
    filteredValues = filteredValues.filter(
      (p) =>
        p.firstName.toLowerCase().includes((params.firstName as string).toLocaleLowerCase()) ||
        p.firstNameKa.toLowerCase().includes((params.firstName as string).toLocaleLowerCase()),
    )
  }

  if (params.lastName) {
    filteredValues = filteredValues.filter(
      (p) =>
        p.lastName.toLowerCase().includes((params.lastName as string).toLocaleLowerCase()) ||
        p.lastNameKa.toLowerCase().includes((params.lastName as string).toLocaleLowerCase()),
    )
  }

  if (params.personalId) {
    filteredValues = filteredValues.filter((p) => p.personalId?.toString() === params.personalId)
  }

  if (params.registrationStartDate) {
    filteredValues = filteredValues.filter(
      (p) =>
        transformStringToDate(p.dateOfRegistration as string) >=
        transformStringToDate(params.registrationStartDate as string),
    )
  }

  if (params.registrationEndDate) {
    filteredValues = filteredValues.filter(
      (p) =>
        transformStringToDate(p.dateOfRegistration as string) <=
        transformStringToDate(params.registrationEndDate as string),
    )
  }

  if (params.patientStatus) {
    filteredValues = filteredValues.filter(
      (p) => p.patientStatus.toString() === params.patientStatus?.id.toString(),
    )
  }

  return filteredValues
}

export const transformDate = (dateTime: string, dateFormat?: string): string => {
  const formatStyle = dateFormat ?? 'dd-MM-yyyy'
  return format(new Date(dateTime), formatStyle)
}

export const transformDateToString = (
  dateTime: Date | null,
  dateFormat?: string,
): string | null => {
  if (!dateTime) return null
  const formatStyle = dateFormat ?? 'dd-MM-yyyy'
  return format(new Date(dateTime), formatStyle)
}

export const transformStringToDateNullable = (dateString?: string): Date | null => {
  if (!dateString) return null
  const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date())
  return parsedDate
}

export const transformStringToDate = (dateString: string): Date => {
  const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date())
  return parsedDate
}
