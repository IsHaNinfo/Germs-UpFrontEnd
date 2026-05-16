
import { Link, Navigate } from "react-router";
import { ChevronLeftIcon } from "../../icons";
import Button from "../ui/button/Button";
import { useAuthContext } from "@asgardeo/auth-react";

export default function SignInForm() {
const { state, signIn, signOut  } = useAuthContext();

 const handleLogout = async () => {
    await signOut();
    return <Navigate to="/signin" replace />;
  };
  // ✅ If already logged in, redirect
  if (state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm">
              Sign In
            </h1>
            <p className="text-sm text-gray-500">
              Sign in securely using Asgardeo
            </p>
          </div>

          {/* 🔐 ASGARDEO LOGIN BUTTON */}
          <div className="space-y-4">
            <Button
              className="w-full"
              size="sm"
              onClick={() => signIn()}
            >
              Sign in with Asgardeo
            </Button>

            <p className="text-xs text-center text-gray-400">
              Authentication is handled securely by Asgardeo
            </p>
          </div>

          {/* OPTIONAL: Logout (for testing) */}
          {state.isAuthenticated && (
            <div className="mt-4">
              <Button
                className="w-full"
                size="sm"
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}