import './Button.scss';

type props = {
	push?: boolean;
	children?: React.ReactNode;
	className?:string;
	onClick?: Function;
	state?: 'normal' | 'pressed' | 'disabled';
};

const Button = ({ children, onClick, state = 'normal', className}: props) => {
	const handleClick = () => {
		if (onClick) onClick();
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
			onClick={state !== 'disabled' ? handleClick : undefined}
		>
			<span>{children}</span>
		</div>
	);
};

export default Button;
