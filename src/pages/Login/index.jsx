import React, { Component } from "react";
import { Link } from "react-router-dom";

// react-bootstrap components
import { Card } from "react-bootstrap";

// i18next language library
import { withTranslation } from "react-i18next";

// Styles Global
import "./style.scss";

// Axios Library
import axios from "axios";

//   Login Component
import LoginForm from "../../components/Login";

// Images
import LogoImage from "../../assets/images/logo_images.png";
import IconDarkMode from "../../assets/images/icons/icon-dark-mode-white.svg";
import IconLightMode from "../../assets/images/icons/icon-light-mode-white.svg";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      darkTheme: false,
      lng: "en",
    };
  }

  handleDarkTheme = () => {
    this.setState((prevState) => ({
      darkTheme: !prevState.darkTheme,
    }));
    if (this.state.darkTheme === false) {
      localStorage.setItem("darkTheme", true);
    } else {
      localStorage.removeItem("darkTheme", true);
    }
  };

  handleChangeLanguage = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language);
    this.setState({
      lng: language,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    let url = `https://6622789327fcd16fa6c9f275.mockapi.io/api/v1/users?email=${this.state.email}&password=${this.state.password}`;
    axios
      .get(url)
      .then((res) => {
        if (res) {
          let role = res.data[0].role;
          let name = res.data[0].name;
          let avatar = res.data[0].avatar;
          let token = "abcdefgh";
          localStorage.setItem("role", role);
          localStorage.setItem("name", name);
          localStorage.setItem("avatar", avatar);
          localStorage.setItem("token", token);
          let roleAdmin = localStorage.getItem("role");
          if (roleAdmin === "admin") {
            window.location = "/overview";
          } else if (roleAdmin === "guest") {
            window.location = "/tickets";
          } else {
            window.alert("Failed to login! Your role is not valid");
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          window.alert("Failed to login! Please check your Email and Password");
        } else {
          window.alert("Failed to login! Please check your Email and Password");
        }
      });
  };

  render() {
    const { t } = this.props;
    const darkTheme = localStorage.getItem("darkTheme");
    const { email, password, lng } = this.state;
    return (
      <div className={darkTheme ? "login darkTheme" : "login"}>
        <div className="d-flex toggle-group align-items-center justify-content-end gap-2">
          <div className="toggle-theme" onClick={this.handleDarkTheme}>
            {darkTheme ? (
              <img src={IconLightMode} alt={IconLightMode} />
            ) : (
              <img src={IconDarkMode} alt={IconDarkMode} />
            )}
          </div>
          <div className="toggle-language d-flex gap-2">
            <span
              onClick={() => this.handleChangeLanguage("en")}
              className={lng === "en" ? "active" : ""}
            >
              EN
            </span>
            <span
              onClick={() => this.handleChangeLanguage("id")}
              className={lng === "id" ? "active" : ""}
            >
              ID
            </span>
          </div>
        </div>

        <div className="card-container">
          <Card>
            <div className="d-flex justify-content-center mb-3">
              <img src={LogoImage} alt={LogoImage} className="logo" />
            </div>
            <h4 className="text-center mb-4 invalid">Dashboard Kit</h4>
            <h3 className="text-center mb-2">{t("Log In to Dashboard Kit")}</h3>
            <p className="text-center mb-5 invalid">
              {t("Enter your email and password below")}
            </p>
            <LoginForm
              onSubmit={(e) => this.handleLogin(e)}
              handleChange={this.handleChange}
              email={email}
              password={password}
            />
            <p className="text-center">
              {t("Don't have an account?")} <Link>{t("Sign Up")}</Link>
            </p>
          </Card>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Login);
