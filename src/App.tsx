import AccessPanel from './AccessPanel/AccessPanel';
import './App.scss';
import Button from './Components/Button/Button';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setPanel } from './store/slices/global/globalState';

const App = () => {
	const panel = useAppSelector((state) => state.globalState.panel);
	const dispatch = useAppDispatch();
	const back = () => {
		dispatch(setPanel('access'));
	};
	return (
		<div className="main-component">
			{panel === 'access' ? (
				<AccessPanel />
			) : (
				<Button onClick={back}>VOLVER</Button>
			)}
		</div>
	);
};

export default App;
