import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { Vehicle } from "./VehiclePage";

interface Props {
  vehicles: Vehicle[];
  loading: boolean;
}

export default function VehicleTable({ vehicles, loading }: Props) {
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
   const [search, setSearch] = useState("");

  //  const filteredVehicles = useMemo(() => {
  //   return vehicles.filter((v) =>
  //     [v.modalName, v.chassisNo, v.engineNo, v.slafRegNo]
  //       .join(" ")
  //       .toLowerCase()
  //       .includes(search.toLowerCase())
  //   );
  // }, [vehicles, search]);

  const openModal = (v: Vehicle) => {
    setVehicle(v);
    setOpen(true);
  };

  return (
    <>
        <div className="rounded-2xl border bg-white p-6 shadow-lg">
        
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h2 className="text-xl font-semibold">
            All Vehicles
          </h2>

          <div className="w-full md:w-80">
            <Input
              placeholder="Search vehicles..."
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {loading ? (
          <div className="loader-table">
            <div className="loader-circle-7"></div>
          </div>
        ) : (
          <Table>
            <TableHeader className="border-y">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  Modal Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  Chassis No
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  Engine No
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  Vehicle Type
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  SLAF Reg No
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  Details
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {vehicles.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="px-5 py-3">
                    {v.modalName}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    {v.chassisNo}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    {v.engineNo}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    {v.typeID}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    {v.slafRegNo}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="h-7 px-3 text-xs border-blue-500 text-blue-600 hover:bg-blue-50"
                      onClick={() => openModal(v)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* VIEW MODAL */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="max-w-[700px]"
      >
        <div className="p-6 bg-white rounded-3xl">
          <h3 className="text-lg font-semibold mb-4">
            Vehicle Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(vehicle || {}).map(
              ([k, v]) =>
                k !== "id" && (
                  <div key={k}>
                    <Label>{k}</Label>
                    <Input value={v as string} disabled />
                  </div>
                )
            )}
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}