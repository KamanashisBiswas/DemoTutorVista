import React from "react";
import { X } from "lucide-react";

const MultiSelectFilter = ({
  label,
  options,
  selected,
  onChange,
  placeholder,
}) => {
  const handleSelect = (value) => {
    if (value && !selected.includes(value)) {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (valueToRemove) => {
    onChange(selected.filter((value) => value !== valueToRemove));
  };

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-600">{label}</label>
      <div className="w-full border rounded-lg bg-white px-2 py-1 min-h-[38px] flex flex-wrap gap-2 items-center transition-all duration-200 border-gray-300 hover:border-gray-400">
        {selected.map((item) => (
          <span
            key={item}
            className="flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemove(item)}
              className="ml-1.5 text-blue-600 hover:text-blue-800"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <select
          className="flex-1 min-w-[100px] border-none focus:ring-0 outline-none text-sm py-1 bg-transparent"
          value=""
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options
            .filter((opt) => !selected.includes(opt))
            .map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default MultiSelectFilter;
