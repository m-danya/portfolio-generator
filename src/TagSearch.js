import React from 'react';
import { Dropdown } from 'semantic-ui-react'

class TagSearch extends React.Component
{
    render()
    {
        return (
        <div>
            <Dropdown
                placeholder='Теги'
                fluid
                multiple
                clearable
                search
                selection
                options={this.props.tags}
            />
        </div>
        )
    }
}

export default TagSearch