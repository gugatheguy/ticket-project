import {max, Subject} from "rxjs";
import {Ticket} from "./ticket.model";
import {User} from "./user.model";
import {Injectable} from "@angular/core";

/**
 * Class responsible to the tickets service.
 */
@Injectable({
  providedIn: 'root'
})
export class TicketsService{
  /** The subject that notifies when the ticket list changes */
  public ticketsChanged = new Subject<Ticket[]>()
  /** The subject that notifies when the selected ticket list changes */
  public selectedTicketsChanged = new Subject<number[]>()
  /** The total tickets variable. */
  private totalTickets = 0;
  /** The selected tickets list. */
  private selectedTickets: number[] = []
  /** The tickets map. */
  private tickets = new Map<number,Ticket>()
  /** The has alert variable. */
  public hasAlert = false;
  /** The alert message variable. */
  public alertMsg = '';
  /** The subject that notifies when the alert changes */
  public alertChanged = new Subject()

  /**
   * Class constructor
   */
  constructor() {
    this.getStorage()
  }

  /**
   * Gets tickets from local storage.
   *
   * @private
   */
  private getStorage(){
    let ticketList : Ticket[] = JSON.parse(localStorage.getItem('tickets') || '[]')
    if(ticketList.length > 0)
      this.totalTickets = Math.max(...(ticketList.map(ticket => ticket.id)))+1
    ticketList.map(ticket => {
      let ticketWithDate = ticket
      ticketWithDate.creationDate = new Date(ticketWithDate.creationDate)
      ticketWithDate.editDate = new Date(ticketWithDate.editDate)
      this.tickets.set(ticket.id,ticketWithDate)
    })
  }

  /**
   * Saves tickets into local storage.
   *
   * @private
   */
  private setStorage(){
    localStorage.setItem('tickets',JSON.stringify(Array.from(this.tickets.values())))
  }

  /**
   * Gets the tickets list.
   *
   * @public
   * @returns {Ticket[]}
   */
  public getTickets(){
    return [...this.tickets.values()]
  }

  /**
   * Gets a ticket from its id.
   *
   * @public
   * @param id  The ticket's id.
   * @returns {Ticket | null}
   */
  public getTicket(id:number){
    return this.tickets.get(id)
  }

  /**
   * Creates and adds a new ticket to the tickets map.
   *
   * @public
   * @param title       The ticket's title.
   * @param description The ticket's description.
   * @param user        The id from the ticket's user.
   * @param status      The ticket's status.
   */
  public addTicket(title: string,
                   description: string,
                   user: number,
                   status: string){
    this.tickets.set(this.totalTickets,
      new Ticket(this.totalTickets, title, description, user,status,new Date(), new Date()))
    this.totalTickets++
    this.ticketsChanged.next(this.getTickets())
    this.setStorage()
    this.setAlert("A new ticket was added.")
  }

  /**
   * Updates a ticket from its id.
   *
   * @public
   * @param id          The ticket's id.
   * @param title       The ticket's title.
   * @param description The ticket's description.
   * @param user        The id from the ticket's user.
   * @param status      The ticket's status.
   */
  public updateTicket(id: number,
                      title: string,
                      description: string,
                      user: number,
                      status: string){
    let ticket = this.tickets.get(id);
    if(ticket){
      ticket.title = title
      ticket.description = description
      ticket.status = status
      ticket.user = user;
      ticket.editDate = new Date();
      this.tickets.set(id,ticket)
      this.ticketsChanged.next(this.getTickets())
      this.setStorage()
      this.setAlert("The ticket was edited.")
    }
  }

  /**
   * Updates a ticket status.
   *
   * @public
   * @param id          The ticket's id.
   * @param status      The ticket's status.
   */
  public updateTicketStatus(id: number, status: string){
    let ticket = this.tickets.get(id);
    if(ticket){
      ticket.status = status
      ticket.editDate = new Date();
      this.tickets.set(id,ticket)
      this.ticketsChanged.next(this.getTickets())
      this.setStorage()
    }
  }

  /**
   * Deletes a ticket.
   *
   * @public
   * @param id  The ticket's id.
   */
  public deleteTicket(id: number){
    this.tickets.delete(id)
    this.ticketsChanged.next(this.getTickets())
    this.setStorage()
    this.setAlert("The ticket was deleted.")
  }

  /**
   * Adds a ticket to the selected ticket list.
   *
   * @public
   * @param id  The ticket's id.
   */
  public selectTicket(id:number){
    this.selectedTickets.push(id)
  }

  /**
   * Removes a ticket from the selected ticket list.
   *
   * @public
   * @param id  The ticket's id.
   */
  public deselectTicket(id:number){
    this.selectedTickets.forEach( (ticketId, index) => {
      if(ticketId === id) this.selectedTickets.splice(index,1);
    });
  }

  /**
   * Clears the selected ticket list.
   *
   * @public
   */
  public clearSelected(){
    this.selectedTickets = []
    this.ticketsChanged.next(this.getTickets())
    this.selectedTicketsChanged.next(this.selectedTickets)
  }

  /**
   * Delete all the selected tickets.
   *
   * @public
   */
  public deleteSelected(){
    for(const id of this.selectedTickets){
      this.tickets.delete(id)
    }
    this.clearSelected()
    this.setStorage()
    this.setAlert("The selected tickets were deleted.")
  }

  /**
   * Changes the status from all the selected tickets.
   *
   * @public
   * @param status  The tickets' new status
   */
  public changeSelectedStatus(status:string){
    for(const id of this.selectedTickets){
      let ticket = this.tickets.get(id)
      if(ticket){
        ticket.status = status
        ticket.editDate = new Date();
        this.tickets.set(id,ticket)
      }
    }
    this.clearSelected()
    this.setStorage()
    this.setAlert("The selected tickets' status were changed.")
  }

  /**
   * Changes the user from all the selected tickets.
   *
   * @public
   * @param user  The id from the new tickets' user
   */
  public changeSelectedUser(user:number){
    for(const id of this.selectedTickets){
      let ticket = this.tickets.get(id)
      if(ticket){
        ticket.user = user
        ticket.editDate = new Date();
        this.tickets.set(id,ticket)
      }
    }
    this.clearSelected()
    this.setStorage()
    this.setAlert("The selected tickets' users were changed.")
  }

  /**
   * Checks if there are any selected tickets.
   *
   * @public
   * @returns {boolean}
   */
  public existsSelectedTickets(){
    return this.selectedTickets.length > 0
  }

  /**
   * Gets the selected tickets list.
   *
   * @public
   * @returns {Ticket[]}
   */
  public getSelected(){
   return this.selectedTickets
  }

  /**
   * Clears the alert.
   *
   * @public
   */
  public closeAlert(){
    this.alertMsg = ''
    this.hasAlert = false
  }

  /**
   * Creates a new alert.
   *
   * @public
   * @param msg The alert's message
   */
  public setAlert(msg: string){
    this.alertMsg = msg
    this.hasAlert = true
    this.alertChanged.next(null);
  }


}
