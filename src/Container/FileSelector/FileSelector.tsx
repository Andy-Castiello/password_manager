import Button from '../../Components/Button/Button';
import './FileSelector.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useState } from 'react';

const FileSelector = () => {
	const [fileName, setFileName] = useState('');

	const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
		setFileName(event.target.value)
	};
	const handleText = (event: ChangeEvent<HTMLInputElement>) => {
		setFileName(event.target.value)
	};

	return (
		<div className="file-selector">
			<span>FILE</span>
			<div className="file-selector__selector">
				<input
					type="text"
					className="text-input file-selector__selector__text"
					value={fileName}
					onChange={handleText}
				/>
				<label htmlFor="file-selector-input">
					<input
						id="file-selector-input"
						type="file"
						className="file-selector__selector__file"
						onChange={handleFiles}
					/>
					<Button>
						<FontAwesomeIcon icon={faPaperclip} />
					</Button>
				</label>
			</div>
			<div className="file-selector__buttons">
				<Button>NEW</Button>
				<Button>LOAD</Button>
				<Button>DELETE</Button>
			</div>
		</div>
	);
};

export default FileSelector;
