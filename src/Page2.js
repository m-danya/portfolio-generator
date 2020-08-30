import {
    Card
}
    from 'semantic-ui-react'

import DndList from './DndList'

import React, { Component } from 'react';

class Page2 extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        //console.log('didmount! ' + this.props.data.length + ', wow!')
        let projects = []
        if (this.props.data && this.props.data.length)
            for (let p of this.props.data) {
                if (this.props.chosenProjects[p.number]) {
                    projects.push(p)
                }
            }
        this.setState({
            projects: projects,
        })
    }

    render() {
        return (
            <div>
                <DndList
                    img_add_prefix={this.props.img_add_prefix}
                />
            </div>
        );
    }
}

export default Page2