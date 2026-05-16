interface StatusBadgeProps {
  status: number;
}


  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: StatusBadge component to display the status of a service with appropriate label and color based on the status code. The status codes and their corresponding labels and colors are defined in the statusMap object. If an unknown status code is provided, it displays "Unknown".


const statusMap: Record<number, { label: string; color: string }> = {
  1: { label: "Under Service", color: "bg-yellow-100 text-yellow-800" },
  2: { label: "Servicing", color: "bg-blue-100 text-blue-800" },
  3: { label: "Partially Under Servicing", color: "bg-indigo-100 text-indigo-800" },
  4: { label: "Monthly Service", color: "bg-green-100 text-green-800" },
  5: { label: "Mileage Service", color: "bg-teal-100 text-teal-800" },
  6: { label: "Hourly Service", color: "bg-cyan-100 text-cyan-800" },
  7: { label: "Defective", color: "bg-red-100 text-red-800" },
  8: { label: "Servicing On Progress", color: "bg-blue-200 text-blue-900" },
  9: { label: "Daily Inspection", color: "bg-gray-100 text-gray-800" },
  10: { label: "Mileage Under Service", color: "bg-orange-100 text-orange-800" },
  11: { label: "Differed Mileage Servicing", color: "bg-orange-200 text-orange-900" },
  12: { label: "Differed Hourly Servicing", color: "bg-orange-300 text-orange-900" },
  13: { label: "Differed Defect", color: "bg-red-200 text-red-900" },
  14: { label: "Monthly Mileage About To Exceeds", color: "bg-yellow-200 text-yellow-900" },
  15: { label: "Allowed Quarterly Mileage Exceeds", color: "bg-yellow-300 text-yellow-900" },
  16: { label: "Insurance Expired", color: "bg-red-300 text-red-900" },
  17: { label: "Accident Differed Expired", color: "bg-red-400 text-red-900" },
  18: { label: "Accident Differed", color: "bg-purple-100 text-purple-800" },
  19: { label: "Odometer Differed Expired", color: "bg-red-500 text-white" },
  20: { label: "Odometer Differed", color: "bg-purple-200 text-purple-900" },
  21: { label: "Wheel Alignment Expired", color: "bg-red-600 text-white" },
  22: { label: "Wheel Alignment", color: "bg-green-200 text-green-900" },
  23: { label: "Oil Filter Change Expired", color: "bg-red-700 text-white" },
  24: { label: "Oil Filter Changed", color: "bg-green-300 text-green-900" },
  25: { label: "Vehicle Outside Repair", color: "bg-gray-300 text-gray-900" },
  26: { label: "Running", color: "bg-gray-300 text-gray-400" },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusInfo = statusMap[status];

  if (!statusInfo) {
    return (
      <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-sm">
        Unknown
      </span>
    );
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} animate-pulse`}
    >
      {statusInfo.label}
    </span>
  );
};

export default StatusBadge;