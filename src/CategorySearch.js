import React from 'react';
import { Dropdown } from 'semantic-ui-react'

class CategorySearch extends React.Component
{
    render()
    {
        return (
        <div>
            <Dropdown
                placeholder='Категория'
                fluid
                multiple
                //clearable их и так можно чистить
                search
                selection
                options={this.props.tags}
            />
        </div>
        )
    }
}

export default CategorySearch