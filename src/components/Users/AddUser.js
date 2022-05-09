import React, { useState, Fragment, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css"; // CSS modules MUST be imported in this format

const AddUser = (props) => {
  // Declare Refs
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // useState for error handling
  const [error, setError] = useState();

  const addUserHandler = (e) => {
    e.preventDefault(); // prevent page reload
    // Use Refs to get values
    const enteredNameRef = nameInputRef.current.value;
    const enteredAgeRef = nameInputRef.current.value;
    // Check if both inputs are blank
    if (
      enteredNameRef.trim().length === 0 ||
      enteredAgeRef.trim().length === 0
    ) {
      // Set error state to an object
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    // Check if age is invalid
    if (+enteredAgeRef < 1) {
      // Set error state
      setError({
        title: "Invalid Number",
        message: "Please enter a valid number (greater than 0).",
      });
      // + sign ensures js evaluates enteredAge as a number and NOT a string
      return;
    }
    // Lift state up to App.js so that list of users can be passed down to the UsersList component to be rendered
    props.onAddUser(enteredNameRef, enteredAgeRef);
    // Do NOT make a regular practice of doing this often:
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    // This manipulates the DOM directly instead of thru React - again, not always a god idea but it works in this case
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    // Use React.Fragment instead of a div
    <Fragment>
      {
        // Set ErrorModal to render on the condition that error contains any sort of state
        error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
          />
        )
      }
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef}></input>
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef}></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
