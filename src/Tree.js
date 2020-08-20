import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './my-style.css';


class Tree extends React.Component
{
    state = {
        //checked: [],
        //expanded: [],
    };

    

    render() {
        return (
            <CheckboxTree
                nodes={this.props.nodes}
                //already set (see below)  checked={this.state.checked}
                //expanded={this.state.expanded}
                //onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
                showNodeIcon={this.props.showNodeIcon}
                checkOnClick={true}
                //onClick={() => {}}
                onCheck={this.props.handleCheckTag}
                checked={this.props.checked}
                expanded={this.props.expanded}
                
                //onClick={(flag) => {this.props.handleCheckTag([flag])}}
            />
        );
    }
}

export default Tree;