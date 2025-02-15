import { useEffect, useState } from 'react'
import { usePatientStore } from '../store/patientsStore'
import { Patient, PatientStatuses } from '../types/GeneralTypes'
import { useNavigate } from 'react-router-dom'
import { transformNumberToDateString } from '../helpers/DataFunctions'

const initialPatient: Patient = {
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
  phoneVerified: false,
  gender: 1,
  condition: {
    id: null,
    conditionName: null,
    symptoms: [],
  },
  financialRecords: [],
  patientStatus: PatientStatuses.SOCIALY_VULNARABLE,
  dateOfRegistration: null,
}

interface UsePatient {
  state: Patient
  savePatient: (patient: Patient) => void
}

const usePatient = (patientId?: number): UsePatient => {
  const { patients, addPatient, updatePatient } = usePatientStore()
  const [state, setState] = useState<Patient>(initialPatient)
  const navigate = useNavigate()

  useEffect(() => {
    if (patientId) {
      const selectedPatient = patients.find((el) => el.id === patientId) || initialPatient
      setState(selectedPatient)
    }
  }, [patientId, patients])

  const savePatient = (patient: Patient) => {
    const nowDate = Date.now()
    if (patient.id) {
      updatePatient(patient)
    } else {
      const newId = patients.length + 1
      addPatient({
        ...patient,
        id: newId,
        dateOfRegistration: transformNumberToDateString(nowDate),
      })
    }

    navigate('/')
  }

  return { state, savePatient }
}

export default usePatient
