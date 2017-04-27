/**
 * A random number generator
 */
export class Random {
  /**
   * Generate a random number that lies in the specified range
   */
  static inRange(min: number, max:number){
    return (Math.random() * (max-min))+ min;
  }
}
