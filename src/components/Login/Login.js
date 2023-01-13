import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if(action.type === "INPUT_VALUE") {
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === "INPUT_BLUR") {
    return{value: state.value, isValid: state.value.includes('@')}
  }
  return {value: state.value, isValid: null}
}

const passwordReducer = (state, action) => {
  if(action.type === "INPUT_VALUE") {
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === "INPUT_BLUR") {
    return{value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: state.value, isValid: null}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: null}) //reducers
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "", isValid: null})

  const { isValid: emailIsValid } = emailState //optimization
  const { isValid: passwordIsValid } = passwordState
  
  useEffect(() => {
    const identifier = setTimeout(() => { //set setFormIsValid state after every 1s not every key stroke, think with HTTP request 
      console.log("Checking form validity.!");
      // setFormIsValid(emailState.isValid && passwordState.isValid)
      setFormIsValid(emailIsValid && passwordIsValid ) //optimization
    }, 1000)

    return () => { //clean up function; runs before every new side effect function execution (except first run) and before the component is unmounted
      console.log("Clean up.!");
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid]) //add dependencies as what you are using in useEffect function

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );

    dispatchEmail({type: "INPUT_VALUE", val: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );

    dispatchPassword({type: "INPUT_VALUE", val: event.target.value})
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type: "INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchEmail({type: "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input id="email" label="E-Mail" type="email" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
