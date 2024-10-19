import React from 'react';
import { Modal, Image, Button, Typography } from 'antd';
import kaspiQr from 'assets/img/kaspi-qr.png';

const { Paragraph } = Typography;

interface ModalAddBalanceProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ModalAddBalance: React.FC<ModalAddBalanceProps> = ({ isOpen, setIsOpen }) => {
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title="Пополнение баланса"
      open={isOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <Paragraph>Отсканируйте QR-код для пополнения баланса через Kaspi:</Paragraph>
      <Image
        width="100%"
        src={kaspiQr}
        alt="Kaspi QR Code"
      />
      <Paragraph style={{ marginTop: '10px' }}>Ссылка для мобильных устройств:       <a
        href="https://kaspi.kz/pay/_gate?action=service_with_subservice&service_id=3025&subservice_id=21723&region_id=18"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1890ff' }}
      >
        здесь
      </a>
      </Paragraph>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          type="primary"
          onClick={handleCancel}
          style={{ width: '100%' }}
        >
          Закрыть
        </Button>
      </div>
    </Modal>
  );
};
