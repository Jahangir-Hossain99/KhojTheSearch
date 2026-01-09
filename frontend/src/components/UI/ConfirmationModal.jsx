export  const ConfirmationModal = ({isOpen, message,confirm,cancel}) => {
  if(!isOpen) return null;
    return (
    <div className="fixed inset-0 flex items-center justify-center z-100 backdrop-blur-sm bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-1/3 w-full">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
            Confirm Action
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
            Are you sure you want to {message}?
        </p>
        <div className="flex justify-end space-x-4">
            <button
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400"
            onClick={() => cancel()} // Cancel
            >
            Cancel
            </button>
            <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            onClick={() => confirm()} // Confirm action
            >
            Confirm
            </button>
        </div>
        </div>
    </div>
    );
}

export default ConfirmationModal;