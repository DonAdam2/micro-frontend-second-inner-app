import { useMemo } from 'react';
//components
import Tabs from '../components/shared/Tabs';

const TestComponent = () => {
  const tabsList = useMemo(
    () => [
      {
        label: 'First',
        // use the following if you want to bind active tab with URL
        // tabUrl: '/first',
        content: <span>First tab content</span>,
      },
      {
        label: 'Second',
        content: <span>Second tab content</span>,
      },
      {
        label: 'Third',
        content: <span>Third tab content</span>,
      },
      {
        label: 'Fourth',
        content: <span>Fourth tab content</span>,
      },
      {
        label: 'Fifth',
        content: <span>Fifth tab content</span>,
      },
      {
        label: 'Sixth',
        content: <span>Sixth tab content</span>,
      },
      {
        label: 'Seventh',
        content: <span>Seventh tab content</span>,
      },
    ],
    []
  );

  return <Tabs tabsList={tabsList} />;
};

export default TestComponent;
