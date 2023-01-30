import AccessButton from './AccessButton/AccessButton';
import Bars from './Bars/Bars';
import './AccessPanel.scss';
import FileSelector from './FileSelector/FileSelector';
import Lock from './Lock/Lock';
import PasswordAccess from './PasswordAccess/PasswordAccess';

const AccessPanel = () => {
	return (
		<div className="access-panel">
			<Bars />
			<FileSelector />
			<Lock />
			<PasswordAccess />
			<AccessButton />
		</div>
	);
};

export default AccessPanel;
