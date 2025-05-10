import { Component } from '@angular/core';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent {
  isactive=true;
  items :string[]=['nour','asma',"maysa","amal"];
  isvisible= false;
  title="Welcome to product page";
  property:boolean=false;
  name="nour";
  imageUrl= '/assets/img/become-01.png'
onClick(){
    //alert('Button clicked!')
   this.isvisible=! this.isvisible;
}
buttonClass:string='classe1'
  toggleColor(){
    this.buttonClass=this.buttonClass==='classe1'?'classe2':'classe1';
  }
color:string []=['purple','blue','red','green','orange']
currentColor= this.color[0];
  colorIndex:number=0;
  changeColor(){
    this.colorIndex=(this.colorIndex+1)%this.color.length;
    this.currentColor=this.color[this.colorIndex]
  }
}
