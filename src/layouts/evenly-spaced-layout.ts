import { IGridLayout } from '../interfaces'

export const createEvenlySpacedLayout = (panes: number): IGridLayout => {
  let rows = biggestNumberSquaredUnderGoal(panes)
  let extraPanes = panes - rows ** 2

  while (extraPanes > rows) {
    rows += 1
    extraPanes = panes - rows ** 2
  }

  const rowsToExtend = extraPanes > 0 ? extraPanes : 0
  const rowsToShrink = extraPanes < 0 ? Math.abs(extraPanes) : 0

  let layout: IGridLayout = []

  for (let row = 0; row < rows; row++) {
    const extendRow = rowsToExtend > row
    const shrinkRow = (rows - rowsToShrink) < row + 1
    const cols = extendRow ? rows + 1 : shrinkRow ? rows - 1 : rows

    for (let col = 0; col < cols; col++) {
      layout.push([row, col])
    }
  }

  return layout
}

const biggestNumberSquaredUnderGoal = (goal: number, current: number = 0): number => {
  if (current ** 2 > goal) return current - 1
  return biggestNumberSquaredUnderGoal(goal, current + 1)
}
