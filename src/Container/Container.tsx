import AccessButton from './AccessButton/AccessButton';
import Bars from './Bars/Bars';
import './Container.scss';
import FileSelector from './FileSelector/FileSelector';
import Lock from './Lock/Lock';
import PasswordAccess from './PasswordAccess/PasswordAccess';

const Container = () => {
	return (
		<div className="container">
			<Bars />
			<FileSelector />
			<Lock />
			<PasswordAccess />
			<AccessButton />
		</div>
	);
};

export default Container;
