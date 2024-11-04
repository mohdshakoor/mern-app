import React from "react";
import { useState } from "react";

const Create = () => {
 const [name,setname] = useState("");
 const [email,setemail] = useState("");
 const [age,setage] = useState(0);

 const handleSubmit = async(e) =>{
  e.preventDefault();
  const adduser = {name,email,age};

  const response =await fetch("http://localhost:4000",{
    method:"POST",
    body:JSON.stringify(adduser),
    headers:{
      "Content-Type":"application/json",
    },
  })

const result = await response.json();

if(!response.ok){
  console.log(result.error);
}
if(response.ok){
  console.log(result)
}

 };
  return (
    <div className="container my-2">
      <h2 className="text-center">Enter the data</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e)=>setname(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(e)=> setemail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control"  value={age} onChange={(e)=>setage(e.target.value)}/>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
