import React from 'react';
import './Content.css';

const Content = ({ files = [], onItemClick, onDelete }) => {
	const handleItemClick = (item) => {
		onItemClick(item);
	};

	const handleDeleteItem = (e, id) => {
		e.stopPropagation();
		onDelete([id]);
	};

	return (
		<div className='content'>
			<ul>
				{Array.isArray(files) && files.length > 0 ? (
					files.map((file, index) => (
						<li key={index} onClick={() => handleItemClick(file)}>
							{file.type === 'folder' ? <span className='folder-icon'>📁</span> : <span className='file-icon'>📄</span>}
							{file.name}
							<button onClick={(e) => handleDeleteItem(e, file.id)}>Delete</button>
						</li>
					))
				) : (
					<li>No files available</li>
				)}
			</ul>
		</div>
	);
};

export default Content;
