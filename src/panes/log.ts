import blessed from 'blessed'
import contrib from 'blessed-contrib'
import { IGridLayout, IPane } from '../interfaces'
import { createBasePane } from './base'

export const createLogPane = (layout: IGridLayout, container: contrib.grid, index: number, { label }: { label: string }): IPane => {
  const pane = createBasePane(layout, container, index)
  const element = blessed.log({
    parent: pane.element,
    label: ` ${label} `,
    tags: true,
    content: '',
    mouse: true,
    scrollbar: true as any,
    border: { type: 'line' },
    style: {
      label: { bold: true },
      border: { fg: 'grey' },
      scrollbar: { bg: 'grey' },
      focus: {
        scrollbar: { bg: 'green' },
        border: { fg: 'green' }
      }
    },
  })

  return { ...pane, element, label }
}
