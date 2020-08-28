import React from "react";
import { Visibility, Image, Loader, Card } from 'semantic-ui-react'

export default class LazyCard extends React.Component {

    state = {
        show: false,
    }

    showImage = () => {
        this.setState({
            show: true,
        })
    }

    render() {
        const { size } = this.props
        if (!this.state.show) {
            return (
                <Visibility
                    //as="span"
                    once
                    onTopVisible={() => {this.setState({
                        show: true,
                    })}}
                    //updateOn='repaint'
                >
                    <Card>
                        <Card.Content className="container-for-vertical">
                        <Loader active inline="centered" size={size} />

                            <div>
                                <div style={{ width: "17%", float: "left" }} className='vertical-center-checkbox'>
                                </div>

                                <div style={{ width: "83%", float: "right", }} >
                                    <div className='vertical-center'>
                                        <Card.Header
                                            style={{ fontSize: "13px", fontWeight: "normal" }}
                                        >
                                            {'Загрузка'}
                                        </Card.Header>
                                    </div>
                                </div>
                            </div>


                        </Card.Content>
                    </Card>
                </Visibility>
            )
        }
        return <Card {...this.props} />
    }
}