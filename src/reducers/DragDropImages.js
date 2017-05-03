const UploadImages = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_NEW_IMAGE':
			return {
				name : action.name,
				link: action.link,
			}
	}
}