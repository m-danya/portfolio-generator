import {
    Card,
    Dimmer,
    Loader,
    Button,
    Grid,
    Header,
    Container,
    Segment,
    Icon,
}
    from 'semantic-ui-react'

import DndList from './DndList'
import arrayMove from 'array-move';
import React, { Component } from 'react';
import ModalSuccess from './ModalSuccess'
import { confetti } from 'dom-confetti';


const axios = require('axios').default;


class Page2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingRender: false,
            order: [],
            showModal: false,
        };
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleRemoveProject = this.handleRemoveProject.bind(this);
        this.handleRenderClick = this.handleRenderClick.bind(this);
    }

    handleOrderChange(oldIndex, newIndex) {
        this.setState(({ projects }) => ({
            projects: arrayMove(projects, oldIndex, newIndex),
        }));
    }

    handleRemoveProject(index) {
        this.setState(({ projects }) => ({
            projects: projects.filter((e) => { return e.number != index }),
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

    handleRenderClick() {
        //console.log('gandelds')

        if (!this.state.projects || !this.state.projects.length) return;

        this.setState({
            loadingRender: true,
        }, () => {

            let oneDimensionProjects = []

            for (let p of this.state.projects) {
                if (p.images) {
                    for (let i of p.images) {
                        oneDimensionProjects.push(i)
                    }
                }
            }

            axios.post(`${this.props.BACKEND_ADDRESS}/api/generate_pdf`, { data: oneDimensionProjects }) //
                .then(data => {
                    axios.get(`${this.props.BACKEND_ADDRESS}/info`).then(infodata => this.setState({
                        warningFolderName: infodata.data.warningFolderName,
                        warningCount: infodata.data.warningCount,
                        warningSize: infodata.data.warningSize,

                    }))



                    this.setState({
                        link: data.data.link,
                        error: data.data.error,
                        loadingRender: false,
                        showModal: true,
                    }); console.log(JSON.stringify(data))


                    const conf = document.querySelector(".conf")
                    confetti(conf, {

                        angle: 270,
                        spread: 180,
                        startVelocity: 15,
                        elementCount: 30,//70,
                        dragFriction: 0.12,
                        duration: 1000,
                        stagger: 2,
                        width: "10px",
                        height: "10px",
                        perspective: "500px",
                        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
                    })

                })
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
                    <Segment.Group >
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
                                    <Segment basic style={{ textAlign: 'center' }}>
                                        <div width='10px' style={{ margin: '0 auto', position: 'absolute', left: '50%', right: '50%' }}>
                                            <div className='conf'></div>
                                        </div>
                                        {/* {this.state.showModal &&
                                            <ModalSuccess
                                                link={this.state.link}
                                                warningFolderName={this.state.warningFolderName}
                                                warningCount={this.state.warningCount}
                                            />} */}
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment basic>
                                        <Button
                                            color="orange"
                                            fluid
                                            icon
                                            onClick={this.handleRenderClick}
                                        //loading={this.state.loadingRender}
                                        >
                                            <Icon name="download" />&nbsp;
                                        Сгенерировать PDF
                                    </Button>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>

                        {!this.state.showModal &&
                            <Segment style={{ width: '100%' }}>
                                <DndList
                                    img_add_prefix={this.props.img_add_prefix}
                                    items={this.state.projects}
                                    handleOrderChange={this.handleOrderChange}
                                    handleRemoveProject={this.handleRemoveProject}

                                />
                            </Segment>
                        }



                        {this.state.showModal &&
                            <Container text basic>
                                <div style={{ padding: "20px 0 100px 0" }}>
                                    <Header style={{ fontSize: '25px', }}>Портфолио готово! 🥳</Header>

                                    <p style={{ fontSize: '20px', }}>
                                        <a target="_blank" href={this.state.link} download >Нажмите, чтобы скачать pdf</a>
                                    </p>
                                    <p style={{ fontSize: '15px', }}>
                                        (если открывается в браузере, а не скачивается (особенность хрома), можно нажать правой кнопкой мыши <Icon name='long arrow alternate right' /> "сохранить ссылку как")
                                    </p>

                                    <div>
                                        <br />
                                        <p>
                                            Не забудьте удалить файл с сервера, если он вам больше не нужен. <br />

                                             Сейчас в папке {this.state.warningFolderName} находится файлов: {this.state.warningCount}. <br /><br />Они занимают {this.state.warningSize} на диске.
                                        </p>
                                    </div>
                                </div>
                            </Container>
                        }

                    </Segment.Group>


                }
            </div>
        );
    }
}

export default Page2