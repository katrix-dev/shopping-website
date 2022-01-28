import React,{useState, useEffect} from 'react';
import axios from 'axios';
const Manageproduct = () =>{
    const [product, setProduct] = useState([]);

  const getData = () => {
    axios.get("http://localhost:1234/product").then((response) => {
      setProduct(response.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const[pname, pickName] = useState("");
  const[pprice, pickPrice] = useState("");
  const[pphoto, pickPhoto] = useState("");
  const[pdetails, pickDetails] = useState("");
  const[msg, updateMessage] = useState("");

  const save = () =>{
      var url = "http://localhost:1234/product";
      var data = {"name":pname, "price":pprice, "photo":pphoto, "details":pdetails};
      axios.post(url, data).then(response=>{
        updateMessage(pname + " upload successfully!");
        pickName("");
        pickPrice("");
        pickPhoto("");
        pickDetails("");
        getData();
      })
      
  }

  const delprod=(id)=>{
    axios.delete("http://localhost:1234/product/"+id)
    .then(response=>{
        updateMessage("Item Deleted!");
        getData();
    }) 
  }


    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col lg-12 text-center">
                    <h3 className='text-primary'> Manage Product </h3>
                    <p className='text-danger'>{msg}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <h5>New Product</h5>
                    <div className="p-4">
                        <div className="mb-3">
                            <label>Product Name</label>
                            <input type="text" className='form-control' onChange={obj=>pickName(obj.target.value)} value={pname} />
                        </div>
                        <div className="mb-3">
                            <label>Product Price</label>
                            <input type="text" className='form-control' onChange={obj=>pickPrice(obj.target.value)} value={pprice} />
                        </div>
                        <div className="mb-3">
                            <label>Product Image</label>
                            <input type="text" className='form-control' onChange={obj=>pickPhoto(obj.target.value)} value={pphoto} />
                        </div>
                        <div className="mb-3">
                            <label>Product Details</label>
                            <textarea className='form-control' onChange={obj=>pickDetails(obj.target.value)} value={pdetails}></textarea>
                        </div>
                        <div className="text-center">
                            <button className='btn btn-primary' onClick={save}>Save Product</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <h5>Product List</h5>
            <table className="table table-bordered">
                <thead>
                    <tr className="bg-light text-primary">
                        <th>Product Id</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Item Details</th>
                        <th>Images</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {product.map((product, index) => {
                    return (
                    <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.details}</td>
                        <td>
                        <img src={product.photo} height="30" width="40" alt="" />
                        </td>
                        <td><button className='btn btn-danger btn-sm' onClick={delprod.bind(this, product.id)}><i className='fa fa-trash'></i></button></td>

                    </tr>
                    );
                })}
                </tbody>
                </table>
                </div>
            </div>
        </div>
    )

}
export default Manageproduct;