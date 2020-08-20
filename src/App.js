import React from "react";
import Tree from "./Tree.js";
//import Checkbox from './MyCheckbox.js'
//import List from './List.js'
import ItemsCollection from "./ItemsCollection.js";

import FilterMenu from "./FilterMenu.js";

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
} from "semantic-ui-react";

const style = {
  h1: {
    paddingTop: "1em",
    paddingBottom: "0.5em",
  },
};

class App extends React.Component {
  img_add_prefix(path) {
    return "./img/" + path;
  }
  constructor(props) {
    super(props);
    this.state = {
      // tags: [
      //   {
      //     value: "1",
      //     label: "Упаковка",
      //     children: [
      //       {
      //         value: "1.1",
      //         label: "Соки",
      //       },

      //       {
      //         value: "1.2",
      //         label: "Минералка",
      //       },

      //       {
      //         value: "1.3",
      //         label: "Крупы",
      //       },

      //       {
      //         value: "1.4",
      //         label: "Дойпак",
      //       },

      //       {
      //         value: "1.5",
      //         label: "Трей",
      //       },

      //       {
      //         value: "1.6",
      //         label: "Пауч",
      //       },
      //     ],
      //   },
      //   {
      //     value: "2",
      //     label: "Корпоративный брендинг",
      //     children: [
      //       {
      //         value: "2.1",
      //         label: "Нефть/газ",
      //       },

      //       {
      //         value: "2.2",
      //         label: "Государство",
      //       },

      //       {
      //         value: "2.3",
      //         label: "Спорт",
      //       },

      //       {
      //         value: "2.4",
      //         label: "Искусство",
      //       },
      //     ],
      //   },
      //   {
      //     value: "3",
      //     label: "Третья категория тегов",
      //     children: [
      //       {
      //         value: "3.1",
      //         label: "И",
      //       },
      //       {
      //         value: "3.2",
      //         label: "её",
      //       },
      //       {
      //         value: "3.3",
      //         label: "теги",
      //       },
      //     ],
      //   },
      // ],

      tags: [
        ["1.1", "1.2"],
        ["2.1", "2.2", "2.3", "2.4"],
      ],

      data: [
        {
          images: [
            "ALRUD1.jpg",
            "ALRUD2.jpg",
            "ALRUD3.jpg",
            "ALRUD4.jpg",
            "ALRUD5.jpg",
          ],
          title: "Alrud",
          year: 2019,
          tags: ["упаковка", "фирменный стиль", "модно"],
        },

        {
          images: [
            "BAKERTON1.jpg",
            "BAKERTON2.jpg",
            "BAKERTON3.jpg",
            "BAKERTON4.jpg",
            "BAKERTON5.jpg",
          ],
          title: "Bakerton",
          year: 2021,
          tags: ["упаковка", "фирменный стиль", "пончики"],
        },

        {
          images: [
            "KFC_BATTLE1.jpg",
            "KFC_BATTLE2.jpg",
            "KFC_BATTLE3.jpg",
            "KFC_BATTLE4.jpg",
            "KFC_BATTLE5.jpg",
          ],
          title: "KFC BATTLE",
          year: 2021,
          tags: ["мероприятие", "ярко", "реклама"],
        },

        {
          images: [
            "KIDZANIA1.jpg",
            "KIDZANIA2.jpg",
            "KIDZANIA3.jpg",
            "KIDZANIA4.jpg",
            "KIDZANIA5.jpg",
          ],
          title: "Кидзания",
          year: 1999,
          tags: ["для детей", "плакаты", "модно"],
        },

        {
          images: ["NEMOLOKO1.jpg", "NEMOLOKO2.jpg"],
          title: "NEMOLOKO",
          year: 2016,
          tags: ["фирменный стиль", "молоко", "еда", "модно"],
        },

        {
          images: [
            "NORNICKEL_ANNUAL_20191.jpg",
            "NORNICKEL_ANNUAL_20192.jpg",
            "NORNICKEL_ANNUAL_20193.jpg",
            "NORNICKEL_ANNUAL_20194.jpg",
            "NORNICKEL_ANNUAL_20195.jpg",
          ],
          title: "NORNICKEL ANNUAL",
          year: 2019,
          language: "eng",
          tags: ["фирменный стиль", "брошюры"],
        },

        {
          images: ["OCHAKOVO_LAP_BEER1.jpg", "OCHAKOVO_LAP_BEER2.jpg"],
          title: "OCHAKOVO LAP BEER",
          year: 2023,
          tags: ["фирменный стиль", "упаковка", "пиво"],
        },

        {
          images: ["RICH_HORECA1.jpg", "RICH_HORECA2.jpg"],
          title: "RICH HORECA",
          year: 2013,
          tags: ["фирменный стиль", "упаковка", "соки", "еда"],
        },

        {
          images: [
            "SADI_PRIDONYA_BABY1.jpg",
            "SADI_PRIDONYA_BABY2.jpg",
            "SADI_PRIDONYA_BABY3.jpg",
            "SADI_PRIDONYA_BABY4.jpg",
            "SADI_PRIDONYA_BABY5.jpg",
          ],
          title: "Сады придонья (детская линейка)",
          year: 2019,
          tags: ["еда", "фирменный стиль", "для детей"],
        },

        {
          images: [
            "SAVUSHKIN_APETI1.jpg",
            "SAVUSHKIN_APETI2.jpg",
            "SAVUSHKIN_APETI3.jpg",
          ],
          title: "Савушкин Апети",
          year: 2018,
          tags: ["фирменный стиль", "упаковка", "еда", "модно"],
        },

        {
          images: ["SP_Mors_01.jpg", "SP_Mors_02.jpg"],
          title: "Сады придонья. Морс",
          year: 2016,
          tags: ["морс", "упаковка", "еда"],
        },

        {
          images: [
            "STADA_100let1.jpg",
            "STADA_100let2.jpg",
            "STADA_100let3.jpg",
            "STADA_100let4.jpg",
            "STADA_100let5.jpg",
          ],
          title: "STADA_100let",
          year: 2020,
          tags: ["фирменный стиль"],
        },

        {
          images: ["TIMOSHA1.jpg", "TIMOSHA2.jpg", "TIMOSHA3.jpg"],
          title: "Тимоша",
          year: 2045,
          tags: ["упаковка", "еда"],
        },

        {
          images: [
            "vmeste1.jpg",
            "vmeste2.jpg",
            "vmeste3.jpg",
            "vmeste4.jpg",
            "vmeste5.jpg",
          ],
          title: "Вместе",
          year: 2018,
          tags: ["фирменный стиль", "модно"],
        },
      ],

      categories: [
        "Упаковка",
        "Фирменный стиль",
        "и",
        "другие",
        "большие",
        "категории",
      ],
      visibleTags: [],
      checkedProjects: [],
      projectNames: [],
      visibleProjects: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],

      filerChosenName: "",
      filterChosenCategories: [],
      filterChosenTags: [],
      filterChosenYears: "",
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

  recountVisibleProjects() {
    //TODO!
  }

  onChangeProject(i) {
    //console.log("project changed! " + i);
  }

  getProjectNames(data) {
    let ans = [];
    for (let d of data) {
      ans.push(d.title);
    }
    return ans;
  }

  formSearchFromArray(list) {
    //console.log("list = " + list);
    let ans = [];
    let i = 0;
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
    return (
      <div>
        <Header
          as="h1"
          content="Генератор портфолио"
          style={style.h1}
          textAlign="center"
        />

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
            {/* <Segment>
              <Grid container columns={4} stackable>
                <Grid.Column>
                  <Segment basic>{<Button>Применить фильтры</Button>}</Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment basic></Segment>
                </Grid.Column>
              </Grid>
            </Segment> */}

            <Segment>
              <Header as="h2" content="Проекты" />
              <ItemsCollection
                data={this.state.data}
                img_add_prefix={this.img_add_prefix}
                onChangeProject={this.onChangeProject}
                visibleProjects={this.state.visibleProjects}
              />
            </Segment>
          </Segment.Group>
        </Container>
      </div>
    );
  }
}

export default App;
