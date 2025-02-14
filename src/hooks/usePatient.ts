import { useEffect, useState } from 'react'
import patients from '../database/patients.json'
import { Patient, PatientStatuses } from '../Types/GeneralTypes'

const initialPatient = {
  id: null,
  personalId: null,
  firstName: '',
  lastName: '',
  firstNameKa: '',
  lastNameKa: '',
  birthDate: null,
  country: null,
  countryKa: null,
  phoneNumber: '',
  gender: 1,
  condition: [
    {
      id: null,
      conditionName: null,
      symptoms: [{ id: 1, symptomName: '', symptomNameKa: '', symptomDate: null, painLevel: 50 }],
    },
  ],
  financialRecords: [
    {
      id: 1,
      serviceDescription: '',
      serviceDescriptionKa: '',
      serviceDate: null,
      serviceFee: 0,
    },
  ],
  patientStatus: PatientStatuses.SOCIALY_VULNARABLE,
  dateOfRegistration: null,
}

interface UsePatient {
  state: Patient
}

const usePatient = (patientId: number): UsePatient => {
  const [state, setState] = useState<Patient>(initialPatient)

  const getPatient = async (patientId: number) => {
    const selectedPatient = patients.find((el) => el.id === patientId) || initialPatient
    setState(selectedPatient)
  }

  useEffect(() => {
    if (patientId) getPatient(patientId).then()
  }, [patientId])

  return {
    state,
  }
}

export default usePatient
