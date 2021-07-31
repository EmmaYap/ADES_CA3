// import necessary modules
import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, Alert, View} from 'react-native';
import database from '@react-native-firebase/database';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function App() {

    React.useEffect(() => {
            // read realtime database
            read(); // anything in here is fire on component mount
            return () => {
               SetImage(null) // Anything in here is fired on component unmount.
            }
      }, []);

    const navigation = useNavigation(); // to use navigation
    const [ImageSet, SetImage] = React.useState(null); // image hook

    function getRandomInt(max) {
        return Math.floor(Math.random() * max); // return random number between math.random times max and floor to lower whole number if number is a decimal 
    }

    function Upload() { // upload screen
        navigation.navigate('Upload'); // navigate to upload screen
    }

    const read = () => {
        database()
            .ref('images/')
            .once('value') //only get reference from /images in realtime database once
            .then(snapshot => {
                let values = []; // set values as an array
                snapshot.forEach((snapshot) => { // do once for each snapshot
                    values.push(snapshot.val()); // push snapshot value into values
                })
                image = values[getRandomInt(values.length)].url // generate a random int that within values.length to get random image
                SetImage(image); // set image source to image
            });
    }

    return (

        <View style={styles.container}>
             {/* logout icon*/}
            <Icon
                raised
                name='logout'
                type='material'
                color='#f50'
                onPress={() => navigation.navigate('Login')} />  {/* signout and navigate to login screen */}
            <TouchableOpacity style={styles.selectButton} onPress={read}>  {/* button to random generate a meme */}
                <Text style={styles.buttonText}> Generate Meme</Text>
            </TouchableOpacity>
            <Image source={{ uri: ImageSet }} style={styles.imageBox} />
            <TouchableOpacity style={styles.UploadButton} onPress={Upload}> {/* navigate to upload image screen */}
                <Text style={styles.buttonText}> Upload Meme</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1 // set container flex
    },
    selectButton: {
        borderRadius: 5, // border radius
        width: 150,  // default width is 150
        height: 50, // default height is 50
        backgroundColor: '#8ac6d1', // background color
        alignItems: 'center', // align items center on x-axis
        justifyContent: 'center', // align content center on y-axis
        alignSelf: "center" // align self center on x-axis
    },
    UploadButton: {
        borderRadius: 5, // border radius
        width: 150, // default width is 150
        height: 50, // default height is 50
        backgroundColor: '#ffb6b9', // background color
        alignItems: 'center', // align item center on x-axis
        justifyContent: 'center', // align content center on y-axis
        alignSelf: "center", // align self center on x-axis
        marginTop: 20 // margin top 20
    },
    buttonText: {
        color: 'white', // font color
        fontSize: 18, // font size
        fontWeight: 'bold' // font weight
    },
    imageBox: {
        width: 300, // default width is 300
        height: 300, // default height is 300
        resizeMode: "stretch", // stretch image when resizing
        alignSelf: "center",  // align self to center on x-axis
        marginTop: 20, // margin top 20
        borderWidth: 2, // border width
        borderColor: 'black' // border color
    },
    CreateAccLink: {
        fontSize: 25, // font size
        color: 'black'  // font color
    }
});