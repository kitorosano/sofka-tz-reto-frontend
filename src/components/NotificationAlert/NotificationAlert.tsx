import React from 'react';
import './NotificationAlert.css';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ICON_TYPE = (size) => ({
	info: <InfoIcon color='info' fontSize={size} />,
	error: <WarningIcon color='error' fontSize={size} />,
	success: <CheckCircleIcon color='success' fontSize={size} />,
});

interface NotificationAlertProps {
  type: 'info' | 'error' | 'success';
  iconSize: 'small' | 'medium' | 'large';
  message: string;
  className?: string;
}

const NotificationAlert = ({ type, iconSize, message, className }: NotificationAlertProps) => {
	if (!message) return <></>;

	return (
		<div
			className={`alert alert-${type} ${className}`}
			role='alert'
			id='NotificationAlert'
		>
			<span className='icon'>{ICON_TYPE(iconSize)[type]}</span>
			<span className='message'>{message}</span>
		</div>
	);
};

export default NotificationAlert;
