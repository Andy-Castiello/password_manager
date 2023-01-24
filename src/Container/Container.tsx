import Bars from './Bars/Bars';
import './Container.scss';
import FileSelector from './FileSelector/FileSelector';
import Lock from './Lock/Lock';

const Container = () => {
	return (
		<div className="container">
			<Bars />
			<FileSelector />
			<Lock />
		</div>
	);
};

export default Container;
