const UploadedImage = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_NEW_IMAGE':
			return {
				file : action.file,
				uploaded: false,
				link: "",
			};
		case 'UPDATE_LINK' : 
			return {
				...state,
				uploaded: true,
				link: state.link,
			}
		default:
			return state; 
	}
}

const UploadedImages = (state = [], action) => {
	switch (action.type) {
		case 'CREATE_NEW_IMAGE' : 
			return [...state, UploadedImage(undefined, action)];
		case 'UPDATE_LINK' :
			return state.map((i) => UploadedImage(i, action)); 
		default:
			return state; 
	}
}



export default UploadedImages;