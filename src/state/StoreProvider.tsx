import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  initialStore,
  type Measurement,
  type Session,
  type Settings,
  type Store,
} from "../domain/schema";
import { liftingDays } from "../data/program";
import { completedWork, nextLiftingDay } from "../domain/training";
import { loadStore, STORAGE_KEY } from "./persistence";

export type Action =
  | { type: "settings"; patch: Partial<Settings> }
  | { type: "active"; session: Session | null }
  | { type: "finish"; now: number }
  | { type: "timer"; deadline: number | null }
  | { type: "schedule"; schedule: Store["schedule"] }
  | { type: "measurement"; measurement: Measurement }
  | { type: "deleteMeasurement"; id: string }
  | { type: "import"; store: Store };
export function reducer(store: Store, action: Action): Store {
  switch (action.type) {
    case "settings":
      return { ...store, settings: { ...store.settings, ...action.patch } };
    case "active":
      return {
        ...store,
        active: action.session,
        restDeadline: action.session ? store.restDeadline : null,
      };
    case "finish": {
      if (
        !store.active ||
        (!completedWork(store.active).length && !store.active.cardioMinutes)
      )
        return store;
      const schedule = { ...store.schedule };
      delete schedule[store.active.day];
      return {
        ...store,
        sessions: [...store.sessions, { ...store.active, endedAt: action.now }],
        active: null,
        restDeadline: null,
        schedule,
        nextDay: liftingDays.includes(store.active.day)
          ? nextLiftingDay(store.active.day)
          : store.nextDay,
      };
    }
    case "timer":
      return { ...store, restDeadline: action.deadline };
    case "schedule":
      return { ...store, schedule: action.schedule };
    case "measurement":
      return {
        ...store,
        measurements: [...store.measurements, action.measurement],
      };
    case "deleteMeasurement":
      return {
        ...store,
        measurements: store.measurements.filter((m) => m.id !== action.id),
      };
    case "import":
      return action.store;
  }
}
interface StoreContextValue {
  store: Store;
  dispatch: Dispatch<Action>;
  storageError: boolean;
  recover: () => void;
}
const StoreContext = createContext<StoreContextValue | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [loaded] = useState(() => {
    try {
      return loadStore(localStorage, navigator.language);
    } catch {
      return { store: initialStore(), error: true };
    }
  });
  const [store, dispatch] = useReducer(reducer, loaded.store);
  const [blocked, setBlocked] = useState(loaded.error);
  const [writeError, setWriteError] = useState(false);
  useEffect(() => {
    if (blocked) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      setWriteError(false);
    } catch {
      setWriteError(true);
    }
  }, [store, blocked]);
  const recover = () => {
    dispatch({ type: "import", store: initialStore(store.settings.language) });
    setBlocked(false);
  };
  return (
    <StoreContext.Provider
      value={{ store, dispatch, storageError: blocked || writeError, recover }}
    >
      {children}
    </StoreContext.Provider>
  );
}
export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("StoreProvider missing");
  return value;
}
