import type { FC, SVGProps } from "react";

const RED = "#EA4535";
const YELLOW = "#F9BC15";
const GREEN = "#36A852";
const BLUE = "#557EBF";

export const GoogleAiIcon: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 392 296"
      fill="none"
      className={className}
      aria-label="Google AI"
      {...props}
    >
      <g>
        <circle fill={RED} cx="145.1" cy="66.2" r="13" />
        <circle fill={RED} cx="145.1" cy="120.4" r="13" />
        <circle fill={RED} cx="145.1" cy="174.5" r="13" />
        <circle fill={RED} cx="145.1" cy="228.7" r="13" />
        <circle fill={YELLOW} cx="191.7" cy="39.2" r="15.2" />
        <circle fill={YELLOW} cx="191.7" cy="93.3" r="15.2" />
        <circle fill={YELLOW} cx="191.7" cy="147.5" r="15.2" />
        <circle fill={YELLOW} cx="191.7" cy="201.6" r="15.2" />
        <circle fill={YELLOW} cx="191.7" cy="256.8" r="15.2" />
        <circle fill={GREEN} cx="237.7" cy="66.8" r="17.9" />
        <circle fill={GREEN} cx="237.7" cy="120.9" r="17.9" />
        <circle fill={GREEN} cx="237.7" cy="175.1" r="17.9" />
        <circle fill={GREEN} cx="237.7" cy="229.2" r="17.9" />
        <circle fill={BLUE} cx="283.7" cy="93.3" r="20.6" />
        <circle fill={BLUE} cx="98.6" cy="93.3" r="10.8" />
        <circle fill={BLUE} cx="98.6" cy="147.5" r="10.8" />
        <circle fill={BLUE} cx="98.6" cy="201.6" r="10.8" />
        <circle fill={BLUE} cx="283.7" cy="147.5" r="20.6" />
        <circle fill={BLUE} cx="283.7" cy="201.6" r="20.6" />
      </g>
    </svg>
  );
};
