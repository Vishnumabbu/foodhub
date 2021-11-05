import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Loader } from "../Loader";
import { pick } from "lodash";
import { MealRow } from "../meals/MealRow";
import { RestaurantDetails } from "./RestaurantDetails";
import { MealTable } from "../meals/MealTable";
import { Upload, message, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import { PlusOutlined ,UploadOutlined } from '@ant-design/icons';
import { Image } from 'antd';

class CreateRestaurant extends Component {
  state = { userInfo: {}, _meals: [{ name: "", price: 0, description: ""}],image:[]};

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await axios("/api/users");
    this.setState({ userInfo: response.data, loading: false });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onAdd = () => {
    const { _meals } = this.state;
    this.setState({
      _meals: [..._meals, { name: "", price: 0, description: "" }]
    });
  };

  onDelete = index => {
    const { _meals } = this.state;
    this.setState({
      _meals: [..._meals.slice(0, index), ..._meals.slice(index + 1)]
    });
  };

  onRowDataChange = (e, field, index) => {
    const meals = [...this.state._meals];
    this.setState({
      _meals: [
        ...meals.slice(0, index),
        { ...meals[index], [field]: e.target.value },
        ...meals.slice(index + 1)
      ]
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    console.log(this.state);
    try {
      await axios.post(
        "/api/restaurants",
        pick(this.state, ["name", "type", "description","image","_meals"])
      );
      alert(`Restaurant ${this.state.name} successfully created.`);
      this.props.history.push("/restaurants");
    } catch (e) {
      this.setState({ loading: false });
      alert("Restaurant creation failed");
    }
  };

  onDrop(files){

    const formData = new FormData();
    // console.log("came")
    
    console.log(files[0]);

    const config = {
        header:{'content-type':'multipart/form-data'}
    }
    formData.append("file",files[0]);

    var fileExt = files[0].name.split('.').pop();
    // console.log(fileExt);

    if(fileExt!='jpg' && fileExt!='png' && fileExt!='jpeg'){
        return (alert('Only jpg and png files are allowed'));
    }

    // console.log(formData.file);

    axios.post('/api/restaurants/upload',formData,config).then(res=>{
        if(res.data.success){
          alert('Uploaded');
          // this.setState({...this.state,_meals:[...this.state._meals,image:res.data.image]})
          console.log(res.data.image);
          // const { _meals } = this.state;

          // this.setState({
          //   _meals: [..._meals, { image:[res.data.image] }]
          // });
          this.setState({...this.state,image:[res.data.image]});
            // setImages([...Images, res.data.image]);
            // props.update([[...Images, res.data.image]]);
        }
        else{
                alert('Failed to save the Image in Server')
        }
    })
}

  render() {
    const { name, type, description, userInfo, _meals, loading } = this.state;
    if (loading) return <Loader />;
    if (userInfo.role !== "manager") return "You are not authorized.";
    return (
      <div className="container">
        <div className="row">
          <form noValidate onSubmit={this.onSubmit}>
            <RestaurantDetails
              onChange={this.onChange}
              name={name}
              type={type}
              description={description}
            />
            <div style={{width:'100%',margin:'auto',textAlign:'center'}}>
              Upload the Image
            </div>
               <Dropzone
                onDrop={(e)=>this.onDrop(e)}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid black',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',margin:"auto"
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <PlusOutlined style={{color:'black'}}></PlusOutlined>

                    </div>
                )}
            </Dropzone>
            {
              this.state.image.length !== 0 && 
              <div style={{textAlign:'center',marginTop:'20px'}} >
                <Image src={`http://localhost:5000/${this.state.image}`} />
              </div>
               
            }
           
            <h3>Meals</h3>
            <MealTable
              meals={_meals}
              render={(meal, index) => {
                const { price, description: mealDesc, name: mealName } = meal;
                return (
                  <MealRow
                    key={index}
                    onNameChange={e => this.onRowDataChange(e, "name", index)}
                    name={mealName}
                    onPriceChange={e => this.onRowDataChange(e, "price", index)}
                    price={price}
                    onDescriptionChange={e =>
                      this.onRowDataChange(e, "description", index)
                    }
                    description={mealDesc}
                    meals={_meals}
                    onDelete={() => this.onDelete(index)}
                  />
                );
              }}
            />
            <a
              onClick={this.onAdd}
              className="btn-floating btn-large waves-effect waves-light red"
            >
              <i className="material-icons">add</i>
            </a>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Create Restaurant
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CreateRestaurant);
