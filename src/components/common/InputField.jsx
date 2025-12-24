import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({ label, type, name, value, onChange, placeholder, error }) => {
  // State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Check if this is a password field
  const isPasswordField = type === "password";

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <div className="relative">
        <input
          // Logic: If it's a password field AND showPassword is true, show text. Otherwise, use original type.
          type={isPasswordField && showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg outline-none transition-all 
            ${error 
              ? "border-red-500 bg-red-50 focus:ring-red-200" 
              : "border-gray-300 bg-gray-50 focus:ring-2 focus:ring-orange-200 focus:border-orange-500" // Updated to Orange theme
            }
            ${isPasswordField ? "pr-10" : ""} // Add padding on right so text doesn't hit the icon
          `}
        />

        {/* Show Toggle Button ONLY if it is a password field */}
        {isPasswordField && (
          <button
            type="button" // Important: Prevents form submission
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;