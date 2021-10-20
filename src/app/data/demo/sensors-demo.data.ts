import {ChartData} from "../types/chart/chart-data.type";
import {UnitType} from "../types/unit.type";

const HumidityDemoData: ChartData = {
  unit: '%',
  name: 'Humidity',
  values: [
    {
      date: new Date("2021-09-12T21:46:52.000-05:00"),
      value: 84.0
    },
    {
      date: new Date("2022-07-27T20:34:11.000-05:00"),
      value: 52.1
    },
    {
      date: new Date("2021-11-18T07:01:29.000-06:00"),
      value: 79.0
    },
    {
      date: new Date("2021-04-29T07:11:54.000-05:00"),
      value: 73.7
    },
    {
      date: new Date("2021-04-11T08:39:15.000-05:00"),
      value: 77.7
    },
    {
      date: new Date("2021-01-14T21:55:43.000-06:00"),
      value: 104.3
    },
    {
      date: new Date("2022-06-12T11:38:15.000-05:00"),
      value: 88.9
    },
    {
      date: new Date("2021-10-22T23:54:03.000-05:00"),
      value: 66.1
    },
    {
      date: new Date("2021-02-17T18:08:09.000-06:00"),
      value: 59.5
    },
    {
      date: new Date("2022-03-26T04:39:04.000-05:00"),
      value: 76.7
    },
    {
      date: new Date("2022-05-30T13:14:46.000-05:00"),
      value: 14.1
    },
    {
      date: new Date("2021-10-27T11:49:53.000-05:00"),
      value: 56.0
    },
    {
      date: new Date("2021-01-10T13:27:15.000-06:00"),
      value: 70.9
    },
    {
      date: new Date("2021-03-31T15:25:14.000-05:00"),
      value: 85.8
    },
    {
      date: new Date("2022-05-15T12:19:58.000-05:00"),
      value: 75.5
    },
    {
      date: new Date("2020-11-24T04:47:29.000-06:00"),
      value: 88.6
    },
    {
      date: new Date("2022-07-20T11:30:02.000-05:00"),
      value: 39.6
    },
    {
      date: new Date("2022-03-19T18:25:44.000-05:00"),
      value: 102.6
    },
    {
      date: new Date("2021-08-26T03:10:31.000-05:00"),
      value: 84.9
    },
    {
      date: new Date("2020-11-10T06:57:30.000-06:00"),
      value: 87.5
    },
    {
      date: new Date("2022-02-05T18:37:17.000-06:00"),
      value: 63.3
    },
    {
      date: new Date("2022-06-23T18:35:43.000-05:00"),
      value: 37.1
    },
    {
      date: new Date("2022-05-14T20:47:28.000-05:00"),
      value: 82.3
    },
    {
      date: new Date("2021-04-08T08:23:01.000-05:00"),
      value: 46.7
    },
    {
      date: new Date("2022-09-23T09:39:47.000-05:00"),
      value: 48.0
    },
    {
      date: new Date("2021-08-05T17:52:06.000-05:00"),
      value: 88.0
    },
    {
      date: new Date("2022-08-23T02:08:51.000-05:00"),
      value: 58.7
    },
    {
      date: new Date("2021-10-08T17:32:19.000-05:00"),
      value: 107.9
    },
    {
      date: new Date("2021-09-18T00:33:47.000-05:00"),
      value: 72.6
    },
    {
      date: new Date("2021-05-03T06:23:13.000-05:00"),
      value: 82.4
    },
    {
      date: new Date("2022-01-21T02:13:55.000-06:00"),
      value: 101.0
    },
    {
      date: new Date("2020-12-01T12:00:20.000-06:00"),
      value: 97.4
    },
    {
      date: new Date("2022-09-18T04:33:35.000-05:00"),
      value: 64.7
    },
    {
      date: new Date("2020-12-18T08:20:23.000-06:00"),
      value: 100.1
    },
    {
      date: new Date("2022-04-28T23:58:25.000-05:00"),
      value: 115.5
    },
    {
      date: new Date("2020-11-13T01:10:21.000-06:00"),
      value: 99.7
    },
    {
      date: new Date("2021-10-08T08:18:08.000-05:00"),
      value: 103.6
    },
    {
      date: new Date("2022-02-25T12:24:41.000-06:00"),
      value: 67.9
    },
    {
      date: new Date("2022-09-05T13:06:15.000-05:00"),
      value: 76.9
    },
    {
      date: new Date("2022-04-01T10:35:46.000-05:00"),
      value: 56.6
    },
    {
      date: new Date("2021-10-28T17:38:46.000-05:00"),
      value: 74.1
    },
    {
      date: new Date("2020-12-13T09:10:41.000-06:00"),
      value: 61.7
    },
    {
      date: new Date("2021-09-19T11:54:21.000-05:00"),
      value: 146.2
    },
    {
      date: new Date("2021-09-24T16:20:04.000-05:00"),
      value: 70.2
    },
    {
      date: new Date("2021-05-03T16:57:55.000-05:00"),
      value: 71.9
    },
    {
      date: new Date("2022-08-21T01:11:10.000-05:00"),
      value: 54.7
    },
    {
      date: new Date("2020-12-08T23:48:43.000-06:00"),
      value: 88.2
    },
    {
      date: new Date("2022-07-03T14:05:37.000-05:00"),
      value: 59.1
    },
    {
      date: new Date("2021-08-12T22:37:00.000-05:00"),
      value: 76.1
    },
    {
      date: new Date("2021-10-19T22:01:33.000-05:00"),
      value: 49.8
    },
    {
      date: new Date("2021-05-24T01:12:20.000-05:00"),
      value: 50.1
    },
    {
      date: new Date("2021-04-25T08:39:02.000-05:00"),
      value: 81.7
    },
    {
      date: new Date("2022-06-28T19:21:22.000-05:00"),
      value: 89.5
    },
    {
      date: new Date("2022-06-15T04:13:23.000-05:00"),
      value: 98.6
    },
    {
      date: new Date("2020-11-02T20:56:02.000-06:00"),
      value: 15.5
    },
    {
      date: new Date("2021-08-30T07:25:27.000-05:00"),
      value: 96.1
    },
    {
      date: new Date("2021-03-22T04:57:14.000-05:00"),
      value: 68.6
    },
    {
      date: new Date("2022-06-02T02:47:48.000-05:00"),
      value: 104.8
    },
    {
      date: new Date("2022-09-16T11:21:53.000-05:00"),
      value: 58.3
    },
    {
      date: new Date("2022-04-26T17:34:40.000-05:00"),
      value: 63.2
    },
    {
      date: new Date("2021-05-11T20:42:10.000-05:00"),
      value: 60.6
    },
    {
      date: new Date("2022-07-10T17:03:22.000-05:00"),
      value: 87.5
    },
    {
      date: new Date("2022-05-20T16:19:52.000-05:00"),
      value: 10.4
    },
    {
      date: new Date("2021-09-14T10:18:07.000-05:00"),
      value: 82.1
    },
    {
      date: new Date("2021-12-15T09:29:23.000-06:00"),
      value: 6.9
    },
    {
      date: new Date("2021-06-07T14:53:25.000-05:00"),
      value: 80.9
    },
    {
      date: new Date("2021-08-28T17:46:21.000-05:00"),
      value: 57.5
    },
    {
      date: new Date("2021-09-27T17:42:28.000-05:00"),
      value: 36.5
    },
    {
      date: new Date("2020-11-08T13:12:44.000-06:00"),
      value: 79.2
    },
    {
      date: new Date("2022-05-18T16:47:39.000-05:00"),
      value: 66.5
    },
    {
      date: new Date("2021-12-30T06:39:35.000-06:00"),
      value: 134.1
    },
    {
      date: new Date("2021-02-23T19:05:22.000-06:00"),
      value: 45.8
    },
    {
      date: new Date("2022-01-13T10:24:09.000-06:00"),
      value: 60.4
    },
    {
      date: new Date("2021-01-07T05:13:50.000-06:00"),
      value: 79.4
    },
    {
      date: new Date("2022-09-07T13:18:35.000-05:00"),
      value: 77.9
    },
    {
      date: new Date("2021-08-10T16:21:10.000-05:00"),
      value: 87.7
    },
    {
      date: new Date("2021-03-08T21:38:23.000-06:00"),
      value: 119.9
    },
    {
      date: new Date("2022-04-23T23:03:12.000-05:00"),
      value: 83.0
    },
    {
      date: new Date("2021-09-16T15:28:42.000-05:00"),
      value: 124.1
    },
    {
      date: new Date("2021-11-22T23:14:45.000-06:00"),
      value: 62.5
    },
    {
      date: new Date("2021-02-02T05:39:24.000-06:00"),
      value: 81.2
    },
    {
      date: new Date("2020-11-17T08:22:21.000-06:00"),
      value: 95.5
    },
    {
      date: new Date("2021-03-22T14:37:56.000-05:00"),
      value: 48.3
    },
    {
      date: new Date("2020-12-14T11:24:46.000-06:00"),
      value: 67.3
    },
    {
      date: new Date("2021-04-04T23:44:13.000-05:00"),
      value: 86.9
    },
    {
      date: new Date("2021-07-15T15:15:57.000-05:00"),
      value: 90.4
    },
    {
      date: new Date("2020-11-04T00:46:16.000-06:00"),
      value: 82.7
    },
    {
      date: new Date("2022-03-19T03:44:54.000-05:00"),
      value: 92.1
    },
    {
      date: new Date("2021-01-26T05:34:41.000-06:00"),
      value: 103.5
    },
    {
      date: new Date("2020-10-31T21:43:03.000-05:00"),
      value: 71.4
    },
    {
      date: new Date("2021-08-03T09:45:11.000-05:00"),
      value: 98.0
    },
    {
      date: new Date("2022-01-21T17:34:15.000-06:00"),
      value: 76.6
    },
    {
      date: new Date("2021-07-12T04:55:09.000-05:00"),
      value: 55.9
    },
    {
      date: new Date("2022-07-28T17:41:35.000-05:00"),
      value: 101.1
    },
    {
      date: new Date("2020-10-19T18:58:50.000-05:00"),
      value: 109.1
    },
    {
      date: new Date("2022-10-18T14:52:46.000-05:00"),
      value: 39.2
    },
    {
      date: new Date("2022-06-16T10:29:08.000-05:00"),
      value: 53.0
    },
    {
      date: new Date("2021-07-17T01:23:29.000-05:00"),
      value: 59.4
    },
    {
      date: new Date("2021-02-28T15:36:30.000-06:00"),
      value: 82.8
    },
    {
      date: new Date("2020-12-26T15:51:33.000-06:00"),
      value: 46.7
    }
  ]
}

const TemperatureDemoData: ChartData = {
  unit: 'F',
  name: 'Temperature',
  values: [
    {
      date: new Date("2021-11-08T04:11:32.000-06:00"),
      value: 89.1
    },
    {
      date: new Date("2021-05-05T20:52:20.000-05:00"),
      value: 80.0
    },
    {
      date: new Date("2021-12-11T09:28:43.000-06:00"),
      value: 58.1
    },
    {
      date: new Date("2021-12-31T04:12:42.000-06:00"),
      value: 93.8
    },
    {
      date: new Date("2021-06-27T21:23:09.000-05:00"),
      value: 107.8
    },
    {
      date: new Date("2022-06-27T11:55:22.000-05:00"),
      value: 59.2
    },
    {
      date: new Date("2022-09-15T08:44:46.000-05:00"),
      value: 84.3
    },
    {
      date: new Date("2021-08-01T02:40:02.000-05:00"),
      value: 93.0
    },
    {
      date: new Date("2021-06-30T06:15:45.000-05:00"),
      value: 77.8
    },
    {
      date: new Date("2021-08-27T23:15:38.000-05:00"),
      value: 84.7
    },
    {
      date: new Date("2021-02-07T20:38:12.000-06:00"),
      value: 124.6
    },
    {
      date: new Date("2022-07-14T23:23:22.000-05:00"),
      value: 71.6
    },
    {
      date: new Date("2021-04-11T10:58:15.000-05:00"),
      value: 48.4
    },
    {
      date: new Date("2022-01-04T23:04:20.000-06:00"),
      value: 104.8
    },
    {
      date: new Date("2021-03-05T09:57:30.000-06:00"),
      value: 100.6
    },
    {
      date: new Date("2021-06-13T15:51:21.000-05:00"),
      value: 77.3
    },
    {
      date: new Date("2020-12-02T19:49:38.000-06:00"),
      value: 95.1
    },
    {
      date: new Date("2021-08-19T07:55:51.000-05:00"),
      value: 110.3
    },
    {
      date: new Date("2020-12-05T05:20:58.000-06:00"),
      value: 96.0
    },
    {
      date: new Date("2020-12-31T07:13:36.000-06:00"),
      value: 97.3
    },
    {
      date: new Date("2021-01-10T21:18:33.000-06:00"),
      value: 100.5
    },
    {
      date: new Date("2021-11-11T22:56:25.000-06:00"),
      value: 98.1
    },
    {
      date: new Date("2022-06-15T07:30:16.000-05:00"),
      value: 59.3
    },
    {
      date: new Date("2022-03-19T17:26:20.000-05:00"),
      value: 89.3
    },
    {
      date: new Date("2022-04-03T21:26:02.000-05:00"),
      value: 120.1
    },
    {
      date: new Date("2021-10-03T23:34:51.000-05:00"),
      value: 106.1
    },
    {
      date: new Date("2022-10-09T19:09:06.000-05:00"),
      value: 51.2
    },
    {
      date: new Date("2022-03-13T19:22:27.000-05:00"),
      value: 101.0
    },
    {
      date: new Date("2020-12-29T21:26:53.000-06:00"),
      value: 61.5
    },
    {
      date: new Date("2020-11-06T21:56:43.000-06:00"),
      value: 81.6
    },
    {
      date: new Date("2022-01-12T23:21:16.000-06:00"),
      value: 43.1
    },
    {
      date: new Date("2021-04-06T11:59:33.000-05:00"),
      value: 80.7
    },
    {
      date: new Date("2021-06-21T09:59:13.000-05:00"),
      value: 105.7
    },
    {
      date: new Date("2022-05-15T19:32:29.000-05:00"),
      value: 92.2
    },
    {
      date: new Date("2022-08-23T06:28:13.000-05:00"),
      value: 76.1
    },
    {
      date: new Date("2021-07-09T03:18:57.000-05:00"),
      value: 63.2
    },
    {
      date: new Date("2022-07-28T06:49:35.000-05:00"),
      value: 86.7
    },
    {
      date: new Date("2021-03-31T04:44:30.000-05:00"),
      value: 23.4
    },
    {
      date: new Date("2022-06-30T12:10:43.000-05:00"),
      value: 97.2
    },
    {
      date: new Date("2021-06-11T18:38:43.000-05:00"),
      value: 113.3
    },
    {
      date: new Date("2020-12-22T11:31:49.000-06:00"),
      value: 109.2
    },
    {
      date: new Date("2021-04-15T11:11:23.000-05:00"),
      value: 117.1
    },
    {
      date: new Date("2021-12-28T11:11:34.000-06:00"),
      value: 78.8
    },
    {
      date: new Date("2021-12-25T14:31:13.000-06:00"),
      value: 92.9
    },
    {
      date: new Date("2021-05-14T15:27:29.000-05:00"),
      value: 35.4
    },
    {
      date: new Date("2021-06-16T07:44:36.000-05:00"),
      value: 47.4
    },
    {
      date: new Date("2022-06-02T03:45:41.000-05:00"),
      value: 67.8
    },
    {
      date: new Date("2021-11-22T03:48:36.000-06:00"),
      value: 29.1
    },
    {
      date: new Date("2022-02-09T22:08:13.000-06:00"),
      value: 80.5
    },
    {
      date: new Date("2022-09-29T08:50:11.000-05:00"),
      value: 90.5
    },
    {
      date: new Date("2021-11-18T17:16:49.000-06:00"),
      value: 92.3
    },
    {
      date: new Date("2022-03-19T04:12:37.000-05:00"),
      value: 81.9
    },
    {
      date: new Date("2022-02-02T00:54:43.000-06:00"),
      value: 92.7
    },
    {
      date: new Date("2021-07-03T18:26:12.000-05:00"),
      value: 41.1
    },
    {
      date: new Date("2022-08-09T06:51:03.000-05:00"),
      value: 79.7
    },
    {
      date: new Date("2022-03-16T10:30:49.000-05:00"),
      value: 59.5
    },
    {
      date: new Date("2021-04-26T09:28:21.000-05:00"),
      value: 65.8
    },
    {
      date: new Date("2021-07-19T17:36:39.000-05:00"),
      value: 68.4
    },
    {
      date: new Date("2022-03-11T02:27:12.000-06:00"),
      value: 41.9
    },
    {
      date: new Date("2021-06-02T21:33:28.000-05:00"),
      value: 104.9
    },
    {
      date: new Date("2020-10-29T04:42:02.000-05:00"),
      value: 96.8
    },
    {
      date: new Date("2022-04-11T03:15:56.000-05:00"),
      value: 98.7
    },
    {
      date: new Date("2021-07-17T01:17:24.000-05:00"),
      value: 112.1
    },
    {
      date: new Date("2021-03-02T12:28:40.000-06:00"),
      value: 95.1
    },
    {
      date: new Date("2021-06-06T19:01:13.000-05:00"),
      value: 65.7
    },
    {
      date: new Date("2022-05-17T12:01:51.000-05:00"),
      value: 87.3
    },
    {
      date: new Date("2021-01-15T09:12:13.000-06:00"),
      value: 94.1
    },
    {
      date: new Date("2020-11-02T21:17:28.000-06:00"),
      value: 23.9
    },
    {
      date: new Date("2021-06-27T16:19:13.000-05:00"),
      value: 43.2
    },
    {
      date: new Date("2021-08-19T12:31:32.000-05:00"),
      value: 69.1
    },
    {
      date: new Date("2021-03-30T01:06:47.000-05:00"),
      value: 69.7
    },
    {
      date: new Date("2021-02-04T18:06:07.000-06:00"),
      value: 85.9
    },
    {
      date: new Date("2021-05-14T00:13:43.000-05:00"),
      value: 87.2
    },
    {
      date: new Date("2022-06-17T20:55:11.000-05:00"),
      value: 90.1
    },
    {
      date: new Date("2022-10-03T17:11:26.000-05:00"),
      value: 89.1
    },
    {
      date: new Date("2022-07-08T16:42:30.000-05:00"),
      value: 92.2
    },
    {
      date: new Date("2022-06-26T05:47:52.000-05:00"),
      value: 76.5
    },
    {
      date: new Date("2022-07-31T04:04:05.000-05:00"),
      value: 35.3
    },
    {
      date: new Date("2022-05-30T05:10:28.000-05:00"),
      value: 96.7
    },
    {
      date: new Date("2021-07-30T17:12:03.000-05:00"),
      value: 85.6
    },
    {
      date: new Date("2021-10-20T09:41:15.000-05:00"),
      value: 85.0
    },
    {
      date: new Date("2021-07-14T18:34:34.000-05:00"),
      value: 76.5
    },
    {
      date: new Date("2022-02-18T12:11:47.000-06:00"),
      value: 60.7
    },
    {
      date: new Date("2021-12-15T06:57:08.000-06:00"),
      value: 88.8
    },
    {
      date: new Date("2022-02-28T03:01:02.000-06:00"),
      value: 44.1
    },
    {
      date: new Date("2021-01-24T06:16:10.000-06:00"),
      value: 115.5
    },
    {
      date: new Date("2021-09-16T11:10:00.000-05:00"),
      value: 31.3
    },
    {
      date: new Date("2021-10-23T18:11:36.000-05:00"),
      value: 70.4
    },
    {
      date: new Date("2021-10-06T04:48:34.000-05:00"),
      value: 113.3
    },
    {
      date: new Date("2020-12-01T21:09:12.000-06:00"),
      value: 56.3
    },
    {
      date: new Date("2022-01-01T09:38:58.000-06:00"),
      value: 64.7
    },
    {
      date: new Date("2022-08-05T19:18:44.000-05:00"),
      value: 109.2
    },
    {
      date: new Date("2021-01-13T02:13:51.000-06:00"),
      value: 85.7
    },
    {
      date: new Date("2022-03-18T17:10:38.000-05:00"),
      value: 127.9
    },
    {
      date: new Date("2021-12-19T07:49:03.000-06:00"),
      value: 112.1
    },
    {
      date: new Date("2022-09-15T14:48:43.000-05:00"),
      value: 78.0
    },
    {
      date: new Date("2021-10-16T12:23:45.000-05:00"),
      value: 47.9
    },
    {
      date: new Date("2021-12-04T23:15:20.000-06:00"),
      value: 62.1
    },
    {
      date: new Date("2021-06-28T08:38:41.000-05:00"),
      value: 67.5
    },
    {
      date: new Date("2021-12-08T04:34:16.000-06:00"),
      value: 126.4
    }
  ]
}

const getRandomValues = (arr: any[], count: number) => {
  let result = [];
  const _tmp = arr.slice();
  for (let i = 0; i < count; i++) {
    const index = Math.ceil(Math.random() * 10) % _tmp.length;
    result.push(_tmp.splice(index, 1)[0]);
  }
  return result;
}


export const getDemoHumidityData = (unit: UnitType): ChartData => {
  console.log('DEMO > Fetching humidity demo data for unit', unit);
  const sortedData = HumidityDemoData;
  sortedData.values = getRandomValues(sortedData.values.sort((a, b) => a.date.getDate() - b.date.getDate()), 20)

  return sortedData;
}

export const getDemoTemperatureData = (unit: UnitType): ChartData => {
  console.log('DEMO > Fetching demo temperature data for unit', unit);
  const sortedData = TemperatureDemoData;
  sortedData.values = getRandomValues(sortedData.values.sort((a, b) => a.date.getDate() - b.date.getDate()), 20)

  return sortedData
}
