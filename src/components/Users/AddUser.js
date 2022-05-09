import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css"; // CSS modules MUST be imported in this format

const AddUser = (props) => {
  // Store the entered user with useState
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const addUserHandler = (e) => {
    e.preventDefault(); // prevent page reload
    // Check if both inputs are blank
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      return;
    }
    // Check if age is invalid
    if (+enteredAge < 1) {
      // + sign ensures js evaluates enteredAge as a number and NOT a string
      return;
    }
    console.log(enteredUsername, enteredAge); // Log for now

    // Lift state up to App.js so that list of users can be passed down to the UsersList component to be rendered
    props.onAddUser(enteredUsername, enteredAge);

    // Reset Inputs
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (e) => {
    // Set username
    setEnteredUsername(e.target.value);
  };

  const ageChangeHandler = (e) => {
    // Set age
    setEnteredAge(e.target.value);
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={enteredUsername}
          onChange={usernameChangeHandler}
        ></input>
        <label htmlFor="age">Age (Years)</label>
        <input
          id="age"
          type="number"
          value={enteredAge}
          onChange={ageChangeHandler}
        ></input>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
