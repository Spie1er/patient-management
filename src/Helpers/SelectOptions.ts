import { PatientStatuses } from '../Types/GeneralTypes'

export const statusOptions = [
  {
    id: PatientStatuses.MINOR,
    label: 'Minor',
  },
  {
    id: PatientStatuses.UNDERAGE,
    label: 'Underage',
  },
  {
    id: PatientStatuses.SOCIALY_VULNARABLE,
    label: 'Socially Vulnarable',
  },
  {
    id: PatientStatuses.STUDENT,
    label: 'Student',
  },
  {
    id: PatientStatuses.RETIREE,
    label: 'Retiree',
  },
]

export const statusOptionsKa = [
  {
    id: PatientStatuses.MINOR,
    label: 'მცირეწლოვანი',
  },
  {
    id: PatientStatuses.UNDERAGE,
    label: 'არასრულწლოვანი',
  },
  {
    id: PatientStatuses.SOCIALY_VULNARABLE,
    label: 'სოციალურად დაუცველი',
  },
  {
    id: PatientStatuses.STUDENT,
    label: 'სტუდენტი',
  },
  {
    id: PatientStatuses.RETIREE,
    label: 'პენსიონერი',
  },
]
