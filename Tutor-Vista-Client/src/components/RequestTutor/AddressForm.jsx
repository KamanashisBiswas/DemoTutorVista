import React from "react";
import { MapPin } from "lucide-react";
import { SelectField } from "./SharedComponents";

const AddressForm = ({
  formData,
  handleInputChange,
  fieldErrors,
  fieldRefs,
  divisions,
  districts,
  thanas,
  areas,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Address
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SelectField
          label="Division"
          value={formData.division}
          onChange={(value) => handleInputChange("division", value)}
          options={divisions}
          placeholder="Select Division"
          name="division"
          error={fieldErrors.division}
          required={true}
          fieldRefs={fieldRefs}
        />
        <SelectField
          label="District"
          value={formData.district}
          onChange={(value) => handleInputChange("district", value)}
          options={districts}
          placeholder="Select District"
          disabled={!formData.division}
          name="district"
          error={fieldErrors.district}
          required={true}
          fieldRefs={fieldRefs}
        />
        <SelectField
          label="Thana"
          value={formData.thana}
          onChange={(value) => handleInputChange("thana", value)}
          options={thanas}
          placeholder="Select Thana"
          disabled={!formData.district}
          name="thana"
          error={fieldErrors.thana}
          required={true}
          fieldRefs={fieldRefs}
        />
        <SelectField
          label="Area"
          value={formData.area}
          onChange={(value) => handleInputChange("area", value)}
          options={areas}
          placeholder="Select Area"
          disabled={!formData.thana}
          name="area"
          error={fieldErrors.area}
          required={true}
          fieldRefs={fieldRefs}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Detailed Address <span className="text-red-500">*</span>
        </label>
        <textarea
          ref={fieldRefs.address}
          rows={4}
          placeholder="Enter detailed address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className={`w-full px-4 py-3 border ${
            fieldErrors.address ? "border-red-500" : "border-gray-300"
          } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-vertical`}
        />
        {fieldErrors.address && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.address}</p>
        )}
      </div>
    </div>
  );
};

export default AddressForm;
