import React from "react";

import CardsCollection from "./CardsCollection.js";
import FilterMenu from "./FilterMenu.js";
import Page2 from './Page2'
import MainMenu from './MainMenu'
import Portfolios from './Portfolios'

import arrayMove from 'array-move';

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

const axios = require('axios').default;

// const style = {
//   h1: {
//     paddingTop: "1em",
//     paddingBottom: "0.5em",
//   },
// };

const BACKEND_ADDRESS = 'http://127.0.0.1:5000'

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
      page: 'hello',
      chosenProjects: [],
      projectNames: [],
      categories: [],
      visibleProjects: [],
      numberOfChosenProjects: 0,
      loading_data: true,
      error: null,
      projects: [],
      loading_portfolios: true,
    };

    this.onChangeProject = this.onChangeProject.bind(this);
    this.recountVisibleProjects = this.recountVisibleProjects.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.setPage = this.setPage.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleRemoveProject = this.handleRemoveProject.bind(this);
    this.getData = this.getData.bind(this);
    this.getPortfolios = this.getPortfolios.bind(this);
    this.loadPortfolio = this.loadPortfolio.bind(this);


  }

  loadPortfolio(e) {
    this.setState({
      chosenProjects: e.chosenProjects,
      numberOfChosenProjects: e.numberOfChosenProjects,
      projectNames: e.projectNames,
      projects: e.projects,
    }, () => this.setPage('main'));

  }

  getPortfolios() {
    axios.get(`${BACKEND_ADDRESS}/api/get_portfolios`)
      .then(res => {
        //if it's internal error
        let error_text = null;
        if (res.status == 500)
          error_text = 'Неотловленная ошибка на backend-части, ошибка 500'
        if (res.status == 404)
          error_text = 'Не удалось установить связь с backend-сервером. ошибка 404'
        this.setState({
          error: error_text,
          loading_portfolios: false,
        });
        //return null;
        let result = res.data;

        if (result) {
          //console.log('data: ' + JSON.stringify(result))
          this.setState({
            portfolios: result.portfolios,
            loading_portfolios: false,
            error: result.error,
          });
          console.log('portfolios got')
        }
      },
        (e) => {
          this.setState({
            data: [],
            error: e,
            loading_portfolios: false,
          });

        }
      );
  }

  //componentDidMount() //after mount
  getData() //after mount
  {
    // fetch(`${backend_address}/api/get_data`, {
    //   method: 'GET',
    //   mode: 'no-cors',
    // })
    axios.get(`${BACKEND_ADDRESS}/api/get_data`)
      .then(res => {
        // console.log("response!!!!!!!!!!!")
        // console.log(res);
        // //if (res.status == 200)
        //return res.json()
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
        //return null;
        let result = res.data;

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
          if (this.state.page == 'main') this.child.current.recountVisibleTags();
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
      let NewProjects = state.projects.slice(); //also immutable.

      NewChosenProjects[number] = !state.chosenProjects[number]
      if (NewChosenProjects[number]) {
        for (let p of this.state.data) {
          if (p.number == number) {
            NewProjects.push(p);
          }
        }

        ++plus_minus;
      }
      else {
        NewProjects = NewProjects.filter(e => e.number != number);
        --plus_minus;
      }

      return {
        chosenProjects: NewChosenProjects,
        numberOfChosenProjects: state.numberOfChosenProjects + plus_minus,
        projects: NewProjects,
      };
    }
    );
  }

  selectAll(type) {
    //console.log('type = ' + type)
    this.setState((state, props) => {
      let ans1 = state.chosenProjects.slice();
      let ans2 = state.chosenProjects.slice();
      let NewProjects = state.projects.slice(); //also immutable.

      let count_plus = 0
      let count_minus = 0

      for (let t of state.visibleProjects) {
        if (!ans1[t]) {

          ++count_plus;
          for (let p of this.state.data) {
            if (p.number == t) {
              NewProjects.push(p);
            }
          }
        }

        ans1[t] = true;

        if (ans2[t]) {
          ++count_minus;
          NewProjects = NewProjects.filter(e => e.number != t);
        }
        ans2[t] = false;
      }
      return ({
        chosenProjects: type == 'select all' ? ans1 : ans2,
        numberOfChosenProjects: type == 'select all' ? state.numberOfChosenProjects + count_plus : state.numberOfChosenProjects - count_minus,
        projects: NewProjects,
      })
    });
  }

  setPage(s) {
    this.setState({
      page: s
    });

    if (s == 'move') {
      this.setState({
        visibleProjects: [],
      }, function callback() {
        this.recountVisibleProjects();
      });
    }

    if (s == 'main' && !this.state.data) {
      this.getData();
    }

    if (s == 'portfolios') {
      this.getPortfolios();
    }

  }

  handleOrderChange(oldIndex, newIndex) {
    this.setState(({ projects }) => ({
      projects: arrayMove(projects, oldIndex, newIndex),
    }));
  }

  handleRemoveProject(index) {
    this.setState(({ projects, chosenProjects, numberOfChosenProjects }) => {
      let NewChosenProjects = chosenProjects.slice();
      NewChosenProjects[index] = 0;
      return {
        projects: projects.filter((e) => { return e.number != index }),
        chosenProjects: NewChosenProjects,
        numberOfChosenProjects: numberOfChosenProjects - 1,
      }
    });
  }

  render() {
    return (<div>
      <MainMenu
        setPage={this.setPage}
        page={this.state.page}
      />

      <Header
        as="h1"
        content="Портфолио"
        style={{
          paddingBottom: '20px',
          //paddingTop: '30px',
          //style.h1
        }}
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
                <div style={{ height: "350px", width: "100%", }}>
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

        <Container className='containerFullWitdh'>

          <Page2
            data={this.state.data}
            chosenProjects={this.state.chosenProjects}
            img_add_prefix={this.img_add_prefix}
            setPage={this.setPage}
            BACKEND_ADDRESS={BACKEND_ADDRESS}
            projects={this.state.projects}
            handleOrderChange={this.handleOrderChange}
            handleRemoveProject={this.handleRemoveProject}
            projectNames={this.state.projectNames}
            chosenProjects={this.state.chosenProjects}
            numberOfChosenProjects={this.state.numberOfChosenProjects}
          />

        </Container>
      }
      {this.state.page == 'hello' &&
        <Segment basic style={{
          width: '30%',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '50px',


        }}>
          <Grid ui centered>
            <Grid.Row style={{
              paddingTop: 0,
              paddingBottom: '5px',
            }}>
              <Button positive fluid size='medium' onClick={() => {
                this.setPage('main');
                this.selectAll('deselect all');
                this.setState({
                  projects: [],
                })
              }}>
                Создать портфолио с чистого листа
              </Button>
            </Grid.Row>
            <Grid.Row
              style={{
                padding: '5px 0',
              }}
            >
              <Button primary fluid size="medium" onClick={() => { this.setPage('portfolios') }} >
                Посмотреть ранее созданные
              </Button>
            </Grid.Row>

            {/* <Grid.Row
              style={{
                marginTop: '100px',
              }}
            >
              <Button fluid size="medium" onClick={() => { this.setPage('portfolios') }} >
              Информация о занимаемом месте
          </Button>
            </Grid.Row> */}
          </Grid>
        </Segment>
      }

      {this.state.page == 'portfolios' &&
        <Container>

          <Portfolios
            loading_portfolios={this.state.loading_portfolios}
            BACKEND_ADDRESS={BACKEND_ADDRESS}
            portfolios={this.state.portfolios}
            loadPortfolio={this.loadPortfolio}
            setPage={this.setPage}
            selectAll={this.selectAll}
          />

        </Container>
      }

    </div >
    );
  }
}

export default App;
