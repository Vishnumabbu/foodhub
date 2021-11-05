import * as PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom"
import { Button } from 'antd';
import { Image } from 'antd';

export function RestaurantCard(props) {
  const { description, name, _id,image} = props.rest;
  return (
    <div className="col s4 m4">
      <div className="card indigo darken-3">
        <Image src={`http://localhost:5000/${image[0]}`}/>
        <div className="card-content white-text">
          <span style={{fontSize:40}} className="card-title">{name}</span>
          <p>{description}</p>
          {/* <p>Vishnu</p> */}
        </div>
        <div className="card-action">
          <Link style={{margin:'auto'}} to={`/restaurants/${_id}`}>Order Now</Link>
          <Link style={{margin:'auto',marginLeft:'40px'}} to={`/dine/${_id}`}>DineIn</Link>
          <Link style={{margin:'auto',marginLeft:'40px'}} to={`/rate/${_id}`}>Rate It</Link>
          {/* <Button type="danger">DineIn</Button> */}
          {/* <a style={{marginLeft:'20px',width:'125px'}} class="waves-effect waves-light btn">DineIn</a> */}
        </div>
      </div>
    </div>
  );
}

RestaurantCard.propTypes = { rest: PropTypes.any };
