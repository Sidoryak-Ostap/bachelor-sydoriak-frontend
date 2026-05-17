import FieldTabs from '@/components/Dashboard/FieldTabs';

import Overview from './Overview';
import { useState } from 'react';
import Activity from './Activity';
import TimeLine from './TimeLine';
import Analysis from './Analysis';
import { useTranslation } from 'react-i18next';

const FieldDetails = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChangeTab = (index: number) => setActiveTab(index);

  return (
    <div className="pt-8 pb-14 px-7">
      <div className="flex flex-col gap-1 mb-5">
        <h3 className="text-primary text-3xl font-bold">{t('dashboard.fieldDetails.title')}</h3>
        <p className="text-gray-400 text-base">{t('dashboard.fieldDetails.description')}</p>
      </div>

      <div className="mb-10">
        <FieldTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Tab screens */}
      {activeTab === 0 && <Overview handleChangeTab={handleChangeTab} />}
      {activeTab === 1 && <Activity />}
      {activeTab === 2 && <TimeLine />}
      {activeTab === 3 && <Analysis />}
    </div>
  );
};

export default FieldDetails;
