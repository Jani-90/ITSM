import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TicketService } from '../services/ticket.service';
import { ticket, activityLog } from '../itsm';
import { AssetService } from '../services/asset.service';
import { JobService } from '../services/job.service';
import { ActivityLogService } from '../services/activityLog.service';


@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrls: ['./supervisor-dashboard.component.css']
})
export class SupervisorDashboardComponent implements OnInit {

  constructor(private tkt: TicketService,
    private ast: AssetService,
    private job: JobService,
    private act: ActivityLogService) { }


  submitCount: any = {};
  receiveCount: any = {};
  openCount: any = {};
  closeCount: any = {};
  asset: any = [];

  openTickets: ticket[];
  assetSerial: any = [];
  assetType:any = [];

  NICjobs: any = {};
  alog: any = {};
  currentUser:any = [];
  currentUserRole:any;
  currentUserEpf: any;
  dashboard_branch: boolean;
  dashboard_other: boolean;
  tickets: any = {};

  ngOnInit() {

    this.currentUser = sessionStorage.getItem('currentUser');
    var user = JSON.parse(this.currentUser);
    this.currentUserRole = user.user_role;
    this.currentUserEpf = user.employee_no;

    if(this.currentUserRole=='Branch User'){
      this.dashboard_branch = true;
      this.dashboard_other = false;



      this.tkt
      .getUserTicket(this.currentUserEpf)
      .subscribe((data: ticket[]) => {
        this.tickets = data;
  
    });
    
    }
    else if(this.currentUserRole=='Supervisor' || this.currentUserRole=='IT Officer' || this.currentUserRole=='Administrator'){
      this.dashboard_other = true;
      this.dashboard_branch = false;
    }
    else{
      this.dashboard_other = false;
      this.dashboard_branch = false;
    }




  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#292b2c';

  // Pie Chart Example
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["PC", "Printer", "Laptop", "Scanner", "Headset", "Other"],
      datasets: [{
        data: [2, 1, 3, 1, 1, 2],
        backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#C281D9', '#FF9933', '#38a745'],
      }],
    },
  });

  
  this.tkt.getSubmitCount().subscribe((data: ticket[]) => {
    this.submitCount = data;

    });

  
  this.tkt.getReceiveCount().subscribe((data: ticket[]) => {
    this.receiveCount = data;

    });

  this.tkt.getOpenCount().subscribe((data: ticket[]) => {
    this.openCount = data;

    });

  this.tkt.getCloseCount().subscribe((data: ticket[]) => {
    this.closeCount = data;

    });

  this.tkt.getOpenedTicket().subscribe((data: ticket[]) => {
    this.openTickets = data;

    for (var i=0; i<this.openTickets.length; i++) {
      var opened = this.openTickets[i];
      this.assetSerial[i] = opened.asset_serial;

      this.ast.showAsset(this.assetSerial[i]).subscribe(res => {
        console.log(res);
        this.asset[i] = res;
        var assetInfo = this.asset[i];
        console.log(assetInfo);
        this.assetType[i] = assetInfo.assetType;
        console.log(this.assetType[i]);
        //var emp = this.emp3[i];
        //console.log(emp);
        //this.empSender = emp.employee_name;
        //console.log(this.empSender);

    
      });

    


  }
});

this.job.getNotInCondition().subscribe((data: ticket[]) => {
  this.NICjobs = data;

  });


  this.act.getActivityLog().subscribe((data: activityLog[]) => {
    this.alog = data;
  
    });


  }


  createDate:any;
display(create_date){
  //alert(create_date);
  this.createDate = create_date.substring(0, 10);
  return this.createDate;
}

}



