import React from "react";

import CardsCollection from "./CardsCollection.js";
import FilterMenu from "./FilterMenu.js";
import Page2 from './Page2'
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
  img_add_prefix(path, type) {
    //return "./Images/" + path;
    if (type == 'preview small') return "./PreviewSmall/" + path;
    if (type == 'preview medium') return "./PreviewMedium/" + path;
    if (type == 'original') return "./Images/" + path;
  }


  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      page: 'main',
      chosenProjects: [],
      projectNames: [],
      categories: [],
      visibleProjects: [],
      numberOfChosenProjects: 0,
      loading_data: true,
      error: null,
    };

    this.onChangeProject = this.onChangeProject.bind(this);
    this.recountVisibleProjects = this.recountVisibleProjects.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.setPage = this.setPage.bind(this);

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
              visibleProjects: [],//this.array_0_to_n((result.data || []).length),
              tags: result.tags,
              clients: result.clients,
              projectNames: result.names,
            });
            console.log('data got')
            this.child.current.recountVisibleTags();
            this.recountVisibleProjects();
            //this.recountVisibleTags();
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

  recountVisibleProjects(filterChosenCategories, filterChosenTags, filterChosenName) { // применить фильтры
    //console.log(`recountVisibleProjects(${filterChosenCategories}, ${filterChosenTags}, ${filterChosenName})`)
    let ans = []
    if (this.state.data)
      for (let p of this.state.data) {
        if (filterChosenName) {
          if (p.title == filterChosenName)
            ans.push(p.number); // универсально, все ок
        }
        else if (filterChosenCategories && filterChosenCategories.length) {
          //если выбрана хоть одна
          let add = false;
          if (p.categories && p.categories.length)
            for (let c of p.categories) {
              if (add) break;
              if (filterChosenCategories.includes(c)) {
                // по категории подходит, но что по тегам
                if (!filterChosenTags || !filterChosenTags.length) {
                  add = true;
                  break;
                }
                if (p.tags && p.tags.length)
                  for (let t of p.tags) {
                    if (filterChosenTags.includes(t)) {
                      add = true;
                      break;
                    }
                  }
              }
            }
          if (add) ans.push(p.number); //универсально, все ок
        }
        else if (filterChosenTags && filterChosenTags.length) {
          //если заданы только теги
          if (p.tags && p.tags.length)
            for (let t of p.tags) {
              if (filterChosenTags.includes(t)) {
                ans.push(p.number);
                break;
              }
            }
        }
        else {
          ans.push(p.number)
        }
      }
    //console.log(`after recalculating ans = ${ans}`)
    this.setState({
      visibleProjects: ans,
    })
  }

  onChangeProject(number) {
    //console.log("project changed! " + number);
    this.setState((state, props) => {
      let plus_minus = 0;
      let NewChosenProjects = state.chosenProjects.slice(); //IMMUTABLE
      NewChosenProjects[number] = !state.chosenProjects[number]
      if (NewChosenProjects[number]) ++plus_minus;
      else --plus_minus;
      return {
        chosenProjects: NewChosenProjects,
        numberOfChosenProjects: state.numberOfChosenProjects + plus_minus,
      };
    }
    );
  }

  selectAll(type) {
    console.log('type = ' + type)
    this.setState((state, props) => {
      let ans1 = state.chosenProjects.slice();
      let ans2 = state.chosenProjects.slice();

      let count_plus = 0
      let count_minus = 0

      for (let t of state.visibleProjects) {
        if (!ans1[t]) ++count_plus;
        ans1[t] = true;
        if (ans2[t]) ++count_minus;
        ans2[t] = false;
      }
      return ({
        chosenProjects: type == 'select all' ? ans1 : ans2,
        numberOfChosenProjects: type == 'select all' ? state.numberOfChosenProjects + count_plus : state.numberOfChosenProjects - count_minus,
      })
    });
  }

  setPage(s) {
    this.setState({
      page: s
    });
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

      {this.state.page == 'main' &&
        <Container className='containerFullWitdh'>
          <Segment.Group >
            <FilterMenu
              recountVisibleProjects={this.recountVisibleProjects}
              projectNames={this.state.projectNames}
              categories={!this.state.categories || this.state.categories.map(c => { return (c.name) })}
              categories_with_tags={!this.state.categories || this.state.categories}
              clients={this.state.clients}
              tags={this.state.tags}
              ref={this.child}
              numberOfChosenProjects={this.state.numberOfChosenProjects}
              chosenProjects={this.state.chosenProjects}
              visibleProjects={this.state.visibleProjects}
              selectAll={this.selectAll}
              numberOfVisibleProjects={this.state.visibleProjects ? this.state.visibleProjects.length : 0}
              setPage={this.setPage}
            //recountVisibleProjects={this.recountVisibleProjects}
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
                <div style={{ height: "350px", width: "100%",}}>
                  <Dimmer active>
                    <Header as='h2' icon inverted>Ошибка при загрузке данных из Excel-таблицы</Header>
                    <Segment inverted color='red'>  {this.state.error.toString()} </Segment>

                    <Segment color='' inverted>{'Полученные данные: ' + this.state.data}</Segment>

                  </Dimmer>
                </div>
              }

              {!this.state.error && !this.state.loading_data &&

                <CardsCollection
                  data={this.state.data}
                  img_add_prefix={this.img_add_prefix}
                  onChangeProject={this.onChangeProject}
                  visibleProjects={this.state.visibleProjects}
                  chosenProjects={this.state.chosenProjects}
                />
              }

            </Segment>
          </Segment.Group>
        </Container>
      }
      {this.state.page == 'move' &&
        <div>

          <Container className='containerFullWitdh'>
            <Segment.Group >

              <Segment>
                
                <Page2
                  data={this.state.data}
                  chosenProjects={this.state.chosenProjects}
                  img_add_prefix={this.img_add_prefix}
                  setPage={this.setPage}
                />
              </Segment>
            </Segment.Group>
          </Container>

        </div>
      }
    </div >
    );
  }
}

export default App;
