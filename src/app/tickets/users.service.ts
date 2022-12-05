import {Subject} from "rxjs";
import {User} from "./user.model";
import {Injectable} from "@angular/core";

/**
 * Class responsible to the users service.
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService{
  /** The subject that notifies when the user list changes */
  public usersChanged = new Subject<User[]>()
  /** The total tickets variable. */
  private totalUsers = 0;
  /** The users map. */
  private users = new Map<number,User>()

  /**
   * Class constructor
   */
  constructor() {
    this.getStorage()
  }

  /**
   * Gets users from local storage.
   *
   * @private
   */
  private getStorage(){
    let userList : User[] = JSON.parse(localStorage.getItem('users') || '[]')
    this.totalUsers = Math.max(...(userList.map(user => user.id))) + 1
    userList.map(user => {
      this.users.set(user.id,user)
    })
  }

  /**
   * Saves users into local storage.
   *
   * @private
   */
  private setStorage(){
    localStorage.setItem('users',JSON.stringify(Array.from(this.users.values())))
  }

  /**
   * Gets the users list.
   *
   * @public
   * @returns {User[]}
   */
  public getUsers(){
    return [...this.users.values()]
  }

  /**
   * Gets a user from his id.
   *
   * @public
   * @param id  The user's id.
   * @returns {User | null}
   */
  public getUser(id:number){
    return this.users.get(id)
  }

  /**
   * Creates and adds a new user to the users map.
   *
   * @public
   * @param name  The user's name.
   */
  public addUser(name: string){
    this.users.set(this.totalUsers, new User(this.totalUsers, name))
    this.totalUsers++
    this.usersChanged.next(this.getUsers())
    this.setStorage()
  }

}
