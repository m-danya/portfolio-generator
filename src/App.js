import React from "react";
import Tree from "./Tree.js";
//import Checkbox from './MyCheckbox.js'
//import List from './List.js'
import ItemsCollection from "./ItemsCollection.js";
import CardsCollection from "./CardsCollection.js";
import FilterMenu from "./FilterMenu.js";

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Loader,
  Dimmer,
  Label,
  Menu,
  Segment,
  Step,
  Table,
} from "semantic-ui-react";

const style = {
  h1: {
    paddingTop: "1em",
    paddingBottom: "0.5em",
  },
};

class App extends React.Component {
  img_add_prefix(path) {
    return "./Images/" + path;
  }
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        ["1.1", "1.2"],
        ["2.1", "2.2", "2.3", "2.4"],
      ],

      visibleTags: [],
      checkedProjects: [],
      projectNames: [],
      visibleProjects: [],

      filerChosenName: "",
      filterChosenCategories: [],
      filterChosenTags: [],
      filterChosenYears: "",
      loading_data: true,
      error: null,
    };

    //this.state.checkedTags = new Array(10).fill(0).map(() => []);
    this.state.visibleTags = this.state.tags;
    this.handleCheckTag = this.handleCheckTag.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);

    let newExpanded = [];
    for (let a of this.state.tags) {
      //we need to expand only 1-level checkboxes
      newExpanded.push(a.value);
    }

    this.state.projectNames = this.getProjectNames(this.state.data);

    let newState = this.state;
    newState.expandedTags = newExpanded;
    this.setState(newState);
  }

  componentDidMount() //after mount
  {
    fetch("api/get_data")
      .then(res => {
        console.log(res);
        if (res.status == 200)
          return res.json()
        let newState = this.state
        newState.loading_data = false;
        //if it's internal error
        if (res.status == 500)
          newState.error = 'Неотловленная ошибка на backend-части, ошибка 500'
        if (res.status == 404)
          newState.error = 'Не удалось установить связь с backend-сервером. ошибка 404'
        this.setState(newState);
        return null;
      })
      .then(
        (result) => {
          if (result) {
            let newState = this.state;
            newState.data = result.data;
            newState.categories = result.categories;
            newState.tags = result.tags;
            //console.log('data: ' + JSON.stringify(result))
            newState.loading_data = false;
            newState.error = result.error;
            newState.visibleProjects = this.array_0_to_n(newState.data.length);
            newState.tags = result.tags;
            console.log('tags got: ' + newState.tags)
            //console.log('visibleProjects = ' + newState.visibleProjects)
            this.setState(newState);
            this.recountVisibleTags();
          } 
        },
        (error) => {
          let newState = this.state;
          newState.data = [];
          newState.error = error;
          newState.loading_data = false;
          this.setState(newState);

        }
      )
  }

  getTime() {
    console.log(fetch('api/time').then(res => res.json()));
  }

  recountVisibleTags() {
    //TODO!!
    console.log('reconundsds...')
    this.state.visibleTags = this.state.tags;
  }
  recountVisibleProjects() {
    //TODO!

  }

  onChangeProject(i) {
    //console.log("project changed! " + i);
  }

  getProjectNames(data) {
    let ans = [];
    if (!data) return ans;

    for (let d of data) {
      ans.push(d.title);
    }
    return ans;
  }

  array_0_to_n(n) {
    let ans = []
    for (let i = 0; i < n; ++i) ans.push(i);
    return ans;
  }

  formSearchFromArray(list) {
    console.log("list = " + list);
    let ans = [];
    let i = 0;
    if (!list) return ans;
    for (let a of list) {
      ans.push({
        key: a,
        value: i,
        text: a,
      });
      ++i;
    }
    return ans;
  }

  handleCheckTag(updatedCheckedTags, targetNode) {
    //console.log('handleCheckTag(' + newChecked + ')')
    let newState = this.state;

    //newState.checkedTags[i] = updatedCheckedTags;
    newState.checkedTags = updatedCheckedTags;
    this.setState(newState);
  }

  render() {
    return (<div>
      <Header
        as="h1"
        content="Генератор портфолио"
        style={
          style.h1
        }
        textAlign="center" />


      <Container>
        <Segment.Group >
          <FilterMenu
            projectNames={this.state.projectNames}
            formSearchFromArray={this.formSearchFromArray}
            categories={this.state.categories}
            tags={this.state.visibleTags}
            filerChosenName={this.state.filerChosenName}
            filterChosenCategories={this.state.filterChosenCategories}
            filterChosenTags={this.state.filterChosenTags}
            filterChosenYears={this.state.filterChosenYears}
          />

          <Segment>
            {this.state.loading_data ?

              <div style={{ height: "350px" }}>
                <Dimmer active>
                  <Loader indeterminate> Подгружаем файлы из Excel-таблицы</Loader>
                </Dimmer>
              </div>
              :
              (this.state.error ?
                <div style={{ height: "350px" }}>
                  <Dimmer active>
                    <Header as='h2' icon inverted>Ошибка при загрузке данных из Excel-таблицы</Header>
                    <Segment inverted color='red'>  {this.state.error.toString()} </Segment>

                    <Segment color='' inverted>{'Полученные данные: ' + this.state.data}</Segment>

                  </Dimmer>
                </div>
                : <CardsCollection data={
                  this.state.data
                }
                  img_add_prefix={
                    this.img_add_prefix
                  }
                  onChangeProject={
                    this.onChangeProject
                  }
                  visibleProjects={
                    this.state.visibleProjects
                  }
                />)}

            {/* {console.log('state.error = ' + this.state.error)} */}

          </Segment>
        </Segment.Group>
      </Container>
    </div>
    );
  }
}

export default App;