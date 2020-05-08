import React, {Component} from 'react';
import { View, StyleSheet,Text,ScrollView, Image} from 'react-native';
import { Icon, Input, CheckBox, Button} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {baseUrl} from '../shared/baseUrl';
import * as ImageManipulator from "expo-image-manipulator";
import {Asset} from 'expo';

class LoginTab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidUpdate() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

    static navigationOptions = {
       
    };

    

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
                
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
    }

    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    inputContainerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    inputContainerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                            onPress={() => this.handleLogin()}
                            title="Login"
                            icon={
                                <Icon
                                    name='sign-in'
                                    type='font-awesome'            
                                    size={24}
                                    color= 'white'
                                />
                            }
                            buttonStyle={{
                                backgroundColor: "#512DA8"
                            }}
                            />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        clear
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'blue'
                            />
                        }
                        titleStyle={{
                            color: "blue"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
    }

}

class RegisterTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl+ 'images/logo.png'
        }

    }

    getImageFromCamera = async ()=>{
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraPermission.status === 'granted' && cameraRollPermission.status ==='granted'){
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });
            if (!capturedImage.cancelled) {
                this.processImage( capturedImage.uri);
            }
            
        }
    }
    getImageFromGallery = async ()=> {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraRollPermission.status ==='granted'){
            let selectedImg = await ImagePicker.launchImageLibraryAsync({
                allowsEditing : true,
                allowsMultipleSelection : false,
                mediaTypes : ImagePicker.MediaTypeOptions.images
            });    
           if (!selectedImg.cancelled) {
                    this.processImage( selectedImg.uri);
            }
        }  
    }

    processImage=async(imageUri) => {
       let processedImage =  await ImageManipulator.manipulateAsync(
           imageUri,
           [
               {resize: {width:400}}
           ],
           {format: 'png'}
       );
       this.setState({imageUrl: processedImage.uri})
    }

    handleRegister(){
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
                
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
    }

    static navigationOptions = {
       
    
    };
  

    render(){
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}   
                        />
                     <Button
                        title="Gallery"
                        onPress={this.getImageFromGallery}
                        />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    inputContainerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    inputContainerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
    }
}



const Log = createBottomTabNavigator();

const Login=() =>  (
      <Log.Navigator  
      initialRouteName='Login'  
      tabBarOptions={
        {activeBackgroundColor:'#9575CD',
        inactiveBackgroundColor:'#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor:'gray',}
    }  
        >
        <Log.Screen name="Login" component={LoginTab} options={({ navigation, route }) => ({

          tabBarIcon: ({ tintColor }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) ,
          tabBarLabel: 'Login',
          

        })}/>
        <Log.Screen name="Register" component={RegisterTab} options={({ navigation, route }) => ({

            tabBarIcon: ({ tintColor }) => (
            <Icon
                name='user-plus'
                type='font-awesome'            
                size={24}
                iconStyle={{ color: tintColor }}
            />
            ) ,
            tabBarLabel: 'Register',
            

            })}/>
      </Log.Navigator>
    
  );


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 15,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        justifyContent : "space-around"
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 30
    }
    
});

export default Login;