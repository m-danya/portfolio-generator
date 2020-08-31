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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

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

function CardsCollection(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Card.Group centered>
        {props.data.map((element, i) => {
          if (props.visibleProjects.includes(element.number))
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
                <Card.Content className="">

                  <div>
                    

                    <div style={{ width: "100%", float: "center", }} className='' >
                      <div className=''>
                        <Card.Header
                          style={{ fontSize: "13px", fontWeight: "normal" }}
                        >
                          {element.title}
                        </Card.Header>
                      </div>
                    </div>
                    
                  </div>


                </Card.Content>
                <div style={{ width: "100%", textAlign: 'center', paddingBottom: '10px'}} className='checkboxGoDown' >
                      <Checkbox onChange={() => props.onChangeProject(element.number)}
                        checked={props.chosenProjects[element.number]} />
                    </div>
              </Card>
            );
        })}
      </Card.Group>
    </div>
  );
}

export default CardsCollection;
