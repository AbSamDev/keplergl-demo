import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";
import { h3ToGeo } from "h3-js";

const reducers = combineReducers({
  keplerGl: keplerGlReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function App() {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  );
}

function Map() {
  const dispatch = useDispatch();
  const { data } = useSwr("heatmap", async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/hbu50/c7cd7e2deb80c9d9c04a95b3fbfb4c80/raw/fa0098b909a32a20e5616c8ee0dc60f556af759f/heatmap.json"
    );
    const jsonData = await response.json();
    
    // Transform data to match Kepler.gl format
    const processedData = jsonData.map(point => {
      const [lat, lng] = h3ToGeo(point.h3_index);
      return {
        store_code: point.store_code,
        business_day: point.business_day,
        h3_index: point.h3_index,
        q: point.q,
        latitude: lat,
        longitude: lng
      };
    });

    return {
      fields: [
        {name: 'store_code', format: '', type: 'string'},
        {name: 'business_day', format: 'YYYY-MM-DD', type: 'timestamp'},
        {name: 'h3_index', format: '', type: 'string'},
        {name: 'q', format: '', type: 'integer'},
        {name: 'latitude', format: '', type: 'real'},
        {name: 'longitude', format: '', type: 'real'}
      ],
      rows: processedData.map(item => [
        item.store_code,
        item.business_day,
        item.h3_index,
        item.q,
        item.latitude,
        item.longitude
      ])
    };
  });

  React.useEffect(() => {
    if (data) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: 'Store Heatmap',
              id: 'heatmap_data'
            },
            data
          },
          option: {
            centerMap: true,
            readOnly: false
          },
          config: {
            visState: {
              layers: [{
                type: 'heatmap',
                config: {
                  dataId: 'heatmap_data',
                  columns: {
                    lat: 'latitude',
                    lng: 'longitude',
                    q: 'q'
                  },
                  isVisible: true
                }
              }]
            }
          }
        })
      );
    }
  }, [dispatch, data]);

  return (
    <KeplerGl
      id="heatmap"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
