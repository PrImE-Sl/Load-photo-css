import { upload } from './upload.js'
import firebase from 'firebase/app'
import { } from 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyD3ZGIAnn-L7jmHvvsH-0-QwVHG0S1LpJQ",
	authDomain: "fe-upload-7.firebaseapp.com",
	projectId: "fe-upload-7",
	storageBucket: "fe-upload-7.appspot.com",
	messagingSenderId: "824406934186",
	appId: "1:824406934186:web:29d56af5753a3dffff06d3"
}
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()
console.log(storage)

upload('#file', {
	multi: true,
	accept: ['.png', '.jpg', '.gif'],
	onUpload(files, blocks) {
		files.forEach((file, index) => {
			const ref = storage.ref(`images/${file.name}`)
			const task = ref.put(file)
			task.on('state_changed', snapshot => {
				const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
				const block = blocks[index].querySelector('.preview-info-progress')
				block.textContent = percentage
				block.style.width = percentage
			}, error => {
				console.log(error)
			}, () => {
				task.snapshot.ref.getDownloadURL().then(url => {
					console.log('Download URL ', url)
				})
			})
		})
	}
})
