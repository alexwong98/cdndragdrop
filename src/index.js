import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import './index.css';
import UploadedImages from './reducers/UploadedImages';
import { updateLink } from './actions';

let store = createStore(UploadedImages);


ReactDOM.render(
  <Provider store = { store }>
  	<App />
  </Provider>,
  document.getElementById('root')
);


// const printStore = () => {
	// console.log(store.getState()); 
// }

// store.subscribe(printStore);


var url = "http://localhost:5000/";



function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
    console.log(percentComplete);
    // ...
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}


var currentlyUploadingImage = false;
var updatingLinks = false;  
var uploadingImagesToDo = []; 

const uploadNewImages = () => {
	if (!updatingLinks) {

		if (currentlyUploadingImage) {
			uploadingImagesToDo.push(uploadNewImages);
			console.log('queued an upload');
		} else {
			currentlyUploadingImage = true; 

			var reader = new FileReader();

			// var newImageFiles = store.getState().filter((image_file) => !image_file.uploaded); //filter callback requires boolean response

			// console.log("This is the array of image to be uploaded:");
			// console.log(newImageFiles);

			store.getState().forEach((f) => {
				let file = f.file; 



				if (!f.uploaded) {
					console.log("Uploading file:");
					reader.readAsDataURL(file);

					console.log(file);

					reader.onload = function () {
							var oReq = new XMLHttpRequest();
							oReq.addEventListener("progress", updateProgress);
						// oReq.upload.addEventListener("progress", updateProgress);


							oReq.open("POST", url, true);

							let imageData = {
								name: file.name,
								data_type: file.type,
								encoded_data: reader.result,
							}

							// console.log(JSON.stringify(imageData));
							oReq.send(JSON.stringify(imageData));
				
							oReq.onload = function (oEvent) {
								f.uploaded = true; 



								console.log(file.name + " successfully uploaded to s3 bucket.");
								currentlyUploadingImage = false;

								console.log(uploadingImagesToDo);

								if (uploadingImagesToDo.length) {
									var nextImageCallback = uploadingImagesToDo.pop();
									console.log('doing next action');
									nextImageCallback();

								}
							}

							oReq.onreadystatechange = function() {
							    if (oReq.readyState == XMLHttpRequest.DONE) {
							    	
							        f.link = oReq.responseText;

							        console.log(store.getState());
							        updatingLinks = true;
									store.dispatch(updateLink());
									updatingLinks = false;
							    }
							}
					};

					reader.onerror = function (error) {
						console.log("error");
					};

				}
			});



		}


	}



}



store.subscribe(uploadNewImages);



