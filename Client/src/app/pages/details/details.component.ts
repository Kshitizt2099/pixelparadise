import { Component, OnInit } from '@angular/core';
import { GcomserviceService } from '../../services/gcomservice.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  details:any={};
  
  constructor(private service:GcomserviceService,private route:ActivatedRoute)
  {

  }
  ngOnInit(): void {
    
    this.getDetails();
  


  }
  getDetails()
  {
    const id=this.route.snapshot.paramMap.get("id");
    this.service.getproduct(id).subscribe((res)=>{
      this.details=res;
      
    },(err)=>{
      console.log("error aa gaya");
      
    });
  }
  sendtocart(p_id:any,title:any,price:any)
  {
    const data={user_id:this.service.getUser(),p_id,title,price};
    this.service.putincart(data).subscribe((res)=>{
      console.log(res);
    });
  }

  

}
