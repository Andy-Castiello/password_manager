import Button from '../../Components/Button/Button';
import './FileSelector.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	setAccessPanelState,
	setFileName,
	setOnEditCombination,
} from '../../store/slices/accessPanel/accessPanel';
import { resetAll } from '../../store/slices/accessValues/accessValues';
import crypto from 'simple-crypto-js';
import {
	setFileData,
	setFileType,
} from '../../store/slices/global/globalState';

type state = 'normal' | 'new' | 'edit';

const FileSelector = () => {
	const [state, setState] = useState<state>('normal');
	const accessPanelState = useAppSelector((state) => state.accessPanel.state);
	const globalStateFile = useAppSelector(
		(state) => state.globalState.fileType
	);
	const fileName = useAppSelector((state) => state.accessPanel.fileName);
	const dispatch = useAppDispatch();
	const onEditCombination = useAppSelector(
		(state) => state.accessPanel.onEditCombination
	);
	const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(resetAll());
		dispatch(
			setFileName(
				event.target.value
					.replace(/^C:\\fakepath\\/, '')
					.replace(/\..*$/, '')
			)
		);

		if (event.target.files) {
			const reader = new FileReader();
			reader.onloadend = (event) => {
				const cryptoInstance = new crypto('PassMan');
				const content = event.target?.result;
				if (typeof content === 'string') {
					try {
						var data = JSON.stringify(
							cryptoInstance.decrypt(content)
						);
						if (JSON.parse(data).app === 'password_manager') {
							dispatch(setFileData(JSON.parse(data).data));
							dispatch(setAccessPanelState('normal'));
						} else {
							dispatch(setAccessPanelState('disabled'));
							alert('El archivo seleccionado no es correcto!');
						}
					} catch (error) {
						dispatch(setAccessPanelState('disabled'));
						alert('El archivo seleccionado no es correcto!');
					}
				}
			};
			reader.readAsText(event.target.files[0]);
		}
	};
	const handleText = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setFileName(event.target.value));
	};
	const handleNewClick = () => {
		dispatch(resetAll());
		dispatch(setFileName(''));
		dispatch(setFileData(null));
		dispatch(setOnEditCombination(false));
		if (accessPanelState !== 'edit') dispatch(setAccessPanelState('edit'));
		else {
			dispatch(setAccessPanelState('disabled'));
		}
		if (state !== 'new') setState('new');
		else setState('normal');
		if (globalStateFile !== 'new') dispatch(setFileType('new'));
		else dispatch(setFileType('none'));
	};
	const handleEditClick = () => {
		if (state !== 'edit') {
			setState('edit');
			dispatch(setOnEditCombination(true));
		} else {
			setState('normal');
			dispatch(setOnEditCombination(false));
		}
	};
	useEffect(() => {
		if(onEditCombination){

			setState('edit');
		}else{
			setState('normal');
		}
	},[onEditCombination]);

	return (
		<div className="file-selector">
			<span>FILE</span>
			<div className="file-selector__selector">
				<input
					type="text"
					className="text-input file-selector__selector__text"
					value={fileName}
					onChange={handleText}
					disabled={accessPanelState !== 'edit' ? true : false}
				/>
				<label htmlFor="file-selector-input">
					<input
						id="file-selector-input"
						type="file"
						className="file-selector__selector__file"
						onChange={handleFiles}
						accept=".pass"
					/>
					<Button>
						<FontAwesomeIcon icon={faPaperclip} />
					</Button>
				</label>
			</div>
			<div className="file-selector__buttons">
				<Button
					onClick={handleNewClick}
					state={state === 'new' ? 'pressed' : undefined}
				>
					NEW
				</Button>
				<Button
					onClick={handleEditClick}
					state={fileName==="" ||state==="new" ?"disabled":state === 'edit' ? 'pressed' : undefined}
				>
					EDIT
				</Button>
			</div>
		</div>
	);
};

export default FileSelector;
