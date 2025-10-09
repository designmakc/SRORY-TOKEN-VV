import OCheckboxGroup from '../src/components/OCheckboxGroup.vue';
import { ref } from 'vue';

export default {
  title: 'Components/OCheckboxGroup',
  component: OCheckboxGroup,
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
  args: {
    variant: 'primary',
    size: 'md',
    direction: 'vertical'
  }
};

export const AllDirections = {
  render: () => ({
    components: { OCheckboxGroup },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3>Vertical</h3>
          <OCheckboxGroup direction="vertical">
            <template #default>
              <div>Option 1</div>
              <div>Option 2</div>
              <div>Option 3</div>
            </template>
          </OCheckboxGroup>
        </div>
        <div>
          <h3>Horizontal</h3>
          <OCheckboxGroup direction="horizontal">
            <template #default>
              <div>Option 1</div>
              <div>Option 2</div>
              <div>Option 3</div>
            </template>
          </OCheckboxGroup>
        </div>
      </div>
    `
  })
};