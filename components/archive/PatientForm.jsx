const PatientForm = ({
  patientName,
  setPatientName,
  diagnosis,
  setDiagnosis,
  handleSave,
}) => {
  const isDisabled = !patientName || !diagnosis;

  return (
    <div>
      <h1 className="text-4xl font-medium mb-4">Add New Patient</h1>
      {[
        {
          placeholder: "Patient's name",
          value: patientName,
          onChange: (e) => setPatientName(e.target.value),
        },
        {
          placeholder: "Diagnosis",
          value: diagnosis,
          onChange: (e) => setDiagnosis(e.target.value),
        },
      ].map((inputProps, index) => (
        <div className="mb-3" key={index}>
          <input
            type="text"
            className="block px-3 py-2 h-[35px] text-gray-400 rounded-full hover:text-gray-500 border border-gray-900 placeholder-opacity-30"
            placeholder={inputProps.placeholder}
            value={inputProps.value}
            onChange={inputProps.onChange}
          />
        </div>
      ))}
      <button
        className={`py-2 px-4 rounded-lg border mt-4 ${
          isDisabled
            ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-neutral-300 hover:bg-gray-100"
        }`}
        disabled={isDisabled}
        onClick={handleSave}
      >
        Save Patient Info
      </button>
    </div>
  );
};

export default PatientForm;
