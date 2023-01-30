import { Password } from '../../store/slices/passwordListSlice/passwordListSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedPassword } from '../../store/slices/passwordListSlice/passwordListSlice';
import './PasswordsList.scss';

const PasswordsList = () => {
	const passwords = useAppSelector((state) => state.passwordListSlice);
	const dispatch = useAppDispatch();
	const handleClick = (pass: Password) => {
		dispatch(setSelectedPassword(pass.id));
	};
	return (
		<div className="passwords-list">
			{passwords.list.map((pass) => (
				<span
					className={
						'passwords-list__password' +
						(pass.id === passwords.selected
							? ' passwords-list__password--selected'
							: '')
					}
					key={pass.id}
					onClick={(e) => handleClick(pass)}
				>
					{pass.name}
				</span>
			))}
		</div>
	);
};

export default PasswordsList;
