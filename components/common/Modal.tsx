"use client";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        {title && <h3 className="font-semibold text-lg mb-4">{title}</h3>}

        <div>{children}</div>

        <div className="modal-action">
          {actions ? (
            actions
          ) : (
            <button className="btn" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>

      {/* backdrop click */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
