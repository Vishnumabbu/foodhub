import * as PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

export function RestaurantCard(props) {
  const { description, name, _id } = props.rest;
  return (
    <div className="col s4 m4">
      <div className="card indigo darken-3">
        <div className="card-content white-text">
          <span className="card-title">{name}</span>
          <p>{description}</p>
          {/* <p>Vishnu</p> */}
        </div>
        <div className="card-action">
          <Link style={{margin:'auto'}} to={`/restaurants/${_id}`}>Order Now</Link>
        </div>
      </div>
    </div>
  );
}

RestaurantCard.propTypes = { rest: PropTypes.any };
