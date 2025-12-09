interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-xl"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
