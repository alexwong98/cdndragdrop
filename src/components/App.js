import React from 'react';
import DragDropImageContainer from '../containers/DragDropImageContainer';
import ListOfFilesContainer from '../containers/ListOfFilesContainer';


const App = () => { 
  return (
    <div>
      <DragDropImageContainer />
      <ListOfFilesContainer />
    </div>
  );
}

export default App;
