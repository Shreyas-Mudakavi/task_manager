"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
  border?: string;
  color?: string;
}

const StyledButton = styled.button`
  display: flex;
  position: relative;
  color: ${(props) => props.theme.colorGrey2};
  align-items: center;
  z-index: 5;
  cursor: pointer;
  transition: all 0.55s ease-in-out;
  margin: auto;

  &:hover {
    color: ${(props) => props.theme.colorGrey0};
  }
`;

const Button = ({
  background,
  border,
  borderRad,
  click,
  fs,
  fw,
  icon,
  name,
  padding,
  type,
  color,
}: Props) => {
  const { theme } = useGlobalState();

  return (
    <StyledButton
      style={{
        background: background,
        border: border || "none",
        padding: padding || "0.5rem 1rem",
        borderRadius: borderRad || "0.5rem",
        fontWeight: fw,
        fontSize: fs,
        color: color || theme.colorGrey2,
      }}
      type={type}
      theme={theme}
      onClick={click}
    >
      {icon && icon}
      {name}
    </StyledButton>
  );
};

export default Button;
