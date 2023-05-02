import { BehaviorSubject } from "rxjs";


export const $hotGames = new BehaviorSubject(null);


export const setGames = (games) => {
  $hotGames.next(games)
}


