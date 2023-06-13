import {
  useState,
  useEffect,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Table,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import axios from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";

import patientService from "../services/patients";
import PatientListPage from "./PatientListPage";

import HealthRatingBar from "./HealthRatingBar";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const GetPatient = ({ patients, setPatients }: Props) => {
  const [foundPatient, setFoundPatient] = useState<Patient[]>([]);
  const { id } = useParams();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getPatient(id);
      //console.log(patients);
      const empty: Patient[] = [];
      setFoundPatient(empty.concat(patients));
    };
    void fetchPatientList();
  }, []);
  console.log(foundPatient);
  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date of birth</TableCell>
            <TableCell>SSN</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(foundPatient).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.dateOfBirth}</TableCell>
              <TableCell>{patient.ssn}</TableCell>
              <TableCell>
                {patient.gender}
                {patient.gender === "other" ? (
                  <TransgenderIcon></TransgenderIcon>
                ) : patient.gender === "female" ? (
                  <FemaleIcon></FemaleIcon>
                ) : (
                  <MaleIcon></MaleIcon>
                )}
              </TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography align="left" variant="h6">
        Entries
      </Typography>
      <div>
        {Object.values(foundPatient).map((patient: Patient) => (
          <>
            {patient.entries?.map((entry: Entry) => (
              <>
                <p>
                  {entry.date} <em>{entry.description}</em>
                </p>
                <ul>
                  {entry.diagnosisCodes?.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default GetPatient;
