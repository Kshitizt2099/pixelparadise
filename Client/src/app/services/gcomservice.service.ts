import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GcomserviceService {
   user:any;
  constructor(private http:HttpClient) { 
   

  }
  setUser(info:any)
  {
    
   
    localStorage.setItem("xyzr",info);
   
  }
  getUser()
  {
    return localStorage.getItem("xyzr");
  }

  login(name:string,id:string,email:string,password:string)
  {
    const data={
      name,id,email,password
    }
  
  return  this.http.post<any>("http://localhost:4500/login", data);
   
  }

  SignIn(name:string,id:string,email:string,password:string)
  {
    const data={
      name,id,email,password
    }
    console.log(data);
  return  this.http.post<any>("http://localhost:4500/signIn", data);
  }

  products(token:string):Observable<any>
  {
    
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.get("http://localhost:4500/products",{headers});
  }

  createProduct(video:File,poster:File,name:string,p_id:number,desc:string,creators:string,Awards:string,price:number,id:number)
  {

    const formData = new FormData();
    formData.append('id',id.toString());
    formData.append('title', name);
    formData.append('description', desc);
    formData.append('creators', creators);
    formData.append('poster', poster); // Ensure this matches the field name expected by multer in the backend
    formData.append('video', video);   // Ensure this matches the field name expected by multer in the backend
    formData.append('Awards', Awards);
    formData.append('price', price.toString());
    return this.http.post<any>("http://localhost:4500/createproduct", formData);
  }

  getproducts()
  {
    return this.http.get("http://localhost:4500/getProducts");
  }

  getproduct(id:any)
  {
    return this.http.get("http://localhost:4500/details/"+id);
  }

  putincart(data:any)
  {
    return this.http.post("http://localhost:4500/incart",data);
  }

  getCart(user_id:any)
  {
    return this.http.get("http://localhost:4500/getcart/"+user_id);
  }
  incqtycarrt(id:any,user_id:any)
  {
    return this.http.get("http://localhost:4500/pluscart/"+id+"/"+user_id);
  }
  decqtycarrt(id:any,user_id:any)
  {
    return this.http.get("http://localhost:4500/minuscart/"+id+"/"+user_id);
  }

  deletecarrt(id:any,user_id:any)
  {
    return this.http.get("http://localhost:4500/deletecart/"+id+"/"+user_id);
  }
}
