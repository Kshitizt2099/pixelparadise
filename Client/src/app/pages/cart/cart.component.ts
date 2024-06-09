import { Component, OnInit } from '@angular/core';
import { GcomserviceService } from '../../services/gcomservice.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cart:any;
  total:any;
  constructor(private service:GcomserviceService,private route:Router)
  {

  }

  ngOnInit(): void {
      this.service.getCart(this.service.getUser()).subscribe((res)=>{
        this.cart=res;
        this.cart=(this.cart.cart);
        this.total=res;
        this.total=this.total.total;
        console.log(res)

      },(err)=>{
               console.log(err.message);
      })
  }

  checkout()
  {
    this.route.navigate(["/checkout/"+this.total])
  }

  inc(id:any)
  {
    // console.log(id,"inc");
    this.service.incqtycarrt(id,this.service.getUser()).subscribe((res)=>{
      this.cart=res;
        this.cart=(this.cart.cart);
        this.total=res;
        this.total=this.total.total;
      
    });
  }
  
  dec(id:any,qty:any)
  {
    if(qty>1)
      {
        this.service.decqtycarrt(id,this.service.getUser()).subscribe((res)=>{
          this.cart=res;
          this.cart=(this.cart.cart);
          this.total=res;
          this.total=this.total.total;
        });

      }
      else{
        this.service.deletecarrt(id,this.service.getUser()).subscribe((res)=>{
          this.cart=res;
          this.cart=(this.cart.cart);
          this.total=res;
          this.total=this.total.total;
          console.log(res);
        });

      }
   
  }

  delete(id:any)
  {
    this.service.deletecarrt(id,this.service.getUser()).subscribe((res)=>{
      this.cart=res;
      this.cart=(this.cart.cart);
      this.total=res;
      this.total=this.total.total;
    });
  }
}
