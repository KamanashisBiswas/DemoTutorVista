import React from "react";
import {
  Upload,
  Trash2,
  User,
  GraduationCap,
  Shield,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import Button from "../Common/Button";

const ImageUploadField = ({
  field,
  label,
  icon: Icon,
  error,
  fileData,
  imagePreview,
  isCompressing,
  removeImage,
  handleFileUpload,
  fieldErrors,
  isOptional = false,
}) => {
  const currentFile = fileData[field];
  const preview = imagePreview[field];
  const compressing = isCompressing[field];

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="w-4 h-4 text-[#5B5F73]" />
        <label className="block text-xs font-semibold text-[#1A1D29]">
          {label} {!isOptional && <span className="text-[#DC2626]">*</span>}
        </label>
      </div>

      {compressing ? (
        <div className="border border-dashed border-[#3730E0]/30 rounded-md p-6 text-center bg-[#EEEDFD]/30 flex items-center justify-center aspect-video">
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3730E0]"></div>
            <p className="text-xs font-semibold text-[#1A1D29]">
              Compressing Image...
            </p>
            <p className="text-[11px] text-[#5B5F73]">
              Optimizing size for quick upload
            </p>
          </div>
        </div>
      ) : preview && currentFile ? (
        <div className="relative group border border-[#E4E6EE] rounded-md overflow-hidden bg-white shadow-xs">
          <div className="aspect-video w-full bg-[#F7F8FB] flex items-center justify-center relative overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => removeImage(field)}
                className="bg-[#DC2626] text-white p-2.5 rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer"
                title="Remove image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => document.getElementById(field).click()}
                className="bg-[#3730E0] text-white p-2.5 rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer"
                title="Change image"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="px-3.5 py-2 bg-white border-t border-[#E4E6EE] flex items-center justify-between text-xs">
            <p className="font-semibold text-[#1A1D29] truncate max-w-[180px]">
              {currentFile.name}
            </p>
            <span className="text-[11px] text-[#5B5F73]">
              {(currentFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => document.getElementById(field).click()}
          className={`border-2 border-dashed ${
            fieldErrors[field] ? "border-[#DC2626]" : "border-[#E4E6EE]"
          } rounded-md p-6 text-center hover:border-[#3730E0] hover:bg-[#EEEDFD]/20 transition-all cursor-pointer bg-[#F7F8FB] group`}
        >
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-white shadow-xs border border-[#E4E6EE] flex items-center justify-center text-[#5B5F73] group-hover:text-[#3730E0] transition-colors">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A1D29]">
                Click or drag image to upload
              </p>
              <p className="text-[11px] text-[#5B5F73] mt-0.5">
                PNG, JPG, or JPEG up to 15MB
              </p>
            </div>
          </div>
        </div>
      )}
      <input
        id={field}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(field, e.target.files[0])}
      />
      {error && <p className="mt-1 text-xs text-[#DC2626]">{error}</p>}
    </div>
  );
};

const DocumentUploadSection = ({
  fileData,
  handleFileChange,
  imagePreview,
  setImagePreview,
  isCompressing,
  fieldErrors,
  handleFileUpload,
  removeImage,
}) => {
  return (
    <>
      {/* Education Document Upload */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Documents & Photos
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ImageUploadField
            field="profileImage"
            label="Upload Tutor Profile Photo (Optional)"
            icon={User}
            error={fieldErrors.profileImage}
            fileData={fileData}
            imagePreview={imagePreview}
            isCompressing={isCompressing}
            removeImage={removeImage}
            handleFileUpload={handleFileUpload}
            fieldErrors={fieldErrors}
            isOptional={true}
          />
          <ImageUploadField
            field="educationDocument"
            label="Upload Last Certificate / Student ID Card"
            icon={GraduationCap}
            error={fieldErrors.educationDocument}
            fileData={fileData}
            imagePreview={imagePreview}
            isCompressing={isCompressing}
            removeImage={removeImage}
            handleFileUpload={handleFileUpload}
            fieldErrors={fieldErrors}
          />
        </div>
      </div>

      {/* Identity Verification */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Identity Verification
          </h3>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#1A1D29] mb-2">
            Select Verification Document Type <span className="text-[#DC2626]">*</span>
          </label>
          <div className="flex gap-4 sm:gap-6">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="documentType"
                value="nid"
                checked={fileData.documentType === "nid"}
                onChange={(e) => {
                  handleFileChange("documentType", e.target.value);
                  handleFileChange("birthCertificate", null);
                  setImagePreview((prev) => ({
                    ...prev,
                    birthCertificate: null,
                  }));
                }}
                className="w-4 h-4 text-[#3730E0] border-[#E4E6EE] focus:ring-[#3730E0]"
              />
              <span className="text-xs sm:text-sm font-medium text-[#1A1D29]">
                National ID Card / Passport
              </span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="documentType"
                value="birth_certificate"
                checked={fileData.documentType === "birth_certificate"}
                onChange={(e) => {
                  handleFileChange("documentType", e.target.value);
                  handleFileChange("nidFront", null);
                  handleFileChange("nidBack", null);
                  setImagePreview((prev) => ({
                    ...prev,
                    nidFront: null,
                    nidBack: null,
                  }));
                }}
                className="w-4 h-4 text-[#3730E0] border-[#E4E6EE] focus:ring-[#3730E0]"
              />
              <span className="text-xs sm:text-sm font-medium text-[#1A1D29]">
                Birth Certificate
              </span>
            </label>
          </div>
        </div>

        {fileData.documentType === "nid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ImageUploadField
              field="nidFront"
              label="Upload NID / Passport Front Side"
              icon={CreditCard}
              error={fieldErrors.nidFront}
              fileData={fileData}
              imagePreview={imagePreview}
              isCompressing={isCompressing}
              removeImage={removeImage}
              handleFileUpload={handleFileUpload}
              fieldErrors={fieldErrors}
            />
            <ImageUploadField
              field="nidBack"
              label="Upload NID / Passport Back Side"
              icon={CreditCard}
              error={fieldErrors.nidBack}
              fileData={fileData}
              imagePreview={imagePreview}
              isCompressing={isCompressing}
              removeImage={removeImage}
              handleFileUpload={handleFileUpload}
              fieldErrors={fieldErrors}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ImageUploadField
              field="birthCertificate"
              label="Upload Birth Certificate Copy"
              icon={CreditCard}
              error={fieldErrors.birthCertificate}
              fileData={fileData}
              imagePreview={imagePreview}
              isCompressing={isCompressing}
              removeImage={removeImage}
              handleFileUpload={handleFileUpload}
              fieldErrors={fieldErrors}
            />
          </div>
        )}

        <div className="mt-5 p-3.5 bg-[#EEEDFD]/50 border border-[#3730E0]/20 rounded-md">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#3730E0] mt-0.5 flex-shrink-0" />
            <div className="text-xs text-[#3730E0]">
              <span className="font-bold">Verification guidelines:</span> Please ensure image is well-lit, not blurred, and all text including dates and registration numbers are clearly readable.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentUploadSection;
