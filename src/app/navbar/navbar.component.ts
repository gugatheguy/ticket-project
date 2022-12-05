import {Component, Input, OnInit} from '@angular/core';
import {TicketsService} from "../tickets/tickets.service";
import {ChangeSelectedStatusComponent} from "../tickets/change-selected-status/change-selected-status.component";

/**
 * Component responsible for the navbar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  /** The selecting status variable. */
  public selectingStatus = false;
  /** The selecting user variable. */
  public selectingUser = false;
  /** The deleting selected variable. */
  public deletingSelected = false;
  /** The dropdown active variable. */
  public dropdownActive = false;
  /** The creating user variable. */
  public creatingUser = false;
  /** The on board variable. */
  @Input() onBoard: boolean

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
  }

  /**
   * Changes the selecting status.
   *
   * @public
   */
  changeSelectingStatus(){
    this.selectingStatus = !this.selectingStatus
    this.dropdownActive = false
  }

  /**
   * Changes the selecting user.
   *
   * @public
   */
  changeSelectingUser(){
    this.selectingUser = !this.selectingUser
    this.dropdownActive = false
  }

  /**
   * Changes the deleting selected.
   *
   * @public
   */
  changeDeletingSelected(){
    this.deletingSelected = !this.deletingSelected
    this.dropdownActive = false
  }

  /**
   * Changes the dropdown status.
   *
   * @public
   */
  changeDropdownStatus(){
    this.dropdownActive = !this.dropdownActive
  }

  /**
   * Changes the creating user.
   *
   * @public
   */
  changeCreatingUser(){
    this.creatingUser = !this.creatingUser
    this.dropdownActive = false
  }

  /**
   * Checks if there are any tickets selected.
   *
   * @public
   */
  ticketsSelected(){
    return this.ticketsService.existsSelectedTickets()
  }
}
