import Bars from './Bars/Bars';
import './Container.scss';
import FileSelector from './FileSelector/FileSelector';

const Container = () => {
	return (
		<div className="container">
			<Bars />
			<FileSelector />
		</div>
	);
};

export default Container;
