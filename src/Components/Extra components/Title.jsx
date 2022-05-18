import React from 'react'
import {Helmet} from "react-helmet";
export default class Child extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          title: props.title,
          description: props.description
      }
  }
  
  render() {
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.state.title}</title>
          <meta name="description" content={this.state.description} />
        </Helmet>
    )
  }}