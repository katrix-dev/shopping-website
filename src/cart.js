import React, {useState, useEffect} from "react";
import axios from "axios";

const Cart = () =>{
    const[cartitem, updateCart]=useState([]);
    const getCart = () =>{
        axios.get("http://localhost:1234/cart")
        .then(response=>{
            updateCart(response.data)
        })
    }

    useEffect(()=>{
        getCart();
    },[true]);

    const[msg, updateMsg]=useState("");
    const deleteItem = (id)=>{
        axios.delete("http://localhost:1234/cart/" +id)
        .then(response=>{
            updateMsg("Item deleted from cart");
            getCart();
        })
    }

    const[name, pickName] = useState("");
    const[mobile, pickMobile] = useState("");
    const[email, pickEmail] = useState("");
    const[address, pickAddress] = useState("");
    const save = () =>{
        var orderdata = {
            "customername":name,
            "mobile":mobile,
            "email":email,
            "address":address,
            "product":cartitem
        };
        axios.post("http://localhost:1234/order/", orderdata )
        .then(response=>{
            updateMsg("Your Order places successfully!");
        })
    }

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4">
                    <h4 className="text-center text-info">Customers Details</h4>
                    <div className="border rounded p-4">
                        <div className="mb-3">
                            <label>Customer Name</label>
                            <input type="text" onChange={obj=>pickName(obj.target.value)} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label>Phone No</label>
                            <input type="text" onChange={obj=>pickMobile(obj.target.value)} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input type="text" onChange={obj=>pickEmail(obj.target.value)} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label>Delivery Address</label>
                            <input type="text" onChange={obj=>pickAddress(obj.target.value)} className="form-control" />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success btn-lg" onClick={save}>Place Order</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <h4 className="text-center text-warning">Items in Cart : {cartitem.length}</h4>
                    <p className="text-center text-danger">{msg}</p>
                    <table className="table">
                        <thead>
                            <tr className="bg-light text-primary">
                                <th>Cart Id</th>
                                <th>Item Name</th>
                                <th>Item Price</th>
                                <th>Photos</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartitem.map((pro, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{pro.id}</td>
                                            <td>{pro.name}</td>
                                            <td>{pro.price}</td>
                                            <td><img src={pro.photo} height="50" width= "70" alt=""/></td>
                                            <td>
                                                <button onClick={deleteItem.bind(this, pro.id)} className="btn btn-danger btn-m">
                                                    <i className="fa fa-trash"></i>

                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Cart;