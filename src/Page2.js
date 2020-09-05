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
import arrayMove from 'array-move';
import React, { Component } from 'react';

const axios = require('axios').default;


class Page2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingRender: false,
            order: []
        };
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleRenderClick = this.handleRenderClick.bind(this);
    }

    handleOrderChange(oldIndex, newIndex) {
        this.setState(({ projects }) => ({
            projects: arrayMove(projects, oldIndex, newIndex),
        }));
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
            loading: false,
        })
    }

    // async postData(url = '', data = {}) {
    //     // Default options are marked with *
    //     const response = await fetch(url, {
    //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //         mode: 'cors', // no-cors, *cors, same-origin
    //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: 'same-origin', // include, *same-origin, omit
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         redirect: 'follow', // manual, *follow, error
    //         referrerPolicy: 'no-referrer', // no-referrer, *client
    //         body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     });
    //     return await response.json(); // parses JSON response into native JavaScript objects
    // }

    handleRenderClick() {
        console.log('gandelds')

        this.setState({
            loadingRender: true,
        })

        axios.post('api/generate_pdf', { data: this.state.projects })
            //.then(data => { this.setState({ link: data.link }) })
            //.then(() => { this.setState({ loadingRender: false }); alert('ok'); });
        //  

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
                            <Grid container columns={3} stackable>
                                <Grid.Column>
                                    <Segment basic>
                                        <Button
                                            color=""
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
                                        <Button
                                            color="orange"
                                            fluid
                                            icon
                                            onClick={(e) => { this.handleRenderClick(e); return false }}
                                            loading={this.state.loadingRender}
                                        >
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
                                handleOrderChange={this.handleOrderChange}

                            />
                        </Segment>
                    </Segment.Group>
                }
            </div>
        );
    }
}

export default Page2