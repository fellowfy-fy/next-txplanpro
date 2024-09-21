const TabNavigation = ({ activeTab, handleTabChange }) => (
  <div className="flex h-[60px] justify-center space-x-4 mb-4 border border-neutral-300 rounded-3xl">
    {[
      "1 - Dental formula",
      "2 - Guidelines",
      "3 - Photos",
      "4 - TreatmentPlan",
    ].map((tab) => (
      <button
        key={tab}
        className={`py-2 px-4 rounded ${
          activeTab === tab
            ? "bg-white justify-items-center h-[50px] rounded-2xl text-gray-900 shadow-md"
            : ""
        }`}
        onClick={() => handleTabChange(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default TabNavigation;
