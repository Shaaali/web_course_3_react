import React , { Component } from 'react';
import { View , Text} from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';


class ContactUs extends Component{
    constructor(props){
        super(props);
            this.state = {
                
            };
    }
   static navigationOptions = {
        title : 'Contact Us' 
    };

    render(){
        return(
            <View>
                 <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card title = "Contact Us">
                        <Text>
                        121, Clear Water Bay Road{"\n"}
                        Clear Water Bay, Kowloon{"\n"}
                        HONG KONG{"\n"}
                        Tel: +852 1234 5678 {"\n"}
                        Fax: +852 8765 4321 {"\n"}
                        Email:confusion@food.net
                        </Text>
                    </Card>
                 </Animatable.View>
               
            </View>
        );
    }
};


export default ContactUs; 