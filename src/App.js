import React from 'react';
import Tree from './Tree.js'
//import Checkbox from './MyCheckbox.js'
//import List from './List.js'



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

function App() {
  var nodes = [
    {
      value: "ParentOne",
      label: "Упаковки",
      tags: 'deleteme',
      children: [
        {
          value: "SectionOneChild",
          label: "Соки",
          children: [
            {
              value: "SectionOneChil-of-Child-1",
              label: "Добрый",
              children: [
                {
                  value: "SectionOneChil-of-Child-1-of-Child",
                  label: "Добрый_олмпиада",
                  tags: ['сок', 'добрый', 'спорт'],
                }
              ]
            },
            {
              value: "SectionOneChil-of-Child-2",
              label: "SectionOneChil-of-Child-2"
            }
          ]
        },
        {
          value: "SectionTwo",
          label: "SectionTwo",
          children: [
            {
              value: "SectionTwo-Child",
              label: "SectionTwo-Child"
            }
          ]
        }
      ]
    },
    {
      value: "ParentTwo",
      label: "ParentTwo",
      children: [
        {
          value: "ParentTwo-Child-1",
          label: "ParentTwo-Child-1"
        },
        {
          value: "ParentTwo-Child-2",
          label: "ParentTwo-Child-2"
        }
      ]
    }
  ];

  const tags = [
    {
      value: '1',
      label: 'добрый',
    },
    {
      value: '2',
      label: 'сок',
    },
    {
      value: '3',
      label: 'спорт',
    }
  ];

  var checkedProjects = []
  var checkedTags = []

  var test_array = [{'1': '2'}, 2, 3, 4, 5]

  var valueComparsion = nodes.map(function callback(currentValue, index, array)
  {
    var ans = []
    console.log(currentValue + ': ')
    if (currentValue['tags'])
    {
      const obj = [{'projectValue': 1, 'name': 2}] //{currentValue['value']: currentValue['tags']}
      ans = ans.concat(obj)
      console.log('ans changed: ' + ans) 
    }
    for (let i in currentValue)
    {
      console.log('... i = ' + i)
    }
    return 1;
  })

  function handleCheckProjects(checked, targetNode)
  {
    console.log('checked ' + checked);
  }
  return (
  <div>
    <Header as='h1' content='Генератор портфолио' style={style.h1} textAlign='center' />

    <Grid container columns={2} stackable>
      <Grid.Column>
        <Segment>
          <Header as='h3' content='Проекты' />
          <Tree nodes={nodes}
                checked={checkedProjects}
                onCheck={handleCheckProjects}/>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Header as='h3' content='Выбрать по тегам' />
          <Tree nodes={tags} 
                showNodeIcon={false}
                checked={checkedTags} />
        </Segment>
      </Grid.Column>
      
    </Grid>

  </div>
  );
}

export default App;
