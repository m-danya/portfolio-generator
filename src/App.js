import React from 'react';
import Tree from './Tree.js'
//import Checkbox from './MyCheckbox.js'
//import List from './List.js'
import ItemsCollection from './ItemsCollection.js'


import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table,
} from 'semantic-ui-react'


const style = {
  h1: {
    paddingTop: '1em',
    paddingBottom: '0.5em',
  },
}

class App extends React.Component {


  constructor(props)
  {
    super(props);
    this.state = {
      tags: [
        {
          value: '1',
          label: 'Упаковка',
          children:
          [
            {
              value: '1.1',
            label: 'Соки',
            },

            {
              value: '1.2',
            label: 'Минералка',
            },

            {
              value: '1.3',
            label: 'Крупы',
            },

            {
              value: '1.4',
            label: 'Дойпак',
            },

            {
              value: '1.5',
            label: 'Трей',
            },

            {
              value: '1.6',
            label: 'Пауч',
            },


          ],
        },
        {
          value: '2',
          label: 'Корпоративный брендинг',
          children:
          [
            {
              value: '2.1',
            label: 'Нефть/газ',
            },
            
            {
              value: '2.2',
            label: 'Государство',
            },
            
            {
              value: '2.3',
            label: 'Спорт',
            },
            
            {
              value: '2.4',
            label: 'Искусство',
            },
            
          ]
        },
        {
          value: '3',
          label: 'Третья категория тегов',
          children:
          [
            {
              value: '3.1',
            label: 'И',
            },
            {
              value: '3.2',
            label: 'её',
            },
            {
              value: '3.3',
            label: 'теги',
            },
          ]
        }
      ],

      data: [
        {
          images: ['./img/sample.jpg'],
          title: 'Сок Добрый, олимпиада',
          desc1: 'фирменный стиль',
          desc2: 'Описание',
          year: 2020,
          tags: ['сок', 'фирменный стиль', 'еда']
        },
  
        {
          images: ['./img/sp1.jpg', './img/sp2.jpg'],
          title: 'Сок Добрый, олимпиада',
          desc1: 'фирменный стиль',
          desc2: 'Описание',
          year: 2020,
          tags: ['сок', 'фирменный стиль', 'еда', 'dsds', 'dsdsdsd sdsdsds ', 'dsdsdsd', 'dsadsda', 'fsdfsdfsd', 'fdsfsdfds']
        },
        
      ],

      checkedProjects: [],
      checkedTags: [[]],
      expandedTags: [],

      }
    
      this.state.checkedTags =  new Array(10).fill(0).map(() => []);

      this.handleCheckTag = this.handleCheckTag.bind(this);

      let newExpanded = []
      for (let a of this.state.tags)
      {
        //we need to expand only 1-level checkboxes 
        newExpanded.push(a.value)
      }

      let newState = this.state
      newState.expandedTags = newExpanded;
      this.setState(newState)
      

  }

  
  handleCheckTag(i, updatedCheckedTags, targetNode)
  {
    //console.log('handleCheckTag(' + newChecked + ')')
    let newState = this.state;
    
    newState.checkedTags[i] = updatedCheckedTags;
  //   let removedDoublesInState = newState.checkedTags.filter(function(value, index, arr){
  //      return (!newChecked.includes(value))
  //   });

  //   let removeDoublesInChecked = newChecked.filter(function(value, index, arr){
  //     return (!newState.checkedTags.includes(value))
  //  });
  //   newState.checkedTags = removedDoublesInState.concat(removeDoublesInChecked);
    this.setState(newState);

    
  }

  render()
  {
    return (
    <div>
      <Header as='h1' content='Генератор портфолио' style={style.h1} textAlign='center' />
  {/* <Grid columns={2} divided>
    <Grid.Column key={0}>
    <Tree nodes={this.state.tags.slice(0, 1)} 
                    showNodeIcon={false}
                    checked={this.state.checkedTags} 
                    handleCheckTag={this.handleCheckTag}
                    expanded={this.state.expandedTags}
                  />
    </Grid.Column>
    <Grid.Column key={1}>
    <Tree nodes={this.state.tags.slice(1, 2)} 
                    showNodeIcon={false}
                    checked={this.state.checkedTags} 
                    handleCheckTag={this.handleCheckTag}
                    expanded={this.state.expandedTags}
                  />
    </Grid.Column>
  </Grid> */}


      <Container>
        <Segment.Group>
          <Segment>        
          <Grid container columns={3} stackable>
            <Grid.Column>
              <Segment basic>
                {
                  
                  <Tree nodes={this.state.tags.slice(0, 1)} 
                  showNodeIcon={false}
                  checked={this.state.checkedTags[0]} 
                  handleCheckTag={(...other) => this.handleCheckTag(0, ...other)}
                  expanded={this.state.expandedTags}
                />
                }
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment basic>
              {
                  <Tree nodes={this.state.tags.slice(1, 2)} 
                  showNodeIcon={false}
                  checked={this.state.checkedTags[1]} 
                  handleCheckTag={(...other) => this.handleCheckTag(1, ...other)}
                  expanded={this.state.expandedTags}
                />
                }
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment basic>
              {
                  <Tree nodes={this.state.tags.slice(2, 3)} 
                  showNodeIcon={false}
                  checked={this.state.checkedTags[2]} 
                  handleCheckTag={(...other) => this.handleCheckTag(2, ...other)}
                  expanded={this.state.expandedTags}
                />
                }
              </Segment>
            </Grid.Column>
            
          </Grid>
          </Segment>
          <Segment>
            <Header as='h2' content='Проекты' />
            <ItemsCollection data={this.state.data}/>
          </Segment>
        </Segment.Group>
      </Container>
    </div>
    );
  }
}

export default App;
