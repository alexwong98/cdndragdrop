const UploadedImage = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_NEW_IMAGE':
			return {
				name : action.name,
				link: action.link,
			};
		case 'REMOVE_IMAGE':
			return {};
		default:
			return state; 
	}
}

const UploadedImages = (state = [], action) => {
	switch (action.type) {

	}
}