import type { TabsVariant } from "./tabs.types";

export const getTabsContainerClass = (
  variant: TabsVariant,
  fullWidth = false,
) => {
  const widthClass = fullWidth ? "w-full" : "";

  switch (variant) {
    case "segmented":
      return `
        inline-flex
        ${widthClass || "w-full"}
        items-center
        rounded-lg
        border
        border-app-border
        bg-app-surface
        p-0.5

        ${fullWidth ? "" : "tablet:w-auto"}
      `;

    case "underline":
      return `
        flex
        ${widthClass || "w-full"}
        items-center
        border-b
        border-app-border
      `;

    default:
      return "";
  }
};

export const getTabClass = ({
  variant,
  fullWidth,
  isActive,
  disabled,
}: {
  variant: TabsVariant;
  fullWidth?: boolean;
  isActive: boolean;
  disabled?: boolean;
}) => {
  const disabledClass = disabled
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer";

  switch (variant) {
    case "segmented":
      return `
        inline-flex
        flex-1
        items-center
        justify-center
        gap-2
        rounded-md
        px-3
        py-1.5
        text-sm
        font-medium
        outline-none
        transition-colors
        duration-150

        ${fullWidth ? "tablet:flex-1" : "tablet:flex-none"}
        tablet:px-4

        ${disabledClass}

        ${
          isActive
            ? "bg-app-primary-500 text-app-text-inverse"
            : "bg-transparent text-app-text hover:bg-app-bg"
        }
      `;

    case "underline":
      return `
        relative
        inline-flex
        h-11
        items-center
        gap-2
        px-4
        text-sm
        font-medium
        outline-none
        transition-colors
        duration-150
        ${fullWidth ? "flex-1 justify-center" : ""}

        ${disabledClass}

        ${
          isActive
            ? "text-app-primary-500"
            : "text-app-text-muted hover:text-app-text"
        }

        ${
          isActive
            ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-app-primary-500"
            : ""
        }
      `;

    default:
      return "";
  }
};