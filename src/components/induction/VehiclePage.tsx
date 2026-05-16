import { useState } from "react";
import VehicleTable from "./VehicleTable";

export interface Vehicle {
  id?: string;
  chassisNo: string;
  modalName: string;
  engineNo: string;
  slafRegNo: string;
  civilRegNo: string;
  inventoryNo: string;
  typeID: string;
  modelID: string;
  typeOfInduction: string;
  inductionDate: string;
}

export default function VehiclePage() {

  const [vehicles] = useState<Vehicle[]>([
    {
      id: "1",
      modalName: "Toyota Hilux",
      chassisNo: "CH001",
      engineNo: "EN001",
      slafRegNo: "SLAF-1001",
      civilRegNo: "CAA-1234",
      inventoryNo: "INV001",
      typeID: "Truck",
      modelID: "2022",
      typeOfInduction: "New",
      inductionDate: "2024-01-10",
    },
    {
      id: "2",
      modalName: "Mitsubishi L200",
      chassisNo: "CH002",
      engineNo: "EN002",
      slafRegNo: "SLAF-1002",
      civilRegNo: "CAA-5678",
      inventoryNo: "INV002",
      typeID: "Truck",
      modelID: "2021",
      typeOfInduction: "Lease",
      inductionDate: "2024-02-15",
    },
    {
      id: "3",
      modalName: "Nissan Caravan",
      chassisNo: "CH003",
      engineNo: "EN003",
      slafRegNo: "SLAF-1003",
      civilRegNo: "CAA-9999",
      inventoryNo: "INV003",
      typeID: "Van",
      modelID: "2020",
      typeOfInduction: "Transfer",
      inductionDate: "2024-03-20",
    },
    {
      id: "4",
      modalName: "Land Rover Defender",
      chassisNo: "CH004",
      engineNo: "EN004",
      slafRegNo: "SLAF-1004",
      civilRegNo: "CAA-7777",
      inventoryNo: "INV004",
      typeID: "SUV",
      modelID: "2023",
      typeOfInduction: "New",
      inductionDate: "2024-04-05",
    },
    {
      id: "5",
      modalName: "Mahindra Bolero",
      chassisNo: "CH005",
      engineNo: "EN005",
      slafRegNo: "SLAF-1005",
      civilRegNo: "CAA-3333",
      inventoryNo: "INV005",
      typeID: "Jeep",
      modelID: "2019",
      typeOfInduction: "Repair Return",
      inductionDate: "2024-05-18",
    },
  ]);

  return (
    <VehicleTable
      vehicles={vehicles}
      loading={false}
    />
  );
}