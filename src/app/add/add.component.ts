import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  response : any = {};
  angForm : FormGroup;
  constructor(private fb : FormBuilder, private us: ItemService) { 
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      description: ['', Validators.required ],
      count_number: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  addItem() {
    this.us.addItem(this.angForm.value).subscribe(res => {
      this.response = res;
      if (this.response.status == 'success'){
        this.us.alert('Item added successfully!','success');
        this.angForm.reset();
      } else {
        this.us.alert('Error saving item!','error');
      }
    })
  }
}
