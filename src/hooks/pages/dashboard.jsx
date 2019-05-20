import React, {Fragment} from "react";
import Nav from '../components/navigation';

import Stats from "../components/stats";
import Repos from "../components/repositories";
import Followers from "../components/followers";

function DashBoard() {
  return (
    <Fragment>
      <Nav/>
      <div className="container mt-3">
        <div className="row">
          <div className="col-sm">
            <Stats/>
            <br/>
            <Followers/>
          </div>
          <div className="col-sm">
            <Repos/>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default DashBoard;
