import React, { Component } from "react";
import axios from "axios";

import { Loader } from "../Loader";
import { OrderCard } from "./OrderCard";
import { cloneDeep } from "lodash";

import Paypal from '../Paypal';


class Orders extends Component {
  state = { orders: [], loading: false };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const response = await axios("/api/orders");
      this.setState({ orders: response.data, loading: false,total:0 },()=>this.total());
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  }

  onOrderStatusChange = async (orderId, status, index) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status });
      const orders = cloneDeep(this.state.orders);
      orders[index].status = status;
      this.setState({ orders });
    } catch (e) {
      console.error(e);
    }
  };

  total(){
    let tot = 0;
    this.state.orders.map(rest=>{
      tot += rest.total_amount;
    })
    this.setState({...this.state,total:tot});
  }

  render() {
    const { loading, orders } = this.state;

    if (orders.length === 0 && !loading)
      return <div className="center">No Orders Found.</div>;

    return (
      <div className="container" style={{ width: "100%" }}>
        <div className="row">
          <div className="landing-copy col s12 center-align">
            {loading ? (
              <Loader />
            ) : (
              <div className="row">
                {orders.map((rest, index) => (
                  <OrderCard
                    key={rest._id}
                    order={rest}
                    onStatusChange={status =>
                      this.onOrderStatusChange(rest._id, status, index)
                    }
                  />
                ))}
              </div>
            )}
          </div>
          {/* <div>
            <Paypal style={{width:'100%',margin:'auto'}}/>
          </div> */}
           <div class="row">
            <div class="col s5"></div>
            <div class="col s4">
              {/* <button className="btn btn-large waves-effect waves-light hoverable blue accent-3" style={{padding:''}} onClick={()=>{this.total()}}>Total Amount</button> */}
            <div style={{margin:'auto',width:"100%"}}>`Total Amount : `${this.state.total}</div>
            </div>
            <div class="col s4"></div>
          </div>
      
          <div class="row">
            <div class="col s5"></div>
            <div class="col s4"><Paypal total={this.state.total} style={{width:'100%',margin:'auto'}}/></div>
            <div class="col s4"></div>
        </div>
        </div>
      </div>
    );
  }
}

export default Orders;
