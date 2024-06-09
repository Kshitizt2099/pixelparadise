import { Component, OnInit } from '@angular/core';
import { GcomserviceService } from '../../services/gcomservice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products:any[]=[];
  constructor(private service:GcomserviceService,private route:Router)
  {

  }
  getproducts()
  {
    let token=localStorage.getItem("token");
    if(token==null)
      {
        token="null";
      }
   
      this.service.products(token).subscribe((res)=>{
            this.products=res.products;
         },
         (error)=>
         {
          this.route.navigate(["/"]);
         }
      
      
      
      
      );
    
      
  }

 
   ngOnInit(): void {
     this.getproducts();
   }

   details(id:any)
   {
    this.route.navigate(["/details/"+id]);
   }
}
