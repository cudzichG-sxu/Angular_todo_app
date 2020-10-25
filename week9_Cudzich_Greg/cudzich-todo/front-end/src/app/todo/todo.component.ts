import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent {
  //Found this to clear the input field when the button is clicked for cleaner UI
  @ViewChild('inputActual') inputActual: ElementRef
  listActual = []
  addListItem(item: String) {
    if(item != ""){
      this.listActual.push(item)
      this.inputActual.nativeElement.value = ''
    }
  }
}
// red line over here saying TS1128: Declaration or statement expected.
//Not sure what this mean? Everything compiles just fine.
