import ManagerButtons from './ManagerButtons/ManagerButtons';
import './ManagerPanel.scss';
import PasswordEditor from './PasswordEditor/PasswordEditor';
import PasswordsList from './PasswordsList/PasswordsList';
import RandomConfig from './RandomConfig/RandomConfig';

const ManagerPanel = () => {
	return (
		<div className="manager-panel">
			<PasswordsList />
			<PasswordEditor />
			<RandomConfig />
			<ManagerButtons />
		</div>
	);
};

export default ManagerPanel;
