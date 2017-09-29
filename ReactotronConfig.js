import Reactotron, { trackGlobalErrors, openInEditor, overlay, asyncStorage, networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron
  .configure({ name: 'ZaShoes React Native' })
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  // https://github.com/infinitered/reactotron/blob/master/docs/plugin-redux.md
  .use(reactotronRedux());
