import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { employee } from '../itsm';


@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {

  constructor(private emp: EmployeeService) { }


  empList: employee[];

  ngOnInit() {

    this.emp
    .getEmpList()
    .subscribe((data: employee[]) => {
      this.empList = data;
      console.log(this.empList);

  });


  }


}
