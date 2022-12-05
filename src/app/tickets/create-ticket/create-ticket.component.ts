import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketsService} from "../tickets.service";
import {Router} from "@angular/router";
import {User} from "../user.model";
import {UsersService} from "../users.service";

interface TicketForm {
  title : FormControl<string>,
  description: FormControl<string>,
  user: FormControl<number|null>
}

/**
 * Component responsible to the form that creates a new ticket.
 */
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  /** The ticket form. */
  ticketForm: FormGroup;
  /** The users list. */
  public users: User[];
  /** The creating user variable. */
  public creatingUser = false;

  /**
   * Class constructor
   *
   * @param ticketsService  The service that manages tickets.
   * @param usersService    The service that manages users.
   * @param router          The router.
   */
  constructor(private ticketsService: TicketsService,
              private usersService: UsersService,
              private router: Router) { }

  /**
   * Lifecycle hook after the component is initialized.
   *
   * @public
   */
  ngOnInit(): void {
    this.initForm()
    this.users = this.usersService.getUsers()
    this.usersService.usersChanged.subscribe(users => this.users=users)
  }

  /**
   * Initializes the ticket form.
   *
   * @public
   */
  initForm(){
    this.ticketForm = new FormGroup<TicketForm>({
      title : new FormControl('', {nonNullable: true}),
      description : new FormControl('', {nonNullable: true}),
      user : new FormControl(null, Validators.required),
    })
  }

  /**
   * Creates a new ticket on submit.
   *
   * @public
   */
  onSubmit(){
    this.ticketsService.addTicket(
      this.ticketForm.value['title'],
      this.ticketForm.value['description'],
      this.ticketForm.value['user'],
      'Backlog')
    this.router.navigate(['/board'])
  }

  /**
   * Changes the creating user variable.
   *
   * @public
   */
  changeCreateUserStatus(){
    this.creatingUser = !this.creatingUser
  }

}
