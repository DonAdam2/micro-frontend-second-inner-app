//components
import Tabs from '../components/shared/tabs/Tabs';

const TestComponent = () => {
  return (
    <Tabs activeTab={0}>
      <div label="First">First tab content</div>
      <div label="Second">Second tab content</div>
      <div label="Third">Third tab content</div>
      <div label="Fourth">Fourth tab content</div>
      <div label="Fifth">Fifth tab content</div>
      <div label="Sixth">Sixth tab content</div>
      <div label="Seventh">Seventh tab content</div>
    </Tabs>
  );
};

export default TestComponent;
