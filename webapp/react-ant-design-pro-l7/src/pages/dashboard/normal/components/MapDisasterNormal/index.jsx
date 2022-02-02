import * as React from 'react';
import { MapboxScene, LineLayer } from '@antv/l7-react';
import { PageLoading } from '@ant-design/pro-layout';
import east_coast_school from '../../../../../map-data/east_coast_school.json';

// const colors = ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594'];

export default class MapDisasterNormal extends React.Component {
  state = {
    data: null,
    grid: null,
    loading: false,
  };

  async componentDidMount() {
    // const [geoData, gridData] = await Promise.all([
    //   fetch(
    //     'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json',
    //   ).then((d) => d.json()),
    //   fetch(
    //     'https://gw.alipayobjects.com/os/bmw-prod/8990e8b4-c58e-419b-afb9-8ea3daff2dd1.json',
    //   ).then((d) => d.json()),
    // ]);
    this.setState({
      // data: geoData,
      data: east_coast_school,
      // grid: gridData,
      loading: true,
    });
  }

  render() {
    const { 
      data,
      grid, 
      loading } = this.state;

    return loading === false ? (
      <PageLoading />
    ) : (
      <MapboxScene
        map={{
          center: [103.330239, 3.813148],
          pitch: 0,
          style: 'normal',
          zoom: 12,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {data && (
          <LineLayer
            key={'2'}
            source={{
              data,
              // kelantan_school_data,
              // pahang_school_data,
              // terengganu_school_data,
            }}
            size={{
              values: 1,
            }}
            color={{
              values: '#8EF69E',
            }}
            shape={{
              values: 'line',
            }}
            style={{
              opacity: 1,
            }}
            tooltip={{
              items: ['name', 'value'],
            }}
          />
        )}
      </MapboxScene>
    );
  }
}
