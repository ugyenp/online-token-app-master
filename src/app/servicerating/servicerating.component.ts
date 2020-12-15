import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicerating',
  templateUrl: './servicerating.component.html',
  styleUrls: ['./servicerating.component.scss']
})
export class ServiceratingComponent implements OnInit {

  currentRate = 0;

  showRatingForm:boolean = true;
  showRatingSuccessful:boolean=false;
  official_name = "Pramod Nepal";
  date_served = "2020/11/24";
  time_served = "10:30 AM - 10:15AM";
  remarks:string;

  constructor() { }


  ngOnInit() {
   
  }
  sendRating(){
    console.log("Remarks:", this.remarks)
    console.log("Rating:", this.currentRate)
    this.showRatingForm = false;
    this.showRatingSuccessful = true;
  }

}
