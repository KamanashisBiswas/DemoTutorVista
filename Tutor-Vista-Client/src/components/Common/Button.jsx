import React from "react";
import { Button as UiButton } from "../ui/Button";

/**
 * Common Button wrapper for backwards compatibility
 * Maps legacy classes & variants to the new modern design system
 */
const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
  size = "md",
  ...props
}) => {
  return (
    <UiButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </UiButton>
  );
};

export default Button;
