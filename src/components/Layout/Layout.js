import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";

// import Profile from "../../pages/profile";
// import UIButtons from "../../pages/ui-elements/buttons";
// import UIIcons from "../../pages/ui-elements/icons";
// import UITabsAccordion from "../../pages/ui-elements/tabs-accordion/";
// import UINotifications from "../../pages/ui-elements/notifications";
// import UIListGroups from "../../pages/ui-elements/list-groups";
// import FormsElements from "../../pages/forms/elements";
// import FormsValidation from "../../pages/forms/validation";
// import FormsWizard from "../../pages/forms/wizard";
// import TablesStatic from "../../pages/tables/static";
// import TablesDynamic from "../../pages/tables/dynamic";
// import MapsGoogle from "../../pages/maps/google";
// import MapsVector from "../../pages/maps/vector";
// import ExtraCalendar from "../../pages/extra/calendar";
// import ExtraInvoice from "../../pages/extra/invoice";
// import ExtraSearch from "../../pages/extra/search";
// import ExtraTimeline from "../../pages/extra/timeline";
// import ExtraGallery from "../../pages/extra/gallery";
// import Grid from "../../pages/grid";
// import Widgets from "../../pages/widgets";
// import Products from "../../pages/products";
// import Management from "../../pages/management";
// import Product from "../../pages/product";
// import Package from "../../pages/package";
// import Email from "../../pages/email";
// import CoreTypography from "../../pages/core/typography";
// import CoreColors from "../../pages/core/colors";
// import CoreGrid from "../../pages/core/grid";
// import UIAlerts from "../../pages/ui-elements/alerts";
// import UIBadge from "../../pages/ui-elements/badge";
// import UICard from "../../pages/ui-elements/card";
// import UICarousel from "../../pages/ui-elements/carousel";
// import UIJumbotron from "../../pages/ui-elements/jumbotron";
// import UIModal from "../../pages/ui-elements/modal";
// import UIProgress from "../../pages/ui-elements/progress";
// import UINavbar from "../../pages/ui-elements/navbar";
// import UINav from "../../pages/ui-elements/nav";
// import UIPopovers from "../../pages/ui-elements/popovers";
// import Charts from "../../pages/charts";
// import ApexCharts from "../../pages/charts/apex";
// import Echarts from "../../pages/charts/echarts";
// import HighCharts from "../../pages/charts/highcharts";
// import DashboardAnalytics from "../../pages/analytics";
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

//EDIT TABLES DATA
import EditDataKelompokPelanggan from "../../pages/forms/editdatakelompokpelanggan/EditdatakelompokPelanggan";
import EditdataCostumerBilling from "../../pages/forms/editdatacostumerbilling/Editdatacostumerbilling";
import EditDataTarifPelanggan from "../../pages/forms/editdatatarifpelanggan/Editdatatarifpelanggan";
import EditDataUsers from "../../pages/forms/editdatausers/Editdatausers";
import EditDataRole from "../../pages/forms/editdatarole/Editdatarole";
import EditDataPelanggan from "../../pages/forms/editdatapelanggan/Editdatapelanggan";
import EditDataPerangkat from "../../pages/forms/editdataperangkat/Editdataperangkat";
import EditDataArea from "../../pages/forms/editdataarea/Editdataarea";
//CREATE DATA TABLES
// import CreateDataTarifPelanggan from "../../pages/forms/createdatatarifpelanggan/CreateDataTarifPelanggan";
// import CreateDataArea from "../../pages/forms/createdataarea/CreateDataArea";
// import CreateDataKelompokPelanggan from "../../pages/forms/createdatakelompokpelanggan/CreateDataKelompokPelanggan";
// import CreateDataBillingCostumer from "../../pages/forms/createdatabillingcostumer/CreateDataBillingCostumer";
// import CreateDataRole from "../../pages/forms/createdatarole/CreateDataRole";
// import CreateDataUsers from "../../pages/forms/createdatauser/CreateDataUser";
// import CreateDataPerangkat from "../../pages/forms/createdataperangkat/CreateDataPerangkat";
// import CreateDataPelanggan from "../../pages/forms/createdatapelanggan/CreateDataPelanggan";
//  METER TESTING
import MeterTesting from "../../pages/tables/metertesting/Metertesting";
//
import Header from "../Header";
import Sidebar from "../Sidebar";
import { openSidebar, closeSidebar } from "../../actions/navigation";
import s from "./Layout.module.scss";
// import CreateDataUser from "../../pages/forms/createdatauser/CreateDataUser";
// import ProductEdit from "../../pages/management/components/productEdit";

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
                      path="/app/forms/editdatakelompokpelanggan"
                      exact
                      component={EditDataKelompokPelanggan}
                    />
                    <Route
                      path="/app/forms/editdatacostumerbilling"
                      exact
                      component={EditdataCostumerBilling}
                    />
                    <Route
                      path="/app/forms/editdatatarifpelanggan/:id"
                      exact
                      component={EditDataTarifPelanggan}
                    />

                    <Route
                      path="/app/forms/editdatausers"
                      exact
                      component={EditDataUsers}
                    />
                    <Route
                      path="/app/forms/editroledata"
                      exact
                      component={EditDataRole}
                    />
                    <Route
                      path="/app/forms/editdatapelanggan"
                      exact
                      component={EditDataPelanggan}
                    />
                    <Route
                      path="/app/forms/editdataperangkat"
                      exact
                      component={EditDataPerangkat}
                    />
                    <Route
                      path="/app/forms/editdataarea/:id"
                      exact
                      component={EditDataArea}
                    />
                    {/* ROUTES CREATE DATA */}
                    {/* <Route
                      path="/app/forms/createdatatarifpelanggan"
                      exact
                      component={CreateDataTarifPelanggan}
                    />
                    <Route
                      path="/app/forms/createdataarea"
                      exact
                      component={CreateDataArea}
                    />
                    <Route
                      path="/app/forms/createdatapelanggan"
                      exact
                      component={CreateDataPelanggan}
                    />
                    <Route
                      path="/app/forms/createdatabillingcostumer"
                      exact
                      component={CreateDataBillingCostumer}
                    />
                    <Route
                      path="/app/forms/createdatarole"
                      exact
                      component={CreateDataRole}
                    />
                    <Route
                      path="/app/forms/createdatauser"
                      exact
                      component={CreateDataUsers}
                    />
                    <Route
                      path="/app/forms/createdatakelompokpelanggan"
                      exact
                      component={CreateDataKelompokPelanggan}
                    />
                    <Route
                      path="/app/forms/createdataperangkat"
                      exact
                      component={CreateDataPerangkat}
                    /> */}
                    {/* <Route
                      path="/app/tables/pelanggan"
                      exact
                      component={Pelanggan}
                    /> */}
                    {/* <Route path="/app/main/widgets" exact component={Widgets} />
                    <Route path="/app/main/analytics" exact component={DashboardAnalytics} />
                    <Route path="/app/ecommerce/management" exact component={Management} />
                    <Route path="/app/ecommerce/management/:id" exact component={ProductEdit} />
                    <Route path="/app/ecommerce/management/create" exact component={ProductEdit} />
                    <Route path="/app/ecommerce/products" exact component={Products} />
                    <Route path="/app/ecommerce/product" exact component={Product} />
                    <Route path="/app/ecommerce/product/:id" exact component={Product} />
                    <Route path="/app/profile" exact component={Profile} />
                    <Route path="/app/inbox" exact component={Email} />
                    <Route path="/app/ui" exact render={() => <Redirect to="/app/ui/components" />} />
                    <Route path="/app/ui/buttons" exact component={UIButtons} />
                    <Route path="/app/ui/icons" exact component={UIIcons} />
                    <Route path="/app/ui/tabs-accordion" exact component={UITabsAccordion} />
                    <Route path="/app/ui/notifications" exact component={UINotifications} />
                    <Route path="/app/ui/list-groups" exact component={UIListGroups} />
                    <Route path="/app/ui/alerts" exact component={UIAlerts} />
                    <Route path="/app/ui/badge" exact component={UIBadge} />
                    <Route path="/app/ui/card" exact component={UICard} />
                    <Route path="/app/ui/carousel" exact component={UICarousel} />
                    <Route path="/app/ui/jumbotron" exact component={UIJumbotron} />
                    <Route path="/app/ui/modal" exact component={UIModal} />
                    <Route path="/app/ui/popovers" exact component={UIPopovers} />
                    <Route path="/app/ui/progress" exact component={UIProgress} />
                    <Route path="/app/ui/navbar" exact component={UINavbar} />
                    <Route path="/app/ui/nav" exact component={UINav} />
                    <Route path="/app/grid" exact component={Grid} />
                    <Route path="/app/package" exact component={Package} />
                    <Route path="/app/forms" exact render={() => <Redirect to="/app/forms/elements" />} />
                    <Route path="/app/forms/elements" exact component={FormsElements} />
                    <Route path="/app/forms/validation" exact component={FormsValidation} />
                    <Route path="/app/forms/wizard" exact component={FormsWizard} />
                    <Route path="/app/charts/" exact render={() => <Redirect to="/app/charts/overview" />} />
                    <Route path="/app/charts/overview" exact component={Charts} />
                    <Route path="/app/charts/apex" exact component={ApexCharts} />
                    <Route path="/app/charts/echarts" exact component={Echarts} />
                    <Route path="/app/charts/highcharts" exact component={HighCharts} /> */}
                    {/* <Route path="/app/tables" exact render={() => <Redirect to="/app/tables/static" />} /> */}
                    {/* <Route path="/app/tables/static" exact component={TablesStatic} />
                    <Route path="/app/tables/dynamic" exact component={TablesDynamic} />
                    <Route path="/app/extra" exact render={() => <Redirect to="/app/extra/calendar" />} />
                    <Route path="/app/extra/calendar" exact component={ExtraCalendar} />
                    <Route path="/app/extra/invoice" exact component={ExtraInvoice} />
                    <Route path="/app/extra/search" exact component={ExtraSearch} />
                    <Route path="/app/extra/timeline" exact component={ExtraTimeline} />
                    <Route path="/app/extra/gallery" exact component={ExtraGallery} />
                    <Route path="/app/maps" exact render={() => <Redirect to="/app/maps/google" />} />
                    <Route path="/app/maps/google" exact component={MapsGoogle} />
                    <Route path="/app/maps/vector" exact component={MapsVector} />
                    <Route path="/app/core" exact render={() => <Redirect to="/app/core/typography" />} />
                    <Route path="/app/core/typography" exact component={CoreTypography} />
                    <Route path="/app/core/colors" exact component={CoreColors} />
                    <Route path="/app/core/grid" exact component={CoreGrid} /> */}
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
