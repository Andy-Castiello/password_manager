import './Led.scss';

type props = {
	on?: boolean;
	color: 'BLUE'| 'GREEN' | 'RED';
};

const Led = ({ on = true, color }: props) => {
	return <div className={'led' + (on ? ' led--' + color : '')} />;
};

export default Led;
