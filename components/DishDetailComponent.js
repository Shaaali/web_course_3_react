import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet, Picker, Switch, Button, Modal} from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites,
      showModal: false
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment :(dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
})
    



function RenderDish(props){
    const dish=props.dish;
    if (dish!=null){
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}
                >
                <Text style={{margin:10}}>
                    {dish.description}
                </Text>
                <Icon 
                    raised
                    reverse 
                    name={props.favorite ? 'heart': 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress ={()=> props.favorite ? console.log ('Already favorite'): props.onPress()}>
                </Icon>
                <Icon 
                    raised
                    reverse 
                    name={'pencil'}
                    type='font-awesome'
                    color='#153'
                    onPress ={()=> props.onPressComment() }>
                </Icon>
            </Card>
        );

    }
    else{
        return(<View></View>)
    }
}

function RenderComments(props) {
    const comments=props.comments;

    const renderCommentItem=({item,index})=> {
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize:12}}>{item.rating}</Text>
                <Text style={{fontSize:12}}> {'--'+ item.author +','+ item.date}</Text>
            </View>
        );
    }

    return(
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
    );
}

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            rating : 1 ,
            comment: '',
            author : '', 
            showModal: false
        }
    }
    
    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }
   static navigationOptions = {
        title : 'Dish Details' 
    };

    toggleModal(){
        this.setState({showModal: !this.state.showModal})
    }

    handleComment(dishId) {
        
        this.props.postComment(dishId, this.state.rating, 
             this.state.author , this.state.comment );
        this.toggleModal();
    }
    resetForm() {
        this.setState({
            rating : 1 ,
            comment: '',
            author : ''
        })
    }
    ratingCompleted(rating) {
        this.state.rating = rating;
      }
    render(){
        const {dishId} = this.props.route.params;
        return (  <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+JSON.stringify(dishId)]} 
                    favorite = {this.props.favorites.some(el=> el=== dishId)}
                    onPress= {()=> this.markFavorite(dishId)}
                    onPressComment = {() => this.toggleModal()}/>
            <RenderComments comments={this.props.comments.comments.filter((comment)=> comment.dishId===dishId)}/>
            <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={()=> {this.toggleModal(); this.resetForm()}}
                    onRequestClose={()=> {this.toggleModal(); this.resetForm()}}
                    >
                         <View style={styles.formRow}>
                                <Text style={styles.formLabel}> Rating</Text>
                                <Rating showRating fractions="{1}" startingValue="{3.3}" onFinishRating= {(value)=> this.setState({rating: value})} />
                        </View>
                        <View>
                        <Input
                                placeholder='Author'
                                leftIcon={{ type: 'font-awesome', name: 'user-circle' }}
                                onChangeText={value => this.setState({ author: value })} />
                        </View>
                        <View>
                        <Input
                                placeholder='Comment'
                                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                                onChangeText={value => this.setState({ comment: value })} />
                        </View>

                        <View style={styles.modal}> 
                            <Button 
                                onPress = {() =>{this.handleComment(dishId) ;this.resetForm();}}
                                color="#512DA8"
                                title="Submit Comment" 
                            />
                        </View>
                        <View style={styles.modal}>
                        <Button 
                                onPress = {() =>{this.toggleModal() ;this.resetForm();}}
                                color="#999"
                                title="Cancel" 
                            />
                        </View>

                </Modal>

    </ScrollView>);
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal:{
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);