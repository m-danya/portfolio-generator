import React from "react";

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
    //return "./Images/" + path;
    return "./Previews/" + path;
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
      categories: ['1'],
      visibleProjects: [],

      loading_data: true,
      error: null,
    };
    this.resetFilters();

    //this.state.checkedTags = new Array(10).fill(0).map(() => []);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.handleFilterCategoryChange = this.handleFilterCategoryChange.bind(this);
    this.handleFilterTagsChange = this.handleFilterTagsChange.bind(this);
    this.handleFilterNameChange = this.handleFilterNameChange.bind(this);
    this.resetFilters = this.resetFilters.bind(this);

  }

  componentDidMount() //after mount
  {
    fetch("api/get_data")
      .then(res => {
        //console.log(res);
        if (res.status == 200)
          return res.json()
        //if it's internal error
        let error_text = null;
        if (res.status == 500)
          error_text = 'Неотловленная ошибка на backend-части, ошибка 500'
        if (res.status == 404)
          error_text = 'Не удалось установить связь с backend-сервером. ошибка 404'
        this.setState({
          error: error_text,
          loading_data: false,
        });
        return null;
      })
      .then(
        (result) => {
          if (result) {
            //console.log('data: ' + JSON.stringify(result))
            this.setState({
              data: result.data,
              categories: result.categories,
              tags: result.tags,
              loading_data: false,
              error: result.error,
              visibleProjects: this.array_0_to_n((result.data || []).length),
              tags: result.tags,
              clients: result.clients,
              projectNames: result.names,
            });
            this.recountVisibleTags();
          }
        },
        (e) => {
          this.setState({
            data: [],
            error: e,
            loading_data: false,
          });

        }
      )
  }

  resetFilters()
  {
    console.log('yay reset!')
    this.setState({
      filerChosenName: "",
      filterChosenCategories: [],
      filterChosenTags: [],
    });
    this.recountVisibleTags();
  }

  handleFilterCategoryChange(e, { name, value }) {
    //console.log(e);
    this.setState({
      filterChosenCategories: value,
    });
    this.recountVisibleTags();
  }

  handleFilterTagsChange(e, { name, value }) {
    //console.log(e);
    this.setState({
      filterChosenTags: value,
    });
  }

  handleFilterNameChange(e, { name, value }) {
    //console.log(e);
    this.setState({
      filterChosenName: value,
    });
  }
  recountVisibleTags() {
    this.setState((state, props) => {
      let tags = new Set();
      let clients = new Set();
      if (state.categories)
        for (let c of state.categories) {
          if (state.filterChosenCategories && state.filterChosenCategories.includes(c.name)) {
            for (let t of c.tags) {
              if (state.clients.includes(t))
                clients.add(t);
              else tags.add(t);
              
            } 
          }
        }
      if (!state.filterChosenCategories || !state.filterChosenCategories.length) {
        if (state.clients)
         tags = state.clients.concat(state.tags);
      }

      if (!tags) tags = []
      if (!clients) clients = []

      return {
        visibleTags:  Array.from(clients).concat((Array.from(tags))),
      }
    });
  }

  recountVisibleProjects() {
    //TODO!

  }

  onChangeProject(i) {
    //console.log("project changed! " + i);
  }

  array_0_to_n(n) {
    let ans = []
    for (let i = 0; i < n; ++i) ans.push(i);
    return ans;
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
            categories={!this.state.categories || this.state.categories.map(c => { return (c.name) })}
            clients={this.state.clients}
            tags={this.state.visibleTags}
            filerChosenName={this.state.filerChosenName}
            filterChosenCategories={this.state.filterChosenCategories}
            filterChosenTags={this.state.filterChosenTags}
            handleFilterCategoryChange={this.handleFilterCategoryChange}
            handleFilterNameChange={this.handleFilterNameChange}
            handleFilterTagsChange={this.handleFilterTagsChange}
            resetFilters={this.resetFilters}
          />

          <Segment>
            {this.state.loading_data &&

              <div style={{ height: "350px" }}>
                <Dimmer active>
                  <Loader indeterminate> Подгружаем файлы из Excel-таблицы</Loader>
                </Dimmer>
              </div>
            }


            {this.state.error &&
              < div style={{ height: "350px" }}>
                <Dimmer active>
                  <Header as='h2' icon inverted>Ошибка при загрузке данных из Excel-таблицы</Header>
                  <Segment inverted color='red'>  {this.state.error.toString()} </Segment>

                  <Segment color='' inverted>{'Полученные данные: ' + this.state.data}</Segment>

                </Dimmer>
              </div>
            }

            {!this.state.error && !this.state.loading_data &&

              <CardsCollection data={
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
              />
            }

          </Segment>
        </Segment.Group>
      </Container>
    </div >
    );
  }
}

export default App;
