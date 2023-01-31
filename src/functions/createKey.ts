import { accessValuesType } from '../store/slices/accessValues/accessValues';

const createKey = (accessValues: accessValuesType) =>
	accessValues.bars.reduce((acum, actual) => acum + `${actual}+`, '') +
	accessValues.lock.reduce((acum, actual) => acum + `${actual}+`, '') +
	accessValues.password;

export default createKey;
