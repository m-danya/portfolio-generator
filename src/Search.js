import React from 'react';
import { Dropdown } from 'semantic-ui-react'



class Search extends React.Component
{
    render()
    {
        return (
        <div>
            <Dropdown
                placeholder='По названию проекта'
                fluid
                //multiple
                clearable
                search
                selection
                options={this.props.tags}
                onChange={this.props.filterChangedName}
            />
        </div>
        )
    }
}

export default Search