import './Bar.scss';
import { PointerEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setBarValue } from '../../../store/slices/accessValues/accessValues';

const barImage = require('../../../assets/bar.png');

type props = {
	barId: number;
};

const Bar = ({ barId }: props) => {
	const value = useAppSelector((state) => state.accessValues.bars[barId]);
	const accessPanelState = useAppSelector((state) => state.accessPanel.state);
	const dispatch = useAppDispatch();

	let numbers = [];
	for (let i = 0; i <= 10; i++) {
		numbers.push(i * 10);
	}

	const convertRemToPixels = (rem: number) => {
		return (
			rem *
			parseFloat(getComputedStyle(document.documentElement).fontSize)
		);
	};

	const min = 0.1;
	const length = 60.1;
	const step = length / 100;

	const placeSelector = (newPos: number) => {
		const selector = document.getElementById(`bar-select${barId}`);
		if (selector instanceof HTMLDivElement) {
			selector.style.top = `${convertRemToPixels(newPos * step + min)}px`;
		}
	};
	useEffect(() => {
		placeSelector(value);
	});
	const moveSelector = (event: PointerEvent) => {
		const initialY = event.clientY;

		if (event.target instanceof HTMLDivElement) {
			let selector: HTMLDivElement = event.target;

			const initialSelectorPosition = parseFloat(
				getComputedStyle(selector).top
			);

			const PointerMove = (e: any) => {
				let newPos = initialSelectorPosition + e.clientY - initialY;
				if (newPos <= convertRemToPixels(min)) {
					newPos = 0;
				} else if (newPos >= convertRemToPixels(length)) {
					newPos = 100;
				} else {
					newPos = Math.floor(newPos / convertRemToPixels(step));
				}
				dispatch(setBarValue({ barId, value: newPos }));
			};
			document.addEventListener('pointermove', PointerMove);
			document.onpointerup = () => {
				document.removeEventListener('pointermove', PointerMove);
				document.onpointerup = null;
			};
		}
	};
	return (
		<div className="bar-body">
			<div className="bar-rail">
				{accessPanelState === 'edit' ? (
					<span className="bar-rail__number">{value}</span>
				) : (
					<></>
				)}
				<div
					className={`bar-selector${
						accessPanelState === 'disabled'
							? ' bar-selector--disabled'
							: ''
					}`}
					id={'bar-select' + barId}
					onPointerDown={
						accessPanelState === 'normal' ||
						accessPanelState === 'edit'
							? moveSelector
							: undefined
					}
				/>
			</div>
			<div
				className="bar-image"
				style={{ backgroundImage: `url(${barImage})` }}
			/>
			<div className="bar-numbers">
				{numbers.map((n) => (
					<span
						className={`bar-number${
							accessPanelState !== 'disabled'
								? ''
								: ' bar-number--disabled'
						}`}
						key={n}
					>
						{n}
					</span>
				))}
			</div>
		</div>
	);
};

export default Bar;
