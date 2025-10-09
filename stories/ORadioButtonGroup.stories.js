import ORadioButtonGroup from '../src/components/ORadioButtonGroup.vue';
import { ref } from 'vue';

export default {
  title: 'Components/ORadioButtonGroup',
  component: ORadioButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Вариант стиля группы'
    },
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Размер группы'
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Направление расположения'
    }
  }
};

export const Default = {
  render: (args) => ({
    components: { ORadioButtonGroup },
    setup() {
      return { args };
    },
    template: '<ORadioButtonGroup v-bind="args" />'
  }),
  args: {
    variant: 'primary',
    size: 'md',
    direction: 'vertical'
  }
};

export const AllDirections = {
  render: () => ({
    components: { ORadioButtonGroup },
    setup() {
      return {};
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3>Vertical</h3>
          <ORadioButtonGroup direction="vertical">
            <template #default>
              <div>Option 1</div>
              <div>Option 2</div>
              <div>Option 3</div>
            </template>
          </ORadioButtonGroup>
        </div>
        <div>
          <h3>Horizontal</h3>
          <ORadioButtonGroup direction="horizontal">
            <template #default>
              <div>Option 1</div>
              <div>Option 2</div>
              <div>Option 3</div>
            </template>
          </ORadioButtonGroup>
        </div>
      </div>
    `
  })
};