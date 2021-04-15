import contrib from 'blessed-contrib'
import { IGridLayout, IPaneConfig, IPane } from '../interfaces'
import { createLogPane } from './log'

export const createStreamPane = (layout: IGridLayout, container: contrib.grid, index: number, paneOptions: IPaneConfig): IPane => {
  const pane = createLogPane(layout, container, index, { label: paneOptions.label })

  paneOptions.stream!.on('data', chunk => {
    pane.element.setContent(pane.element.content + chunk.toString())
  })

  return pane
}
