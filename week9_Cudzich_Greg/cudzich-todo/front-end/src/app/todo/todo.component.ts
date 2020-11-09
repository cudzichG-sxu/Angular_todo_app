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
    })
  }
}
