import { Button } from "@/components/ui/button";

const details = [
  { label: "Doctor", value: "dr. John Doe" },
  { label: "Status", value: "Ready" },
  { label: "Presentation", value: "Jun 16, 2024" },
  { label: "Price", value: "30 099$" }
];

export function PlanDetails() {
  return (
    <div className="bg-[#F8F9FA] shadow-md rounded-lg p-4 w-full md:w-[340px]">
      <h3 className="text-lg font-bold mb-4">Plan Details</h3>
      <div className="space-y-4 pb-4">
        {details.map((detail, index) => (
          <div key={index}>
            <div className="flex justify-between items-center">
              <p>{detail.label}:</p>
              <p className="font-semibold">{detail.value}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <Button variant="secondary" className="w-full h-[50px]">Download/send</Button>
    </div>
  );
}
