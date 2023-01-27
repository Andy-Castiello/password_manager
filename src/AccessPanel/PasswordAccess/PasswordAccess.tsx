import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	setConfirmPassword,
	setPassword,
} from '../../store/slices/accessValues/accessValues';
import './PasswordAccess.scss';

const PasswordAccess = () => {
	const accessPanelState = useAppSelector((state) => state.accessPanel.state);
	const passwordValue = useAppSelector(
		(state) => state.accessValues.password
	);
	const confirmPasswordValue = useAppSelector(
		(state) => state.accessValues.confirmPassword
	);
	const dispatch = useAppDispatch();
	const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setPassword(e.target.value));
	};
	const handleConfirmPassChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setConfirmPassword(e.target.value));
	};
	return (
		<div className="password-access">
			<span
				className={
					accessPanelState === 'disabled' ? 'text--disabled' : ''
				}
			>
				PASSWORD
			</span>
			<input
				type="text"
				className="text-input"
				value={passwordValue}
				onChange={handlePassChange}
				disabled={accessPanelState === 'disabled'}
				placeholder="Password"
			/>
			{accessPanelState === 'edit' ? (
				<input
					value={confirmPasswordValue}
					onChange={handleConfirmPassChange}
					type="text"
					className="text-input"
					placeholder="Confirm Password"
				/>
			) : undefined}
		</div>
	);
};

export default PasswordAccess;
