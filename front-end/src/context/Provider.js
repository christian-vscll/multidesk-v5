import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
	const [loginVar, setLoginVar] = useState({user: '', pasw: ''});
	const [actualConvertedFiles, setActualConvertedFiles] = useState([]);
	const [convertedFiles, setConvertedFiles] = useState([]);
	const [conversorForm, setConversorForm] = useState({
		type: 'ofx-xls', files: null, separado: 'true',
	});


	const contextValue = {
		loginVar, setLoginVar,
		actualConvertedFiles, setActualConvertedFiles,
		convertedFiles, setConvertedFiles,
		conversorForm, setConversorForm,
	};

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
}

export default Provider;
