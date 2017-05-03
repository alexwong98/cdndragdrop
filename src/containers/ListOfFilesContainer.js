import { connect } from 'react-redux';
import ListOfFiles from '../components/ListOfFiles';

const mapStateToProps = (state, ownProps) => {
	return {
		files : state, 
	}
}

const ListOfFilesContainer = connect(
	mapStateToProps
)(ListOfFiles);

export default ListOfFilesContainer;