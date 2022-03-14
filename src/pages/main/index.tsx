import { MuuriComponent } from "muuri-react";
import { Column, Item } from "../../components";
import { useApp, ITask, TaskStatus } from "../../context/app.context";
import { v4 as uuidv4 } from "uuid";

const Main = () => {
  const { taskData, setTaskData } = useApp();

  const children = {
    todo: taskData
      .filter((item: ITask) => item.status === TaskStatus.TO_DO)
      .map((item: ITask) => <Item id={item.id} key={item.id} data={item} />),
    done: taskData
      .filter((item: ITask) => item.status === TaskStatus.DONE)
      .map((item: ITask) => <Item id={item.id} key={item.id} data={item} />),
    inProgress: taskData
      .filter((item: ITask) => item.status === TaskStatus.IN_PROGRESS)
      .map((item: ITask) => <Item id={item.id} key={item.id} data={item} />),
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "TO_DO":
        return TaskStatus.TO_DO;
      case "IN_PROGRESS":
        return TaskStatus.IN_PROGRESS;
      default:
        return TaskStatus.DONE;
    }
  };

  const handleMoveTasks = (option: any) => {
    const { key, toId } = option;
    const taskIndex = taskData.findIndex((item: any) => item.id === key);
    const taskItem = taskData[taskIndex];
    taskData.splice(taskIndex, 1, { ...taskItem, status: getStatus(toId) });
    setTaskData([...taskData]);
  };

  const handleAddTask = () => {
    taskData.push({
      id: uuidv4(),
      title: "Task",
      description: "Description",
      status: TaskStatus.TO_DO,
    });
    setTaskData([...taskData]);
  };

  const boardOptions = {
    containerClass: "board",
    layoutDuration: 400,
    dragSortHeuristics: {
      sortInterval: 0,
    },
    dragStartPredicate: {},
  };

  const columnOptions = {
    dragSort: { groupId: "NOTES" },
    groupIds: ["NOTES"],
    containerClass: "board-column-content",
    dragEnabled: true,
    dragFixed: true,
    dragSortHeuristics: {
      sortInterval: 0,
    },
  };

  return (
    <div className="mt-16">
      <div className="flex justify-center mb-12">
        <button
          className="shadow-sm px-5 py-3 bg-green-200 rounded text-gray-500	"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <MuuriComponent {...boardOptions}>
        <Column actionClass="to_do" title="To do">
          <MuuriComponent
            id={"TO_DO"}
            onSend={handleMoveTasks}
            {...columnOptions}
          >
            {children.todo}
          </MuuriComponent>
        </Column>
        <Column actionClass="in_progress" title="In Progress">
          <MuuriComponent
            id={"IN_PROGRESS"}
            onSend={handleMoveTasks}
            {...columnOptions}
          >
            {children.inProgress}
          </MuuriComponent>
        </Column>
        <Column actionClass="done" title="Done">
          <MuuriComponent
            id={"DONE"}
            onSend={handleMoveTasks}
            {...columnOptions}
          >
            {children.done}
          </MuuriComponent>
        </Column>
      </MuuriComponent>
    </div>
  );
};

export default Main;
