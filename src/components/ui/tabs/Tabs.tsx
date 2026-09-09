import { useSearchParams } from "react-router";
import type { TabsProps } from "./tabs.types";
import {
  getTabClass,
  getTabsContainerClass,
} from "./tab.styles";

const Tabs = ({
  tabs,
  urlParam = "view",
  defaultTab,
  onChange,
  variant = "segmented",
}: TabsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const visibleTabs = tabs.filter(
    (tab) => !tab.hidden,
  );

  const activeTab =
    searchParams.get(urlParam) ||
    defaultTab ||
    visibleTabs[0]?.key;

  const handleTabChange = (
    tab: (typeof visibleTabs)[number],
  ) => {
    if (tab.disabled) return;

    const newParams = new URLSearchParams(
      searchParams,
    );

    newParams.set(urlParam, tab.key);

    setSearchParams(newParams);

    onChange?.(tab);
  };

  return (
    <div className={getTabsContainerClass(variant)}>
      {visibleTabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.id}
            type="button"
            disabled={tab.disabled}
            onClick={() => handleTabChange(tab)}
            className={getTabClass({
              variant,
              isActive,
              disabled: tab.disabled,
            })}
          >
            {tab.icon && (
              <span className="flex shrink-0 items-center">
                {tab.icon}
              </span>
            )}

            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;