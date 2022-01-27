import * as React from 'react';
import { HeatmapLayer, MapboxScene, Scene, PointLayer } from '@antv/l7-react';
// import { Scene, PointLayer } from '@antv/l7';
// import { GaodeMap } from '@antv/l7-maps';
import { PageLoading } from '@ant-design/pro-layout';
const colors = ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594'];

export default class MapDisasterResponse extends React.Component {
  state = {
    data: null,
    grid: null,
    loading: false,
  };

  async componentDidMount() {
    const [geoData, gridData] = await Promise.all([
      fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json',
      ).then((d) => d.json()),
      fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/8990e8b4-c58e-419b-afb9-8ea3daff2dd1.json',
      ).then((d) => d.json()),
    ]);
    this.setState({
      data: geoData,
      grid: gridData,
      loading: true,
    });
  }

  render() {
    const { data, grid, loading } = this.state;

    // const scene = new Scene({
    //   id: 'map',
    //   map: new GaodeMap({
    //     pitch: 0,
    //     style: 'light',
    //     center: [ 121.434765, 31.256735 ],
    //     zoom: 14.83
    //   })
    // });

    // scene.on('loaded', () => {
    //   fetch(
    //     'https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json'
    //   )
    //     .then(res => res.json())
    //     .then(data => {
    //       scene.addImage(
    //         '00',
    //         'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg'
    //       );
    //       scene.addImage(
    //         '01',
    //         'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg'
    //       );
    //       scene.addImage(
    //         '02',
    //         'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg'
    //       );
    //       const imageLayer = new PointLayer()
    //         .source(data, {
    //           parser: {
    //             type: 'json',
    //             x: 'longitude',
    //             y: 'latitude'
    //           }
    //         })
    //         .shape('name', [ '00', '01', '02' ])
    //         .size(25);
    //       scene.addLayer(imageLayer);
    //     });
    // });

    return loading === false ? (
      <PageLoading />
    ) : (
      <MapboxScene
        map={{
          center: [110.19382669582967, 50.258134],
          pitch: 0,
          style: 'blank',
          zoom: 1,
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '452px',
        }}
      >
        {grid && (
          <HeatmapLayer
            key="1"
            source={{
              data: grid,
              transforms: [
                {
                  type: 'hexagon',
                  size: 800000,
                  field: 'capacity',
                  method: 'sum',
                },
              ],
            }}
            color={{
              values: '#ddd',
            }}
            shape={{
              values: 'hexagon',
            }}
            style={{
              coverage: 0.7,
              opacity: 0.8,
            }}
          />
        )}
        {data && [
          <PointLayer
            key="2"
            options={{
              autoFit: true,
            }}
            source={{
              data,
            }}
            scale={{
              values: {
                color: {
                  field: 'cum_conf',
                  type: 'quantile',
                },
                size: {
                  field: 'cum_conf',
                  type: 'log',
                },
              },
            }}
            color={{
              field: 'cum_conf',
              values: colors,
            }}
            shape={{
              values: 'circle',
            }}
            active={{
              option: {
                color: '#0c2c84',
              },
            }}
            size={{
              field: 'cum_conf',
              values: [0, 30],
            }}
            style={{
              opacity: 0.8,
            }}
          />,
          <PointLayer
            key="5"
            source={{
              data,
            }}
            color={{
              values: '#fff',
            }}
            shape={{
              field: 'Short_Name_ZH',
              values: 'text',
            }}
            filter={{
              field: 'cum_conf',
              values: (v) => {
                return v > 2000;
              },
            }}
            size={{
              values: 12,
            }}
            style={{
              opacity: 1,
              strokeOpacity: 1,
              strokeWidth: 0,
            }}
          />,
        ]}
      </MapboxScene>
    );
  }
}
