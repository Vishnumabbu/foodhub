import React, { useState,useEffect } from "react";
import { Rate, Button,Image } from "antd";
import axios from 'axios';
import { useHistory,useParams } from "react-router";


const Rating = (props) => {

  const [num, setNum] = useState(0);
  const history = useHistory();
  const id = useParams();
  const [ image,setImage ] = useState([]);

  useEffect(()=>{
    axios.post("/api/restaurants/image",id).then(res=>{
        if(res.data.success){
            setImage(res.data.image);
        }
    }).catch(err=>alert(err));
  },[])

  const fun = () => {

    console.log(id);

    axios.post("/api/restaurants/rating",{num,id}).then(res=>{
        if(res.data.success)
            history.push('/');
        else alert('Error',res.data.err);
    }).catch(err=>{
        alert('Error occured',err);
    })
  }

  return (
    <div style={{textAlign:'center',marginTop:'160px'}}>
        {/* <Image src={Image} /> */}
        {console.log(image)}
        {
            image && image.length != 0 && <Image src={`http://localhost:5000/${image[0]}`}/>
        }
      <Rate style={{width:'100%',marginBottom:'20px'}} onChange={(num) => setNum(num)} />
      {console.log(num)}
      <Button type="primary" onClick={()=>fun()}>Rate</Button>
    </div>
  );
};

export default Rating;
