import { IconProps } from "@/types";
import React from "react";

export const ThunderboltIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({
  className = "w-4 h-4",
  filled = false,
}) => (
  <svg
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({
  className = "w-5 h-5",
  filled = false,
  stroke = "currentColor",
}) => (
  <svg
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : stroke}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

export const MinusIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12H4"
    />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
    />
  </svg>
);

export const SortIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
    />
  </svg>
);

export const GridIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export const CurrencyIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m0 0V7a1 1 0 011 1v8a1 1 0 01-1 1H9a1 1 0 01-1-1V8a1 1 0 011-1h0z"
    />
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    />
  </svg>
);

export const WarningIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
);

export const ShoppingBagIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);
