import { useMemo } from 'react';
//components
import Tabs from '../components/shared/Tabs';

const TestComponent = () => {
  const tabsList = useMemo(
    () => [
      {
        label: 'First',
        //binds the tab with the url, it's relative to the route that renders the tabs (:tab? in App.jsx)
        tabUrl: 'first',
        content: <span>First tab content</span>,
      },
      {
        label: 'Second',
        tabUrl: 'second',
        content: <span>Second tab content</span>,
      },
      {
        label: 'Third',
        tabUrl: 'third',
        content: <span>Third tab content</span>,
      },
      {
        label: 'Fourth',
        tabUrl: 'fourth',
        content: <span>Fourth tab content</span>,
      },
      {
        label: 'Fifth',
        tabUrl: 'fifth',
        content: <span>Fifth tab content</span>,
      },
      {
        label: 'Sixth',
        tabUrl: 'sixth',
        content: <span>Sixth tab content</span>,
      },
      {
        label: 'Seventh',
        tabUrl: 'seventh',
        content: <span>Seventh tab content</span>,
      },
    ],
    []
  );

  return <Tabs tabsList={tabsList} />;
};

export default TestComponent;
