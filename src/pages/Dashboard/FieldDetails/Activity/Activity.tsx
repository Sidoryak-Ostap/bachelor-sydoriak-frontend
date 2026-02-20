import Modal from '@/components/Dashboard/Modal';
import { useDeleteFieldActivity } from '@/hooks/field-activity/useDeleteFieldActivity';
import { useState } from 'react';
import { useParams } from 'react-router';
import Controls from './Controls';
import Table from './Table';
import LoadingOverlay from '@/components/LoadingOverlay';

const Activity = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null);
  const { id: fieldId } = useParams<{ id: string }>();

  const { mutate: deleteFieldActivity, isPending } = useDeleteFieldActivity(fieldId || '');

  const handleDeleteActivity = () => {
    if (activityToDelete !== null) {
      deleteFieldActivity([activityToDelete]);
      setActivityToDelete(null);
    } else if (checkedIds.length > 0) {
      deleteFieldActivity(checkedIds);
      setCheckedIds([]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Controls fieldId={fieldId || ''} />
      <Table
        checkedIds={checkedIds}
        fieldId={fieldId || ''}
        setCheckedIds={setCheckedIds}
        setActivityToDelete={setActivityToDelete}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
      {isOpenDeleteModal && (
        <Modal
          setOpen={setIsOpenDeleteModal}
          onConfirm={handleDeleteActivity}
          title="Delete Activities"
          message={`Are you sure you want to delete these ${checkedIds.length > 1 ? 'activities' : 'activity'}? This action cannot be undone.`}
          confirmBtnText="Delete"
          cancelBtnText="Cancel"
          onCancel={() => setIsOpenDeleteModal(false)}
          isActionPending={false}
        />
      )}

      {isPending && <LoadingOverlay />}
    </div>
  );
};

export default Activity;
