import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import './RegisterForm.css'
import ImageUploader from 'react-images-upload';

class RegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          email: '',
          buttonDisabled: false, 
          show: false,
          pictures: []
        };
        this.onDrop = this.onDrop.bind(this);
      }

      onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
      }
    
      setInputValueUsername(property, val){
        val = val.trim();
        if(val.length > 128){
          return;
        }
    
        this.setState({
          [property]:val
        })
      }

      setInputValuePassword(property, val){
        val = val.trim();
        if(val.length > 128){
          return;
        }
    
        this.setState({
          [property]:val
        })
      }

      setInputValueEmail(property, val){
        val = val.trim();
        if(val.length > 128){
          return;
        }
    
        this.setState({
          [property]:val
        })
      }
    

      onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };

    
      resetForm(){
        this.setState({
          username: '',
          password: '',
          email: '',
          buttonDisabled: false
        })
      }

      componentDidMount(){
        fetch('/').then(res => res.json()).
        then(json => this.setState({ data: json }));;
      }
    
      async doRegister(){
        this.setState({
          buttonDisabled:true,
          show:false
        })

        console.log(this.state.show);

        if(!this.state.username){
          return;
        }
    
        if(!this.state.password){
          return;
        }

        if(!this.state.email){
            return;
          }
    
        try{
          let res = await fetch('/api/people', {
            method: 'post',
            headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
            },
            body : JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              email: this.state.email
            })
          });
    
          // let result = await res.json();
          // if(result && result.success){
          //   UserStore.isLoggedIn = true;
          //   UserStore.username = result.username;
          // } else if(result  && result.success === false){
          //   this.resetForm();
          //   alert(result.msg);
          // }
    
        }catch(e){
          console.log(e);
          this.resetForm();
        }
    
      }
    
      render() {
        if(!this.props.show){
          return null;
        } 

        return ( 
        <div className="overlay">
        <div className="modal"> 
        <div className="registerForm modal-content" >
            <div className='title-register'>
            Registriraj se
            </div>
            
            <div className="registerDiv">
            <InputField  
              type='text'
              placeholder='Korisničko ime'
              value={this.state.username ? this.state.username : ''}
              onChange={(val) => this.setInputValueUsername('username', val)} />
            </div>
            

            <div className="registerDiv">
            <InputField  
              type='password'
              placeholder='Lozinka'
              value={this.state.password ? this.state.password : ''}
              onChange={(val) => this.setInputValuePassword('password', val)}
    
            />
            </div>
            
            <div className="registerDiv">
            <InputField  
              type='email'
              placeholder='Email'
              value={this.state.email? this.state.email : ''}
              onChange={(val) => this.setInputValueEmail('email', val)}
            />

            <div className="ImageUploader"> 

            </div>
              <ImageUploader
                  singleImage = {true}
                  withIcon={true}
                  withLabel={false}
                  withPreview={true}
                  buttonText='Izaberite sliku'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                  maxFileSize={5242880}
              />
            </div>


            <div className="registerButton">
            <SubmitButton 
              text='Registriraj se'
              disabled={this.state.buttonDisabled}
              onClick={() => this.doRegister()}
            /> 
            </div>

            <div className="registerClose registerButton">
            <button className="btn"
              onClick = {e => this.onClose(e)}>
              Zatvori
             </button>
            </div>
          </div>
        </div>
        </div>
        );
      }
    }


export default RegisterForm;