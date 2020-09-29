import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ItemService } from '../item.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	item: any = {};
	angForm: FormGroup;
	response: any = {};
	constructor(private route: ActivatedRoute, 
		private fb: FormBuilder,
		private router: Router, 
		private us: ItemService) {
		this.angForm = this.fb.group({
			name: ['', Validators.required ],
			description: ['', Validators.required ],
			count_number: ['', Validators.required ]
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.us.editItem(params['id']).subscribe(res => {
				this.item = res;
				this.item = this.item.item;
			});
		});
	}

	updateItem() {
		this.route.params.subscribe(params => {
			this.us.updateItem(params['id'], this.angForm.value).subscribe(res => {
				this.response = res;
				if (this.response.status == 'success'){
					this.us.alert('Item updated successfully!','success');
					this.router.navigate(['item']);
				} else {
					this.us.alert('Error updating item!','error');
				}
			});
		});
	}
}
