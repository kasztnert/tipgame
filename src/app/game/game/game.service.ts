import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {
  /**
   * Generates random tips to fill a tip sheet
   * @param nofTips How many different numbers to generate
   * @param total The biggest number on the sheet (1 is always assumed to be the lowest)
   * @returns A Set containing the specified amount of random numbers
   */
  generateRandomTips(nofTips: number, total: number) {
    if (total < nofTips) {
      throw new RangeError(
        'Total count of numbers cannot be less than the number of tips!'
      );
    }
    const numbers = new Set<number>();
    // add numbers to the Set until its size is 6. It filters duplicates automatically.
    do {
      // generate numbers between 1 and the number of cells
      numbers.add(Math.floor(Math.random() * total) + 1);
    } while (numbers.size < nofTips);
    return numbers;
  }
}
