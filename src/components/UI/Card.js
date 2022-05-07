import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
  // Use backtick string and props.className to apply external CSS classes to cards
};

export default Card;
