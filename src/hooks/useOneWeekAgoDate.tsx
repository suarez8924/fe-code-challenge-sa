import { useEffect, useState } from "react";

const useOneWeekAgoDate = (): String | undefined => {
  const [lastWeekDate, setLastWeekDate] = useState<String>();

  useEffect(() => {
    const todayDate = new Date();
    const oneWeekAgoDate = new Date(todayDate.getTime());

    oneWeekAgoDate.setDate(todayDate.getDate() - 7);

    setLastWeekDate(oneWeekAgoDate.toISOString());
  }, []);

  return lastWeekDate;
};

export default useOneWeekAgoDate;
