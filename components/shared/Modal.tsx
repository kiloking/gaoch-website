import React, { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className='w-full fixed z-10 h-screen inset-0'>
      {children}
    </div>
  );
}

export default Modal;
