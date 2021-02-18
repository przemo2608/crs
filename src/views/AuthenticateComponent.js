import React from 'react';


const AuthenticateComponent = () =>{
     /*
    if(token w storze)
        przejdz do newsow
    if(token w localstorze){
        var result = await dispatch(validuj_token(token))
        if(result) 
            wpisz go do stora, localstorage i przejdz do newsow
        else
            przejdz na strone logowania        
    }
  */

     if (token) {
          return <Redirect to={routes.news} />;
        }
          if (localStorage.getItem('token')) {

          return <Redirect to={routes.news} />;
        }
      <>     
    </>    
};

const mapStateToProps = ({ token }) => ({
  token,
});

const mapDispatchToProps = dispatch => ({
    authenticate: (username, password) => dispatch(authenticateAction(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateComponent);