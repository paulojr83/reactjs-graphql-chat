import React, { Component } from 'react';
import { graphql } from "react-apollo";  
import gql from 'graphql-tag';
import messages from "./query";
import sendMessage from "./mutate";
import logo from '../../logo.svg';
import Message from "../message";
import '../../App.css';

import moment from "moment";
moment.locale('pt-br')

class Chat extends Component {

  constructor(props){
    super(props)
    this.state={backgoundColor:"red", message:"", email:""}
    this.email = ""
  }
  
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });   
  }


  componentDidMount(){
    const { email } =this.props.location.state
    this.email = email

    this.props.query.subscribeToMore({
      document: gql`
        subscription{
          newMessage{
            _id
            user_id
            message
            createdOn
            user{
              name
              email
            }
          }
        }
      `,
      variables: {},
      updateQuery: ( prev, { subscriptionData } ) =>{
        if( prev === undefined) return 
        if( !subscriptionData.data ) return prev
        const newMessage = subscriptionData.data.newMessage
        return {prev, messages: [...prev.messages, newMessage]}      
      }
    })  
  }

  sendMessage = () =>{
    const { message } =this.state
  
    if( message !== ""){        
      this.props.mutate({
          variables:{ email: this.email,  message }
        }).then(data=>{          
            if(data){
              this.setState({message:""})
            }
        }).catch(err=>{
          alert('Cannot send a message!!!', err);
        });  
      
    }else{
      alert("Message não esta vazia - Não é possível enviar!")
    }
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
  
  componentDidUpdate() {
    this.scrollToBottom();   
  }  
 
  render() {
    
    return (
    <div className="col-md-12">
        <div className="panel panel-primary">
            <div className="panel-heading" >
                <span className="glyphicon glyphicon-comment"></span> Chat
                <div className="btn-group pull-right"> </div>
            </div>
        <div>
            <div className="panel-body messageList" ref={(div) => {
                    this.messageList = div;
                }}>
                <ul className="chat" >
                {this.props.query.loading ? 
                    <img src={logo} className="App-logo" alt="logo" />:
                    this.props.query.messages.map(m => (
                        <Message key={m._id} side={this.email === m.user.email ? 'right':'left'} 
                            avatar={`http://placehold.it/50/${this.email === m.user.email ? '55C1E7':'f44242'}/fff&text=${m.user.name.substring(0,1)}`}
                            message={m.message}
                            name={m.user.name} 
                            createdOn={moment(Number( m.createdOn )).format('hh:mm')}
                            />
                    ))
                }                            
                </ul>
            </div>
            <div className="panel-footer">
                <div className="input-group">
                    <input id="btn-input" type="text" className="form-control input-sm" 
                    onChange={(e)=> this.setState({message:e.target.value})} name="message" 
                    placeholder="Digite sua mensagem aqui..." 
                    value={this.state.message}/>
                    <span className="input-group-btn">
                        <button className="btn btn-warning btn-sm" id="btn-chat" 
                        onClick={() => this.sendMessage()}>Enviar</button>
                    </span>
                </div>
            </div>
        </div>
        </div>
    </div>
    );
  }
}

export default graphql(messages,{name:"query"})(graphql(sendMessage)(Chat));
