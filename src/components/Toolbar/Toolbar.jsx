import React, { useState } from 'react';
import './Toolbar.css';

const Toolbar = ({ onAdd }) => {
	const [name, setName] = useState('');
	const [type, setType] = useState('folder');

	const handleAddClick = () => {
		if (name.trim() !== '') {
			onAdd(name, type);
			setName('');
			setType('folder');
		}
	};

	return (
		<div className='toolbar'>
			<input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
			<select value={type} onChange={(e) => setType(e.target.value)}>
				<option value='folder'>Folder</option>
				<option value='file'>File</option>
			</select>
			<button onClick={handleAddClick}>Add</button>
		</div>
	);
};

export default Toolbar;
