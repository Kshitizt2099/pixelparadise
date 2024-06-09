import { Component } from '@angular/core';
import { GcomserviceService } from '../../services/gcomservice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uploadform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './uploadform.component.html',
  styleUrl: './uploadform.component.css'
})
export class UploadformComponent {
  title: string='';
  description: string='';
  price: number=0;
  creators: string='';
  poster!: File;
  video!: File;
  Awards: string='';
  id:number=0;

  constructor(private services:GcomserviceService)
  {

  }
  uploadvideo(event:any)
  {
    
    this.video=event.target.files[0];
  }
  uploadposter(event:any)
  {
    this.poster=event.target.files[0];
  }
  onSubmit()
  {
    this.services.createProduct(this.video,this.poster,this.title,1,this.description,this.creators,this.Awards,this.price,this.id).subscribe((res)=>{
      console.log(res);
    },(err)=>{
       console.log("error aa gaya",err);
    });
  }
}
