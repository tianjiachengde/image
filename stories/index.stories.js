/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import imageScreenShoot from '../src/components/image-screen-shoot/imageScreenShoot.vue'
import imageScreenShoot from 'image-screen-shoot-tjc'
import MyButton from './MyButton';
import Welcome from './Welcome';

storiesOf('Welcome', module).add('to Storybook', () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />',
  methods: { action: linkTo('Button') },
}));
storiesOf('imageScreenShoot',module)
    .add('JSX', () => ({
      components:{imageScreenShoot},
      render(h) {
        return <imageScreenShoot width={200} height={300}
        url ={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' } />
      }
    }))
storiesOf('Button', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action('clicked') },
  }))
  .add('with JSX', () => ({
    components: { MyButton },
    // eslint-disable-next-line no-unused-vars
    render(h) {
      return <my-button onClick={this.action}>With JSX</my-button>;
    },
    methods: { action: linkTo('clicked') },
  }))
  .add('with some emoji', () => ({
    components: { MyButton },
    template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
    methods: { action: action('clicked') },
  }));

/* eslint-enable react/react-in-jsx-scope */
