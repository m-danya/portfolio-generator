import React, { Component } from 'react';

import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Image,
    Item,
    Loader,
    Dimmer,
    Label,
    Menu,
    Segment,
    Step,
    Accordion,
    Table,
} from "semantic-ui-react";

class Portfolios extends Component {
    render() {
        return (
            <Segment>

                {/* {this.props.loading_portfolios &&

                    <div style={{ height: "350px" }}>
                        <Dimmer active>
                            <Loader indeterminate> Подгружаем созданные портфолио</Loader>
                        </Dimmer>
                    </div>
                } */}

                {!this.props.loading_portfolios &&
                    <Item.Group divided>
                        {this.props.portfolios && !this.props.portfolios.length &&
                            <div>
                                <Header style={{
                                    textAlign: 'center',
                                    paddingTop: '40px',
                                    paddingBottom: '0px',
                                }}>Вы еще не генерировали портфолио</Header>
                                <Segment basic style={{
                                    width: '30%',
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',


                                }}>
                                    <Button positive fluid size='medium' onClick={() => {
                                        this.props.setPage('main');
                                        this.props.selectAll('deselect all');
                                    }}>
                                        Создать портфолио с чистого листа
                                    </Button>
                                </Segment>
                            </div>
                        }
                        {this.props.portfolios && this.props.portfolios.map(e => (
                            <Item>
                                {/* <Item.Image src='/images/wireframe/image.png' /> */}

                                <Item.Content>
                                    <Item.Header>Портфолио от {e.date} </Item.Header>
                                    <Item.Meta>
                                        <span>Выбранных проектов: {e.numberOfChosenProjects}</span>
                                    </Item.Meta>
                                    <Item.Description>

                                        {e.projects.map(e => {
                                            return e.title;
                                        }).join(', ')}
                                        {/* {e.projectNames.join(', ')} */}
                                    </Item.Description>
                                    <Item.Extra>
                                        <Button
                                            primary
                                            floated='left'
                                            onClick={() => this.props.loadPortfolio(e)}
                                        >
                                            Загрузить
            <Icon name='right chevron' />
                                        </Button>
                                        {/* <Label>Limited</Label> */}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        ))}



                    </Item.Group>
                }
            </Segment>
        );
    }
}

export default Portfolios;