import { ConfirmationDialogProps } from '@/lib/interfaces/interface'
import * as Dialog from '@radix-ui/react-dialog'

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  isDeleting,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onCancel}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 max-w-sm bg-white rounded-lg shadow-lg z-50">
        <Dialog.Title className="text-lg font-bold">
          Confirm Deletion
        </Dialog.Title>
        <Dialog.Description className="mt-2">
          Are you sure you want to delete this product?
        </Dialog.Description>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={onConfirm}
            disabled={isDeleting} // Disable button while deleting
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default ConfirmationDialog
