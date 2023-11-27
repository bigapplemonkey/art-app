import { useEffect, useState } from 'react';
import { getInstanceById } from '../api/artic';

const useInstanceById = (instanceId, dataType) => {
  const [instanceData, setInstanceData] = useState(null);
  const [instanceError, setInstanceError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getInstanceById(instanceId, dataType);
        setInstanceData(result.data);
      } catch (err) {
        setInstanceError(err.message);
      }
    }

    fetchData();
  }, [instanceId, dataType]);

  return { instanceData, instanceError };
};

export default useInstanceById;
