import { PatientStatuses } from '../types/GeneralTypes'

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

export const conditions = [
  {
    id: 1,
    label: 'დიაბეტი',
  },
  {
    id: 2,
    label: 'მაღალი წნევა',
  },
  {
    id: 3,
    label: 'ასთმა',
  },
  {
    id: 4,
    label: 'შაკიკი',
  },
  {
    id: 5,
    label: 'ართრიტი',
  },
]

export const countries = [
  {
    id: 1,
    label: 'საქართველო',
  },
  {
    id: 2,
    label: 'აზერბაიჯანი',
  },
  {
    id: 3,
    label: 'სომხეთი',
  },
  {
    id: 4,
    label: 'გაერთიანებული სამეფო',
  },
  {
    id: 5,
    label: 'საფრანგეთი',
  },
]
