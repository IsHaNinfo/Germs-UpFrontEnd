import { ReactNode } from "react";

interface ImageButtonProps {
  image: string; // Image URL
  alt?: string; // Image alt text
  label: string; // Button label/text
  onClick?: () => void; // Click handler
  badge?: ReactNode; // Optional badge
  disabled?: boolean; // Disabled state
  size?: "sm" | "md" | "lg"; // Button size
  variant?: "light" | "dark" | "gradient"; // Button variant
  className?: string; // Additional custom classes
}

const ImageButton: React.FC<ImageButtonProps> = ({
  image,
  alt = "button-image",
  label,
  onClick,
  badge,
  disabled = false,
  size = "md",
  variant = "light",
  className = "",
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "h-32 md:h-40",
    md: "h-40 md:h-56",
    lg: "h-56 md:h-72",
  };

  // Variant Classes
  const variantClasses = {
    light:
      "bg-gray-200/60 backdrop-blur-sm border border-gray-300 hover:bg-gray-300/70",
    dark: "bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:bg-gray-700/70 text-white",
    gradient:
      "bg-gradient-to-br from-blue-500/50 to-purple-600/50 backdrop-blur-sm border border-blue-400/50 hover:from-blue-600/60 hover:to-purple-700/60",
  };

  return (
    <div
      onClick={() => !disabled && onClick?.()}
      className={`
        relative
        flex flex-col items-center justify-center
        rounded-2xl cursor-pointer
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:scale-105
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""}
        ${className}
      `}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-10"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 rounded-2xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2">
        <span className="text-lg md:text-2xl font-semibold text-center px-4">
          {label}
        </span>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {badge}
          </div>
        )}
      </div>

      {/* Hover Effect Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/10 to-transparent" />
    </div>
  );
};

export default ImageButton;
