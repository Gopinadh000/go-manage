import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  return (
    <div className="rounded-md  bg-app-surface  px-2 py-2  flex justify-between items-center mb-5">
      <div>
        <h1 className="text-2xl font-semibold text-app-text">{title}</h1>
        <p className="mt-0.25 text-xs text-app-text-muted">{subtitle}</p>
      </div>
      <div className="w-1/2 flex items-end justify-end gap-4">{children}</div>
    </div>
  );
};

export default PageHeader;
