import { Patient, PatientsListing } from '../Types/GeneralTypes'

export const transformPatientsForListing = (patients: Patient[]): PatientsListing => {
  return patients.map(
    ({ id, firstName, firstNameKa, lastName, lastNameKa, birthDate, patientStatus }) => ({
      id,
      firstName,
      firstNameKa,
      lastName,
      lastNameKa,
      birthDate,
      patientStatus,
    }),
  )
}
