import { useState } from "react";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";

const MTMRegistration = () => {

  interface MTMFormData {
    svcno: string;
    allocation_date: string;
    allocation_section: string;
    allocation_location: string;
  }

  const [formData, setFormData] = useState<MTMFormData>({
    svcno: "",
    allocation_date: "",
    allocation_section: "",
    allocation_location: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("MTM Registered Successfully!");
  };

  // const qualifications = ["G.C.E. O/L qualification", "G.C.E. A/L qualification"];
  // const specializations = ["Light Vehicle Mechanic", "Heavy Vehicle Mechanic","Diesel Mechanic"];

  //status badge component
  // const StatusBadge = ({ value }: any) => (
  //   <span
  //     className={`px-2 py-1 rounded text-white text-xs`}
  //   >
  //     {value}
  //   </span>
  // );

  return (
    <div className="min-h-screen w-full bg-gray-50 px-8 py-10">
      <div className="mb-10 border-b pb-4 flex justify-between items-center">
           
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            MTM Registration
          </h1>
          <p className="text-gray-500 mt-1">
            Register a new MTM into the system
          </p>
        </div>

      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Basic Information
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Label>SVC No.</Label>
            <Input
              type="text"
              name="svcno"
              value={formData.svcno}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Rank</Label>
            <Input
              disabled
              type="text"
              name="rank"
              // value={formData.rank}
              onChange={handleChange}
            />
            </div>

          <div>
            <Label>Name</Label>
            <Input
              disabled
              type="text"
              name="name"
              // value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <div className="mt-10">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Qualifications
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-3">
            <div>
              {qualifications && qualifications.length > 0 ? (
                <div className="mt-4 space-y-2 flex">
                  {qualifications.map((qual: string, index: number) => (
                    <div key={index} className="items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg w-fit group">
                      <span className="text-sm font-medium text-blue-900">{qual}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            qualifications: qualifications.filter((_, i) => i !== index),
                          })
                        }
                        className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">View Qualifications here after type SVC No.</span>
              )}
            </div>              
        </div> */}
        
        {/* <div className="mt-10">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Specializations
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-3">
            <div>
              {specializations && specializations.length > 0 ? (
                <div className="mt-4 space-y-2 flex">
                  {specializations.map((spec: string, index: number) => (
                    <div key={index} className="items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg w-fit group">
                      <span className="text-blue-600 font-semibold">
                        {spec}
                      </span>
                      <StatusBadge value={spec} />
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">View Specializations here after type SVC No.</span>
              )}
            </div>              
        </div> */}

        <div className="mt-10">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Allocations
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <Label>Section</Label>
            <select
              name="allocation_section"
              value={formData.allocation_section}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            >
              <option value="select">Select Section</option>
              <option value="TC">TC</option>
              <option value="Workshop">Workshop</option>
              <option value="Yard">Yard</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <Label>Location</Label>
            <select
              name="allocation_location"
              value={formData.allocation_location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            >
              <option value="select">Select Location</option>
              <option value="Base RMA">Base RMA</option>
              <option value="AFHQ">AFHQ</option>
              <option value="TTS EKA">TTS EKA</option>
            </select>
          </div>
        </div>

        
        <div className="flex justify-end gap-4 mt-12 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="px-6"
          >
            Register MTM
          </Button>
        </div>

      </form>
    </div>
  );
};

export default MTMRegistration;