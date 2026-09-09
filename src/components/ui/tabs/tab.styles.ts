import type { TabsVariant } from "./tabs.types";

interface TabStyleProps {
  variant: TabsVariant;
  isActive: boolean;
  disabled?: boolean;
}

export const getTabsContainerClass = (
  variant: TabsVariant,
) => {
  switch (variant) {
    case "segmented":
      return `
        inline-flex
        items-center
        rounded-lg
        border
        border-app-border
        bg-app-surface
        p-0.5
      `;

    case "underline":
      return `
        flex
        w-full
        items-center
        border-b
        border-app-border
      `;

    case "fullWidth":
      return `
        flex
        w-full
        items-stretch
        rounded-lg
        border
        border-app-border
        bg-app-surface
      `;

    default:
      return "";
  }
};

export const getTabClass = ({
  variant,
  isActive,
  disabled,
}: TabStyleProps) => {
  const disabledClass = disabled
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer";

  switch (variant) {
    case "segmented":
      return `
        inline-flex
        h-8
        items-center
        gap-2
        rounded-md
        px-2
        text-sm
        font-medium
        outline-none
        transition-colors
        duration-150
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

    case "fullWidth":
      return `
        flex
        flex-1
        items-center
        justify-center
        gap-2
        px-4
        py-3
        text-sm
        font-medium
        outline-none
        transition-colors
        duration-150
        ${disabledClass}
        ${
          isActive
            ? "bg-app-primary-500 text-app-text-inverse"
            : "bg-app-surface text-app-text hover:bg-app-bg"
        }
        first:rounded-l-md
        last:rounded-r-md
      `;

    default:
      return "";
  }
};