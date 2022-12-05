import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from "../../../ticket.model";
import {TicketsService} from "../../../tickets.service";

/**
 * Component responsible to create a ticket in a column.
 */
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  /** The selected variable. */
  selected = false
  /** The ticket. */
  @Input() ticket : Ticket;
  /** The username associated with the ticket. */
  @Input() userName : string;

  /**
   * Class constructor
   *
   * @param ticketsService  The service that manages tickets.
   */
  constructor(private ticketsService: TicketsService) {
  }

  /**
   * Lifecycle hook after the component is initialized.
   *
   * @public
   */
  ngOnInit(): void {
    this.ticketsService.deselectTicket(this.ticket.id)
    this.selected = this.ticketsService.getSelected().includes(this.ticket.id)
    this.ticketsService.selectedTicketsChanged.subscribe(ids => {
      this.selected = ids.includes(this.ticket.id)
    })
  }

  /**
   * Changes the select status of the ticket.
   *
   * @public
   */
  changeSelect(){
    if(this.selected)
      this.ticketsService.deselectTicket(this.ticket.id)
    else
      this.ticketsService.selectTicket(this.ticket.id)
    this.selected = !this.selected
  }

}
