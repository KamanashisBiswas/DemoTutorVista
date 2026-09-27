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
    <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
          <MapPin className="w-4 h-4" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
          Location & Address
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
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
        <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
          Detailed Street / House Address <span className="text-[#DC2626]">*</span>
        </label>
        <textarea
          ref={fieldRefs.address}
          rows={3}
          placeholder="House #, Road #, Sector / Block, Flat details..."
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
            fieldErrors.address ? "border-[#DC2626]" : "border-[#E4E6EE]"
          } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 resize-vertical`}
        />
        {fieldErrors.address && (
          <p className="mt-1 text-xs text-[#DC2626]">{fieldErrors.address}</p>
        )}
      </div>
    </div>
  );
};

export default AddressForm;
