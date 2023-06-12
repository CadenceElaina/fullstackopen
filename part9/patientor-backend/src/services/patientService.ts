import patientsData from "../../data/patients";
import { Patient, NewPatient, NonSensitivePatientData } from "../types";
import { v1 as uuid } from "uuid";
import toNewPatient from "../utils";

const patients: Patient[] = patientsData.map((item) => ({
  ...toNewPatient(item),
  id: item.id,
}));

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSenitivePatientsData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
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
  findById,
};
