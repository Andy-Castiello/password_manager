import './Bar.scss';
import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setBarValue } from '../../../store/slices/accessValues/accessValuesSlice';

const barImage = require('../../../assets/bar.png');

type props = {
	barId: number;
};

const Bar = ({ barId }: props) => {
	const value = useAppSelector((state) => state.accessValues.bars[barId]);
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
	const max = min + length;
	const step = length / 100;

	const moveSelector = (event: MouseEvent) => {
		const initialY = event.clientY;

		if (event.target instanceof HTMLDivElement) {
			let selector: HTMLDivElement = event.target;

			const initialSelectorPosition = parseFloat(
				getComputedStyle(selector).top
			);

			const MouseMove = (e: any) => {
				let newPos = initialSelectorPosition + e.clientY - initialY;
				if (newPos <= convertRemToPixels(min)) {
					selector.style.top = `${convertRemToPixels(min)}px`;
					newPos = 0;
				} else if (newPos >= convertRemToPixels(length)) {
					selector.style.top = `${convertRemToPixels(max)}px`;
					newPos = 100;
				} else {
					newPos = Math.floor(newPos / convertRemToPixels(step));
					selector.style.top = `${convertRemToPixels(
						newPos * step + min
					)}px`;
				}
				dispatch(setBarValue({ barId, value: newPos }));
			};
			document.addEventListener('mousemove', MouseMove);
			document.onmouseup = () => {
				document.removeEventListener('mousemove', MouseMove);
				document.onmouseup = null;
			};
		}
	};
	return (
		<div className="bar-body">
			<div className="bar-rail">
				<span className="bar-rail__number">{value}</span>
				<div className="bar-selector" onMouseDown={moveSelector}></div>
			</div>
			<div
				className="bar-image"
				style={{ backgroundImage: `url(${barImage})` }}
			/>
			<div className="bar-numbers">
				{numbers.map((n) => (
					<span className="bar-number" key={n}>
						{n}
					</span>
				))}
			</div>
		</div>
	);
};

export default Bar;
