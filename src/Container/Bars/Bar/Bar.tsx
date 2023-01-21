import './Bar.scss';
import { MouseEvent, useState } from 'react';

const barImage = require('../../../assets/bar.png');

const Bar = () => {
	const [position, setPosition] = useState(0);
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
	const max = 60.2;
	const step = max / 100;

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
					selector.style.top = `${convertRemToPixels(0.1)}px`;
					newPos = 0;
				} else if (newPos >= convertRemToPixels(max)) {
					selector.style.top = `${convertRemToPixels(max)}px`;
					newPos = 100;
				} else {
					newPos = Math.floor(newPos / convertRemToPixels(step));
					selector.style.top = `${
						newPos * convertRemToPixels(step)
					}px`;
				}
				setPosition(newPos);
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
				<div className="bar-selector" onMouseDown={moveSelector}></div>
			</div>
			<img className="bar-image" src={barImage} />
			<div className="bar-numbers">
				{numbers.map((n) => (
					<span className="bar-number">{n}</span>
				))}
			</div>
		</div>
	);
};

export default Bar;
