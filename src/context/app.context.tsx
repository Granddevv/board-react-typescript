import React, {
  FC,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

interface IAuth {
  isAuth: boolean;
  user?: any;
}

enum TaskStatus {
  TO_DO = 0,
  IN_PROGRESS = 1,
  DONE = 2,
}

interface ITask {
  title: string;
  description: string;
  id: string;
  status: TaskStatus;
}

interface IAppProps {
  auth: IAuth | undefined;
  setAuth: (data: IAuth) => void;
  taskData: ITask[];
  setTaskData: (data: ITask[]) => void;
}

interface IAppProviderProps {
  children?: JSX.Element;
}

const AppProvider: FC<IAppProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>({
    isAuth: false,
    user: null,
  });

  const [taskData, setTaskData] = useState<ITask[]>([]);

  useEffect(() => {
    setTaskData([
      {
        id: "1",
        title: "Test Task 1",
        description: "Test Desc 1",
        status: TaskStatus.TO_DO,
      },
      {
        id: "2",
        title: "Test Task 2",
        description: "Test Desc 2",
        status: TaskStatus.IN_PROGRESS,
      },
      {
        id: "3",
        title: "Test Task 3",
        description: "Test Desc 3",
        status: TaskStatus.DONE,
      },
    ]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        auth,
        setAuth,
        taskData,
        setTaskData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

const AppContext = createContext<IAppProps>({
  auth: undefined,
  setAuth: () => {},
  taskData: [],
  setTaskData: () => {},
});

export { AppProvider, useApp, TaskStatus };
export type { ITask };
