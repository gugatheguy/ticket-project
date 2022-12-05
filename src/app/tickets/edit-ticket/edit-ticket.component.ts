import { Component, OnInit } from '@angular/core';
import {TicketsService} from "../tickets.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Ticket} from "../ticket.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../users.service";
import {User} from "../user.model";

/**
 * Component responsible to the form that edits a ticket.
 */
@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  /** The ticket's id. */
  private id: number;
  /** The users list. */
  public users: User[];
  /** The ticket. */
  public ticket: Ticket;
  /** The ticket found variable. */
  public ticketFound = false;
  /** The creating user variable. */
  public creatingUser = false;
  /** The status list. */
  public statusList = ['Backlog', 'In Progress', 'On Hold', 'Done']
  /** The ticket form. */
  ticketForm: FormGroup;

  /**
   * Class constructor
   *
   * @param ticketsService  The service that manages tickets.
   * @param usersService    The service that manages users.
   * @param route           The route.
   * @param router          The router.
   */
  constructor(private ticketsService: TicketsService,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  /**
   * Lifecycle hook after the component is initialized.
   *
   * @public
   */
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        let ticket = this.ticketsService.getTicket(this.id)
        if (ticket) {
          this.ticketFound = true
          this.ticket = ticket
          this.initForm()
        }
      }
    )
    this.users = this.usersService.getUsers()
    this.usersService.usersChanged.subscribe(users => this.users=users)
  }

  /**
   * Initializes the ticket form.
   *
   * @public
   */
  initForm() {
    this.ticketForm = new FormGroup({
      'title': new FormControl(this.ticket.title, Validators.required),
      'description': new FormControl(this.ticket.description),
      'user': new FormControl(this.ticket.user, Validators.required),
      'status': new FormControl(this.ticket.status, Validators.required)
    })
  }

  /**
   * Deletes the ticket.
   *
   * @public
   */
  onDelete() {
    this.ticketsService.deleteTicket(this.id)
    this.router.navigate(['/board'])
  }

  /**
   * Edits the ticket.
   *
   * @public
   */
  onEdit(){
    this.ticketsService.updateTicket(
      this.id,
      this.ticketForm.value['title'],
      this.ticketForm.value['description'],
      +this.ticketForm.value['user'],
      this.ticketForm.value['status'])
    this.router.navigate(['/board'])
  }

  getUserName(id: number){
    const user = this.usersService.getUser(id)
    if(user)
      return user.name
    return ''
  }

  /**
   * Changes the creating user status.
   *
   * @public
   */
  changeCreateUserStatus(){
    this.creatingUser = !this.creatingUser
  }

}

