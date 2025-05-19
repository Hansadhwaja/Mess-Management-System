import TimeForm from "@/components/admin/Menu/TimeForm";
import { getTimes } from "@/lib/actions/timeActions";
import React from "react";

const EditTime = async () => {
  const times = await getTimes();
  const editedTimes = times
    .map((time) => time._doc)
    .map((time) => ({ ...time, _id: time._id.toString() }));
  return (
    <div className="flex flex-col p-6">
      <TimeForm times={editedTimes} />
    </div>
  );
};

export default EditTime;
