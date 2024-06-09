import { CUSTOM_ELEMENTS_SCHEMA, Component, Directive } from '@angular/core';
import { GcomserviceService } from '../../services/gcomservice.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
@Directive({
  standalone: true,
  selector: '[dir]',
  host: {ngSkipHydration: 'true'},
})
class Dir {
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {

  name:string='';
  id:string='';
  email:string='';
  password:string='';
  display=["https://wallpapers.com/images/featured/games-z34ugdt7kl563g2f.jpg","https://wallpapercave.com/wp/xpt5VKe.jpg","https://gmedia.playstation.com/is/image/SIEPDC/RE4-remake-hero-desktop-02-en-09nov22?$2400px$","https://lumiere-a.akamaihd.net/v1/images/sw-jedi-survivor-key-art-1080x1080_c38222d5.jpeg?region=0%2C0%2C1080%2C1080"]
 constructor(private service:GcomserviceService,private route:Router)
  {

  }

  login(): void {
    console.log(this.name);
  
    this.service.login(this.name, this.id, this.email, this.password).subscribe(
      (res) => {
     
        this.service.setUser(res.id);
        localStorage.setItem("token", res.token);
        this.route.navigate(["/products"]);
      },
      (err) => {
        console.error('Login error:', err);
        if (err.error) {
          console.log('Error message:', err.error);
        } else {
          console.log('Unknown error occurred');
        }
      }
    );
  }



  
}
