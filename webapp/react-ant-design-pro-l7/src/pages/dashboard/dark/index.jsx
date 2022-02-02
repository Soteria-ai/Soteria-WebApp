import { useRequest } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import MapDisasterDark from './components/MapDisasterDark';
import { queryTags } from './service';

const Dark = () => {
  const { data } = useRequest(queryTags);
  const wordCloudData = (data?.list || []).map((item) => {
    return {
      id: +Date.now(),
      word: item.name,
      weight: item.value,
    };
  });
  return (
    <GridContent>
      <>
        <MapDisasterDark />
      </>
    </GridContent>
  );
};

export default Dark;
