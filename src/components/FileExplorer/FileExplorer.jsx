import React, { useState, useEffect } from 'react';
import Toolbar from '../Toolbar/Toolbar';
import Content from '../Content/Content';
import { fetchData } from '../../services/apiService';
import './FileExplorer.css';

const FileExplorer = () => {
	const [files, setFiles] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [previousItem, setPreviousItem] = useState(null);

	useEffect(() => {
		fetchData()
			.then((data) => {
				setFiles(data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	const handleItemClick = (item) => {
		setPreviousItem(selectedItem);
		setSelectedItem(item);
	};

	const handleBackClick = () => {
		setSelectedItem(previousItem);
		setPreviousItem(null);
	};

	const handleAdd = (name, type) => {
		const newEntry = {
			id: files.length + 1,
			name: name,
			type: type,
			description: '',
			content: '',
		};

		const addFileToFolder = (folder, newFile) => {
			folder.files = folder.files || [];
			folder.files.push(newFile);
			return true;
		};

		const findAndUpdate = (arr, id, file) => {
			for (const item of arr) {
				if (item.id === id) {
					addFileToFolder(item, file);
					return true;
				}
				if (item.files && findAndUpdate(item.files, id, file)) return true;
			}
			return false;
		};

		const updatedFiles = [...files];
		if (!selectedItem) {
			updatedFiles.push(newEntry);
		} else {
			if (findAndUpdate(updatedFiles, selectedItem.id, newEntry)) {
				setFiles(updatedFiles);
				return;
			}
		}
		setFiles(updatedFiles);
	};

	const handleDelete = (ids) => {
		const deleteFiles = (arr, deleteIds) => {
			for (let i = 0; i < arr.length; i++) {
				if (deleteIds.includes(arr[i].id)) {
					arr.splice(i, 1);
					i--;
				} else if (arr[i].files) {
					deleteFiles(arr[i].files, deleteIds);
				}
			}
		};

		const updatedFiles = [...files];
		deleteFiles(updatedFiles, ids);
		setFiles(updatedFiles);
	};

	return (
		<div className='file-explorer'>
			<Toolbar onAdd={handleAdd} onDelete={handleDelete} />
			<Content files={files} onItemClick={handleItemClick} onDelete={handleDelete} />
			{selectedItem && (
				<div className='item-details'>
					<button onClick={handleBackClick}>Back</button>
					<h3>{selectedItem.name}</h3>
					{selectedItem.type === 'file' ? (
						<div>
							<p>{selectedItem.description}</p>
							<p>{selectedItem.content}</p>
						</div>
					) : selectedItem.files && selectedItem.files.length > 0 ? (
						<ul>
							{selectedItem.files.map((file, index) => (
								<li key={index} onClick={() => handleItemClick(file)}>
									{file.type === 'folder' ? '📁 ' : '📄 '}
									{file.name}
									<button onClick={() => handleDelete([file.id])}>Delete</button>
								</li>
							))}
						</ul>
					) : (
						<p>Folder is empty</p>
					)}
				</div>
			)}
		</div>
	);
};

export default FileExplorer;
