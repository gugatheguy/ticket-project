import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketsService} from "../tickets.service";

/**
 * Component responsible to create the form to update ticket status.
 */
@Component({
  selector: 'app-change-selected-status',
  templateUrl: './change-selected-status.component.html',
  styleUrls: ['./change-selected-status.component.css']
})
export class ChangeSelectedStatusComponent implements OnInit {

  /** The status form. */
  statusForm: FormGroup;
  public statusList = ['Backlog', 'In Progress', 'On Hold', 'Done']
  /** The event emitter to signalize when the status changes. */
  @Output() done = new EventEmitter();


  /**
   * Class constructor
   *
   * @param ticketsService  The service that manages tickets.
   */
  constructor(private ticketsService: TicketsService) { }

  /**
   * Lifecycle hook after the component is initialized.
   *
   * @public
   */
  ngOnInit(): void {
    this.initForm()
  }

  /**
   * Initializes the status form.
   *
   * @public
   */
  initForm(){
    this.statusForm = new FormGroup({
      'newStatus' : new FormControl('Backlog', Validators.required)
    })
  }

  /**
   * Changes the tickets status on submit.
   *
   * @public
   */
  onSubmit(){
    if(this.statusForm.valid){
      this.ticketsService.changeSelectedStatus(this.statusForm.value['newStatus'])
      this.done.emit()
      this.statusForm.reset('newStatus')
    }
  }
}
