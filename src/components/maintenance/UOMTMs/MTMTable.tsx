import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import axios from "axios";

type Tab = "basic" | "Qualifications" | "specializations" | "allocations" | "daily_employment";

export default function VehicleTable() {
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState<any>({});
  const [activeTab, setActiveTab] = useState<Tab>("basic");
  const [search, setSearch] = useState("");
  const [MTMs, setMTMs] = useState<any[]>([]);

  useEffect(() => {
    GetMTMList();
  }, []);

  const GetMTMList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/User/by-role?roleName=MTM`);
      setMTMs(res.data);
    } catch {
      setMTMs([]);
    }
  };

  const openModal = (v: any) => {
    setVehicle(v);
    console.log(v)
    setActiveTab("basic");
    setOpen(true);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "basic", label: "Basic" },
    // { key: "Qualifications", label: "Qualifications" },
    // { key: "specializations", label: "Specializations" },
    { key: "allocations", label: "Allocations" },
    // { key: "daily_employment", label: "Daily Employment Status" },
  ];

  return (
    <>
      <div className="rounded-2xl border bg-white p-6">
        <div className="mb-10 border-b pb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">MTM Details</h2>
          <div className="w-full md:w-80">
            <Input
              placeholder="Search MTMs..."
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Table>
          <TableHeader className="border-y">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 text-start">SVC No</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start">Rank</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start">Name</TableCell>
              <TableCell isHeader className="px-5 py-3 text-center">Details</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {MTMs.length > 0 ? (
              MTMs.map((mtm, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-5 py-3">{mtm.svcNo}</TableCell>
                  <TableCell className="px-5 py-3">{mtm.rank}</TableCell>
                  <TableCell className="px-5 py-3">{mtm.name}</TableCell>
                  <TableCell className="px-5 py-3 text-center">
                    <Button
                      variant="outline"
                      className="h-7 px-3 text-xs border-blue-500 text-blue-600 hover:bg-blue-50"
                      onClick={() => openModal(mtm)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))) : (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  No MTM found
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>

      {/* VIEW MODAL */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="max-w-[750px]"
      >
        <div className="p-6 bg-white rounded-3xl">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold text-gray-800">MTM Details</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none"
            ></button>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${activeTab === tab.key
                  ? "border-blue-400 text-blue-600 bg-blue-50"
                  : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Tab: Basic ── */}
          {activeTab === "basic" && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>SVC No.</Label>
                  <Input value={vehicle.svcNo} disabled />
                </div>
                <div>
                  <Label>Rank</Label>
                  <Input value={vehicle?.rank ?? ""} disabled />
                </div>
                <div className="md:col-span-2">
                  <Label>Name</Label>
                  <Input value={vehicle?.name ?? ""} disabled />
                </div>
              </div>
            </div>
          )}

          {/* ── Tab: Qualifications ── */}
          {/* {activeTab === "Qualifications" && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Qualifications</h4>
              {vehicle?.qualifications.length ? (
                <ul className="space-y-2">
                  {vehicle.qualifications.map((q, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 text-sm text-gray-700"
                    >
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-semibold shrink-0">
                        {i + 1}
                      </span>
                      {q}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No qualifications recorded.</p>
              )}
            </div>
          )} */}

          {/* ── Tab: Specializations ── */}
          {/* {activeTab === "specializations" && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Specializations</h4>
              {vehicle?.specializations.length ? (
                <ul className="space-y-2">
                  {vehicle.specializations.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 text-sm text-gray-700"
                    >
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-semibold shrink-0">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No specializations recorded.</p>
              )}
            </div>
          )} */}

          {/* ── Tab: Allocations ── */}
          {activeTab === "allocations" && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Allocation Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input value={vehicle?.userLocation ?? ""} disabled />
                </div>
                <div>
                  <Label>Formation</Label>
                  <Input value={vehicle?.userFormation ?? ""} disabled />
                </div>
              </div>
            </div>
          )}

          {/* ── Tab: Daily Employment Status ── */}
          {/* {activeTab === "daily_employment" && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Daily Employment Status</h4>
              {vehicle?.daily_employment.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 border-y text-xs uppercase">
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Employment Status</th>
                        <th className="px-4 py-2">Duty Type</th>
                        <th className="px-4 py-2">Assigned By</th>
                        <th className="px-4 py-2">Jobs Completed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicle.daily_employment.map((row, i) => (
                        <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="px-4 py-2">{row.date}</td>
                          <td className="px-4 py-2">
                            <span
                              className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                                row.employment_status === "Employed"
                                  ? "bg-green-100 text-green-700"
                                  : row.employment_status === "Training"
                                  ? "bg-orange-100 text-orange-700"
                                  : row.employment_status === "Leave"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {row.employment_status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{row.duty_type}</td>
                          <td className="px-4 py-2">{row.job_assigned_by}</td>
                          <td className="px-4 py-2 text-center">{row.jobs_completed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-400">No employment records found.</p>
              )}
            </div>
          )} */}

          {/* Footer */}
          <div className="flex justify-end mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            
          </div>
        </div>
      </Modal>
    </>
  );
}