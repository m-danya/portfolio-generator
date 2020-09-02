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

var Carousel = require("react-responsive-carousel").Carousel;



class MyCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
        }
        this.next = this.next.bind(this);
    }

    next() {
        this.setState((state) => ({
            currentSlide: (state.currentSlide + 1) % this.props.img.length,
        }));
    }

    render() {
        return (
            <div style={{ width: '70%', margin: 'auto' }}><Carousel
                //showArrows={true}
                onChange={() => { }}
                onClickItem={this.next}
                onClickThumb={() => { }}
                showStatus={false}
                infiniteLoop
                //width='80%'
                //centerMode
                selectedItem={this.state.currentSlide}
            >
                {this.props.img.map((img) => {
                    return (
                        <div style={{ 'cursor': 'pointer' }} >
                            <img src={img} />
                        </div>
                    );
                })}
            </Carousel>
            </div>
        );
    }
}

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
        cards: [],
        open: false,
        //items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'],
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));

    };

    handleRemoveItem(numba) {
        this.setState(({ items }) => ({
            items: items.filter((e) => { return e.number != numba }),//arrayRemove(items, oldIndex, newIndex),
        }));
    }

    constructor(props) {
        super(props)
        this.state = ({
            items: this.props.items,
            cards: [],
        });


        //console.log('items got, processing')
        if (this.state.items && this.state.items.length) {
            for (let value of this.state.items) {
                this.state.cards[value.number] =
                    <Card className="cardd">
                        <Modal
                            onClose={() => this.setState({ open: false })}
                            onOpen={() => this.setState({ open: true })}
                            // size=''
                            //width={'20%'}
                            //basic
                            //size='fullscreen'
                            //open={open}
                            style={{ witdh: '50%' }}
                            trigger={
                                <Image
                                    //effect="blur"
                                    src={
                                        this.props.img_add_prefix(value.images[0], 'preview small')
                                    }
                                    as="a"
                                />
                            }
                        >
                            <Modal.Header>{value.title}</Modal.Header>
                            <Modal.Content>
                                <Label icon='barcode' style={{ margin: '6px', }} content={`Номер проекта: ${value.number}`} />
                                <Label icon='building' style={{ margin: '6px', }} content={
                                    value.client ? value.client : 'Клиент не задан'} />
                                {value.tags.map(e => {
                                    return (
                                        <Label icon='tag' style={{ margin: '6px', }} content={e} />

                                    );
                                })}

                            </Modal.Content>

                            <Modal.Content image >
                                <MyCarousel

                                    img={value.images.map((path) =>
                                        props.img_add_prefix(path, 'preview medium')
                                    )}
                                />


                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={() => this.setState({ open: false })}>Закрыть</Button>
                            </Modal.Actions>
                        </Modal>
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
                            <Icon name='move' /> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <Icon name='remove' onClick={() => this.handleRemoveItem(value.number)} />
                        </div>
                    </Card>
                
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
            shouldCancelStart={(v) => {
                //console.log(v.path[0].classList)
                if (v.path[0].classList.value == 'move icon')
                    return false;
                else
                    return true;
            }}
        />;
    }
}

export default DndList