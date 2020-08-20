import React from 'react'
import { Button, Icon, Image, Item, Label, Modal} from 'semantic-ui-react'
import { waitForElementToBeRemoved } from '@testing-library/react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

var Carousel = require('react-responsive-carousel').Carousel;

function MyCarousel(props) {
        return (
            <Carousel showArrows={true}
                      onChange={()=>{}}
                      onClickItem={()=>{}}
                      onClickThumb={()=>{}}
                      showStatus={false}
                      >
                {props.img.map((img =>
                  {
                    return (
                      <div>
                      <img src={img} />
                  </div>
                    )
                  }))}
                
            </Carousel>
        );
    }

function ItemsCollection (props)
{  

  const [open, setOpen] = React.useState(false)

  return (
    
    <div>

  <Item.Group divided>

    {props.data.map((element, i) => {
        return (
          <Item>
              
              <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Item.Image src={element.images[0]} as='a'/>    }
      >
      <Modal.Header>{element.title}</Modal.Header>
      <Modal.Content image>
        <MyCarousel img = {element.images} />
        </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Закрыть</Button>
      </Modal.Actions>
    </Modal>
              
    <Item.Content>
        <Item.Header as='a'>{element.title}</Item.Header>
        <Item.Meta>
          <span>{element.desc1 + ', ' + element.year}</span>
        </Item.Meta>
        <Item.Description>{element.desc2}</Item.Description>

        

        <Item.Extra>
          {element.tags.map((tag => {
              return (
                <Label>{tag}</Label>
              )
              
          }))}

        
          

          </Item.Extra>
    </Item.Content>
    </Item>
        )

    })}
    

   


    <Item>
      <Item.Image src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>12 Years a Slave</Item.Header>
        <Item.Meta>
          <span className='cinema'>Union Square 14</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Label>добрый</Label>
          <Label>сок</Label>

          </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>My Neighbor Totoro</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC Cinema</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            Buy tickets
            <Icon name='right chevron' />
          </Button>
          <Label>Limited</Label>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Watchmen</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            Buy tickets
            <Icon name='right chevron' />
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
  </div>
)
}

export default ItemsCollection
