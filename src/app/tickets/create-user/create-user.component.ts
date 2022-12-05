import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../users.service";

/**
 * Component responsible to the form that creates a new user.
 */
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  /** The user form. */
  userForm: FormGroup;
  /** The event emitter to signalize when the user is created. */
  @Output() done = new EventEmitter();

  /**
   * Class constructor
   *
   * @param usersService  The service that manages users.
   */
  constructor(private usersService: UsersService) { }

  /**
   * Lifecycle hook after the component is initialized.
   *
   * @public
   */
  ngOnInit(): void {
    this.initForm()
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
   * Creates a new user on submit.
   *
   * @public
   */
  onSubmit(){
    this.usersService.addUser(this.userForm.value['newUser'])
    this.done.emit()
    this.userForm.reset('newUser')
  }
}
