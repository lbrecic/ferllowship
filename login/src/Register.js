import React        from 'react';
import RegisterForm    from './RegisterForm';
import {observer}   from 'mobx-react';


function Register(){

      return ( 
        <div className="register" >
          <div className="container">            
            <RegisterForm />
          </div>
        </div>
        );
}

    
  


export default observer(Register);