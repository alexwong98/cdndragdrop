import React, { PropTypes } from 'react'; 
import Dropzone from 'react-dropzone';

class DragDropImage extends React.Component {
	constructor() {
		super();
		this.state = { files : [] };
	}

	onDrop(files) {
		this.props.onDrop(files); 
	}

	render() {
	    return (
	    	<section>
		        <div className="dropzone">
		          <Dropzone onDrop={this.onDrop.bind(this)}>
		            <p>Try dropping some files here, or click to select files to upload.</p>
		          </Dropzone>
		        </div>

	    	</section>	
    	);
	}
}

export default DragDropImage;