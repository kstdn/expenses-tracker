import { AppEffects } from './app.effects';
import { MovementEffects } from './movement.effects';

export * from './app.effects';
export * from './movement.effects';

export const effects: any = [
    AppEffects,
    MovementEffects,
]
