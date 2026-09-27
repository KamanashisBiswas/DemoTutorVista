import React from "react";
import {
  User,
  GraduationCap,
  Shield,
  CreditCard,
  Upload,
  Trash2,
} from "lucide-react";

const ImageUploadField = ({
  field,
  label,
  icon: Icon,
  error,
  description,
  required = true,
  fileData,
  imagePreview,
  isCompressing,
  removeImage,
  handleFileUpload,
}) => {
  const currentFile = fileData[field];
  const preview = imagePreview[field];
  const compressing = isCompressing[field];

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="w-4 h-4 text-gray-600" />
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
      {description && (
        <p className="text-xs text-gray-500 mb-3">{description}</p>
      )}
      {compressing ? (
        <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50/50 flex items-center justify-center aspect-video">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-md font-semibold text-gray-700">
              Compressing Image...
            </p>
            <p className="text-xs text-gray-500">
              Please wait, this may take a moment.
            </p>
          </div>
        </div>
      ) : preview && currentFile ? (
        <div className="relative group border-2 border-blue-200 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="aspect-video w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                <button
                  type="button"
                  onClick={() => removeImage(field)}
                  className="bg-red-500 bg-opacity-90 hover:bg-opacity-100 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-t border-blue-100">
            <p className="text-sm font-semibold text-gray-800 truncate mb-1">
              {currentFile.name}
            </p>
            <p className="text-xs text-gray-500">
              {(currentFile.size / 1024 / 1024).toFixed(2)} MB • Image
            </p>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById(field).click()}
            className="absolute top-3 right-3 p-2 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg transform hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <Upload className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed ${
            error ? "border-red-300" : "border-blue-200"
          } rounded-xl p-8 text-center hover:border-blue-300 transition-all duration-300 bg-gradient-to-br from-blue-50/30 via-indigo-50/30 to-purple-50/30 hover:from-blue-50/50 hover:via-indigo-50/50 hover:to-purple-50/50 group`}
        >
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Drop your image here
              </p>
              <p className="text-sm text-gray-500 mb-1">
                PNG, JPG, JPEG, GIF up to 3MB
              </p>
              <p className="text-xs text-gray-400">
                Click to browse or drag and drop
              </p>
            </div>
            <button
              type="button"
              onClick={() => document.getElementById(field).click()}
              className="px-8 py-3 bg-blue-500 text-white rounded-xl text-sm shadow-none hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Upload Image
            </button>
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
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const TutorDocumentUploadSection = ({
  fileData,
  handleFileChange,
  imagePreview,
  isCompressing,
  removeImage,
  handleFileUpload,
  fieldErrors,
}) => {
  return (
    <>
      {/* Image Uploads */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageUploadField
            field="profileImage"
            label="Upload Profile Image (Optional)"
            icon={User}
            error={fieldErrors.profileImage}
            required={false}
            fileData={fileData}
            imagePreview={imagePreview}
            isCompressing={isCompressing}
            removeImage={removeImage}
            handleFileUpload={handleFileUpload}
          />
          <ImageUploadField
            field="educationDocument"
            label="Upload Last Certificate"
            icon={GraduationCap}
            error={fieldErrors.educationDocument}
            fileData={fileData}
            imagePreview={imagePreview}
            isCompressing={isCompressing}
            removeImage={removeImage}
            handleFileUpload={handleFileUpload}
          />
        </div>
      </div>

      {/* Identity Verification */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="mr-2" />
          Identity Verification
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="documentType"
                value="nid"
                checked={fileData.documentType === "nid"}
                onChange={(e) =>
                  handleFileChange("documentType", e.target.value)
                }
                className="w-4 h-4"
              />
              <span className="ml-2">NID/Passport</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="documentType"
                value="birth_certificate"
                checked={fileData.documentType === "birth_certificate"}
                onChange={(e) =>
                  handleFileChange("documentType", e.target.value)
                }
                className="w-4 h-4"
              />
              <span className="ml-2">Birth Certificate</span>
            </label>
          </div>
        </div>
        {fileData.documentType === "nid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageUploadField
              field="nidFront"
              label="NID Front"
              icon={CreditCard}
              error={fieldErrors.nidFront}
              fileData={fileData}
              imagePreview={imagePreview}
              isCompressing={isCompressing}
              removeImage={removeImage}
              handleFileUpload={handleFileUpload}
            />
            <ImageUploadField
              field="nidBack"
              label="NID Back"
              icon={CreditCard}
              error={fieldErrors.nidBack}
              fileData={fileData}
              imagePreview={imagePreview}
              isCompressing={isCompressing}
              removeImage={removeImage}
              handleFileUpload={handleFileUpload}
            />
          </div>
        ) : (
          <ImageUploadField
            field="birthCertificate"
            label="Birth Certificate"
            icon={CreditCard}
            error={fieldErrors.birthCertificate}
            fileData={fileData}
            imagePreview={imagePreview}
            isCompressing={isCompressing}
            removeImage={removeImage}
            handleFileUpload={handleFileUpload}
          />
        )}
      </div>
    </>
  );
};

export default TutorDocumentUploadSection;
