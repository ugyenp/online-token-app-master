import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiServicesService } from '../services/api-services.service';
import { OtpModel } from '../model/otp-model';
import { Tokendetails } from '../model/tokendetails';
import { UpdateTokenSequenc } from '../model/update-token-sequenc';
import { NotificationService } from '../services/notification.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.scss', './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  /*
   * Author: Ugyen Penjor
   * Designation: Software Engineer
   * Project: Online token APP
   * NGN Technologies Pvt Ltd @ 2020
   */

  otpVerifiedAlert: boolean = false;
  counter: number;
  selected: any;
  customerName: string;
  expirydate: string;
  closeResult: string;
  showModal: boolean;
  content: string;
  title: string;
  showOtpFailed: boolean = false;
  showDiv: boolean = false;
  searchByTitle: any;
  showCidForm: boolean = false;
  transactionName: string;
  otpModel: OtpModel;
  identityNumber: string;
  otpNumber: number;
  cidNumber: string;
  mobileNumber: string;
  verifiedDate: Date;
  id: number;
  rstaRegionMaster: string;
  tokenDetails: boolean = false;
  serviceDetails: boolean = true;
  serviceName: string;
  TransactionName: string;
  regionId: number;
  responseregion: string;
  tokenDate: string;
  transactionId: number;
  TimesDisplay: Array<string>;
  slot: number;
  tokenId: number;
  appointmentTime: string;
  appointmentTimeFrom: any;
  appointmentTimeTo: any;
  tokenNumber: number;
  ServiceName: string;
  serviceId: number
  customerId: string;
  tokenDetailModel: Tokendetails
  lastSequence: number;
  tokenSequenceModel: UpdateTokenSequenc;
  errorMsg: string;
  invalidMsg: boolean = false;
  invalidMsgLVD: boolean = false;
  search: any;
  alert_modal:any;
  dlForm:boolean = false;
  llForm:boolean = false;
  vForm:boolean = false;
  anotherServiceOption:boolean = false;
  availAnotherService:boolean = false;

  constructor(private modalService: NgbModal, private apiService: ApiServicesService) {
    this.otpModel = new OtpModel();
    this.tokenDetailModel = new Tokendetails();
    this.tokenSequenceModel = new UpdateTokenSequenc();
  }

  ngOnInit() {
    this.getAllTransction();
  }

  getAllTransction() {
    this.apiService.getTransactionList().subscribe(response => {
      this.transactionName = response;
    });
  }

  rstaRegion() {
    this.apiService.getRstaRegion().subscribe(response => {
      this.rstaRegionMaster = response;
    });
  }

  getTokenDetails(regionId) {
    this.apiService.getTokenDetailsByJurisId(regionId).subscribe(response => {
      this.responseregion = response;
    });
  }

  showSevicesBasedOnId(transactionId) {
    this.apiService.getServiceListBasedOnTransaction(transactionId).subscribe(response => {
      this.serviceName = response.serviceJoin;
      this.TransactionName = response.transaction_type;
      console.log(this.TransactionName);
    });
  }

  selectedServices(serviceId) {
    this.apiService.getServicesByServiceId(serviceId).subscribe(response => {
      this.ServiceName = response.services_type;
      console.log(this.ServiceName);
    });
    this.showSearchTitle();
  }

  showSearchTitle(){
    if(this.transactionId == 3){
      this.searchByTitle = "Vehicle Number"
    } else if(this.transactionId == 2){
      this.searchByTitle = "Learner License Number"
    } else if(this.transactionId == 1){
      this.searchByTitle = "Driving License Number"
    }
  }

  showServiceSearchForm(search) {
    if (search === "1") {
      this.showCidForm = true;
    } if(search === "2" && this.transactionId == 1){
      this.dlForm = true;
      this.showCidForm = false;
    }
  }

  getVehicleDetailsByCustomerId(customerId) {
    this.apiService.vehicleDetailsByCustomerId(customerId).subscribe(response => {
      console.log(response);
      this.expirydate = response[0].expiry_Date;
      this.identityNumber = response[0].vehicle_Reg_Dtls_Id;
      this.tokenDetails = true;
      this.serviceDetails = false;
      this.rstaRegion();
    });
  }

  getDrivingLicenseDetailsByCustomerId(customerId) {
    this.apiService.learrnerLicenseDtailsByCustomerId(customerId).subscribe(response => {
      this.expirydate = response[0].expiry_Date;
      this.identityNumber = response[0].learner_License_Info_Id;
      this.tokenDetails = true;
      this.serviceDetails = false;
      this.rstaRegion();
    });
  }

  getLearnerLicenseDetailsByCustomerId(customerId) {
    this.apiService.drvingLicenseDetailsByCustomerId(customerId).subscribe(response => {
      console.log(response);
      this.expirydate = response[0].expiry_Date;
      this.identityNumber = response[0].driving_License_Id;
      this.tokenDetails = true;
      this.serviceDetails = false;
      this.rstaRegion();
    });
  }

  // showAll_ItemDetailsByCidNumber() {
  //   this.apiService.searchDetailsByCidNumber(this.cidNumber).subscribe(response => {
  //     console.log(response);
  //     this.customerName = response.first_Name + " " + response.middle_Name + " " + response.last_Name;
  //     this.customerId = response.customer_Id;
  //     console.log("customerid", this.customerId)
  //     if (this.transactionId == 3) {
  //       this.getVehicleDetailsByCustomerId(this.customerId);
  //     } else if (this.transactionId == 2) {
  //       this.getLearnerLicenseDetailsByCustomerId(this.customerId);
  //     } else if (this.transactionId == 1) {
  //       this.getLearnerLicenseDetailsByCustomerId(this.customerId);
  //     }
  //   });
  // }

  saveTokenDetails() {
    this.apiService.getmaxToken(this.tokenId, this.appointmentTimeFrom, this.appointmentTimeTo).subscribe(response => {
      for (var i = 0; i < response.length; i++) {
        if (response[i] === null) {
          this.tokenNumber = 1;
          break;
        } else {
          this.tokenNumber = parseInt(response[0]) + 1;
          break;
        }
      }
      // this.tokenDetailModel.token_no = this.tokenNumber;
      // this.tokenDetailModel.appointment_time_from = this.appointmentTimeFrom.slice(0, 5);
      // this.tokenDetailModel.appointment_time_to = this.appointmentTimeTo.slice(0, 5);
      // this.tokenDetailModel.transaction_type = this.TransactionName;
      // this.tokenDetailModel.service_type = this.ServiceName;
      // this.tokenDetailModel.customer_id = this.customerId;
      // this.tokenDetailModel.identity_number = this.identityNumber;
       this.tokenDetailModel.token_id = this.tokenId;
      // this.apiService.saveTokenDetails(this.tokenDetailModel).subscribe(response => {
      //   console.log("saved successfully");
      // });
    });
  }


  generateOtp() {
    this.apiService.getOtpNumber().subscribe((response) => {
      this.otpNumber = response;
      this.otpModel.otp_number = this.otpNumber;
      this.otpModel.cid_number = this.cidNumber;
      this.otpModel.phone_number = this.mobileNumber;
      if (this.mobileNumber != "") {
        this.apiService.saveOtp(this.otpModel).subscribe((response) => {
          console.log("successfully updated");
        });
      } else { console.log("update failed"); }
    });
  }

  cancealCurrentPage() {
    window.location.reload(true);
  }

  openAlert(alert_modal) {
    this.modalService.open(alert_modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.generateOtp();
    this.timeCountDown();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  getTokenTime(tokenDate) {
    this.apiService.getTokenDetailsByDate(tokenDate).subscribe(response => {
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
    this.appointmentTimeFrom = str1[0];
    this.appointmentTimeTo = str1[1];
    console.log(this.appointmentTimeFrom.slice(0, 5) + "++" + this.appointmentTimeTo.slice(0, 5));
  }

  verifyOtp(otp) {
    this.saveTokenDetails();
    this.apiService.getOtpNumberFromDb().subscribe((response) => {
      for (let i = 0; i < response.length; i++) {
        if (otp == response[i].otp_number && this.mobileNumber == response[i].phone_number) {
          this.id = response[i].id;
          this.apiService.updateverifiedtime(this.id).subscribe((response) => {
            console.log("successfully verified");
          });
          this.showOtpFailed = false;
          this.modalService.dismissAll();
          this.tokenDetails = false;
          this.cidNumber = "";
          this.otpVerifiedAlert = true;
          this.serviceDetails = false;
          this.availAnotherService = true;
        } else {
          this.showOtpFailed = true;
        }
      }
    });
  }

  selectAnotherServiceYes(){
    this.anotherServiceOption = true;
  }

  selectAnotherServiceNo(){
    this.availAnotherService = false;
    this.anotherServiceOption = false;
  }

  // updateSearch(){
  //   console.log(this.ServiceName + " " + this.TransactionName);
  //     this.tokenDetailModel.token_no = this.tokenNumber;
  //     this.tokenDetailModel.appointment_time_from = this.appointmentTimeFrom.slice(0, 5);
  //     this.tokenDetailModel.appointment_time_to = this.appointmentTimeTo.slice(0, 5);
  //     this.tokenDetailModel.transaction_type = this.TransactionName;
  //     this.tokenDetailModel.service_type = this.ServiceName;
  //     this.tokenDetailModel.customer_id = this.customerId;
  //     this.tokenDetailModel.identity_number = this.identityNumber;
  //     this.tokenDetailModel.token_id = this.tokenId;
  //     this.apiService.saveTokenDetails(this.tokenDetailModel).subscribe(response => {
  //       console.log("saved successfully");
  //     });
  //     this.serviceDetails = true;
  //     this.availAnotherService = false;
  //     this.anotherServiceOption = false;
  // }

}
