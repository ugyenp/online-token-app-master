import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpModel } from '../model/otp-model';
import { Tokendetails } from '../model/tokendetails';
import { UpdateTokenSequenc } from '../model/update-token-sequenc';
import { ApiServicesService } from '../services/api-services.service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-token-service',
  templateUrl: './token-service.component.html',
  styleUrls: ['./token-service.component.scss']
})
export class TokenServiceComponent implements OnInit {
  /*
  * Author: Ugyen Penjor
  * Designation: Software Engineer
  * Project: Online token APP
  * NGN Technologies Pvt Ltd @ 2020
  */

  cidNumber: string;
  cidForm: boolean = false;
  vehicleNoForm: boolean = false;
  drivingLicenseNumberForm: boolean = false;
  learnerLicenseNumberForm: boolean = false;
  searchBy: any;
  allDetailsResponse: any;
  allDetailsResponseVehicle: any;
  allDetailsResponseDrivingLicense: any;
  showServices: boolean = false;
  showServicesVehicle:boolean = false;
  showServicesDrivingLicense: boolean = false;
  otpVerifiedAlert: boolean = false;
  counter: number;
  selected: any;
  customerName: string;

  closeResult: string;
  showModal: boolean;
  content: string;
  title: string;
  showOtpFailed: boolean = false;
  showDiv: boolean = false;
  searchByTitle: any;
  showCidForm: boolean = false;
  otpModel: OtpModel;
  otpNumber: number;
  mobileNumber: string;
  verifiedDate: Date;
  id: number;
  rstaRegionMaster: string;
  tokenDetails: boolean = false;
  serviceDetails: boolean = true;
  regionId: number;
  responseregion: string;
  tokenDate: string;
  tokenDateFromRes: any;
  transactionId: number;
  TimesDisplay: Array<string>;
  slot: number;
  tokenId: number;
  appointmentTime: string;
  appointmentTimeFrom: any;
  appointmentTimeTo: any;
  tokenNumber: number;
  ServiceName: string;
  serviceId: number;
  counter_details:any;
  tokenServedResponse:any;
  tokenDetailModel: Tokendetails;
  
  lastSequence: number;
  tokenSequenceModel: UpdateTokenSequenc;
  errorMsg: string;
  successMsg:string;
  invalidMsg: boolean = false;
  invalidMsgLVD: boolean = false;
  search: any;
  alert_modal: any;
  token_details_card:boolean = false;
  counter_api_response:any;
  user_id:number;
  counter_number:number;
  vf_initial:string;
  vm_initial:string;
  vl_initial:string;
  vehicleNumber:string;
  v_number:string;
  dl_initial: string;
  dl_number: string;
  drivingLicenseNumber: string;

  customerid = [];
  identityNo = [];
  identityType = [];
  expiryDate = [];
  service = [];
  serviceResponse:any;

  vehicle_type_id: string;
  vehicleTypeResponse: any;
  
  counterPerson:string;

  constructor(private modalService: NgbModal, private apiservice: ApiServicesService) {
    this.otpModel = new OtpModel();
    this.tokenDetailModel = new Tokendetails();
    this.tokenSequenceModel = new UpdateTokenSequenc();
  }

  ngOnInit() {
    this.rstaRegion();
    this.serviceList();
  }

  
  @ViewChild('pdfTable',{static: false}) pdfTable: ElementRef;
  public downloadAsPDF() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
   
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    
  }

  serviceList(){
    this.apiservice.serviceList().subscribe(response => {
      this.serviceResponse = response;
      console.log(this.serviceResponse);
    });
  }
  
  cancealCurrentPage() {
    this.token_details_card = false;
    this.showServices = false;
    //this.cidNumber = "";
  }

  getDetailsBy(searchBy) {
    if (searchBy === "1") {
      this.cidForm = true;
      this.vehicleNoForm = false;
      this.drivingLicenseNumberForm = false;
      this.learnerLicenseNumberForm = false;
    } else if (searchBy === "2") {
      this.cidForm = false;
      this.vehicleNoForm = true;
      this.drivingLicenseNumberForm = false;
      this.learnerLicenseNumberForm = false;
      this.getVehicleType();
    }
    else if (searchBy === "3") {
      this.cidForm = false;
      this.vehicleNoForm = false;
      this.drivingLicenseNumberForm = true;
      this.learnerLicenseNumberForm = false;
    }
    else if (searchBy === "4") {
      this.cidForm = false;
      this.vehicleNoForm = false;
      this.drivingLicenseNumberForm = false;
      this.learnerLicenseNumberForm = true;
    }
    else { return null; }
  }

  getAllDetailsByCidNumber() {
    this.showServices = true;
    this.apiservice.getAllDetailsByCidNumber(this.cidNumber).subscribe(response => {
      this.allDetailsResponse = response;
      // console.log(ser);
      // for (var i = 0; i < response.length; i++) {
      //   debugger;
      //   if (response[i].serviceType === "Vehicle") {
      //     this.renewal_service = true;
      //     this.replcaement_service = true;
      //     this.ownership_service = true;
      //     this.transfer_service = true;
      //     this.offence_service = true;
      //     this.fitness_service = true;
      //   }
      //   if (response[i+1].serviceType === "Driving License") {
      //     this.renewal_service = true;
      //     this.replcaement_service = true;
      //     this.ownership_service = false;
      //     this.transfer_service = false;
      //     this.offence_service = false;
      //     this.fitness_service = false;
      //   }
      //   break;
      //  }
      this.token_details_card = true;
    });
  } 

  getAllDetailsByVehicleNumber(){
    this.showServicesVehicle = true;
    this.vehicleNumber = this.vf_initial + "-" + this.vm_initial + "-" + this.vl_initial + this.v_number;
    this.apiservice.getAllDetailsByVehicleNumber(this.vehicleNumber,this.vehicle_type_id).subscribe(response => {
      this.allDetailsResponseVehicle = response;
      this.token_details_card = true;
    });
  }

  getAllDetailsByDrivingLicenseNumber(){
    this.showServicesDrivingLicense = true;
    this.drivingLicenseNumber = this.dl_initial + "-" + this.dl_number;
    this.apiservice.getAllDetailsByDrivingLicenseNumber(this.drivingLicenseNumber).subscribe(response => {
      this.allDetailsResponseDrivingLicense = response;
      this.token_details_card = true;
    });
  }

  rstaRegion() {
    this.apiservice.getRstaRegion().subscribe(response => {
      this.rstaRegionMaster = response;
    });
  }

  getTokenDetails(regionId) {
    this.apiservice.getTokenDetailsByJurisId(regionId).subscribe(response => {
      this.responseregion = response;
    });
    this.apiservice.getCounterDetails(regionId).subscribe(counterResponse => {
      this.counter_api_response = counterResponse;
    });
  }

  getVehicleType(){
    this.apiservice.getAllVehicleType().subscribe(response => {
      this.vehicleTypeResponse = response;
    });
  }

  getCounterDetails(counter_details){
    if(counter_details !== undefined){
      let str1 = counter_details.split(" - ");
      this.user_id = str1[0];
      this.counter_number = str1[1];
    }
  }

  getTokenTime(tokenDate) {
    this.apiservice.getTokenDetailsByDate(tokenDate).subscribe(response => {
      this.slot = response.time_slot;
      this.tokenId = response.id;
      var times = [];
      //var start_break_time = response.start_break_time;
      // var end_break_time = response.end_break_time;
      var start_time = parseInt(response.start_time) * 60;
      var end_time = parseInt(response.end_time) * 60;
      var start_time_to = ((parseInt(response.start_time) * 60) + this.slot);
      var ap = ['AM', 'PM'];
      for (var i = 0; start_time <= end_time - this.slot; i++) {
        var hh = Math.floor(start_time / 60);
        var hh1 = Math.floor(start_time_to / 60);
        var mm = (start_time % 60);
        var mm1 = (start_time_to % 60);
        times[i] = ("0" + (hh)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)] + " to " + ("0" + (hh1)).slice(-2) + ':' + ("0" + mm1).slice(-2) + ap[Math.floor(hh / 12)];
        start_time = start_time + this.slot;
        start_time_to = start_time_to + this.slot;
      }
      this.TimesDisplay = times;
    });
  }

  appointmentTimeSplit(appointmentTime) {
    let str1 = appointmentTime.split(" to ");
    this.appointmentTimeFrom = str1[0].slice(0, 5);
    this.appointmentTimeTo = str1[1].slice(0, 5);
    console.log(this.appointmentTimeFrom.slice(0, 5) + "++" + this.appointmentTimeTo.slice(0, 5));
  }

  openAlert(alert_modal) {
    this.modalService.open(alert_modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    if (this.regionId !== undefined && this.tokenDate !== undefined && this.appointmentTime !== undefined && this.mobileNumber !== undefined) {
      this.generateOtp();
      this.timeCountDown();
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.errorMsg = "Please select the required option";
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  timeCountDown() {
    this.counter = 80;
    const interval = setInterval(() => {
      this.counter--;
      if (this.counter < 0) {
        this.modalService.dismissAll();
        clearInterval(interval);
      }
    }, 1000);
  }

  generateOtp() {
    this.apiservice.getOtpNumber().subscribe((response) => {
      debugger;
      this.otpNumber = parseInt(response);
      this.otpModel.otp_number = this.otpNumber;
      this.otpModel.cid_number = this.cidNumber;
      this.otpModel.phone_number = this.mobileNumber;
      if (this.mobileNumber != "") {
        this.apiservice.saveOtp(this.otpModel).subscribe((response) => {
          console.log("successfully updated");
        });
      } else { console.log("update failed"); }
    });
  }

  saveTokenDetails() {
    let postTokenData: any = [];
    this.apiservice.getmaxToken(this.tokenId, this.appointmentTimeFrom, this.appointmentTimeTo).subscribe(response => {
      for (var i = 0; i < response.length; i++) {
        if (response[i] === null || response[i] === 0) {
          this.tokenNumber = 1;
          break;
        } else {
          this.tokenNumber = parseInt(response[0]) + 1;
          break;
        }
      }
      debugger;
      if(this.searchBy === "1"){
        var res = this.allDetailsResponse;
      } else if(this.searchBy === "2"){
        var res = this.allDetailsResponseVehicle;
      } else if(this.searchBy === "3"){
        var res = this.allDetailsResponseDrivingLicense;
      }
      for (var i = 0; i < res.length; i++) {
        const token = new Tokendetails();
        token.customer_id = res[i].Customer_Id;
        token.identity_number = res[i].identityNo;
        token.first_name = res[i].First_Name;
        token.middle_name = res[i].Middle_Name;
        token.last_name = res[i].Last_Name;
        token.identity_type = res[i].identityType;
        token.service_type = res[i].serviceType;
        token.service = this.service[i];
        token.token_id = this.tokenId;
        token.appointment_time_from = this.appointmentTimeFrom;
        token.appointment_time_to = this.appointmentTimeTo;
        token.mobile_number = this.mobileNumber;
        token.token_no = this.tokenNumber;
        token.user_id = this.user_id;
        token.cid_passport_no = this.cidNumber;
        postTokenData.push(token);

      }
      console.log(postTokenData);
      this.apiservice.saveTokenDetails(postTokenData).subscribe(data => {
        this.errorMsg = "";
        this.errorMsg = "";
        this.successMsg = "Your Token Successfully generated";
        this.tokenNumber;
        this.counter_number;
        this.counterPerson;
      });
    });
  }

  verifyOtp(otp) {
    this.apiservice.getOtpNumberFromDb().subscribe((response) => {
      for (let i = 0; i < response.length; i++) {
        if (otp == response[i].otp_number && this.mobileNumber == response[i].phone_number) {
          this.errorMsg = "";
          this.id = response[i].id;
          this.apiservice.updateverifiedtime(this.id).subscribe((response) => {
            console.log("successfully verified");
          });
          this.saveTokenDetails();
          this.modalService.dismissAll();
          this.otpVerifiedAlert = true;
        } else {
          this.errorMsg = "Invalid OTP. Please enter valid OTP";
        }
      }
    });
    this.cancealCurrentPage()
  }

}
