import React, { useCallback, useState, useEffect, useMemo } from "react";
import Header from "./components/headercomp";
import Dashboard from "./components/landing";
import "./global.css";
import LeftPanel from "./components/shared/leftpanel";
import ConfigTool from "./components/configTool/index.tsx";
import ChatbotIcon from "./components/chatbot.tsx";
import DigitalTwinIcon from "./components/digital-twin.tsx";
import RealTimeAlarm from "./components/realTimeAlarm/index.tsx";
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import AlarmGraph from "./components/realTimeAlarm/alarmGraph/index.tsx";
import TaskManagement from "./components/taskmanagement/index.tsx";

const NewApp: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [login, setLogin] = useState(false);
  const [clickedLabel, setClickedLabel] = useState("landingPage");
  const [pageClickedFor, setPageClickedFor] = useState("dashboard");
  const [headerData, setHeaderData] = useState({});
  const [widgetData, setWidgetData] = useState({});
  const [headerCountData, setHeaderCountData] = useState({});
  const [unityMessageObject, setUnityMessageObject] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash == "#dashboard") {
      loginFn();
      //getOnloadData();
    }
  });

  const loginFn = (e) => {
    if (
      (!localStorage.getItem("loggedInUser") && e) ||
      (localStorage.getItem("loggedInUser") == "" && e)
    ) {
      setSpinning(true);
      if (!e) {
      }
      keycloak
        .init({ onLoad: "login-required" })
        .then((authenticated) => {
          console.log("authenticated..", authenticated);
          if (authenticated) {
            setLogin(true);

            console.log("login success", keycloak);
            localStorage.setItem("react-token", keycloak.token);
            localStorage.setItem("react-refresh-token", keycloak.refreshToken);
            localStorage.setItem("loggedInUser", keycloak.idTokenParsed.name);
            localStorage.setItem(
              "loggedInUserName",
              keycloak.idTokenParsed.preferred_username
            );
            localStorage.setItem(
              "loggedInUserRole",
              keycloak.realmAccess.roles.toString()
            );
            localStorage.setItem(
              "projectList",
              keycloak.idTokenParsed.projects.toString()
            );
            //root.render(<App/>);
            var role =
              localStorage.getItem("loggedInUserRole").indexOf("manager") !== -1
                ? "manager"
                : localStorage
                    .getItem("loggedInUserRole")
                    .indexOf("designEngineer") !== -1
                ? "designEngineer"
                : localStorage
                    .getItem("loggedInUserRole")
                    .indexOf("stressEngineer") !== -1
                ? "stressEngineer"
                : " ";

            //code to render only if authenticated:
            if (
              localStorage.getItem("loggedInUser") &&
              localStorage.getItem("loggedInUser") != ""
            ) {
              return <></>;
            }
          }
        })
        .catch((e) => {
          console.log("e:", e);
          setSpinning(false);
          setLogin(false);
          //alert('unable to connect to keycloak');
          message.error("Unable to connect to Keycloak");
        });
    } else {
      if (location.hash.indexOf("#config") != -1) {
        console.log("config");
        setSpinning(false);
        setLogin(true);
        return <ConfigTool />;
      } else {
        console.log("else: env variables : ", import.meta.env);
        location.hash = "dashboard";
        //setSpinning(false);
        setLogin(true);
        return <>getUnityApp()</>;
      }
    }
  };

  const sendDataToLandingPage = (e) => {
    console.log("received data in landing page sendDataToLandingPage:", e);

    e.split("::")
      ? (setClickedLabel(e.split("::")[1]), setPageClickedFor(e.split("::")[0]))
      : setPageClickedFor(e);

    let clickedLabelString = "";
    if (e.split("::")) {
      if (e.split("::")[1] == "Resource") {
        clickedLabelString = "Resource";
      } else if (e.split("::")[1] == "resourceEnergy") {
        clickedLabelString = "Energy";
      } else if (e.split("::")[1] == "resourceWater") {
        clickedLabelString = "Water";
      } else if (e.split("::")[1] == "resourceWaste") {
        clickedLabelString = "Waste";
      } else {
        clickedLabelString = e.split("::")[1];
      }
    }
    setClickedLabel(clickedLabelString);
  };
  if (location.hash.indexOf("#config") == -1) {
    return (
      <div>
        <Header
          setHeaderData={setHeaderData}
          setWidgetData={setWidgetData}
          setHeaderCountData={setHeaderCountData}
          setUnityMessageObject={setUnityMessageObject}
        />
        <div className="body-wrapper">
          <div className="left-wrapper left-sidebar">
            <LeftPanel
              headerData={headerData}
              sendDataToLandingPage={(e) => sendDataToLandingPage(e)}
            />
          </div>

          <div className="right-wrapper" id="mainContentDiv">
            <Dashboard
              headerData={headerData}
              sendDataToLandingPage={(e) => sendDataToLandingPage(e)}
              clickedLabel={clickedLabel}
              widgetData={widgetData}
              headerCountData={headerCountData}
              unityMessageObject={unityMessageObject}
            />
            <Routes>
              <Route path="/realtimeAlarm" element={<RealTimeAlarm />} />
              <Route path="/alarmGraph" element={<AlarmGraph />} />
              <Route path="/taskManagement" element={<TaskManagement />} />

              
            </Routes>
          </div>
        </div>
      </div>
    );
  } else {
    return <ConfigTool />;
  }
};

export default NewApp;