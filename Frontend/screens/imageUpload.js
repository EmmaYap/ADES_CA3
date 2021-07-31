// import neccessary modules
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import database from '@react-native-firebase/database';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation(); // to use navigation
  const [image, setImage] = React.useState(null); // hook for setting image
  const [uploading, setUploading] = React.useState(false); // hook for uploading image
  const [transferred, setTransferred] = React.useState(0); /// hook for progress bar

  function ViewMemes() {
    navigation.navigate('ReadStorage') // navigate to ReadStorage
  }

  const selectImage = () => { // select image
    const options = {
      maxWidth: 2000, // max width of image is 2000
      maxHeight: 2000, // max height of image is 2000
      storageOptions: {
        skipBackup: true, // don't do backups
        path: 'images', // path images
        mediaType: 'image' // type of media accepted image
      }
    };
    launchImageLibrary(options, response => { // launch imagelibrary / gallery on phone
      if (response.didCancel) { // if did not pick image and left
        console.log('User cancelled image picker'); // print
      }
      else if (response.error) { // if trouble opening imagelibrary
        console.log('ImagePicker Error: ', response.error);
      }
      else { //else
        const source = { uri: response.assets[0].uri }; // set source
        console.log(source); // print
        setImage(source); // set source attribute of image to constant source
      }
    });
  };

  const uploadImage = async () => { // upload image
    const { uri } = image; // set uri
    const filename = uri.substring(uri.lastIndexOf('/') + 1); // set filename
    const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri; // platform used android, replace uri
    setUploading(true); // set true when uploading
    setTransferred(0); // set starting progress bar to 0
    const task = storage() 
      .ref(filename)
      .putFile(uploadUri); // reference filename and upload it to firebase storage
    // set progress state
    task.on('state_changed', snapshot => { // when task changes state
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100 // progress of progress bar (not working)
      );
    });
    task.then(imageSnapshot => {
      console.log("Upload finished"); //print
      storage()
        .ref(imageSnapshot.metadata.fullPath)
        .getDownloadURL() // get fullPath of image and get the downloadURL for the image
        .then(downloadURL => {
          console.log(downloadURL); /// print
          const newReference = database().ref('/images').push(); // push the image into /images in firebase realtime database
          newReference
            .set({
              url: downloadURL // set url as downloadURL
            })
            .then(() => console.log('Data updated')); // print
        });
    })
    try {
      await task; // wait for task to finish before continuing
    } catch (e) { // catch if there is error
      console.error(e); // print
    }
    setUploading(false); // set uploading back to false to indicate uploading has been completed
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    ); // alert to notify user that their image hase been uploaded
    setImage(null); // image source back to null

  };

  return (
    <View>
      {/* logout icon*/}
      <Icon
        raised
        name='logout'
        type='material'
        color='#f50'
        onPress={() => navigation.navigate('Login') } /> {/* navigate back to Login page*/}
      <View style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={selectImage}> {/* clcick to go to imagelibrary*/}
          <Text style={styles.buttonText}>Pick an image</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image !== null ? ( // image not null
            <Image source={{ uri: image.uri }} style={styles.imageBox} /> // where image to upload appears
          ) : null}
          {uploading ? ( // uploading ?
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={transferred} width={300} /> {/* progress bar*/}
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}> {/* button to start uploading image*/}
              <Text style={styles.buttonText}>Upload image</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.ViewButton} onPress={ViewMemes}> {/* button to navigate to page to view memes*/}
            <Text style={styles.buttonText}>View Memes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // set container flex
    alignItems: 'center' // alignitems to center along x-axis
  },
  selectButton: {
    borderRadius: 5, // radius of border
    width: 150, // default width
    height: 50, // default height
    backgroundColor: '#8ac6d1', // background color
    alignItems: 'center', // alignitems to center along x-axis
    justifyContent: 'center', // alignitems to center along y-axis
    marginTop: 100 // margin top 100
  },
  ViewButton: {
    borderRadius: 5, // radius of border
    width: 150, // default width
    height: 50, // default height
    backgroundColor: '#FFF77D',  // background color
    alignItems: 'center', // alignitems to center along x-axis
    justifyContent: 'center', // alignitems to center along y-axis
    marginTop: 50  // margin top 50
  },
  uploadButton: {
    borderRadius: 5, // radius of border
    width: 150, // default width
    height: 50, // default height
    backgroundColor: '#ffb6b9',   // background color
    alignItems: 'center', // alignitems to center along x-axis
    justifyContent: 'center', // alignitems to center along y-axis
    marginTop: 20   // margin top 20
  },
  buttonText: {
    color: 'white', // font color
    fontSize: 18, // font size
    fontWeight: 'bold'  // font weight
  },
  imageContainer: {
    marginTop: 30, //  margin top 30
    marginBottom: 50, // margin bottom 50
    alignItems: 'center'   // alignitems to center along x-axis
  },
  progressBarContainer: {
    marginTop: 20 // margin top 20
  },
  imageBox: {
    width: 300, // default width 300
    height: 300,  // default height 300
    resizeMode: "stretch", // stretch image when resizing
  },
  CreateAccLink: {
    fontSize: 25,  // font size
    color: 'black' // font color

  }
});