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

class FilterMenu extends React.Component {
  filterChangedName(e, value) {
    console.log("filterchangedname: " + value.value);
  }

  render() {
    return (
      <Segment>
        <Grid container columns={4} stackable>
          <Grid.Column>
            <Segment basic>
              <CategorySearch
                tags={this.props.formSearchFromArray(this.props.categories)}
              />
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment basic>
              <TagSearch
                tags={this.props.formSearchFromArray(this.props.tags)}
              />
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment basic>
              <Search //by project name
                tags={this.props.formSearchFromArray(this.props.projectNames)}
                filterChangedName={this.filterChangedName}
              />
              {/* <Input
                placeholder="2001-2020"
                //style={{width: "83%", float: "right"}}

                //style={{ width: "30%", paddingLeft: "8px" }}
              /> */}
              {/* по 
              <Input
                style={{ width: "30%" }}
              /> */}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic>
              <Button fluid positive icon>
                <Icon name='search' /> &nbsp; Применить фильтры
              </Button>
            </Segment>
          </Grid.Column>
        </Grid>

        <Grid container columns={4} stackable style={{ marginTop: "-40px" }}>
          <Grid.Column>
            <Segment basic>
              <Button fluid>Deselect all</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic>
              <Button fluid>Сбросить фильтры</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic>
              <Button fluid>Добавить в портфолио</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic>
              <Button color='orange' fluid  icon > 
                Продолжить &nbsp;
                <Icon name="right arrow" />
              </Button>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default FilterMenu;
