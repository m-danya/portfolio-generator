import React, { Component } from 'react';
import { render } from 'react-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {
    Button,
    Icon,
    Image,
    Card,
    Label,
    Modal,
    Grid,
    Checkbox,
    Segment,
} from "semantic-ui-react";

// const SortableItem = SortableElement(({value, arg2}) => <li>{value + arg2}</li>);
const SortableItem = SortableElement(({ value, arg2 }) => <Card
    image='/images/avatar/large/elliot.jpg'
    header={value}
    meta='Friend'
    description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
    extra={<a>
        <Icon name='user' />
    16 Friends
  </a>}
/>);

const SortableList = SortableContainer(({ items }) => {
    return (
        <Card.Group>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} arg2='a' />
            ))}
        </Card.Group>
    );
});

class DndList extends Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'],
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };
    render() {
        return <SortableList
            axis={'xy'}
            items={this.state.items} onSortEnd={this.onSortEnd} />;
    }
}

export default DndList