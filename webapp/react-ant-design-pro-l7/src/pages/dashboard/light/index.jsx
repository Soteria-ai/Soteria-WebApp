import { useRequest } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import MapDisasterLight from './components/MapDisasterLight';
import { queryTags } from './service';

const Light = () => {
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
        <MapDisasterLight />
      </>
    </GridContent>
  );
};

export default Light;
