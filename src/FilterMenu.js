import React from "react";
import Search from "./Search.js";
import TagSearch from "./TagSearch.js";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Input,
  Menu,
  Segment,
  Step,
  Table,
  Dropdown,
  Checkbox,
} from "semantic-ui-react";
import CategorySearch from "./CategorySearch.js";
import { cleanup } from "@testing-library/react";

class FilterMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleTags: [],
      filterChosenName: '',
      filterChosenCategories: [],
      filterChosenTags: [],

    };
    this.handleFilterCategoryChange = this.handleFilterCategoryChange.bind(this);
    this.handleFilterTagsChange = this.handleFilterTagsChange.bind(this);
    this.handleFilterNameChange = this.handleFilterNameChange.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.checkAll = this.checkAll.bind(this);

    this.resetFilters();


  }

  componentDidMount(props) {
    this.recountVisibleTags();
  }

  resetFilters() {
    //console.log('yay reset!')
    this.setState({
      filterChosenName: '',
      filterChosenCategories: [],
      filterChosenTags: [],
    }, () => {
      this.recountVisibleTags();
      this.props.recountVisibleProjects(this.state.filterChosenCategories, this.state.filterChosenTags, this.state.filterChosenName);
    }
    ); //callback
  }

  checkAll() {
    //visibleProjects = [1, 3, 7] -> selectAll([1, 7])
    if (!this.props.visibleProjects || !this.props.visibleProjects.length) return;

    let checked_visible = 0;

    for (let p of this.props.visibleProjects)
    {
      if (this.props.chosenProjects[p]) ++checked_visible;
    }
    
    console.log('checked visible = ' + checked_visible)

    if (this.props.numberOfVisibleProjects == checked_visible) {
      this.props.selectAll('deselect all')
    }
    else {
      this.props.selectAll('select all')

    }
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
    console.log('recountVisibleTags()')
    this.setState((state, props) => {
      let tags = new Set();
      let clients = new Set();
      if (props.categories_with_tags && props.categories_with_tags.length)
        for (let c of props.categories_with_tags) {
          if (state.filterChosenCategories && state.filterChosenCategories.includes(c.name)) {
            for (let t of c.tags) {
              if (props.clients.includes(t))
                clients.add(t);
              else tags.add(t);

            }
          }
        }
      if (!state.filterChosenCategories || !state.filterChosenCategories.length) {
        if (props.clients)
          tags = props.clients.concat(props.tags);
        else
          tags = props.tags
      }

      if (!tags) tags = []
      if (!clients) clients = []

      return {
        visibleTags: Array.from(clients).concat((Array.from(tags))),
      }
    });
    //console.log('recounted visible: vt = ' + this.state.visibleTags)
  }


  formSearchFromArray(list, type, clients) {
    if (!clients) clients = []
    //console.log(`type = ${type}`);

    let icon_def = 'tag';

    if (type == 'categories') {
      icon_def = 'plus'
    }
    else if (type == 'names') {
      icon_def = 'file'
    }


    let ans = [];
    let i = 0;
    //console.log(`list = ${list}`)
    if (!list || !list.length) return ans;
    for (let a of list) {
      let icon = icon_def
      if (type == 'tags') icon = (clients.includes(a) ? 'building ' : 'tag');
      ans.push({
        icon: icon,
        key: a,
        value: a,
        text: a,
      });
      ++i;
    }

    //console.log(`${type.toUpperCase()}: formed search array: ${ans}`);

    return ans;
  }

  render() {
    return (
      <Segment>
        <Grid container columns={4} stackable>
          <Grid.Column>
            <Segment basic>
              <CategorySearch
                tags={this.state.filterChosenName != '' ? [] : this.formSearchFromArray(this.props.categories, 'categories')}
                handleFilterCategoryChange={this.handleFilterCategoryChange}
                filterChosenCategories={this.state.filterChosenCategories}

              />
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment basic>
              <TagSearch
                tags={this.state.filterChosenName != '' ? [] : this.formSearchFromArray(this.state.visibleTags, 'tags', this.props.clients)}
                handleFilterTagsChange={this.handleFilterTagsChange}
                filterChosenTags={this.state.filterChosenTags}

              />
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment basic>
              <Search //by project name
                tags={this.formSearchFromArray(this.props.projectNames, 'names')}
                handleFilterNameChange={this.handleFilterNameChange}
                filterChosenName={this.state.filterChosenName}

              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic>
              <Button fluid positive icon
                onClick={
                  () => { this.props.recountVisibleProjects(this.state.filterChosenCategories, this.state.filterChosenTags, this.state.filterChosenName) }}//this.state.filterChosenCategories,
              //this.state.filterChosenTags,
              //this.state.filterChosenName)} 
              >
                <Icon name="search" /> &nbsp; Применить фильтры
              </Button>
            </Segment>
          </Grid.Column>
        </Grid>

        <Grid container columns={4} stackable style={{ marginTop: "-40px" }}>
          <Grid.Column>
            <Segment basic>
              <Button
                fluid
                onClick={this.checkAll}
              >Выбрать всё</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic>
              <Button fluid onClick={() => {
                this.resetFilters();
                //console.log('resettttttttttttttt')
              }}>Сбросить фильтры</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic className='verticalAlign' style={{ textAlign: 'center', }}>

            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic className='verticalAlign' style={{ textAlign: 'center', }} >
              <Button
                color="orange"
                fluid
                icon
                onClick={() => {this.props.setPage('move')}}> 
                Продолжить &nbsp;
                <Icon name="right arrow" />
              </Button>

            {/* <Button fluid>Добавить в портфолио</Button> */}
            {/* <Button fluid> */}
            <div style={{ paddingTop: '10px', }}>
              {`Проектов выбрано: ${this.props.numberOfChosenProjects}`}
            </div>
            {/* </Button> */}
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment >
    );
  }
}


export default FilterMenu;
