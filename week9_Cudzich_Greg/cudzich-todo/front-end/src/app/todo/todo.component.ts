import { Component, OnInit } from '@angular/core';
import { TodoListService } from "../_services/todo-list.service";

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  public newListItems;
  public returnedListItems;

  constructor(private todoListService: TodoListService) {
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
}
