import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

   total:any;
   constructor(private route:ActivatedRoute,private router:Router)
   {
 
   }

   ngOnInit(): void {
      this.total=this.route.snapshot.paramMap.get("total");
   }

   checkout()
   {
      this.router.navigate(["/products"]);
   }
}
