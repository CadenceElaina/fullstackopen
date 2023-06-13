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
import { Patient, Diagnosis, Entry } from "../types";

import patientService from "../services/patients";
import diagnosisService from "../services/diagnosis";

const GetPatient = () => {
  const id = useParams().id as string;
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchData = async () => {
      const patientFetch = await patientService.getPatient(id);
      setPatient(patientFetch);
    };

    const fetchDiagnosis = async () => {
      const diagnosisFetch = await diagnosisService.getAll();
      setDiagnosis(diagnosisFetch);
    };
    fetchData();
    fetchDiagnosis();
  }, []);

  if (!patient) {
    return <></>;
  }

  return (
    <div className="inner-container">
      <Typography align="left" variant="h6">
        {patient.name} {/* {patient.gender} */}{" "}
        {patient.gender === "other" ? (
          <TransgenderIcon></TransgenderIcon>
        ) : patient.gender === "female" ? (
          <FemaleIcon></FemaleIcon>
        ) : (
          <MaleIcon></MaleIcon>
        )}
      </Typography>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <div className="inner-container">
        <Typography align="left" variant="h6">
          Entries
        </Typography>
        {patient.entries
          ? patient.entries.map((entry) => {
              let diag;
              if (entry.diagnosisCodes) {
                diag = diagnosis?.filter((d) => {
                  if (entry.diagnosisCodes?.includes(d.code)) {
                    return d.code + " " + d.name;
                  }
                });
              }
              const printDiag = diag?.map((elem) => (
                <li key={elem.code}>
                  {elem.code} {elem.name}
                </li>
              ));
              return (
                <div key={entry.id}>
                  <div>Physician: {entry.specialist}</div>
                  <div>
                    {entry.date} - <em>{entry.description}</em>
                  </div>
                  <ul>{printDiag}</ul>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default GetPatient;
