import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GcomserviceService } from '../../services/gcomservice.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  name:string='';
  id:string='';
  email:string='';
  password:string='';
  cnpassword:string='';
  error:string='';
  constructor(private service:GcomserviceService)
  {

  }

  signIn()
  {
      if(this.cnpassword!=this.password)
        {
             this.error='passwords do not match'; 
             return;
        } 

        this.service.SignIn(this.name,this.id,this.email,this.password).subscribe((res)=>{
          console.log(res);
        });


        
  }

}
