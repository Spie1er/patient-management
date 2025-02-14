import { create } from 'zustand'
import { Patient } from '../Types/GeneralTypes'

interface PatientStoreState {
  patients: Patient[]
  addPatient: (newPatient: Patient) => void
  updatePatient: (updatedPatient: Patient) => void
  deletePatient: (id: number) => void
  setPatients: (patients: Patient[]) => void
}

export const usePatientStore = create<PatientStoreState>((set) => ({
  patients: [],

  addPatient: (newPatient) => set((state) => ({ patients: [...state.patients, newPatient] })),

  updatePatient: (updatedPatient) =>
    set((state) => ({
      patients: state.patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)),
    })),

  deletePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id),
    })),

  setPatients: (patients) => set({ patients }),
}))
