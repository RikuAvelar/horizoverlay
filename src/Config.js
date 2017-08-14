import React, { Component } from 'react'
import { withHelper } from './helpers'

import './css/config.css'

class ConfigRaw extends Component {
  state = { ...this.props }
  handleConfig = e => {
    const target = e.target
    if (target.type === 'text') e.preventDefault()
    const config = { ...this.state.config }
    let key = target.name,
      value = target.value

    // Why aren't HTML elements more consistent? 😦
    if (target.type === 'checkbox') {
      value = target.checked
    }

    // update the value in our copied state...
    config[key] = value
    // ...and set it to component' state
    this.setState({ config })

    // And then save it to localStorage!
    localStorage.setItem('horizoverlay', JSON.stringify(config))
  }
  resetConfig = e => {
    e.preventDefault()

    // Clear any setup
    window.localStorage.clear()

    // send to the wrapper component
    this.props.handleReset(e)

    // well that's horrible
    window.location.reload()
  }
  // *** IMPORTANT ***
  // Gotta bind 'onChange' for checkboxes since false values don't bubble to 'onChange'!
  render() {
    let { config } = this.state
    return (
      <div className="config">
        <form onSubmit={e => this.resetConfig(e)}>
          <label
            htmlFor="showSetup"
            className={`setup-btn${config.showSetup ? '' : ' disabled'}`}
          >
            <span>
              <input
                type="checkbox"
                name="showSetup"
                id="showSetup"
                checked={config.showSetup}
                onChange={this.handleConfig}
              />{' '}
              Setup Mode
            </span>
          </label>

          <fieldset>
            <legend>Character Name</legend>
            <div>
              <label htmlFor="characterName">Your character's name:</label>
              <input
                type="text"
                name="characterName"
                value={config.characterName}
                placeholder={config.characterName}
                onChange={this.handleConfig}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Color theme</legend>
            <div>
              <input
                type="radio"
                name="color"
                id="colorByRole"
                value="byRole"
                checked={config.color === 'byRole'}
                onChange={this.handleConfig}
              />
              <label htmlFor="colorByRole">Color By Role</label>
              <br />
              <input
                type="radio"
                name="color"
                id="colorBlackWhite"
                value="blackWhite"
                checked={config.color === 'blackWhite'}
                onChange={this.handleConfig}
              />
              <label htmlFor="colorBlackWhite">Black & White</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Check to Show</legend>
            <input
              type="checkbox"
              name="showDuration"
              id="showDuration"
              defaultChecked={config.showDuration}
              onChange={this.handleConfig}
            />
            <label htmlFor="showDuration">Duration</label>
            <input
              type="checkbox"
              name="showTotalDps"
              id="showTotalDps"
              defaultChecked={config.showTotalDps}
              onChange={this.handleConfig}
            />
            <label htmlFor="showTotalDps">Total DPS</label>
            <input
              type="checkbox"
              name="showHps"
              id="showHps"
              defaultChecked={config.showHps}
              onChange={this.handleConfig}
            />
            <label htmlFor="showHps">HPS</label>
            <br />
            <input
              type="checkbox"
              name="showJobIcon"
              id="showJobIcon"
              defaultChecked={config.showJobIcon}
              onChange={this.handleConfig}
            />
            <label htmlFor="showJobIcon">Job Icon</label>
            <input
              type="checkbox"
              name="showRank"
              id="showRank"
              defaultChecked={config.showRank}
              onChange={this.handleConfig}
            />
            <label htmlFor="showRank">Rank</label>
            <input
              type="checkbox"
              name="showDamagePercent"
              id="showDamagePercent"
              defaultChecked={config.showDamagePercent}
              onChange={this.handleConfig}
            />
            <label htmlFor="showDamagePercent">Damage Percent</label>
          </fieldset>
          <fieldset>
            <legend>Scale</legend>
            <button
              type="button"
              className=""
              onClick={this.handleConfig}
              name="zoom"
              value="0.5"
            >
              50%
            </button>
            <button
              type="button"
              className=""
              onClick={this.handleConfig}
              name="zoom"
              value="1"
            >
              100%
            </button>
            <button
              type="button"
              className=""
              onClick={this.handleConfig}
              name="zoom"
              value="1.1"
            >
              110%
            </button>
            <button
              type="button"
              className=""
              onClick={this.handleConfig}
              name="zoom"
              value="1.25"
            >
              125%
            </button>
            <button
              type="button"
              className=""
              onClick={this.handleConfig}
              name="zoom"
              value="1.5"
            >
              150%
            </button>
            <button
              type="button"
              className=""
              onClick={this.handleConfig}
              name="zoom"
              value="2"
            >
              200%
            </button>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              id="zoom"
              name="zoom"
              value={config.zoom}
              onChange={this.handleConfig}
            />
            <label htmlFor="zoom">Zoom Scale</label>
          </fieldset>
          <button type="submit" className="reset">
            <span>Reset</span>
          </button>
        </form>
        <div>
          Resize this window as necessary. Everything saves automatically.{' '}
          <strong>Right click</strong> open this window.
        </div>
      </div>
    )
  }
}

const Config = withHelper(ConfigRaw)
export default Config
