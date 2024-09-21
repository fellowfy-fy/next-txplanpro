const Guidelines = ({ handleTabChange }) => {
  const handleNext = () => {
    handleTabChange("3 - Photos");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium mb-4">Guidelines</h2>
      <p className="text-gray-600">
        Here you can add guidelines for the treatment plan.
      </p>
      <button
        onClick={handleNext}
        className="py-2 px-4 rounded-lg border border-neutral-300 mt-4 hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
};

export default Guidelines;
