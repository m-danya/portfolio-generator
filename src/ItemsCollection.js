import React from "react";
import {
  Button,
  Icon,
  Image,
  Item,
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
      onChange={() => {}}
      onClickItem={() => {}}
      onClickThumb={() => {}}
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

function ItemsCollection(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
    
      <Item.Group divided>
        {props.data.map((element, i) => { 
          if (props.visibleProjects.includes(i))
          return (
              
              <Item>
                <Checkbox className='checkbox-project' onChange={() => props.onChangeProject(i)}/>
                <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  //open={open}
                  trigger={
                    <Item.Image
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

                <Item.Content>
                  <Item.Header>{element.title}</Item.Header>
                  <Item.Meta>
                    <span>{element.year}</span>
                  </Item.Meta>
                  <Item.Description>{element.desc2}</Item.Description>

                  <Item.Extra>
                    {element.tags.map((tag) => {
                      return <Label>{tag}</Label>;
                    })}
                  </Item.Extra>
                </Item.Content>
                
              </Item>
           
          );
        })}
      </Item.Group>
      
    </div>
  );
}

export default ItemsCollection;
