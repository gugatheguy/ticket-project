import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from "../../ticket.model";
import {Subscription} from "rxjs";
import {UsersService} from "../../users.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {TicketsService} from "../../tickets.service";

/**
 * Component responsible to create a board status column.
 */
@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css']
})
export class BoardColumnComponent implements OnInit {
  @Input() status: string;
  @Input() columnTickets: Ticket[];
  public sortAsc = true
  public sub: Subscription;

  /**
   * Class constructor
   *
   * @param ticketsService  The service that manages tickets.
   * @param usersService  The service that manages users.
   */
  constructor(private ticketsService: TicketsService,
              private usersService: UsersService) { }

  /**
   * Lifecycle hook after the component is initialized.
   *
   * @public
   */
  ngOnInit(): void {
  }

  /**
   * Gets the user from his id.
   *
   * @public
   * @param id The user's id.
   */
  getUserName(id: number){
    const user = this.usersService.getUser(id)
    if(user)
      return user.name
    return ''
  }

  /**
   * Sorts the ticket list.
   *
   * @public
   */
  changeSortList(){
    this.sortAsc = !this.sortAsc
  }

  drop(event: CdkDragDrop<Ticket[]>, status: string){
    let ticket: Ticket = event.item.data
    this.ticketsService.updateTicketStatus(ticket.id,status)
  }
}
