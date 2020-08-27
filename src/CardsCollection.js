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
} from "semantic-ui-react";
import { waitForElementToBeRemoved } from "@testing-library/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

var Carousel = require("react-responsive-carousel").Carousel;

function MyCarousel(props) {
  return (
    <Carousel
      showArrows={true}
      onChange={() => { }}
      onClickItem={() => { }}
      onClickThumb={() => { }}
      showStatus={false}
    >
      {props.img.map((img) => {
        return (
          <div>
            <img src={img} />
          </div>
        );
      })}
    </Carousel>
  );
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
                  //open={open}
                  trigger={
                    <Image
                      src={
                        element.images.map((path) =>
                          props.img_add_prefix(path)
                        )[0]
                      }
                      as="a"
                    />
                  }
                >
                  <Modal.Header>{element.title}</Modal.Header>
                  <Modal.Content image>
                    <MyCarousel
                      img={element.images.map((path) =>
                        props.img_add_prefix(path)
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
