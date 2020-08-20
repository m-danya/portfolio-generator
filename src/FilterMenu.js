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

    filterChangedName(e, value)
    {
        console.log('filterchangedname: ' + value.value)
    }

  render() {
    return (
      <Segment>
        <Grid container columns={4} stackable>
          <Grid.Column>
            <Segment basic>
              {
                <Search //by project name
                  tags={this.props.formSearchFromArray(this.props.projectNames)}
                  filterChangedName={this.filterChangedName}
                />
              }
            </Segment>
          </Grid.Column>
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
              
              <Input
                placeholder="2001-2020"
                //style={{width: "83%", float: "right"}}

                //style={{ width: "30%", paddingLeft: "8px" }}
              />
                {/* по 
              <Input
                style={{ width: "30%" }}
              /> */}
            </Segment>
          </Grid.Column>
        </Grid>
        <div style={{textAlign:'left'}}>
            <Button style={{margin:"0px 5px 0px 27px"}} positive>Применить фильтры</Button>
            <Button style={{margin:"0px 5px"}}>Сбросить фильтры</Button>
            <Button style={{margin:"0px 5px"}}>Справка</Button>

        </div>
        {/* <Grid  columns={4} >
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>

          <Grid.Column>
            <Segment basic>
                <Button>Применить фильтры</Button>
            </Segment>
          </Grid.Column>
        </Grid>
         */}

      </Segment>
      
      
    );
  }
}

export default FilterMenu;
