import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  return (
    <div className="rounded-md border border-app-border bg-app-surface p-4 h-20 flex justify-between items-center mb-5">
      <div>
        <h1 className="text-xl font-semibold text-app-text">{title}</h1>
        <p className="mt-1 text-sm text-app-text-muted">{subtitle}</p>
      </div>
      <div className="w-1/2 flex items-end justify-end gap-4">{children}</div>
    </div>
  );
};

export default PageHeader;
