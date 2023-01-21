import './Button.scss';
import { useState } from 'react';

type props = {
	text: string;
};
enum states {
	NORMAL = 'NORMAL',
	PRESSED = 'PRESSED',
	DISABLED = 'DISABLED',
}

const Button = ({ text }: props) => {
	const [state, setState] = useState(states.NORMAL);

	const handleClick = () => {
		state == states.NORMAL
			? setState(states.PRESSED)
			: setState(states.NORMAL);
	};
	return (
		<div
			className={
				'button' + (state == states.NORMAL ? '' : ' button--pressed')
			}
			onClick={handleClick}
		>
			<span>{text}</span>
		</div>
	);
};

export default Button;
