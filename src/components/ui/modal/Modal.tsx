import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

/*
  Color tokens (from app theme):
  - Modal shell  → bg-app-surface + border-app-border + text-app-text
  - Header       → bg-app-surface-muted + border-b border-app-border
  - Body         → inherits shell (app-surface)
  - Footer       → bg-app-surface-muted + border-t border-app-border
  Do NOT use raw Tailwind colors like bg-gray-100 — they break dark/theme mode.
*/

const sizeClasses = {
  sm: "w-64 min-h-[200px]",
  md: "w-96 min-h-[300px]",
  l: "w-[600px] min-h-[300px]",
  lg: "w-[800px] min-h-[400px]",
  xl: "w-[1000px] min-h-[500px]",
  xxl: "w-[1200px] min-h-[600px]",
} as const;

const MODAL_CENTER = "center";
const MODAL_SIDE = "side";

type ModalSize = keyof typeof sizeClasses;
type ModalType = typeof MODAL_CENTER | typeof MODAL_SIDE;

const modalStyle = (
  modalType: ModalType,
  size: ModalSize,
  isOpen: boolean,
  sideInset: boolean,
) => {
  const baseClasses =
    "bg-app-surface text-app-text border border-app-border shadow-lg flex flex-col overflow-hidden";

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  if (modalType === MODAL_SIDE) {
    const slideIn = isOpen ? "translate-x-0" : "translate-x-full";
    const sidePosition = sideInset
      ? "top-3 right-3 bottom-3 h-auto rounded-2xl"
      : "top-0 right-0 h-full";

    return `
      ${baseClasses}
      fixed
      ${sidePosition}
      transition-transform
      duration-500
      ${slideIn}
      ${sizeClass}
    `;
  }

  return `
    ${baseClasses}
    absolute
    top-1/2
    left-1/2
    transform
    -translate-x-1/2
    -translate-y-1/2
    rounded-xl
    ${sizeClass}
  `;
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  modalType?: ModalType;
  size?: ModalSize;
  title?: string;
  footerComponent?: React.ReactNode;
  children?: React.ReactNode;
  sx?: object;
  sideInset?: boolean;
}

const APPModal: React.FC<ModalProps> = ({
  open,
  onClose,
  modalType = MODAL_CENTER,
  size = "md",
  children,
  title,
  footerComponent,
  sideInset = false,
  sx,
}) => {
  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={sx}
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 200,
          },
        }}
      >
        <Box className={modalStyle(modalType, size, open, sideInset)} sx={sx}>
          {/* Header */}
          <Box className="flex h-12 shrink-0 items-center justify-between border-b border-app-border bg-app-bg px-4">
            <Typography
              id="transition-modal-title"
              variant="inherit"
              className="text-base font-semibold text-app-text"
            >
              {title}
            </Typography>
            <button
              type="button"
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-sm text-app-text-muted transition-colors hover:bg-app-surface hover:text-app-error"
              onClick={onClose}
            >
              <CloseIcon fontSize="small" />
            </button>
          </Box>

          {/* Body */}
          <Box className="flex-grow overflow-y-auto bg-app-surface p-4 text-app-text">
            {children}
          </Box>

          {/* Footer */}
          {footerComponent ? (
            <Box className="flex h-14 shrink-0 items-center border-t border-app-border bg-app-bg px-4 py-2">
              {footerComponent}
            </Box>
          ) : null}
        </Box>
      </Modal>
    </Box>
  );
};

export default APPModal;
