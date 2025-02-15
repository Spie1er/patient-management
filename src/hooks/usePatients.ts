import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePatientStore } from '../store/patientsStore'
import { PatientFilterFormValues, PatientsListing } from '../btypes/GeneralTypes'
import { filterPatientsListing, transformPatientsForListing } from '../bhelpers/DataFunctions'
import {
  transformPatientsFilterParamsToUrl,
  transformPatientsUrlToFilterParams,
} from '../bhelpers/QuerryTransforms'

const initialFilterOptions: PatientFilterFormValues = {
  firstName: undefined,
  lastName: undefined,
  personalId: undefined,
  registrationStartDate: undefined,
  registrationEndDate: undefined,
  patientStatus: undefined,
}

interface UsePatients {
  state: PatientsListing
  showFilter: boolean
  setShowFilter: Dispatch<SetStateAction<boolean>>
  onFilter: (values: PatientFilterFormValues) => void
  filterOptions: PatientFilterFormValues
  onReset: () => void
  deletePatient: (id: number) => void
}

const usePatients = (): UsePatients => {
  const { patients, deletePatient } = usePatientStore()
  const [state, setState] = useState<PatientsListing>([])
  const [showFilter, setShowFilter] = useState(false)
  const [filterOptions, setFilterOptions] = useState<PatientFilterFormValues>(initialFilterOptions)
  const isMounted = useRef(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const getPatients = (params: PatientFilterFormValues) => {
    const transformedPatients = transformPatientsForListing(patients)
    const filteredPatients = filterPatientsListing(transformedPatients, params)

    if (isMounted.current) {
      setState(filteredPatients)
    }
  }

  const onFilter = (values: PatientFilterFormValues) => {
    const queryParams = transformPatientsFilterParamsToUrl(values)
    setSearchParams(queryParams, { replace: true })
    setFilterOptions(values)
    getPatients(values)
  }

  const onReset = () => {
    setSearchParams('')
    setFilterOptions(initialFilterOptions)
    getPatients(initialFilterOptions)
  }

  const initializeFilterForm = () => {
    const params = transformPatientsUrlToFilterParams(searchParams.toString())

    if (
      params.firstName ||
      params.lastName ||
      params.patientStatus?.id ||
      params.personalId ||
      params.registrationEndDate ||
      params.registrationStartDate
    ) {
      setShowFilter(true)
    }

    setFilterOptions(params)
    getPatients(params)
  }

  useEffect(() => {
    isMounted.current = true
    initializeFilterForm()
    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients])

  return {
    state,
    showFilter,
    setShowFilter,
    onFilter,
    filterOptions,
    onReset,
    deletePatient,
  }
}

export default usePatients
