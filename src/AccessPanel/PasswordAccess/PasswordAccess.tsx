import { ChangeEvent, useState } from 'react';
import Button from '../../Components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
	const [passDisplay, setPassDisplay] = useState(false);
	const dispatch = useAppDispatch();
	const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setPassword(e.target.value));
	};
	const handleConfirmPassChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setConfirmPassword(e.target.value));
	};
	const changePassDisplay = () => {
		setPassDisplay(!passDisplay);
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
			<div className="password-access__section">
				<input
					type={passDisplay ? 'text' : 'password'}
					className="text-input"
					value={passwordValue}
					onChange={handlePassChange}
					disabled={accessPanelState === 'disabled'}
					placeholder="Password"
				/>
				<Button
					className="password-access__section__button"
					onClick={
						accessPanelState !== 'disabled'
							? changePassDisplay
							: undefined
					}
					state={
						accessPanelState === 'disabled'
							? 'disabled'
							: passDisplay
							? 'pressed'
							: 'normal'
					}
				>
					<FontAwesomeIcon
						icon={
							accessPanelState === 'disabled' || !passDisplay
								? faEyeSlash
								: faEye
						}
					/>
				</Button>
				{accessPanelState === 'edit' ? (
					<input
						value={confirmPasswordValue}
						onChange={handleConfirmPassChange}
						type={passDisplay ? 'text' : 'password'}
						className="password-access__section__confirm text-input"
						placeholder="Confirm Password"
					/>
				) : undefined}
			</div>
		</div>
	);
};

export default PasswordAccess;
