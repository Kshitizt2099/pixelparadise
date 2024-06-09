import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private route:Router)
  {

  }
  logout()
  {
    console.log("in logout")      
    localStorage.removeItem("token");
    localStorage.removeItem("xyzr");
          this.route.navigate(["/"]);

  }

Home()
  {
    
          this.route.navigate(["/products"]);

  }

  cart()
  {
    this.route.navigate(["/Cart"])
  }
}
