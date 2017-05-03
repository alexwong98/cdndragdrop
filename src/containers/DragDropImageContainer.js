import { connect } from 'react-redux';
import DragDropImage from '../components/DragDropImage';
import { saveFile } from '../actions';

const mapStateToProps = (state, ownProps) => {
	return {
		// name: state.name, 
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onDrop: (files) => {
			files.map(f => dispatch(saveFile(f)));
		},
	}	
}


const DragDropImageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(DragDropImage);

export default DragDropImageContainer;