import request from './api';

const PATIENT_ENDPOINT = "/patients/";

export const getPatients = () => request(PATIENT_ENDPOINT);

export const getPatient = (id) => request(`${PATIENT_ENDPOINT}${id}/`);

export const createPatient = (patient) => 
  request(PATIENT_ENDPOINT, { method: "POST", body: patient });

export const updatePatient = (id, patient) => 
  request(`${PATIENT_ENDPOINT}${id}/`, { method: "PUT", body: patient });

export const deletePatient = (id) => 
  request(`${PATIENT_ENDPOINT}${id}/`, { method: "DELETE" });
