import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class ItemService {
	url = 'http://localhost:3000/item';

	constructor(private http: HttpClient) { }

	addItem(item) {
		return this.http.post(this.url+'/add', item);
	}

	getItem() {
		return this.http.get(this.url);
	}

	editItem(id) {
		return this.http.get(this.url+'/edit/'+id);
	}


	updateItem(id, item) {
		return this.http.post(this.url+'/update/'+id, item);
	}

	deleteItem(id) {
		return this.http.get(this.url+'/delete/'+id);
	}

	alert(mssg, status) {
		swal.fire(mssg, "", status);
	}
}
