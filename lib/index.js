
import React, { Component, PropTypes } from 'react'
import Flatpickr from 'flatpickr'

class DateTimePicker extends Component {

  static propTypes = {
    options: PropTypes.object,
  }

  static defaultProps = {
    options: {}
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      this.flatpickr.setDate(props.value, false);
    } else if (!props.value && props.value !== this.props.value) {
      // Explicitly clear the Datepicker input field to prevent stale data from being displayed
      // This _should_ not triggger a change event because clear()
      // sets the new Date to [] and this value is provided to onChange() to set the new date.
      this.flatpickr.clear(false);
    }
    
    const optionsKeys = Object.getOwnPropertyNames(props.options)

    for (let index = optionsKeys.length - 1; index >= 0; index--) {
      const key = optionsKeys[index]
      this.flatpickr.set(key, props.options[key])
    }
  }

  componentDidMount() {
    const options = {
        ...this.props.options,
        onChange: this.props.onChange
    }

    const flatpickrNode = this.props.options.wrap ? this.node.parentElement : this.node;

    this.flatpickr = new Flatpickr(flatpickrNode, options)
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  render() {
    // ignore onChange, options
    // eslint-disable-next-line no-unused-vars
    const { onChange, options, defaultValue, value, ...props } = this.props
    return (
      <input {...props} defaultValue={defaultValue || value} ref={node => this.node = node} />
    )
  }
}

export default DateTimePicker
