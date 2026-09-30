import React from "react";

export const Skeleton = ({
  className = "",
  variant = "rectangular", // "text", "circular", "rectangular"
  width,
  height,
  ...props
}) => {
  const variantClasses = {
    text: "h-4 rounded-sm",
    circular: "rounded-full",
    rectangular: "rounded-md",
  };

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      style={style}
      className={`animate-pulse bg-[#E4E6EE]/80 ${variantClasses[variant] || variantClasses.rectangular} ${className}`}
      {...props}
    />
  );
};

export const SkeletonText = ({ lines = 3, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={`h-4 ${i === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
};

export const SkeletonCard = ({ className = "" }) => {
  return (
    <div className={`p-5 bg-white border border-[#E4E6EE] rounded-md shadow-sm space-y-4 ${className}`}>
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="space-y-1.5 flex-1">
          <Skeleton variant="text" className="h-4 w-1/2" />
          <Skeleton variant="text" className="h-3 w-1/3" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="pt-2 flex justify-between items-center">
        <Skeleton variant="text" className="h-4 w-20" />
        <Skeleton variant="rectangular" className="h-8 w-24 rounded-sm" />
      </div>
    </div>
  );
};

export const SkeletonTableRows = ({ rows = 5, cols = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx} className="border-b border-[#E4E6EE]/60">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <td key={cIdx} className="py-4 px-4">
              <Skeleton
                variant="text"
                className={`h-4 ${cIdx === 0 ? "w-3/4" : "w-1/2"}`}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export const SkeletonTable = ({ rows = 5, cols = 5, className = "" }) => {
  return (
    <div className={`w-full overflow-hidden border border-[#E4E6EE] rounded-xl bg-white ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#F7F8FB] border-b border-[#E4E6EE]">
            {Array.from({ length: cols }).map((_, cIdx) => (
              <th key={cIdx} className="py-3 px-4">
                <Skeleton variant="text" className="h-3.5 w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <SkeletonTableRows rows={rows} cols={cols} />
        </tbody>
      </table>
    </div>
  );
};

export default Skeleton;
