import { ChangeEvent, FocusEvent } from 'react';
import Button from '../../Components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setRandomProperty } from '../../store/slices/randomConfigSlice/randomConfigSlice';
import './RandomConfig.scss';

const RandomConfig = () => {
	const dispatch = useAppDispatch();
	const randomState = useAppSelector((state) => state.randomConfigSlice);
	const handleLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target instanceof HTMLInputElement) {
			const value = event.target.value;
			if (!value) {
				dispatch(setRandomProperty({ key: 'passLength', value: '' }));
			} else if (!isNaN(+value.charAt(value.length - 1))) {
				if (parseInt(value) > 40)
					dispatch(
						setRandomProperty({ key: 'passLength', value: '40' })
					);
				else
					dispatch(
						setRandomProperty({
							key: 'passLength',
							value: parseInt(value),
						})
					);
			}
		}
	};
	const handleLengthFocusOut = (event: FocusEvent) => {
		if (event.target instanceof HTMLInputElement) {
			if (parseInt(event.target.value) < 4)
				dispatch(setRandomProperty({ key: 'passLength', value: '4' }));
		}
	};
	const handleClick = (name: string) => {
		switch (name) {
			case 'uppercase':
				dispatch(
					setRandomProperty({
						key: 'uppercase',
						value: !randomState['uppercase'],
					})
				);
				break;
			case 'lowercase':
				dispatch(
					setRandomProperty({
						key: 'lowercase',
						value: !randomState['lowercase'],
					})
				);
				break;
			case 'numbers':
				dispatch(
					setRandomProperty({
						key: 'numbers',
						value: !randomState['numbers'],
					})
				);
				break;
			case 'symbols':
				dispatch(
					setRandomProperty({
						key: 'symbols',
						value: !randomState['symbols'],
					})
				);
				break;
			case 'atLeastOneUppercase':
				dispatch(
					setRandomProperty({
						key: 'atLeastOneUppercase',
						value: !randomState['atLeastOneUppercase'],
					})
				);
				break;
			case 'atLeastOneLowercase':
				dispatch(
					setRandomProperty({
						key: 'atLeastOneLowercase',
						value: !randomState['atLeastOneLowercase'],
					})
				);
				break;
			case 'atLeastOneNumber':
				dispatch(
					setRandomProperty({
						key: 'atLeastOneNumber',
						value: !randomState['atLeastOneNumber'],
					})
				);
				break;
			case 'atLeastOneSymbol':
				dispatch(
					setRandomProperty({
						key: 'atLeastOneSymbol',
						value: !randomState['atLeastOneSymbol'],
					})
				);
				break;
			default:
				break;
		}
	};
	return (
		<div className="random-config">
			<Button
				state={randomState.uppercase ? 'pressed' : 'normal'}
				onClick={() => handleClick('uppercase')}
			>
				UPPERCASE
			</Button>
			<Button
				state={randomState.lowercase ? 'pressed' : 'normal'}
				onClick={() => handleClick('lowercase')}
			>
				LOWERCASE
			</Button>
			<Button
				state={randomState.numbers ? 'pressed' : 'normal'}
				onClick={() => handleClick('numbers')}
			>
				NUMBERS
			</Button>
			<Button
				state={randomState.symbols ? 'pressed' : 'normal'}
				onClick={() => handleClick('symbols')}
			>
				SYMBOLS
			</Button>
			<Button
				state={
					!randomState.uppercase
						? 'disabled'
						: randomState.atLeastOneUppercase
						? 'pressed'
						: 'normal'
				}
				onClick={
					randomState.uppercase
						? () => handleClick('atLeastOneUppercase')
						: undefined
				}
			>
				AT LEAST ONE UPPERCASE
			</Button>
			<Button
				state={
					!randomState.lowercase
						? 'disabled'
						: randomState.atLeastOneLowercase
						? 'pressed'
						: 'normal'
				}
				onClick={
					randomState.lowercase
						? () => handleClick('atLeastOneLowercase')
						: undefined
				}
			>
				AT LEAST ONE LOWERCASE
			</Button>
			<Button
				state={
					!randomState.numbers
						? 'disabled'
						: randomState.atLeastOneNumber
						? 'pressed'
						: 'normal'
				}
				onClick={
					randomState.numbers
						? () => handleClick('atLeastOneNumber')
						: undefined
				}
			>
				AT LEAST ONE NUMBER
			</Button>
			<Button
				state={
					!randomState.symbols
						? 'disabled'
						: randomState.atLeastOneSymbol
						? 'pressed'
						: 'normal'
				}
				onClick={
					randomState.symbols
						? () => handleClick('atLeastOneSymbol')
						: undefined
				}
			>
				AT LEAST ONE SYMBOL
			</Button>
			<div className="random-config__password-length">
				<input
					className="text-input random-config__password-length__input"
					type="text"
					inputMode="numeric"
					value={randomState.passLength}
					onChange={handleLengthChange}
					onBlur={handleLengthFocusOut}
				/>
				<span>PASSWORD LENGTH</span>
			</div>
		</div>
	);
};
export default RandomConfig;
