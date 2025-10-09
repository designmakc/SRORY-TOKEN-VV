import OIconWrap from '../src/components/OIconWrap.vue'

export default {
  title: 'Components/OIconWrap',
  component: OIconWrap,
  tags: ['autodocs'],
  argTypes: {
    sizeIcon: {
      control: 'select',
      options: [12, 16, 20, 24, 32, 40, 56],
      description: 'Размер иконки в пикселях'
    },
    icon: {
      control: 'text',
      description: 'Путь к иконке (категория/название)'
    },
    hasCounter: {
      control: 'boolean',
      description: 'Показывать счетчик'
    },
    counterValue: {
      control: 'number',
      description: 'Значение счетчика'
    }
  }
};

export const Default = {
  args: {
    sizeIcon: 24,
    icon: 'navigation-action/play',
    hasCounter: false,
    counterValue: 5
  }
};

export const AllSizes = {
  render: () => ({
    components: { OIconWrap },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <OIconWrap :sizeIcon="12" icon="navigation-action/play" />
        <OIconWrap :sizeIcon="16" icon="navigation-action/play" />
        <OIconWrap :sizeIcon="20" icon="navigation-action/play" />
        <OIconWrap :sizeIcon="24" icon="navigation-action/play" />
        <OIconWrap :sizeIcon="32" icon="navigation-action/play" />
        <OIconWrap :sizeIcon="40" icon="navigation-action/play" />
        <OIconWrap :sizeIcon="56" icon="navigation-action/play" />
      </div>
    `
  })
};

export const WithCounter = {
  render: () => ({
    components: { OIconWrap },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <OIconWrap :sizeIcon="24" icon="navigation-action/play" :hasCounter="true" :counterValue="5" />
        <OIconWrap :sizeIcon="32" icon="navigation-action/play" :hasCounter="true" :counterValue="99" />
      </div>
    `
  })
};