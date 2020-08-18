import React from 'react';
import CheckboxTree from 'react-checkbox-tree';

class Tree extends React.Component
{
    state = {
        checked: [],
        expanded: [],
    };

    

    render() {
        return (
            <CheckboxTree
                nodes={this.props.nodes}
                //checked={this.state.checked}
                expanded={this.state.expanded}
                //onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
                showNodeIcon={this.props.showNodeIcon}
                expandOnClick={true}
                onClick={() => {}}
                onCheck={this.props.onCheck}
                checked={this.props.checked}
            />
        );
    }
}

export default Tree;