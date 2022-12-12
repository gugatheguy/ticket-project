import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketsService} from "../tickets.service";
import {User} from "../user.model";
import {UsersService} from "../users.service";

/**
 * Component responsible to create the form to update ticket users.
 */
@Component({
  selector: 'app-change-selected-user',
  templateUrl: './change-selected-user.component.html',
  styleUrls: ['./change-selected-user.component.css']
})
export class ChangeSelectedUserComponent implements OnInit {
  /** The user form. */
  userForm: FormGroup;
  /** The user list. */
  public users: User[];
  /** The event emitter to signalize when the user changes. */
  @Output() done = new EventEmitter();


  /**
   * Class constructor
   *
   * @param ticketsService  The service that manages tickets.
   * @param usersService  The service that manages users.
   */
  constructor(private ticketsService: TicketsService, private usersService: UsersService) { }

  /**
   * Lifecycle hook after the component is initialized.
   *
   * @public
   */
  ngOnInit(): void {
    this.initForm()
    this.users = this.usersService.getUsers()
    this.usersService.usersChanged.subscribe(users => this.users = users)
  }

  /**
   * Initializes the user form.
   *
   * @public
   */
  initForm(){
    this.userForm = new FormGroup({
      'newUser' : new FormControl(null, Validators.required)
    })
  }

  /**
   * Changes the tickets users on submit.
   *
   * @public
   */
  onSubmit(){
    if(this.userForm.valid){
      this.ticketsService.changeSelectedUser(+this.userForm.value['newUser'])
      this.done.emit()
      this.userForm.reset('newUser')
    }
  }

}
