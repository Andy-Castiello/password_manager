import Button from '../../../Components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changePasswordEditorValue } from '../../../store/slices/passwordEditorSlice/passwordEditorSlice';

const RandomButton = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector((state) => state.passwordEditorSlice.state);
	const randomConfig = useAppSelector((state) => state.randomConfigSlice);

	const uppercaseArray = Array.from({ length: 26 }, (j, i) =>
		String.fromCharCode(i + 65)
	);
	const lowercaseArray = Array.from({ length: 26 }, (j, i) =>
		String.fromCharCode(i + 97)
	);
	const numbersArray = Array.from(
		Array.from({ length: 10 }, (j, i) => i.toString())
	);
	const symbolsArray = Array.from({ length: 15 }, (j, i) =>
		String.fromCharCode(i + 33)
	)
		.concat(
			Array.from({ length: 7 }, (j, i) => String.fromCharCode(i + 58))
		)
		.concat(
			Array.from({ length: 6 }, (j, i) => String.fromCharCode(i + 91))
		)
		.concat(
			Array.from({ length: 4 }, (j, i) => String.fromCharCode(i + 123))
		);

	const handleClick = () => {
		let array: string[] = [];
		if (randomConfig.uppercase) array = array.concat(uppercaseArray);
		if (randomConfig.lowercase) array = array.concat(lowercaseArray);
		if (randomConfig.numbers) array = array.concat(numbersArray);
		if (randomConfig.symbols) array = array.concat(symbolsArray);
		let pass = '';
		let passOk = true;
		if (array.length > 0) {
			do {
				passOk = true;
				pass = '';
				for (let i = 0; i < randomConfig.passLength; i++) {
					pass += array[Math.floor(Math.random() * array.length)];
				}

				let hasUppercase = false;
				let hasLowerCase = false;
				let hasNumber = false;
				let hasSymbol = false;
				for (const letter of pass) {
					if (uppercaseArray.includes(letter)) hasUppercase = true;
					if (lowercaseArray.includes(letter)) hasLowerCase = true;
					if (numbersArray.includes(letter)) hasNumber = true;
					if (symbolsArray.includes(letter)) hasSymbol = true;
				}
				if (
					randomConfig.uppercase &&
					randomConfig.atLeastOneUppercase &&
					!hasUppercase
				)
					passOk = false;
				if (
					randomConfig.lowercase &&
					randomConfig.atLeastOneLowercase &&
					!hasLowerCase
				)
					passOk = false;
				if (
					randomConfig.numbers &&
					randomConfig.atLeastOneNumber &&
					!hasNumber
				)
					passOk = false;
				if (
					randomConfig.symbols &&
					randomConfig.atLeastOneSymbol &&
					!hasSymbol
				)
					passOk = false;
				/* alert(
					`Password: ${pass}\nhasUppercase:${hasUppercase}, \nhasLowerCase: ${hasLowerCase}, \nhasNumber: ${hasNumber}, \nhasSymbol: ${hasSymbol}`
				); */
			} while (!passOk);
			dispatch(changePasswordEditorValue({key:"newPassword",value:pass}))
		}
	};

	return (
		<Button
			onClick={state ? handleClick : undefined}
			state={state ? 'normal' : 'disabled'}
		>
			RANDOM
		</Button>
	);
};

export default RandomButton;
