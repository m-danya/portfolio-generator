import React from "react";
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
import { waitForElementToBeRemoved } from "@testing-library/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import LazyImage from './LazyImage'
import LazyCard from './LazyCard'

const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

var Carousel = require("react-responsive-carousel").Carousel;



class MyCarousel extends React.Component {
  //function next() {
  //   this.setState((state) => ({
  //     currentSlide: state.currentSlide + 1,
  //   }));
  // }
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
    }
    this.next = this.next.bind(this);
  }


  next() {
    this.setState((state) => ({
      currentSlide: state.currentSlide + 1,
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

function CardsCollection(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Card.Group centered>
        {props.data.map((element, i) => {
          if (props.visibleProjects.includes(i))
            return (

              <Card className="cardd">
                <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
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
                        props.img_add_prefix(element.images[0], 'preview small')
                      }
                      as="a"
                    />
                  }
                >
                  <Modal.Header>{element.title}</Modal.Header>
                  <Modal.Content>
                        <Label icon='barcode' style={{ margin: '6px', }} content={`Номер проекта: ${element.number}`} />
                        <Label icon='building' style={{ margin: '6px', }} content={
                          element.client ? element.client : 'Клиент не задан'} />
                        {element.tags.map(e => {
                          return (
                            <Label icon='tag' style={{ margin: '6px', }} content={e} />

                          );
                        })}

                  </Modal.Content>
                  
                  <Modal.Content image >
                    <MyCarousel

                      img={element.images.map((path) =>
                        props.img_add_prefix(path, 'preview medium')
                      )}
                    />


                  </Modal.Content>
                  <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Закрыть</Button>
                  </Modal.Actions>
                </Modal>
                <Card.Content className="container-for-vertical">

                  <div>
                    <div style={{ width: "17%", float: "left" }} className='vertical-center-checkbox'>
                      <Checkbox onChange={() => props.onChangeProject(i)} />
                    </div>

                    <div style={{ width: "83%", float: "right", }} >
                      <div className='vertical-center'>
                        <Card.Header
                          style={{ fontSize: "13px", fontWeight: "normal" }}
                        >
                          {element.title}
                        </Card.Header>
                      </div>
                    </div>
                  </div>


                </Card.Content>
              </Card>
            );
        })}
      </Card.Group>
      {/* сделать, чтоыб кликать можно было не только прямо по чекбоксу */}
    </div>
  );
}

export default CardsCollection;
