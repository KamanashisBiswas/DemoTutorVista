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
  description,
  required = true,
  fileData,
  imagePreview,
  existingImages,
  isCompressing,
  removeImage,
  handleFileUpload,
}) => {
  const currentFile = fileData[field];
  const preview = imagePreview[field];
  const existing = existingImages[field];
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
      ) : (preview && currentFile) || existing ? (
        <div className="relative group border-2 border-blue-200 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="aspect-video w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
            <img
              src={preview || existing?.url}
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
          {currentFile && (
            <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-t border-blue-100">
              <p className="text-sm font-semibold text-gray-800 truncate mb-1">
                {currentFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(currentFile.size / 1024 / 1024).toFixed(2)} MB • New Upload
              </p>
            </div>
          )}
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
          className={`border-2 border-dashed border-blue-200 rounded-xl p-8 text-center hover:border-blue-300 transition-all duration-300 bg-gradient-to-br from-blue-50/30 via-indigo-50/30 to-purple-50/30 hover:from-blue-50/50 hover:via-indigo-50/50 hover:to-purple-50/50 group`}
        >
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Drop your image here
              </p>
              <p className="text-sm text-gray-500 mb-1">
                PNG, JPG, JPEG, GIF up to 5MB
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
    </div>
  );
};

const EditTutorDocumentUploadSection = ({
  fileData,
  handleFileChange,
  imagePreview,
  existingImages,
  isCompressing,
  removeImage,
  handleFileUpload,
}) => {
  return (
    <>
      {/* Image Uploads */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImageUploadField
            field="profileImage"
            label="Upload Profile Image (Optional)"
            icon={User}
            required={false}
            fileData={fileData}
            imagePreview={imagePreview}
            existingImages={existingImages}
            isCompressing={isCompressing}
            removeImage={removeImage}
            handleFileUpload={handleFileUpload}
          />
          <ImageUploadField
            field="educationDocument"
            label="Upload Your Last Certificate"
            icon={GraduationCap}
            required={true}
            fileData={fileData}
            imagePreview={imagePreview}
            existingImages={existingImages}
            isCompressing={isCompressing}
            removeImage={removeImage}
            handleFileUpload={handleFileUpload}
          />
        </div>
      </div>

      {/* Identity Verification */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Identity Verification
          </h2>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Document Type <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="documentType"
                value="nid"
                checked={fileData.documentType === "nid"}
                onChange={(e) => {
                  handleFileChange("documentType", e.target.value);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">National ID Card</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="documentType"
                value="birth_certificate"
                checked={fileData.documentType === "birth_certificate"}
                onChange={(e) => {
                  handleFileChange("documentType", e.target.value);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Birth Certificate</span>
            </label>
          </div>
        </div>
        {fileData.documentType === "nid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImageUploadField
              field="nidFront"
              label="Upload NID Front Side"
              icon={CreditCard}
              description="Upload a clear image of the front side of your National ID card"
              fileData={fileData}
              imagePreview={imagePreview}
              existingImages={existingImages}
              isCompressing={isCompressing}
              removeImage={removeImage}
              handleFileUpload={handleFileUpload}
            />
            <ImageUploadField
              field="nidBack"
              label="Upload NID Back Side"
              icon={CreditCard}
              description="Upload a clear image of the back side of your National ID card"
              fileData={fileData}
              imagePreview={imagePreview}
              existingImages={existingImages}
              isCompressing={isCompressing}
              removeImage={removeImage}
              handleFileUpload={handleFileUpload}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImageUploadField
              field="birthCertificate"
              label="Upload Birth Certificate"
              icon={CreditCard}
              description="Upload a clear image of your Birth Certificate"
              fileData={fileData}
              imagePreview={imagePreview}
              existingImages={existingImages}
              isCompressing={isCompressing}
              removeImage={removeImage}
              handleFileUpload={handleFileUpload}
            />
          </div>
        )}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-800 mb-1">
                Document Verification Requirements
              </h4>
              {fileData.documentType === "nid" ? (
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>
                    • Upload both front and back sides of your National ID
                  </li>
                  <li>• Ensure all text and details are clearly visible</li>
                  <li>• Images should be well-lit and in focus</li>
                  <li>• Maximum file size: 5MB per image</li>
                </ul>
              ) : (
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Upload a clear image of your Birth Certificate</li>
                  <li>• Ensure all text and details are clearly visible</li>
                  <li>• Image should be well-lit and in focus</li>
                  <li>• Maximum file size: 5MB</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTutorDocumentUploadSection;
