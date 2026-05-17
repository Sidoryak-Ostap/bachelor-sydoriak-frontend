import { useState } from 'react';
import GeneralInfo from './GeneralInfo';
import StatusOverview from './StatusOverview';
import { useNavigate, useParams } from 'react-router';
import { useGetFieldById } from '@/hooks/fields/useGetFieldById';
import { useDeleteField } from '@/hooks/fields/useDeleteField';
import { ROUTES } from '@/constants/ROUTES';
import Modal from '@/components/Dashboard/Modal';
import AddFieldActivity from '@/components/Dashboard/AddFieldActivity';
import { useTranslation } from 'react-i18next';

type OverviewProps = {
  handleChangeTab: (index: number) => void;
};

const Overview = ({ handleChangeTab }: OverviewProps) => {
  const { i18n } = useTranslation();
  const language = i18n.language || 'en';
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState<boolean>(false);
  const { id } = useParams();
  const { data: fieldData } = useGetFieldById(id || null);

  const navigate = useNavigate();
  const { mutate, isPending: isDeletePending } = useDeleteField();

  const handleDeleteField = () => {
    if (fieldData?.id) {
      mutate(fieldData.id);
      setIsOpenDeleteModal(false);
      navigate(ROUTES.dashboard.fields);
    }
  };
  return (
    <div className="grid grid-cols-[2fr_3fr] gap-20">
      <GeneralInfo fieldData={fieldData || null} />

      <StatusOverview
        fieldData={fieldData}
        handleChangeTab={handleChangeTab}
        onDelete={() => setIsOpenDeleteModal(true)}
        onAddActivity={() => setIsAddActivityOpen(true)}
      />

      {isOpenDeleteModal && (
        <Modal
          setOpen={setIsOpenDeleteModal}
          onConfirm={handleDeleteField}
          title={language === 'en' ? 'Delete Field' : 'Видалити поле'}
          message={
            language === 'en'
              ? 'Are you sure you want to delete this field?'
              : 'Ви впевнені, що хочете видалити це поле?'
          }
          confirmBtnText={language === 'en' ? 'Delete' : 'Видалити'}
          cancelBtnText={language === 'en' ? 'Cancel' : 'Скасувати'}
          onCancel={() => setIsOpenDeleteModal(false)}
          isActionPending={isDeletePending}
        />
      )}

      {isAddActivityOpen && (
        <AddFieldActivity setOpen={setIsAddActivityOpen} fieldId={fieldData?.id || ''} />
      )}
    </div>
  );
};

export default Overview;
