import patientsData from "../../data/patients";

import { Patient, NonSensitivePatientData } from "../types";

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

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSenitivePatientsData,
  addPatient,
};
