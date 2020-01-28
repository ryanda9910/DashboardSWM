import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup";

import { changeActiveSidebarItem } from "../../actions/navigation";
import { logoutUser } from "../../actions/user";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    sidebarStatic: false,
    activeItem: ""
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener(
      "transitionend",
      () => {
        if (this.props.sidebarOpened) {
          this.element.classList.add(s.sidebarOpen);
        }
      },
      false
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
      if (nextProps.sidebarOpened) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = "";
        }, 0);
      }
    }
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <nav
        className={cx(s.root)}
        ref={nav => {
          this.element = nav;
        }}
      >
        <header className={s.logo}>
          <a href="#">
            SWM<span className="fw-bold"> Management </span>
          </a>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Dashboard"
            isHeader
            iconName="flaticon-worldwide"
            link="/app/main/dashboard"
            index="main"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Security"
            link="/app/security"
            isHeader
            iconName="flaticon-locked-2"
            index="security"
            childrenLinks={[
              {
                header: "Distributor",
                link: "/app/tables/distributor"
              },
              {
                header: "Role",
                link: "/app/tables/roledata"
              },
              {
                header: "User",
                link: "/app/tables/userdata"
              }
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Area"
            isHeader
            iconName="flaticon-map-location"
            link="/app/tables/area"
            index="Area"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Perangkat"
            isHeader
            iconName="flaticon-controls"
            link="/app/tables/panelmeter"
            index="Panelmeter"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Pelanggan "
            isHeader
            iconName="flaticon-user"
            link="/app/tables/pelanggan"
            index="Pelanggan"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Tarif"
            isHeader
            iconName="flaticon-notebook-3"
            link="/app/tarifpelanggan"
            index="tarifpelanggan"
            childrenLinks={[
              {
                header: "Tarif Version",
                link: "/app/tables/tarifversion"
              },
              {
                header: "Tarif Pelanggan",
                link: "/app/tables/tarif"
              }
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={t =>
              this.props.dispatch(changeActiveSidebarItem(t))
            }
            activeItem={this.props.activeItem}
            header="Kelompok Pelanggan"
            isHeader
            iconName="flaticon-database-1"
            link="/app/tables/kelompokpelanggan"
            index="tables"
          />
          <LinksGroup
            header="Meter Testing"
            link="/app/tables/metertesting"
            isHeader
            iconName="flaticon-settings-6"
          />
          {/* <Link
            onClick={this.doLogout}
            className="text-white"
            to="#"
          >Logout</Link> */}
        </ul>
      </nav>
    );
  }
}
function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
