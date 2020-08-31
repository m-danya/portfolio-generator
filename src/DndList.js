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


const SortableItem = SortableElement(({ value, cards }) => cards[value.number]);

const SortableList = SortableContainer(
    ({ items, cards }) => {
        return (
            <Card.Group centered>
                {items.map((value, index) => (
                    <SortableItem key={`item-${value}`} index={index} value={value} cards={cards} />
                ))}
            </Card.Group>
        );
    });


// const SortableItem = SortableElement(({value, arg2}) => <li>{value + arg2}</li>);
class DndList extends Component {
    state = {
        items: [],
        cards: []
        //items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'],
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    constructor(props) {
        super(props)
        this.state = ({
            items: this.props.items,
            cards: [],
        });

        console.log('items got, processing')
        if (this.state.items && this.state.items.length) {
            for (let value of this.state.items) {
                this.state.cards[value.number] = <Card className="cardd">
                    <Image
                        //effect="blur"
                        src={''
                            //this.props.img_add_prefix(element.images[0], 'preview small')
                        }
                        as="a"
                    />
                    <Card.Content className="">

                        <div>


                            <div style={{ width: "100%", float: "center", }} className='' >
                                <div className=''>
                                    <Card.Header
                                        style={{ fontSize: "13px", fontWeight: "normal" }}
                                    >
                                        {value.title}
                                    </Card.Header>
                                </div>
                            </div>

                        </div>


                    </Card.Content>
                    <div style={{ width: "100%", textAlign: 'center', paddingBottom: '10px' }} className='checkboxGoDown' >

                    </div>
                </Card>;
            }
        }

    }




    render() {
        return <SortableList
            axis={'xy'}
            items={this.state.items}
            onSortEnd={this.onSortEnd}
            transitionDuration={1}
            hideSortableGhost
            cards={this.state.cards}
        />;
    }
}

export default DndList