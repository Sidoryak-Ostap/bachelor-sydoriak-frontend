import { useState } from 'react';
import GeneralInfo from './GeneralInfo';
import StatusOverview from './StatusOverview';
import { useNavigate, useParams } from 'react-router';
import { useGetFieldById } from '@/hooks/fields/useGetFieldById';
import { useDeleteField } from '@/hooks/fields/useDeleteField';
import { ROUTES } from '@/constants/ROUTES';
import Modal from '@/components/Dashboard/Modal';
import AddFieldActivity from '@/components/Dashboard/AddFieldActivity';

type OverviewProps = {
  handleChangeTab: (index: number) => void;
};

const Overview = ({ handleChangeTab }: OverviewProps) => {
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
      {/* General Information */}
      <GeneralInfo fieldData={fieldData || null} />

      {/* Weather/NDVI and activity Section */}
      <StatusOverview
        handleChangeTab={handleChangeTab}
        onDelete={() => setIsOpenDeleteModal(true)}
        onAddActivity={() => setIsAddActivityOpen(true)}
      />

      {isOpenDeleteModal && (
        <Modal
          setOpen={setIsOpenDeleteModal}
          onConfirm={handleDeleteField}
          title="Delete Field"
          message="Are you sure you want to delete this field? This action cannot be undone."
          confirmBtnText="Delete"
          cancelBtnText="Cancel"
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
