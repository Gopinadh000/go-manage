import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  return (
    <div className="rounded-md border border-app-border bg-app-surface px-2 py-1  flex justify-between items-center mb-5">
      <div>
        <h2 className="text-lg font-semibold text-app-text">{title}</h2>
        <p className="mt-0.25 text-xs text-app-text-muted">{subtitle}</p>
      </div>
      <div className="w-1/2 flex items-end justify-end gap-4">{children}</div>
    </div>
  );
};

export default PageHeader;
