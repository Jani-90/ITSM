import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private job: JobService,
    private tic: TicketService) { }

    JobList: any =[];
    JobListTop: any = {};
    jobStatus: boolean;
    ticketDetail: any = [];


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.job.viewJobList(params['id']).subscribe(res => {
        this.JobList = res;
        console.log(this.JobList);




    });
  });

  this.route.params.subscribe(params => {
    this.job.viewJobListTop(params['id']).subscribe(res => {
      this.JobListTop = res;
      console.log(this.JobListTop);
      var status = this.JobListTop.job_status;
      var ticket = this.JobListTop.ticket_no;
      console.log(status);
      
      if(status=='Close_Job'){
        this.jobStatus = true;
      }
      else{
        this.jobStatus = false;
      }

      this.route.params.subscribe(params => {
        this.tic.getTicketDetails(ticket).subscribe(res => {
          this.ticketDetail = res;
          console.log(this.ticketDetail);
          
  
      });
    });

      


  });
});



  }

  createDate:any;
  display(create_date){
    //alert(create_date);
    this.createDate = create_date.substring(0, 10);
    return this.createDate;
  }

}
