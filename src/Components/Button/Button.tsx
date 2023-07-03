import './Button.scss';
import { MouseEvent } from 'react';

type props = {
	push?: boolean;
	id?:string;
	children?: React.ReactNode;
	className?:string;
	onClick?: Function;
	state?: 'normal' | 'pressed' | 'disabled';
};

const Button = ({ children, onClick, state = 'normal', className,id=undefined}: props) => {
	const handleClick = (event:MouseEvent<HTMLDivElement>) => {
		if (onClick) onClick(event);
	};
	return (
		<div 
			className={className+
				' button' +
				(state === 'disabled'
					? ' button--disabled'
					: state === 'pressed'
					? ' button--pressed'
					: ' button--normal')
			}
			id={id}
			onClick={state !== 'disabled' ? handleClick : undefined}
		>
			<span>{children}</span>
		</div>
	);
};

export default Button;
