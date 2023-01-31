import Button from '../../Components/Button/Button';
import Led from '../../Components/Led/Led';
import crypto from 'simple-crypto-js';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './AccessButton.scss';
import {
	setAccessPanelState,
	setFileName,
	setOnEditCombination,
} from '../../store/slices/accessPanel/accessPanel';
import { setFileData, setPanel } from '../../store/slices/global/globalState';
import { resetAccessValues } from '../../store/slices/accessValues/accessValues';
import { uploadPasswordData } from '../../store/slices/passwordListSlice/passwordListSlice';
import createFile from '../../functions/createFile';

const AccessButton = () => {
	const accessPanelState = useAppSelector((state) => state.accessPanel.state);
	const accessValues = useAppSelector((state) => state.accessValues);
	const passwordsListState = useAppSelector(
		(state) => state.passwordListSlice
	);
	const fileName = useAppSelector((state) => state.accessPanel.fileName);
	const fileData = useAppSelector((state) => state.globalState.fileData);
	const onEditCombination = useAppSelector(
		(state) => state.accessPanel.onEditCombination
	);
	const dispatch = useAppDispatch();

	const handleDoneClick = () => {
		const createKey = () =>
			accessValues.bars.reduce(
				(acum, actual) => acum + `${actual}+`,
				''
			) +
			accessValues.lock.reduce(
				(acum, actual) => acum + `${actual}+`,
				''
			) +
			accessValues.password;
		if (accessPanelState === 'normal') {
			const cryptoDataInstance = new crypto(createKey());
			try {
				if (typeof fileData === 'string') {
					const decryptedData = JSON.parse(
						JSON.stringify(cryptoDataInstance.decrypt(fileData))
					);
					dispatch(setFileData(decryptedData));
					dispatch(
						uploadPasswordData({
							list: decryptedData.passwordsList.list,
							nextId: decryptedData.passwordsList.nextId,
						})
					);
					dispatch(setAccessPanelState('accessGranted'));
					setTimeout(() => {
						if (onEditCombination) {
							dispatch(setAccessPanelState('edit'));
						} else {
							dispatch(setAccessPanelState('disabled'));
							dispatch(setPanel('manager'));
						}
					}, 1000);
				} else {
					dispatch(setAccessPanelState('accessDenied'));
					setTimeout(() => {
						dispatch(setAccessPanelState('normal'));
					}, 1000);
				}
			} catch (error) {
				dispatch(setAccessPanelState('accessDenied'));
				setTimeout(() => {
					dispatch(setAccessPanelState('normal'));
				}, 1000);
			}
		} else if (accessPanelState === 'edit') {
			if (
				accessValues.password === accessValues.confirmPassword &&
				accessValues.password !== '' &&
				accessValues.lock[0] !== null &&
				accessValues.lock[1] !== null &&
				accessValues.lock[2] !== null
			) {
				if (onEditCombination)
					createFile(fileName, accessValues, passwordsListState);
				dispatch(setAccessPanelState('accessGranted'));
				setTimeout(() => {
					if (onEditCombination) {
						dispatch(setOnEditCombination(false));
						dispatch(setAccessPanelState('disabled'));
						dispatch(resetAccessValues());
						dispatch(setFileData(null));
						dispatch(setFileName(''));
					} else {
						dispatch(setAccessPanelState('normal'));
						dispatch(setPanel('manager'));
					}
				}, 1000);
			} else {
				dispatch(setAccessPanelState('accessDenied'));
				setTimeout(() => {
					dispatch(setAccessPanelState('edit'));
				}, 1000);
			}
		}
	};
	return (
		<div className="access-button-panel">
			<Button
				onClick={handleDoneClick}
				state={accessPanelState === 'disabled' ? 'disabled' : undefined}
			>
				DONE
			</Button>
			<Led
				on={
					accessPanelState === 'accessGranted' ||
					accessPanelState === 'accessDenied'
				}
				color={accessPanelState === 'accessGranted' ? 'GREEN' : 'RED'}
			/>
		</div>
	);
};

export default AccessButton;
