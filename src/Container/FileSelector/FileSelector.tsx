import Button from '../../Components/Button/Button';
import './FileSelector.scss';

const FileSelector = () => {
	return (
		<div className="file-selector">
			<span>FILE</span>
			<div className="file-selector__selector">
				<input type="text" className="text-input file-selector__selector__text" />
				<input type="file" className="file-selector__selector__file" />
				<Button text="A" />
			</div>
			<div className="file-selector__buttons">
				<Button text="NEW" />
				<Button text="LOAD" />
				<Button text="DELETE" />
			</div>
		</div>
	);
};

export default FileSelector;
