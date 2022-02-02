import { useRequest } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import MapDisasterNormal from './components/MapDisasterNormal';
import { queryTags } from './service';

const Normal = () => {
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
        <MapDisasterNormal />
      </>
    </GridContent>
  );
};

export default Normal;
