import { accessValuesType } from '../store/slices/accessValues/accessValues';
import { PasswordsListType } from '../store/slices/passwordListSlice/passwordListSlice';
import crypto from 'simple-crypto-js';
import createKey from './createKey';

const createFile = (
	fileName: string,
	accessValues: accessValuesType,
	passwordsListState: PasswordsListType
) => {
	const key = createKey(accessValues);
	const cryptoInstance = new crypto('PassMan');
	const cryptoDataInstance = new crypto(key);
	let textContent = {
		app: 'password_manager',
		version: '1.0',
		data: cryptoDataInstance.encrypt(
			JSON.stringify({
				accessValues: {
					bars: accessValues.bars,
					lock: accessValues.lock,
					password: accessValues.password,
				},
				passwordsList: {
					list: passwordsListState.list,
					nextId: passwordsListState.nextId,
				},
			})
		),
	};

	let content = cryptoInstance.encrypt(textContent);
	let link = document.createElement('a');
	document.body.appendChild(link);
	link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
	link.download = fileName + '.pass';
	link.click();
	document.body.removeChild(link);
	link.remove();
};
export default createFile;
