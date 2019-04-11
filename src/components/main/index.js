import React, { Component } from 'react';
import '../../App.css';

class Main extends Component {

  constructor(props){
    super(props)
    this.state = {user:{}}
   
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });   
  }

 
  login = () =>{
    
    const { email } =this.state
    
    if( email !== ""){
        this.props.history.push({
            pathname: '/chat',
            state: { email }
          })
      
    }else{
      alert("Message não esta vazia - Não é possível enviar!")
    }   
  }

  render() {
    return (     
        <div className="input-group">
        <input id="btn-input" type="text" className="form-control input-sm" 
            onChange={this.handleChange} name="email" 
            placeholder="Digite seu email aqui" />
            <span className="input-group-btn">
         
                <button className="btn btn-warning btn-sm" id="btn-chat" 
                onClick={()=>this.login()}>Enviar</button>
            </span>
        </div>
    );
  }
}


export default  Main;

