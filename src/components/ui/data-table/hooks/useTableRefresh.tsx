import React, {useState} from "react";


const getCurrentTimeStamp = () => {
	return new Date().getTime();
};

const useTableRefresh = () => {
    const [refreshKey, setRefreshKey] = useState(0);
  const refreshTable = () => {
		const key = getCurrentTimeStamp();
		setRefreshKey(key);
	};

    return { refreshKey, refreshTable };
};

export default useTableRefresh;
