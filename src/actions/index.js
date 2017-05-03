export const saveFile = (file) => {
	console.log("save file action called");
	console.log(file.name);
	return {
		type : 'CREATE_NEW_IMAGE',
		file : file,
	}
}


export const updateLink = () => {
	console.log("update link action called");
	return {
		type : 'UPDATE_LINK',
	}
}