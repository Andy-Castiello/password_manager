import Led from '../../Components/Led/Led';
import Button from '../../Components/Button/Button';
import { MouseEvent, useState } from 'react';
import moment from 'moment';
import './Lock.scss';

const lockImage = require('../../assets/lock-image.png');

const Lock = () => {
	const [position, setPosition] = useState<number>(0);
	const [key1, setKey1] = useState<number | null>(null);
	const [key2, setKey2] = useState<number | null>(null);
	const [key3, setKey3] = useState<number | null>(null);
	const [lastTimeOut, setLastTimeOut] = useState<NodeJS.Timeout | null>(null);
	const step = 6;

	const calcAngleDegrees = (
		xPos: number,
		yPos: number,
		xCenter: number,
		yCenter: number
	): number => {
		if (xPos >= xCenter) {
			if (yPos < yCenter) {
				return Math.floor(
					(Math.atan(-(xPos - xCenter) / (yPos - yCenter)) * 180) /
						Math.PI
				);
			} else {
				return (
					180 -
					Math.floor(
						(Math.atan((xPos - xCenter) / (yPos - yCenter)) * 180) /
							Math.PI
					)
				);
			}
		} else {
			if (yPos < yCenter) {
				return (
					360 -
					Math.floor(
						(Math.atan((xPos - xCenter) / (yPos - yCenter)) * 180) /
							Math.PI
					)
				);
			} else {
				return (
					180 -
					Math.floor(
						(Math.atan((xPos - xCenter) / (yPos - yCenter)) * 180) /
							Math.PI
					)
				);
			}
		}
	};
	const turnLock = (event: MouseEvent) => {
		if (event.target instanceof HTMLDivElement) {
			const lock = event.target as HTMLDivElement;

			const lockRect = lock.getBoundingClientRect();
			const center = {
				X: Math.floor(
					lockRect.left + (lockRect.right - lockRect.left) / 2
				),
				Y: Math.floor(
					lockRect.top + (lockRect.bottom - lockRect.top) / 2
				),
			};
			const initial = calcAngleDegrees(
				event.clientX,
				event.clientY,
				center.X,
				center.Y
			);

			const MouseMove = (e: any) => {
				const actualPos = calcAngleDegrees(
					e.clientX,
					e.clientY,
					center.X,
					center.Y
				);
				let newPos = 0;
				if (actualPos >= initial) {
					newPos = Math.floor(
						(calcAngleDegrees(
							e.clientX,
							e.clientY,
							center.X,
							center.Y
						) -
							initial) /
							step
					);
				} else {
					newPos = Math.floor(
						(calcAngleDegrees(
							e.clientX,
							e.clientY,
							center.X,
							center.Y
						) +
							360 -
							initial) /
							step
					);
				}
				newPos += position;
				if (newPos >= 60) newPos %= 60;
				lock.style.transform = `rotate(${newPos * step}deg)`;
				setPosition(newPos);
			};
			document.addEventListener('mousemove', MouseMove);
			document.onmouseup = () => {
				if (lastTimeOut) {
					clearTimeout(lastTimeOut);
				}
				setLastTimeOut(setTimeout(() => {
					setKey();
				}, 1000));
				document.removeEventListener('mousemove', MouseMove);
				document.onmouseup = null;
			};
		}
	};
	const setKey = () => {
		if (key1 === null) {
			setKey1(position === 0 ? 0 : 60 - position);
		} else if (key2 === null) {
			setKey2(position === 0 ? 0 : 60 - position);
		} else if (key3 === null) {
			setKey3(position === 0 ? 0 : 60 - position);
		}
        clearTimeout(lastTimeOut!);
	};
	const Reset = () => {
		setKey1(null);
		setKey2(null);
		setKey3(null);
	};
	return (
		<div className="lock">
			{
				<div className="lock__wheel">
					<div className="lock__wheel__indicator" />
					<div
						style={{ backgroundImage: `url(${lockImage})` }}
						className="lock__wheel__wheel"
						onMouseDown={turnLock}
					/>
				</div>
			}
			<div className="lock__panel">
				<div className="lock__panel__leds">
					<Led color={'BLUE'} on={key1 !== null} />
					<Led color={'BLUE'} on={key2 !== null} />
					<Led color={'BLUE'} on={key3 !== null} />
				</div>
				<Button onClick={Reset}>RESET</Button>
			</div>
		</div>
	);
};

export default Lock;
