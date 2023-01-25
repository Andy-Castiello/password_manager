import './Bars.scss';
import Bar from './Bar/Bar';

const Bars = () => {

	let bars = [];
	for(let i =0;i<5;i++)bars.push(i);
	return (
		<div className='bar-container'>
			{bars.map(i=><Bar barId={i} key={i}/>)}
		</div>
	);
};

export default Bars;
