import AccessPanel from './AccessPanel/AccessPanel';
import './App.scss';
import ManagerPanel from './ManagerPanel/ManagerPanel';
import { useAppSelector } from './store/hooks';

const App = () => {
	const panel = useAppSelector((state) => state.globalState.panel);
	return (
		<div className="main-component">
			{panel === 'access' ? <AccessPanel /> : <ManagerPanel />}
			{/* <ManagerPanel /> */}
		</div>
	);
};

export default App;
