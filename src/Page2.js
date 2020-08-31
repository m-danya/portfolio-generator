import {
    Card,
    Dimmer,
    Loader,
    Button,
    Icon,
}
    from 'semantic-ui-react'

import DndList from './DndList'

import React, { Component } from 'react';

class Page2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        console.log('didmount! ' + this.props.data.length + ', wow!')
        let projects = []
        if (this.props.data && this.props.data.length)
            for (let p of this.props.data) {
                if (this.props.chosenProjects[p.number]) {
                    projects.push(p)
                }
            }
        this.setState({
            projects: projects,
            loading: false,
        })
    }

    render() {
        return (
            <div>
                {this.state.loading &&

                    <div style={{ height: "500px" }}>
                        <Dimmer active>
                            <Loader indeterminate> Обрабатываем данные...</Loader>
                        </Dimmer>

                    </div>
                }
                {!this.state.loading &&
                    <div>
                        <Button
                            color="orange"
                            fluid
                            icon
                            onClick={() => { this.props.setPage('main') }}>
                            <Icon name="left arrow" />&nbsp;Назад
                        </Button>

                        <DndList
                            img_add_prefix={this.props.img_add_prefix}
                            items={this.state.projects}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default Page2