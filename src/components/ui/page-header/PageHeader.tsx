import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  return (
    <div className="
        flex
        flex-col
        gap-3
        rounded-md
        bg-app-surface
        px-4
        py-3
        mb-5

        tablet:flex-row
        tablet:items-center
        tablet:justify-between
      ">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold text-app-text">{title}</h1>
        {subtitle && (
          <p className="mt-0.5 text-xs text-app-text-muted">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div
          className="
            flex
            w-full
            flex-col
            gap-2

            tablet:w-auto
            tablet:flex-row
            tablet:items-center
            tablet:justify-end
          "
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
