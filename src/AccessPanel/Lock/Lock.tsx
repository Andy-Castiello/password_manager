import Led from '../../Components/Led/Led';
import Button from '../../Components/Button/Button';
import { MouseEvent, useState, useRef } from 'react';
import './Lock.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	resetLock,
	setLockValue,
} from '../../store/slices/accessValues/accessValues';

const lockImage = require('../../assets/lock-image.png');
const lockImageDisabled = require('../../assets/lock-image-disabled.png');

const Lock = () => {
	const values = useAppSelector((state) => state.accessValues.lock);
	const accessPanelState = useAppSelector((state) => state.accessPanel.state);
	const dispatch = useAppDispatch();

	const position = useRef<number>(0);
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
		if (lastTimeOut) {
			clearTimeout(lastTimeOut);
		}
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
			const initialPos = position.current;

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
				newPos += initialPos;
				if (newPos >= 60) newPos %= 60;
				lock.style.transform = `rotate(${newPos * step}deg)`;
				position.current = newPos;
			};
			document.addEventListener('mousemove', MouseMove);
			document.onmouseup = () => {
				setLastTimeOut(
					setTimeout(() => {
						setKey();
					}, 400)
				);
				document.removeEventListener('mousemove', MouseMove);
				document.onmouseup = null;
			};
		}
	};
	const setKey = () => {
		if (values[0] === null) {
			dispatch(
				setLockValue({
					key: 0,
					value: position.current === 0 ? 0 : 60 - position.current,
				})
			);
		} else if (values[1] === null) {
			dispatch(
				setLockValue({
					key: 1,
					value: position.current === 0 ? 0 : 60 - position.current,
				})
			);
		} else if (values[2] === null) {
			dispatch(
				setLockValue({
					key: 2,
					value: position.current === 0 ? 0 : 60 - position.current,
				})
			);
		}
		clearTimeout(lastTimeOut!);
	};
	const Reset = () => {
		if (lastTimeOut) {
			clearTimeout(lastTimeOut);
		}
		dispatch(resetLock());
	};
	return (
		<div className="lock">
			{
				<div className="lock__wheel">
					<div className="lock__wheel__indicator" />
					<div
						style={{
							backgroundImage: `url(${
								accessPanelState === 'disabled'
									? lockImageDisabled
									: lockImage
							})`,
						}}
						className="lock__wheel__wheel"
						onMouseDown={
							accessPanelState === 'normal' ||
							accessPanelState === 'edit'
								? turnLock
								: undefined
						}
					/>
				</div>
			}
			<div className="lock__panel">
				<div className="lock__panel__leds">
					<div className="lock__panel__leds__led">
						{accessPanelState === 'edit' ? (
							<span className="lock__panel__leds__led__number">
								{values[0]}
							</span>
						) : (
							<></>
						)}
						<Led color={'BLUE'} on={values[0] !== null} />
					</div>
					<div className="lock__panel__leds__led">
						{accessPanelState === 'edit' ? (
							<span className="lock__panel__leds__led__number">
								{values[1]}
							</span>
						) : (
							<></>
						)}
						<Led color={'BLUE'} on={values[1] !== null} />
					</div>
					<div className="lock__panel__leds__led">
						{accessPanelState === 'edit' ? (
							<span className="lock__panel__leds__led__number">
								{values[2]}
							</span>
						) : (
							<></>
						)}
						<Led color={'BLUE'} on={values[2] !== null} />
					</div>
				</div>
				<Button
					onClick={Reset}
					state={
						accessPanelState === 'disabled' ? 'disabled' : 'normal'
					}
				>
					RESET
				</Button>
			</div>
		</div>
	);
};

export default Lock;
