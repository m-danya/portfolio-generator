import React from 'react';
import { Dropdown } from 'semantic-ui-react'

class TagSearch extends React.Component {
    render() {
        return (
            <div>
                <Dropdown
                    placeholder='Теги и клиенты'
                    fluid
                    multiple
                    clearable
                    search
                    selection
                    options={this.props.tags}
                    value={this.props.filterChosenTags}
                    onChange={this.props.handleFilterTagsChange}
                    noResultsMessage={this.props.noResultsMessage}

                />
            </div>
        )
    }
}

export default TagSearch