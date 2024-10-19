import React from 'react';
import { Button, Modal, Typography } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ModalNotEnoughBalance.module.scss';

type TProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  balance: string | number | undefined;
};

export const ModalNotEnoughBalance = ({ isOpen, setOpen, balance }: TProps) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      title={
        <Typography.Title level={3}>
          <ExclamationCircleFilled className={styles.icon} /> Недостаточно средств
        </Typography.Title>
      }
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Закрыть
        </Button>,
        <Button key="submit" type="primary" onClick={() => navigate('/profile/balance')}>
          Пополнить баланс
        </Button>,
      ]}
      width={600}
    >
      <div className={styles.modalContent}>
        <Typography.Text>
          <strong>Текущий баланс: </strong> {balance} KZT
        </Typography.Text>

        <Typography.Paragraph className={styles.message}>
          Недостаточно средств для начала теста. Пополните баланс, чтобы продолжить.
        </Typography.Paragraph>

        <Typography.Paragraph className={styles.link}>
          <Link to="/profile/balance">Перейти в профиль для пополнения баланса</Link>
        </Typography.Paragraph>
      </div>
    </Modal>
  );
};
