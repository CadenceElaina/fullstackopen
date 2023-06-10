import patientsData from "../../data/patients";
import { Patient, NewPatient, NonSensitivePatientData } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSenitivePatientsData = (): NonSensitivePatientData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newpatient: Patient = {
    id: uuid(),
    ...patient,
  };
  patientsData.push(newpatient);
  return newpatient;
};

export default {
  getPatients,
  getNonSenitivePatientsData,
  addPatient,
};
