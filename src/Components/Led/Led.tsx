import './Led.scss';

enum colors {
	BLUE = 'BLUE',
	GREEN = 'GREEN',
	RED = 'RED',
}
type props = {
	on?: boolean;
	color: string;
};

const Led = ({ on=true, color }: props) => {
	return <div className={'led' + (on ? ' led--' + color : '')} />;
};

export default Led;
