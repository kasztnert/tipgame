import { AuthState } from './auth/state/auth.state';
import { GameState } from './game/state/game.state';

export interface AppState {
  auth: AuthState;
  game: GameState;
}
