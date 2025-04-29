import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div<{ height?: string; width?: string }>`
  display: inline-block;
  position: relative;
  height: ${(props) => props.height || "40px"};
  width: ${(props) => props.width || "40px"};
`;

const SpinnerElement = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid #43bcce;
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #43bcce transparent transparent transparent;

  &:nth-of-type(1) {
    animation-delay: -0.45s;
  }
  &:nth-of-type(2) {
    animation-delay: -0.3s;
  }
  &:nth-of-type(3) {
    animation-delay: -0.15s;
  }
`;

interface SpinnerProps {
  height?: string;
  width?: string;
  ariaLabel?: string;
}

export const Spinner = ({
  height,
  width,
  ariaLabel = "Loading...",
}: SpinnerProps) => {
  return (
    <SpinnerContainer
      height={height}
      width={width}
      role="status"
      aria-label={ariaLabel}
    >
      <SpinnerElement />
      <SpinnerElement />
      <SpinnerElement />
      <SpinnerElement />
    </SpinnerContainer>
  );
};