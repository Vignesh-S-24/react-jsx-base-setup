import React from 'react';
import { SvgIcon } from '@mui/material';

/**
 * Custom Edit Icon (Outline)
 */
export const EditIcon = ({ sx, ...props }) => (
  <SvgIcon
    viewBox="0 0 24 24"
    sx={{
      fill: 'none !important',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      '& path, & line, & polyline': {
        fill: 'none !important',
        stroke: 'currentColor',
      },
      ...sx,
    }}
    {...props}
  >
    <path fill="none" stroke="currentColor" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path fill="none" stroke="currentColor" d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </SvgIcon>
);

/**
 * Custom Delete Icon (Outline)
 */
export const DeleteIcon = ({ sx, ...props }) => (
  <SvgIcon
    viewBox="0 0 24 24"
    sx={{
      fill: 'none !important',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      '& path, & line, & polyline': {
        fill: 'none !important',
        stroke: 'currentColor',
      },
      ...sx,
    }}
    {...props}
  >
    <path fill="none" stroke="currentColor" d="M3 6h18" />
    <path fill="none" stroke="currentColor" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path fill="none" stroke="currentColor" d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line stroke="currentColor" x1="10" y1="11" x2="10" y2="17" />
    <line stroke="currentColor" x1="14" y1="11" x2="14" y2="17" />
  </SvgIcon>
);

/**
 * Custom Close Icon (Outline)
 */
export const CloseIcon = ({ sx, ...props }) => (
  <SvgIcon
    viewBox="0 0 24 24"
    sx={{
      fill: 'none !important',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      '& path, & line, & polyline': {
        fill: 'none !important',
        stroke: 'currentColor',
      },
      ...sx,
    }}
    {...props}
  >
    <line stroke="currentColor" x1="18" y1="6" x2="6" y2="18" />
    <line stroke="currentColor" x1="6" y1="6" x2="18" y2="18" />
  </SvgIcon>
);

/**
 * Custom Email Icon (Outline)
 */
export const EmailOutlinedIcon = ({ sx, ...props }) => (
  <SvgIcon
    viewBox="0 0 24 24"
    sx={{
      fill: 'none !important',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      '& path, & line, & polyline, & rect': {
        fill: 'none !important',
        stroke: 'currentColor',
      },
      ...sx,
    }}
    {...props}
  >
    <rect fill="none" stroke="currentColor" width="20" height="16" x="2" y="4" rx="2" />
    <path fill="none" stroke="currentColor" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </SvgIcon>
);

/**
 * Custom Phone Icon (Outline)
 */
export const LocalPhoneOutlinedIcon = ({ sx, ...props }) => (
  <SvgIcon
    viewBox="0 0 24 24"
    sx={{
      fill: 'none !important',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      '& path, & line, & polyline': {
        fill: 'none !important',
        stroke: 'currentColor',
      },
      ...sx,
    }}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
    />
  </SvgIcon>
);

// Aliases
export const CustomEditIcon = EditIcon;
export const CustomDeleteIcon = DeleteIcon;
export const CustomCloseIcon = CloseIcon;
export const EmailIcon = EmailOutlinedIcon;
export const PhoneIcon = LocalPhoneOutlinedIcon;

export default {
  Edit: EditIcon,
  Delete: DeleteIcon,
  Close: CloseIcon,
  Email: EmailOutlinedIcon,
  Phone: LocalPhoneOutlinedIcon,
};
