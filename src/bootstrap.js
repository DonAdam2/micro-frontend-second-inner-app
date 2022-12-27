import { createRoot } from 'react-dom/client';
//import meta image
import '../public/assets/images/metaImage.jpg';
//root component
import App from './App';

const container = document.getElementById('root'),
  root = createRoot(container);

root.render(<App />);
