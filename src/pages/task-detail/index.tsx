import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Input } from "../../components";
import { TaskStatus, useApp } from "../../context/app.context";

const TaskOptions = [
  { value: TaskStatus.DONE, label: "Done" },
  { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
  { value: TaskStatus.TO_DO, label: "To Do" },
];

const TaskDetail = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { taskData, setTaskData } = useApp();

  const [formVal, setFormVal] = useState({
    id: "",
    title: "",
    description: "",
    status: TaskStatus.TO_DO,
  });

  useEffect(() => {
    if (taskData) {
      const task = taskData.find((item: any) => item.id === param.ticketid);
      if (task) {
        setFormVal(task);
      } else {
        navigate("/");
      }
    }
  }, [param.ticketid, taskData]);

  const handleChange = (key: string, value: string | number) => {
    setFormVal({
      ...formVal,
      [key]: value,
    });
  };

  const handleSave = () => {
    const taskIndex = taskData.findIndex((item: any) => item.id === formVal.id);
    const taskItem = taskData[taskIndex];
    taskData.splice(taskIndex, 1, { ...taskItem, ...formVal });
    setTaskData(taskData);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const options = TaskOptions.filter((item: any) => {
    if (item.value === formVal.status) {
      return false;
    }

    if (
      item.value === TaskStatus.IN_PROGRESS &&
      formVal.status === TaskStatus.DONE
    ) {
      return false;
    }

    return true;
  });

  const value = TaskOptions.find((item: any) => item.value === formVal.status);

  return (
    <div className="absolute w-full h-full">
      <div className="w-full h-full flex justify-center items-start	">
        <div className="w-6/12 p-6 mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-x-4">
          <div className="w-full">
            <h3 className="text-3xl text-gray-500 text-center uppercase">
              Ticket Detail
            </h3>
            <Input
              labelClass="capitalize text-gray-500"
              inputClass="border rounded border-gray-300  py-1.5	px-2 w-full outline-none"
              wrapClass="my-4"
              label="Title"
              type="text"
              value={formVal.title}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("title", evt.target.value)
              }
            />
            <Input
              labelClass="capitalize text-gray-500"
              inputClass="border rounded border-gray-300 py-1.5	px-2 w-full outline-none"
              wrapClass="my-4"
              label="Description"
              type="text"
              value={formVal.description}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("description", evt.target.value)
              }
            />
            <p className={"capitalize text-gray-500"}>Status:</p>
            <Select
              options={options}
              value={value}
              onChange={(evt: any) => {
                handleChange("status", evt.value);
              }}
            />
          </div>
          <div className="my-4 flex justify-end w-full">
            <button
              className="shadow-sm px-5 py-3 bg-green-200 rounded text-gray-500	"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="shadow-sm px-5 ml-2 py-3 bg-red-200 rounded text-gray-500	"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
