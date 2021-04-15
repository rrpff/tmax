#!/usr/bin/env node

import path from 'path'
import blessed from 'blessed'
import contrib from 'blessed-contrib'
import { GRID_HEIGHT, GRID_WIDTH, HEADING_HEIGHT } from './config'
import { IWorkspaceConfig } from './interfaces'
import { createEvenlySpacedLayout } from './layouts/evenly-spaced-layout'
import { createFunctionPane } from './panes/function'
import { createParallelPane } from './panes/parallel'
import { createShellPane } from './panes/shell'
import { createStreamPane } from './panes/stream'

const start = async (config: IWorkspaceConfig) => {
  const screen = blessed.screen({ smartCSR: true })

  try {
    screen.title = config.title

    const layout = createEvenlySpacedLayout(config.panes.length)
    const grid = new contrib.grid({
      rows: GRID_HEIGHT,
      cols: GRID_WIDTH,
      screen: screen,
      hideBorder: true
    })

    const headingTitle = `{bold}${config.title}{/bold}`
    const heading = grid.set(0, 0, HEADING_HEIGHT, GRID_WIDTH, blessed.box, {
      tags: true,
      content: `${headingTitle}\n{grey-fg}Starting...{/grey-fg}`
    })

    screen.render()

    const panes = config.panes.map((options, index) => {
      if (options.command) return createShellPane(layout, grid, index, options, config)
      if (options.commands) return createParallelPane(layout, grid, index, options, config)
      if (options.stream) return createStreamPane(layout, grid, index, options)
      if (options.function) return createFunctionPane(layout, grid, index, options)
      throw new Error(`Invalid pane: ${options.label}`)
    })

    const setStatus = (status: string) => {
      heading.setContent(`${headingTitle}\n${status}`)
    }

    const destroy = async () => {
      screen.destroy()

      await Promise.all(panes.map(async pane => {
        console.log(`Shutting down ${pane.label}...`)
        await pane.kill()
      }))

      console.log('Shutting down...')
      setTimeout(() => {
        process.exit(0)
      }, 500)
    }

    screen.key(['C-c'], destroy)

    if (panes.length > 0) {
      panes[0].focus()
    }

    screen.render()
    setStatus('{green-fg}Running{/green-fg}')
  } catch (e) {
    screen.destroy()
    throw e
  }
}

const argv = process.argv[0] === 'tmax' ? process.argv.slice(1) : process.argv.slice(2)

const resolveConfigPath = (fpath: string | undefined) => {
  if (fpath === undefined) return null
  try {
    const resolved = path.resolve(process.cwd(), fpath)
    require(resolved)
    return resolved
  } catch {
    return null
  }
}

const getConfigPath = () => {
  if (argv[0] === undefined)
    return resolveConfigPath('tmax.config.js') || resolveConfigPath('tmax.config.json')

  const fpath = resolveConfigPath(argv[0])
  if (fpath === null) {
    console.error(`Config file does not exist: ${argv[0]}`)
    process.exit(1)
  }

  return fpath
}

const configFilePath = getConfigPath()
if (!configFilePath) {
  console.error('No tmax.config.js or tmax.config.json file')
  process.exit(1)
}

const config = require(configFilePath)
const cwd = path.dirname(configFilePath)

let defaultTitle = 'tmax'
try {
  defaultTitle = require(path.join(cwd, 'package.json')).name
} catch {}

const defaults = {
  title: defaultTitle,
  cwd: cwd,
  panes: []
}

start({ ...defaults, ...config })
