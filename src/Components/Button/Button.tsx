import './Button.scss';
import React, { useState } from 'react';

type props = {
	push?: boolean;
	children?: React.ReactNode;
	onClick?: Function;
};
enum states {
	NORMAL = 'NORMAL',
	PRESSED = 'PRESSED',
	DISABLED = 'DISABLED',
}

const Button = ({ push = true, children, onClick }: props) => {
	const [state, setState] = useState(states.NORMAL);

	const handleClick = () => {
		if (onClick) onClick();

		if (!push) {
			state === states.NORMAL
				? setState(states.PRESSED)
				: setState(states.NORMAL);
		}
	};
	return (
		<div
			className={
				'button' +
				(push || state === states.NORMAL ? '' : ' button--pressed')
			}
			onClick={handleClick}
		>
			<span>{children}</span>
		</div>
	);
};

export default Button;
