import mitt from 'mitt';
import produce, { freeze } from 'immer';

const emitter = mitt();

type UpdateFn<S> = (state: S) => void;

export abstract class MVPModel<T> {
  private _state!: T;

  private id = uniqueID();

  get state() {
    return this._state;
  }

  protected set state(s: T) {
    this._state = freeze(s, true);
  }

  setState(s: UpdateFn<T> | T) {
    let newState: T;
    if (typeof s === 'function') {
      newState = produce(this._state, s as unknown as UpdateFn<T>);
    } else {
      newState = freeze(s, true);
    }
    this._state = newState;
    emitter.emit(this.id, this._state);
  }

  subscribe(callback: (state: T) => void) {
    emitter.on(this.id as any, callback as any);
    return () => {
      emitter.off(this.id as any, callback as any);
    };
  }
}

function uniqueID() {
  return new Date().getTime().toString();
}
