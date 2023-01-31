import Button from '../../Components/Button/Button';
import createFile from '../../functions/createFile';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	setAccessPanelState,
	setFileName,
} from '../../store/slices/accessPanel/accessPanel';
import { resetAccessValues } from '../../store/slices/accessValues/accessValues';
import { setFileData, setPanel } from '../../store/slices/global/globalState';
import { clearPasswordsList } from '../../store/slices/passwordListSlice/passwordListSlice';
import './ManagerButtons.scss';

const ManagerButtons = () => {
	const accessValues = useAppSelector((state) => state.accessValues);
	const passwordsList = useAppSelector((state) => state.passwordListSlice);
	const fileName = useAppSelector((state) => state.accessPanel.fileName);
	const dispatch = useAppDispatch();

	const handleSave = () => {
		createFile(fileName, accessValues, passwordsList);
		close();
	};
	const close = () => {
		dispatch(clearPasswordsList());
		dispatch(resetAccessValues());
		dispatch(setFileName(''));
		dispatch(setAccessPanelState('disabled'));
		dispatch(setFileData(null));
		dispatch(setPanel('access'));
	};
	return (
		<div className="manager-buttons">
			<Button onClick={handleSave}>SAVE & CLOSE</Button>
			<Button onClick={close}>CLOSE</Button>
		</div>
	);
};

export default ManagerButtons;
