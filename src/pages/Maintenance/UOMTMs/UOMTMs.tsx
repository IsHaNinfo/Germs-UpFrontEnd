import MTMPage from "../../../components/maintenance/UOMTMs/MTMPage";

const Servicing = () => {
  return (
    <div className="min-h-screen">
        <h1 className="text-xl font-bold mb-5">Utilization of MTMs</h1>
      {/* ===== Vehicle Table ===== */}
        <MTMPage />
    </div>
  );
};

export default Servicing;