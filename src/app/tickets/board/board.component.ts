import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketsService} from "../tickets.service";
import {Ticket} from "../ticket.model";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../user.model";
import {UsersService} from "../users.service";

/**
 * Component responsible to create the initial board.
 */
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  public columns = ['Backlog', 'In Progress','On Hold','Done']
  public sortList = [
    {name:'Title',value:'title'},
    {name:'Edit Date',value:'edit'},
    {name:'Creation Date',value:'creation'}
  ]
  filterForm: FormGroup;
  public filterUser = -1;
  public users: User[];
  public sort = 'creation'
  public columnTickets = new Map<string,Ticket[]>()
  public dropdownActive = false;
  public hasAlert = false;
  public alertMsg = '';

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
    this.startColumnTickets()
    this.getColumnTickets(this.sortBy(this.filterByUser(this.ticketsService.getTickets())))
    this.ticketsService.ticketsChanged.subscribe(tickets => {
      this.startColumnTickets()
      this.getColumnTickets(this.sortBy(this.filterByUser(this.ticketsService.getTickets())))
    })
    this.initForm()
    this.users = this.usersService.getUsers()
    this.usersService.usersChanged.subscribe(users => this.users = users)
    if(this.ticketsService.hasAlert){
      this.hasAlert = true
      this.alertMsg = this.ticketsService.alertMsg
    }
    this.ticketsService.alertChanged.subscribe(_ =>{
      this.hasAlert = true
      this.alertMsg = this.ticketsService.alertMsg
    })
  }
  /**
   * Initializes the filters' form.
   *
   * @public
   */
  initForm(){
    this.filterForm = new FormGroup({
      // 'sortBy' : new FormControl(this.sort),
      'user' : new FormControl(this.filterUser)
    })
  }

  /**
   * Gets, sorts and filters the tickets based on the filters applied.
   *
   * @public
   */
  public onSubmit(){
    // this.sort = this.filterForm.value['sortBy']
    let user = this.filterForm.value['user']
    if(user)
      this.filterUser = +user
    else
      this.filterUser = -1
    this.dropdownActive = false
    this.startColumnTickets()
    this.getColumnTickets(this.sortBy(this.filterByUser(this.ticketsService.getTickets())))
  }

  /**
   * Clears the filters.
   *
   * @public
   */
  onClear(){
    this.filterUser = -1
    this.sort = 'creation'
    this.dropdownActive = false
    this.startColumnTickets()
    this.getColumnTickets(this.sortBy(this.filterByUser(this.ticketsService.getTickets())))
  }

  /**
   * Lifecycle hook that is executed when the component is destroyed.
   *
   * @public
   */
  ngOnDestroy() {
    this.ticketsService.clearSelected()
  }

  /**
   * Sets the value of each column key in the map to an empty list.
   *
   * @public
   */
  public startColumnTickets(){
    for(let column of this.columns){
      this.columnTickets.set(column,[])
    }
  }

  /**
   * Fills the tickets map by adding a ticket list.
   *
   * @public
   * @param tickets The ticket list to be added
   */
  public getColumnTickets(tickets: Ticket[]){
    for(let ticket of tickets){
      let colTickets = this.columnTickets.get(ticket.status)
      if(colTickets){
        colTickets.push(ticket)
        this.columnTickets.set(ticket.status,colTickets)
      }
    }
  }

  /**
   * Filters the ticket list to get the tickets of a user.
   *
   * @public
   * @param tickets The ticket list
   * @returns      {Ticket[]}
   */
  public filterByUser(tickets: Ticket[]){
    if(this.filterUser === -1)
      return tickets
    return tickets.filter(ticket => this.filterUser === ticket.user)
  }

  /**
   * Sorts a ticket list.
   *
   * @public
   * @param tickets The ticket list
   * @returns      {Ticket[]}
   */
  public sortBy(tickets: Ticket []){
    switch (this.sort) {
      case 'title':
        return Array.from(tickets).sort((t1,t2) => t1.title.localeCompare(t2.title))
      case 'edit':
        return Array.from(tickets).sort((t1,t2) => t1.editDate.getTime() -t2.editDate.getTime())
      default:
        return Array.from(tickets).sort((t1,t2) => t1.creationDate.getTime() -t2.creationDate.getTime())
    }
  }

  /**
  * Gets a columns' ticket list.
  *
  * @public
  * @param column The column status
  * @returns      {Ticket[]}
  */
  public getColumn(column: string){
    const tickets = this.columnTickets.get(column)
    if(tickets)
      return tickets
    return []
  }

  changeDropdownStatus(){
    this.dropdownActive = !this.dropdownActive
  }

  closeAlert(){
    this.hasAlert = false;
    this.alertMsg = '';
    this.ticketsService.closeAlert()
  }
}
