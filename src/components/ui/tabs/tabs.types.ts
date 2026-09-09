import type { ReactNode } from "react";

export type TabsVariant =
  | "segmented"
  | "underline"
  | "fullWidth";

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
  urlParam?: string;
  defaultTab?: string;
  onChange?: (tab: TabItem) => void;
}