import type { ReactNode } from "react";

export type TabsVariant = "segmented" | "underline";

export interface TabItem {
  id: string;
  key: string;
  label: string;
  icon?: ReactNode;
  hidden?: boolean;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  variant?: TabsVariant;
  fullWidth?: boolean;
  urlParam?: string;
  defaultTab?: string;
  onChange?: (tab: TabItem) => void;
}