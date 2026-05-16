import Button from "../../components/ui/button/Button";
import { useAuthContext } from "@asgardeo/auth-react";  
import { Navigate } from "react-router";
import Logo from "../../../public/images/slaf.png"

export default function SignIn() {

  const { state, signIn  } = useAuthContext();

  if (state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,_#0b1c2d,_#05080f)] flex flex-col items-center justify-center text-white">

      {/* Tech grid overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none 
        bg-[linear-gradient(rgba(0,255,255,0.08)_1px,_transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.08)_1px,_transparent_1px)]
        bg-[size:60px_60px]" />

      {/* Title */}
      <h1 className="z-10 mb-5 text-4xl md:text-6xl tracking-[0.3em] font-semibold 
        text-cyan-300 drop-shadow-[0_0_18px_rgba(79,195,255,0.9)]">
        GERMS
      </h1>
      <h3 className="z-10 mb-10 text-4xl md:text-2xl tracking-[0.3em] font-semibold 
        text-cyan-300 drop-shadow-[0_0_18px_rgba(79,195,255,0.9)]">
        General Engineering Resources Management System
      </h3>

      {/* SLAF Logo */}
      <img src={Logo} alt="SLAF Logo" className="z-10 w-60 h-60 object-contain mb-6" />

      {/* Tagline */}
      {/* <p className="z-10 mt-6 text-sm md:text-base text-white/80">
        Unlock Your Digital Universe
      </p> */}

      {/* Buttons */}
      <div className="z-10 mt-10 flex gap-6">
        <Button className="px-10 py-3 rounded-full font-medium
          bg-gradient-to-r from-cyan-400 to-blue-600
          shadow-[0_0_25px_rgba(0,229,255,0.6)]
          hover:scale-105 hover:-translate-y-1 transition"
          onClick={() => signIn()}>
          Sign in with Asgardeo
        </Button>
      </div>

      {/* Guest Access */}
      {/* <button className="z-10 mt-4 text-sm text-white/60 hover:text-white transition">
        Guest Access
      </button> */}
    </div>
  );
}