import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const MyCheckbox = (props) => (
  <Checkbox label={"i = " + props.depth + props.label}/>
)

export default MyCheckbox
