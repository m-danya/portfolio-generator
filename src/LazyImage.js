import React from "react";
import PropTypes from 'prop-types'
import { Visibility, Image, Loader, Card } from 'semantic-ui-react'

export default class LazyImage extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        size: PropTypes.string,
    }

    static defaultProps = {
        size: `medium`,
    }

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
                    as="span"
                    onOnScreen={this.showImage}
                    updateOn='repaint'>
                    
                    {/* <Loader active inline="centered" size={size} /> */}
                </Visibility>
            )
        }
        return <Image {...this.props} />
    }
}