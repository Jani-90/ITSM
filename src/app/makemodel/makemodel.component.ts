import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MakeService } from '../services/make.service';
import { make, model } from '../itsm';
import { PagerService } from '../services/pager.service';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-makemodel',
  templateUrl: './makemodel.component.html',
  styleUrls: ['./makemodel.component.css']
})
export class MakemodelComponent implements OnInit {
  angForm: FormGroup;
  angForm1: FormGroup;
  constructor(private router: Router, 
              private fb: FormBuilder, private ma : MakeService,
              private pagerService: PagerService, private mo : ModelService) {
    this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      make_name: ['', Validators.required ],
      make_id: [''],
      make_status: ['']

    });

    this.angForm1 = this.fb.group({
      model_make_name: ['', Validators.required ],
      model_name: ['', Validators.required ],
      model_id: [''],
      model_status: ['']

    });
  }

  addMake(make_id, make_name, make_status) {
    this.ma.addMake(make_id, make_name, make_status);
    this.router.navigate(['makemodel']);
    alert('New Make Name is added Successfully.');
    window.location.reload();
  }

  addModel(model_id, model_make_name, model_name, model_status) {
    this.mo.addModel(model_id, model_make_name, model_name, model_status);
    this.router.navigate(['makemodel']);
    alert('New Model Name is added Successfully.');
    window.location.reload();
  }

  makes: make[];
  models: model[];
 
  makeCodes: any = {};
  modelCodes: any = {};
  

  // pager object
  pager: any = {};
  pager1: any = {};

  // paged items
  pagedItems: any[];
  pagedItems1: any[];

  ngOnInit() {
    this.ma
    .getMake()
    .subscribe((data: make[]) => {
      this.makes = data;
      console.log(this.makes);
      // initialize to page 1
      this.setPageMake(1);
  });



 this.ma
  .getMakeCode()
  .subscribe((data: make[]) => {
    //console.log(data);
    this.makeCodes = data;
    //console.log(this.makeCodes.make_id);
    
    if(this.makeCodes == null){
      new_make_id = 'AMA001';
    }
    else{

      var code = this.makeCodes.make_id;
      //console.log(code);

      var sub1 = code.substring(0, 3);
      var sub2 = code.substring(3);
      var count = parseInt(sub2);
      var newcount = count + 1;

      if(newcount <=9)
      {		
        var new_make_id = 'AMA00'+ newcount;
      }
      else if(newcount <=99)
      {		
        var new_make_id = 'AMA0'+ newcount;
      }
      else if(newcount <=999)
      {		
        var new_make_id = 'AMA0'+ newcount;
      }

    }


    this.angForm.get('make_id').setValue(new_make_id);
    
});

  this.mo
  .getModel()
  .subscribe((data: model[]) => {
    this.models = data;
    console.log(this.models);
    // initialize to page 1
    this.setPageModel(1);
  });



  this.mo
  .getModelCode()
  .subscribe((data: model[]) => {
    
    this.modelCodes = data;
    //console.log(this.modelCodes);
    //console.log(this.makeCodes.make_id);
    if(this.modelCodes == null){
      new_model_id = 'AMO001';
    }
    else{
      var code = this.modelCodes.model_id;
      console.log(code)
  
      var sub1 = code.substring(0, 3);
      var sub2 = code.substring(3);
      var count = parseInt(sub2);
      var newcount = count + 1;
  
  
    if(newcount <=9)
    {		
      var new_model_id = 'AMO00'+ newcount;
    }
    else if(newcount <=99)
    {		
      var new_model_id = 'AMO0'+ newcount;
    }
    else if(newcount <=999)
    {		
      var new_model_id = 'AMO0'+ newcount;
    }


    }

    this.angForm1.get('model_id').setValue(new_model_id);

  });


}



setPageMake(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.makes.length, page);
    //console.log(this.pager);
    // get current page of items
    this.pagedItems = this.makes.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

setPageModel(page: number) {
  // get pager object from service
  this.pager1 = this.pagerService.getPager(this.models.length, page);
  //console.log(this.pager);
  // get current page of items
  this.pagedItems1 = this.models.slice(this.pager1.startIndex, this.pager1.endIndex + 1);
}



}
