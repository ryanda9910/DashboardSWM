import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";

import Dashboard from "../../pages/dashboard";

//TABLES DATA
import pelanggan from "../../pages/tables/pelanggan/Pelanggan";
import Area from "../../pages/tables/area/Area";
import PanelMeter from "../../pages/tables/panelmeter/Panelmeter";
import TarifVersion from "../../pages/tables/tarifversion/TarifVersion";
import Tarif from "../../pages/tables/tarif/Tarif";
import KelompokPelanggan from "../../pages/tables/kelompok pelanggan/kelompokPelanggan";
import RoleData from "../../pages/tables/role/Roledata";
import UserData from "../../pages/tables/user/Userdata";
import Distributor from "../../pages/tables/distributor/Distributor";

//EDIT TABLES DATA
import EditDataKelompokPelanggan from "../../pages/forms/editdatakelompokpelanggan/EditdatakelompokPelanggan";
import EditDataTarifPelanggan from "../../pages/forms/editdatatarifpelanggan/Editdatatarifpelanggan";
import EditDataTarifVersion from "../../pages/forms/editdatatarifversion/Editdatatarifversion";
import EditDataUsers from "../../pages/forms/editdatausers/Editdatausers";
import EditDataRole from "../../pages/forms/editdatarole/Editdatarole";
import EditDataPelanggan from "../../pages/forms/editdatapelanggan/Editdatapelanggan";
import EditDataPerangkat from "../../pages/forms/editdataperangkat/Editdataperangkat";
import EditDataArea from "../../pages/forms/editdataarea/Editdataarea";
import EditDataDistributor from "../../pages/forms/editdatadistributor/Editdatadistributor";

//METER TESTING
import MeterTesting from "../../pages/tables/metertesting/Metertesting";

import Header from "../Header";
import Sidebar from "../Sidebar";
import { openSidebar, closeSidebar } from "../../actions/navigation";
import s from "./Layout.module.scss";

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false
  };
  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          "sidebar-" + this.props.sidebarPosition,
          "sidebar-" + this.props.sidebarVisibility
        ].join(" ")}
      >
        <div className={s.wrap}>
          <Header />
          {/* <Chat chatOpen={this.state.chatOpen} /> */}
          {/* <Helper /> */}
          <Sidebar />
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    {/* ROUTES TESTING */}
                    <Route
                      path="/app/tables/metertesting"
                      exact
                      component={MeterTesting}
                    />
                    {/* ROUTES TABLES */}
                    <Route
                      path="/app/main"
                      exact
                      render={() => <Redirect to="/app/main/dashboard" />}
                    />
                    <Route
                      path="/app/main/dashboard"
                      exact
                      component={Dashboard}
                    />

                    <Route path="/app/tables/area" exact component={Area} />
                    <Route
                      path="/app/tables/panelmeter"
                      exact
                      component={PanelMeter}
                    />
                    <Route
                      path="/app/tables/pelanggan"
                      exact
                      component={pelanggan}
                    />
                    <Route
                      path="/app/tables/tarifversion"
                      exact
                      component={TarifVersion}
                    />
                    <Route path="/app/tables/tarif" exact component={Tarif} />
                    <Route
                      path="/app/tables/kelompokpelanggan"
                      exact
                      component={KelompokPelanggan}
                    />
                    <Route
                      path="/app/tables/roledata"
                      exact
                      component={RoleData}
                    />
                    <Route
                      path="/app/tables/userdata"
                      exact
                      component={UserData}
                    />
                    <Route
                      path="/app/tables/distributor"
                      exact
                      component={Distributor}
                    />
                    {/* ROUTES EDIT DATA  */}
                    <Route
                      path="/app/forms/editdatakelompokpelanggan/:id"
                      exact
                      component={EditDataKelompokPelanggan}
                    />
                    <Route
                      path="/app/forms/editdatatarifpelanggan/:id"
                      exact
                      component={EditDataTarifPelanggan}
                    />
                    <Route
                      path="/app/forms/editdatatarifversion/:id"
                      exact
                      component={EditDataTarifVersion}
                    />
                    <Route
                      path="/app/forms/editdatausers/:id"
                      exact
                      component={EditDataUsers}
                    />
                    <Route
                      path="/app/forms/editdatarole/:id"
                      exact
                      component={EditDataRole}
                    />
                    <Route
                      path="/app/forms/editdatapelanggan/:id"
                      exact
                      component={EditDataPelanggan}
                    />
                    <Route
                      path="/app/forms/editdataperangkat/:id"
                      exact
                      component={EditDataPerangkat}
                    />
                    <Route
                      path="/app/forms/editdataarea/:id"
                      exact
                      component={EditDataArea}
                    />
                    <Route
                      path="/app/forms/editdatadistributor/:id"
                      exact
                      component={EditDataDistributor}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}>
                SWM Management, <a href="#">For Better Water System</a>
              </footer>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
