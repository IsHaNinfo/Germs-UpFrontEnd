import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import E658ShortRunModal from "./E658ShortRunModal";
import E658ShortRunModalView from "./E658ShortRunModalView";


const E658ShortRun = () => {

  const [search, setSearch] = useState("");
  const [shortRunList, setShortRunList] = useState<any[]>([]);
  const [isShortRunModalOpen, setShortRunModalOpen] = useState(false);
  const [selectedShortRunVehicle, setSelectedShortRunVehicle] = useState<any>(null);
  const [isSelectedShortRunViewOpen, setSelectedShortRunViewOpen] = useState(false);

  useEffect(() => {
    fetchDataList();
  }, []);


  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Fetch Data List

  const fetchDataList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/E658CreatedDetails`
      );

      const shortRunList = response.data.map((data: any) => ({
         
        destinationFrom:data?.destinationFrom,

        destinationTo:data?.destinationTo,

        departureDate:data?.departureDate,

        returnDate:data?.returnDate,

        runType: data?.runTypeName,

        purpose: data?.purpose,

        status: data?.letterState,

        staffServiceNo:data?.staffServiceNo,

        staffName: data?.staffName,

        staffRank:data?.staffRank,

        oicServiceNo:data?.oicServiceNo,

        oicName: data?.oicName,

        oicRank:data?.oicRank,

        isVehicleAssignfromMT: data?.isVehicleAssignfromMT,

        isOmtAssignfromMT:data?.isOmtAssignfromMT,

        slafRegNo: data?.slafRegNo,

        omtServiceNo: data?.omtServiceNo,

      }));
      setShortRunList(shortRunList);


    } catch (error: any) {

      const message = error.response?.data?.detail
      error.message ||
        "Failed to register vehicle in Air Force.";
      Swal.fire({ icon: "error", title: "Error", text: message });
    }
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Search Filter

  const filteredVehicles = shortRunList.filter((v) =>
    Object.values(v)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: E658 Short Run list with search and modals for add/view details

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 border-b mb-10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            E658 Short Run
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track E658 short run details
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          />

          <button
            onClick={() => setShortRunModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Short Run
          </button>

        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full text-sm">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Creater Service No</th>
              <th className="p-3">Destination From</th>
              <th className="p-3">Destination To</th>
              <th className="p-3">Departure Date</th>
              <th className="p-3">Return Date</th>
              <th className="p-3">Run Type</th>
              <th className="p-3">Purpose</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredVehicles.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="p-4 text-center text-gray-500"
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              filteredVehicles.map((data) => (
                <tr key={data.id} className="border-t hover:bg-gray-50 text-center">
                  <td className="p-3">{data.staffServiceNo}</td>
                  <td className="p-3">{data.destinationFrom}</td>
                  <td className="p-3">{data.destinationTo}</td>
                  <td className="p-3">{data.departureDate}</td>
                  <td className="p-3">{data.returnDate}</td>
                  <td className="p-3">{data.runType}</td>
                  <td className="p-3">{data.purpose}</td>
                  <td className="p-3">{data.status}</td>
                  <td className="flex justify-center gap-3 p-2">
                    <button className="text-blue-600"
                      onClick={() => {
                        setSelectedShortRunVehicle(data);
                        setSelectedShortRunViewOpen(true)
                        ;
                      }}
                      data-vehicle-id={data}>
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <E658ShortRunModal
        isOpen={isShortRunModalOpen}
        onClose={() => setShortRunModalOpen(false)}
        onfetchDataList={fetchDataList}
      />

      <E658ShortRunModalView
        isOpen={isSelectedShortRunViewOpen}
        onClose={() => setSelectedShortRunViewOpen(false)}
        selectedShortRunVehicle={selectedShortRunVehicle}
      />
      
    </div>
  );
};

export default E658ShortRun;