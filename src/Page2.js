import {
    Card,
    Dimmer,
    Loader,
    Button,
    Grid,
    Segment,
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
                    <Segment.Group>
                        <Segment>
                            <div style={{ height: "500px" }}>
                                <Dimmer active>
                                    <Loader indeterminate> Обрабатываем данные...</Loader>
                                </Dimmer>

                            </div>
                        </Segment>
                    </Segment.Group>
                }

                {!this.state.loading &&
                    <Segment.Group>
                        <Segment>
                            <Grid container columns={4} stackable>
                                <Grid.Column>
                                    <Segment basic>
                                        <Button
                                            color="orange"
                                            fluid
                                            icon
                                            onClick={() => { this.props.setPage('main') }}>
                                            <Icon name="left arrow" />&nbsp;Назад
                                    </Button>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment basic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment basic>

                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment basic>
                                        <Button
                                            color="orange"
                                            fluid
                                            icon
                                            onClick={() => { this.props.setPage('main') }}>
                                            <Icon name="download" />&nbsp;
                                        Сгенерировать PDF
                                    </Button>
                                    </Segment>
                                </Grid.Column>

                            </Grid>
                            <Grid container columns={4} stackable style={{ marginTop: "-40px" }}>
                                <Grid.Column>
                                    <Segment basic>
                                        <Button
                                            color="orange"
                                            fluid
                                            icon
                                            onClick={() => { this.props.setPage('main') }}>
                                            <Icon name="download" />&nbsp;
                                        Сгенерировать PDF
                                    </Button>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>

                        <Segment style={{ width: '100%' }}>
                            <DndList
                                img_add_prefix={this.props.img_add_prefix}
                                items={this.state.projects}

                            />
                        </Segment>
                    </Segment.Group>
                }
            </div>
        );
    }
}

export default Page2