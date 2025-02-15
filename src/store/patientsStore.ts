import { create } from 'zustand'
import { Patient } from '../types/GeneralTypes'
import patients from '../database/patients.json'

interface PatientStoreState {
  patients: Patient[]
  addPatient: (newPatient: Patient) => void
  updatePatient: (updatedPatient: Patient) => void
  deletePatient: (id: number) => void
}

export const usePatientStore = create<PatientStoreState>((set) => ({
  patients: patients,

  addPatient: (newPatient) => set((state) => ({ patients: [...state.patients, newPatient] })),

  updatePatient: (updatedPatient) =>
    set((state) => ({
      patients: state.patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)),
    })),

  deletePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id),
    })),
}))
