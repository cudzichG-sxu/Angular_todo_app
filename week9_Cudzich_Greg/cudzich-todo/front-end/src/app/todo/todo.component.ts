import {Component, OnInit} from '@angular/core';
import { TodoListService } from "../_services/todo-list.service";
import {NgbModal, ModalDismissReasons}
  from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  public newListItems;
  public returnedListItems;
  closeResult = '';
  constructor(private todoListService: TodoListService, private modalService: NgbModal) {
  }
  ngOnInit(): void {
    this.todoListService.getAllListItems().subscribe(returnListItems => {
      this.returnedListItems = returnListItems;
    })
  }

  saveItem(): void {
    this.todoListService.create(this.newListItems).subscribe(savedListItem => {
      this.returnedListItems.push(savedListItem);
      //clears input field after saving to database
      this.newListItems = ' ';
    })
  }

  deleteItem(deleteItem, index): void {
    this.todoListService.delete(deleteItem).subscribe(deleteItem => {

      //removes deleted item from array at index, checks if index is -1 so that
      //it doesn't just delete the last item in the array
      if (index != -1) {
        this.returnedListItems.splice(index, 1);
      }
    })
  }

  updateItem(idActual, updatedValue): void {
    this.todoListService.update(idActual, updatedValue).subscribe(updatedItem => {
      this.todoListService.getAllListItems().subscribe(returnListItems => {
        this.returnedListItems = returnListItems;
      })
    })
  }
  open(content) {
    this.modalService.open(content,
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
        `Dismissed ${this.getDismissReason(reason)}`;
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
}
