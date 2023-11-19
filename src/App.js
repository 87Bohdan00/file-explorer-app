import React from 'react';
import FileExplorer from './components/FileExplorer/FileExplorer.jsx';
import { fetchData } from './services/apiService';
import './index.css';

function App() {
	const filesData = fetchData();

	return (
		<div className='App'>
			<h1 className='title'>File Explorer</h1>
			<FileExplorer files={filesData} />
		</div>
	);
}

export default App;
