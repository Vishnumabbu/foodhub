import * as PropTypes from "prop-types";
import React from "react";


export function OrderCard(props) {
  const { description, _restaurant, status, total_amount } = props.order;
  // const { description, _restaurant, status, total_amount } = props.rest;

  // const history = useHistory();

  return (
    <div className="col s4 m4">
      <div className="card indigo darken-2">
        <div className="card-content white-text">
        
            {_restaurant && <span className="card-title"><h3>{_restaurant.name}</h3></span>}
          
          <p className="card-title">{description}</p>
        </div>
        {/* <div className="card-panel teal lighten-2">
          {[
            "placed",
            "cancelled",
            "processing",
            "in_route",
            "delivered",
            "received"
          ].map(stat => (
            <div
              style={{
                cursor: "pointer",
                color: status === stat ? "green" : "unset",
                fontWeight: status === stat ? 800 : "unset"
              }}
              className="chip"
              onClick={() => props.onStatusChange(stat)}
            >
              {stat}
            </div>
          ))}
          
        </div> */}
        <div style={{ color:'white', fontWeight: 1400 }}>Total amt: {total_amount}</div>
      </div>
    </div>
  );
}

OrderCard.propTypes = { order: PropTypes.any };
