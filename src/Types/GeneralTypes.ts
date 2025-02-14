import { FormikState } from 'formik'
import { ChangeEventHandler } from 'react'

export interface Patient {
  id: number | null
  personalId: number | null
  firstName: string
  firstNameKa: string
  lastName: string
  lastNameKa: string
  birthDate: string | null
  country: string | null
  countryKa: string | null
  phoneNumber: string
  gender: Gender
  condition: PatientCondition[]
  financialRecords: FinancialRecord[]
  patientStatus: PatientStatuses
  dateOfRegistration: string | null
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
  id: number | null
  conditionName: SelectType | null
  symptoms: Symptoms[]
}

interface Symptoms {
  id: number
  symptomName: string
  symptomNameKa: string
  symptomDate: string | null
  painLevel: number
}

export interface SelectType {
  id: number
  label: string
  disabled?: boolean
}

interface FinancialRecord {
  id: number
  serviceDescription: string
  serviceDescriptionKa: string
  serviceDate: string | null
  serviceFee: number
}

type PatientForListing = Omit<
  Patient,
  'gender' | 'condition' | 'financialRecords' | 'phoneNumber' | 'country' | 'countryKa'
>

export type PatientsListing = PatientForListing[]

export interface PatientsFilterForm {
  values: PatientFilterFormValues
  handleChange: ChangeEventHandler<HTMLInputElement>
  setFieldValue: (
    name: string,
    value: SelectType | Array<SelectType> | [Date | null, Date | null] | Date | null | string,
  ) => void
  dirty: boolean
  resetForm: (nextState?: Partial<FormikState<PatientFilterFormValues>>) => void
}

export interface PatientFilterFormValues {
  firstName?: string
  lastName?: string
  personalId?: string
  registrationStartDate?: string
  registrationEndDate?: string
  patientStatus?: SelectType | null
}

export interface PatientsParamsForUrl {
  firstName?: string
  lastName?: string
  personalId?: string
  registrationStartDate?: string
  registrationEndDate?: string
  patientStatusId?: number
  patientStatusLabel?: string
}
