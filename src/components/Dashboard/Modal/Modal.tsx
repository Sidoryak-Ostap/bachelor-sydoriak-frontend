import Loader from '@/components/Loader';

type ModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  setOpen: (open: boolean) => void;
  isActionPending?: boolean;
};

const Modal = ({
  onConfirm,
  onCancel,
  title,
  message,
  cancelBtnText = 'Cancel',
  confirmBtnText = 'Confirm',
  setOpen,
  isActionPending = false,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-3 text-lg">{message}</p>

        <div className="flex gap-4 mt-8">
          {isActionPending ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <button
                className="cursor-pointer flex-1 px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  onCancel();
                  setOpen(false);
                }}
              >
                {cancelBtnText}
              </button>
              <button
                className="cursor-pointer flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
              >
                {confirmBtnText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
