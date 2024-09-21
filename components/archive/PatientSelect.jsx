const PatientSelect = ({ patients, handlePatientChange, currentPatient }) => (
  <div className="mt-4 mb-4">
    <label htmlFor="existing-patients" className="block text-gray-700 mb-2">
      Select Existing Patient
    </label>
    <select
      id="existing-patients"
      className="block w-full p-2 border border-gray-300 rounded-lg"
      onChange={handlePatientChange}
      value={currentPatient ? currentPatient.id : ""}
    >
      <option value="">-- New Patient --</option>
      {patients.map((patient) => (
        <option key={patient.id} value={patient.id}>
          {patient.name}
        </option>
      ))}
    </select>
  </div>
);

export default PatientSelect;
