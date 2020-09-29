import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import Item from '../Item';

@Component({
	selector: 'app-get',
	templateUrl: './get.component.html',
	styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
	items: Item[];
	response : any = {};
	responseDelete : any = {};
	constructor(private us: ItemService) { }

	ngOnInit() {
		this.getItems();
	}

	getItems() {
		this.us.getItem().subscribe((res) => {
			this.response = res;
			if (this.response.status == 'success'){
				this.items = this.response.items;
			} else {
			}
		});
	}

	deleteItem(id) {
		this.us.deleteItem(id).subscribe(res => {
			this.responseDelete = res;
			if (this.responseDelete.status == 'success'){
				this.us.alert('Item deleted successfully!','success');
				this.getItems();
			} else {
				this.us.alert('Error deleting item!','error');
			}
		});
	}
}
