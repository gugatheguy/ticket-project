
/**
 * Class responsible to the user module.
 */
export class User{

  /**
   * Class constructor
   *
   * @param id    The user's id.
   * @param name  The user's name.
   */
  constructor(public id: number, public name: string){
    this.name = name
    this.id = id
  }
}
