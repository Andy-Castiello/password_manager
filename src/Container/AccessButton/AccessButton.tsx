import Button from '../../Components/Button/Button';
import Led from '../../Components/Led/Led';
import './AccessButton.scss';

const AccessButton = () => {
	return (
		<div className="access-button-panel">
			<Button>DONE</Button>
			<Led on={false} color='RED'/>
		</div>
	);
};

export default AccessButton;
