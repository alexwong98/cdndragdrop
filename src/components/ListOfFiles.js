import React, { PropTypes } from 'react';

const ListOfFiles = ({files}) => {
	return (
		<aside>
			<h2> Uploaded Images </h2>
			{console.log("files should appear below")}
			{files.map(f => <li key = {f.file.name}> {f.file.name} - <a href={f.link}>{f.link}</a> </li>)}
		</aside>
	);
}


export default ListOfFiles;




