export interface Patient {
  id: number
  personalId: number
  firstName: string
  firstNameKa: string
  lastName: string
  lastNameKa: string
  birthDate: string
  gender: Gender
  condition: PatientCondition[]
  financialRecords: FinancialRecord[]
  patientStatus: PatientStatuses
  dateOfRegistration: string
}

enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export enum PatientStatuses {
  MINOR = 1,
  UNDERAGE = 2,
  SOCIALY_VULNARABLE = 3,
  STUDENT = 4,
  RETIREE = 5,
}

interface PatientCondition {
  id: number
  conditionName: SelectType
  symptoms: Symptoms[]
}

interface Symptoms {
  id: number
  symptomName: string
  symptomNameKa: string
  symptomDate: string
  painLevel: number
}

interface SelectType {
  id: number
  label: string
}

interface FinancialRecord {
  id: number
  serviceDescription: string
  serviceDescriptionKa: string
  serviceDate: string
  serviceFee: number
}

type PatientForListing = Omit<
  Patient,
  'personalId' | 'gender' | 'condition' | 'financialRecords' | 'dateOfRegistration'
>

export type PatientsListing = PatientForListing[]
