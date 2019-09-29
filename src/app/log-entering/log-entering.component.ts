import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { LogService } from '../services/log.service'

@Component({
  selector: 'app-log-entering',
  templateUrl: './log-entering.component.html',
  styleUrls: ['./log-entering.component.css']
})
export class LogEnteringComponent implements OnInit {

  angForm: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,  
    private fb: FormBuilder,
    private log: LogService) { 
      this.createForm();
    }

    createForm() {
      this.angForm = this.fb.group({
        log_type: ['', Validators.required ],
        log_id: ['', Validators.required ],
        log_date: ['', Validators.required ],
        log_status: ['', Validators.required ],
        log_comment: ['', Validators.required ]

  
      });
    }

  ngOnInit() {





  }

  addLog(log_type, log_id, log_date, log_status, log_comment ) {
    this.log.addLog(log_type, log_id, log_date, log_status, log_comment);
    this.router.navigate(['log']);
    alert('New Log is added Successfully.');
    window.location.reload();
  }

  logID: any = [];

  showLogID(log_type){
    this.route.params.subscribe(params => {
      if(log_type!==""){
        this.log.showLogID(log_type).subscribe(res => {
          this.logID = res;
          console.log(this.logID);

          if(this.logID == null){
          
              if(log_type=='Database'){
                var new_log_id = 'DB0001';
              }
              else if(log_type=='CCTV'){
                var new_log_id = 'CT0001';
              }
              else if(log_type=='Finger'){
                var new_log_id = 'FP0001';
              }

              this.angForm.get('log_id').setValue(new_log_id);

          }
          else{
            var log_id1 = this.logID.log_id;
            console.log(log_id1);
            var sub1 = log_id1.substring(0, log_id1.length-4);
            var sub2 = log_id1.substring(log_id1.length-4);
            console.log(sub1);
            console.log(sub2);
            var count = parseInt(sub2);
            var newcount = count + 1;

            if(newcount <=9)
            {		
              var new_log_id = sub1+ '000' +newcount;
            }
            else if(newcount <=99)
            {		
              var new_log_id = sub1 + '00'+ newcount;
            }
            else if(newcount <=999)
            {		
              var new_log_id = sub1 +'0'+ newcount;
            }
            else if(newcount <=9999)
            {		
              var new_log_id = sub1 +''+ newcount;
            }

            this.angForm.get('log_id').setValue(new_log_id);

          }

        });
      }
      else{
        this.angForm.get('log_id').setValue('');
      }

    });

    
  }

}
