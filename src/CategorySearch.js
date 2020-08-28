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
                clearable   
                search
                selection
                options={this.props.tags}
                value={this.props.filterChosenCategories}
                onChange={this.props.handleFilterCategoryChange}
                noResultsMessage={this.props.noResultsMessage}
            />
        </div>
        )
    }
}

export default CategorySearch