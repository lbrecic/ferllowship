import React from "react";
import { Button, fontawesome  } from "react-bootstrap";
import "../styles/LoaderButton.css";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <fontawesome  glyph="refresh" className="spinning" />}
      {props.children}
    </Button>
  );
}