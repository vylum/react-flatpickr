
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
      this.flatpickr.setDate(props.value);
    } else {
      this.flatpickr.clear(false);
    }
    
    const optionsKeys = Object.getOwnPropertyNames(props.options)

    for (let index = optionsKeys.length - 1; index >= 0; index--) {
      const key = optionsKeys[index]
      this.flatpickr.set(key, props.options[key])
    }
  }

  componentDidMount() {
    this.addLocale(this.props.options.locale);
    
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

  /**
   * Tries to add the provided locale to the flatpickr. When it fails to find the locale file, 
   * nothing will be added and flatpickr will complain about not finding the locale.
   *
   * @param {string} locale - The name of the locale to be added.
   */
  addLocale(locale) {
    if (locale) {
        let localeObject = null;
        try {
          localeObject = require('flatpickr/dist/l10n/' + locale);
        } catch (ex) {
          //Dont do anything
        }
        if (localeObject) {
	  Flatpickr.l10ns[locale] = Flatpickr.localize(localeObject[locale]);
        }
    }
  }

}

export default DateTimePicker
