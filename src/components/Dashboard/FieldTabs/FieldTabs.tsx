import { useEffect, useRef, useState } from 'react';

type FieldTabsProps = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};

const FieldTabs = ({ activeTab, setActiveTab }: FieldTabsProps) => {
  const tabs = ['Overview', 'Activity', 'Map', 'Analysis'];

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeMenu = tabsRef.current[activeTab];
    if (activeMenu) {
      setIndicatorStyle({
        left: activeMenu.offsetLeft,
        width: activeMenu.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="relative">
      <ul className="flex items-center gap-8 relative">
        {tabs.map((tab, index) => (
          <li key={tab} className="pb-3">
            <button
              ref={el => {
                tabsRef.current[index] = el;
              }}
              onClick={() => setActiveTab(index)}
              className={`text-[17px] transition-colors duration-300 cursor-pointer ${
                activeTab === index
                  ? 'font-semibold text-emerald-600'
                  : 'font-medium text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div
        className="absolute z-30 bottom-0 h-0.75 bg-primary transition-all duration-300 ease-in-out rounded-full"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />

      <div className="bg-gray-200 absolute bottom-0 h-0.75 z-20 w-full rounded-full" />
    </div>
  );
};

export default FieldTabs;
