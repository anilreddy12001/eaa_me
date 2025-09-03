env = 'dev';
mode = 'cg_p1';
vm48_ip="http://gooogle.in";//For testing on vm without deployment
dev="http://google.com";
dev_ip = dev;//http://10.246.88.61:32769 //http://10.51.109.90:5000, 48vm: http://10.51.108.48:5199

//http://10.246.88.61:32769/energyanalytics/api/v1/filter/data
//QA config:
qa_ip = "http://10.246.91.98:30102";

//Production Config:
prod_ip = "http://10.246.90.136:30102";
//File server config:
// CGFileServerIP_Dev = "http://10.246.88.61";
// CGFileServerIP_Qa = "http://10.246.91.98";
// CGFileServerIP_Prod = "http://192.168.41.205";

ip = env == 'dev' ? dev_ip : env == 'qa' ? qa_ip : env == 'prod' ? prod_ip : '';

//CGFileServerIP = env == 'dev' ? CGFileServerIP_Dev : env == 'qa' ? CGFileServerIP_Qa : env == 'prod' ? CGFileServerIP_Prod : '';

//For keycloak integration:
keycloak_ip_dev = "http://192.168.41.132:8080/auth";
keycloak_realm_dev = "CGRealm-dev";
keycloak_ip_qa = "http://192.168.41.132:8080/auth";
keycloak_realm_qa = "CGRealm-qa";
keycloak_ip_prod = "http://192.168.41.154:8080/auth";
keycloak_realm_prod = "CGRealm";
builtAt = '04sep2025 0014hrs';
config = {
    ENV: env,
    builtAt: builtAt,
    mode: mode,
    CGHeaderBGColor: "linear-gradient(to right, #104888 , black)",
    CGSidebarBGColor: "linear-gradient(to right, #ffffff , white)",
    //linear-gradient(to right, blue, black)
    VITE_KEYCLOAK_AUTH_URL: "https://euc1.auth.ac/auth",//https://euc1.auth.ac/auth//http://192.168.41.132:8080/auth
    VITE_UI_APP_KEYCLOAK_REALM: "anilmation",//anilmation//BusinessConsole-dev
    VITE_UI_APP_KEYCLOAK_CLIENTID: "anilmation",//anilmation //concession-frontend
    CG_LOCATION_FILTER_API: ip + "/energyanalytics/api/v1/filter/data",
    CG_WIDGET_API: ip + "/energyanalytics/api/v1/data",
    CG_HEADER_2_API: "http://10.51.108.48:5199/capgemini/api/v1/temp/data",
CG_DOUGHNUT_API: "http://10.51.108.48:5199/capgemini/api/v1/fetch/region/and/country/details",
CG_CONFIG_CREATE_PROJECT:ip+"/energyanalytics/api/v1/create/project",
CG_GET_PROJECTS:ip+"/energyanalytics/api/v1/fetch/project-details",
CG_CONFIG_DELETE_PROJECT:ip+"/energyanalytics/api/v1/delete/project",
CG_HEADER_COUNT_DATA:ip+"/energyanalytics/api/v1/fetch/header/data",
CG_HEADER_RESOURCE_DATA:ip+"/energyanalytics/api/v1/fetch/header/resource/data",

CG_PROJECT_TREE:ip+"/energyanalytics/api/v1/fetch/project/tree",
CG_CONFIG_CREATE_LOCATION:ip+"/energyanalytics/api/v1/create/location",
CG_CONFIG_FETCH_LOCATION_DATA:ip+"/energyanalytics/api/v1/fetch/location/data",
CG_GET_BAR_GRAPH_ENERGY:ip+"/energyanalytics/api/v1/fetch/bar/graph/energy",
CG_GET_BAR_GRAPH_EMISSION:ip+"/energyanalytics/api/v1/fetch/bar/graph/carbon/emission",
CG_GET_BAR_GRAPH_RENEWABLE:ip+"/energyanalytics/api/v1/fetch/bar/graph/renewable/energy",
CG_GET_BAR_GRAPH_WATER:ip+"/energyanalytics/api/v1/fetch/bar/graph/water",
CG_GET_DOUGHNUT_GRAPH_ENERGY:ip+"/energyanalytics/api/v1/fetch/doughnut/graph/energy",

CG_GET_DOUGHNUT_GRAPH_WATER: ip+"/energyanalytics/api/v1/fetch/doughnut/graph/water",
CG_GET_DOUGHNUT_GRAPH_RENEWABLE_ENERGY: ip+"/energyanalytics/api/v1/fetch/doughnut/graph/renewable/energy",
CG_GET_DOUGHNUT_GRAPH_EMISSION_REDUCTION: ip+"/energyanalytics/api/v1/fetch/doughnut/graph/carbon/emission",
CG_GET_BAR_GRAPH_ENERGY_WATER: ip+"/energyanalytics/api/v1/fetch/bar/graph/energy/water",
CG_WATER_SUBMENU_HEADER: ip+"/energyanalytics/api/v1/fetch/header/water/data",
CG_ENERGY_SUBMENU_HEADER:ip+"/energyanalytics/api/v1/fetch/header/energy/data",
CG_ENERGY_SUBMENU_DOUGHNUT_GRAPH: ip+"/energyanalytics/api/v1/fetch/doughnut/graph/electricity",
CG_WATER_SUBMENU_DOUGHNUT_GRAPH: ip+"/energyanalytics/api/v1/fetch/doughnut/graph/alternative_water",
CG_CONFIG_GET_EQUIPMENTS_MAPPING: ip+"/energyanalytics/api/v1/fetch/equip/assequip/details",
CG_CONFIG_GET_EQUIPMENTS_ASSOCIATED_EQUIPMENT_DETAILS: ip + "/energyanalytics/api/v1/fetch/eqtypeaetype",
CG_CONFIG_CREATE_EQUIPMENT:ip + "/energyanalytics/api/v1/create/equipment",
CG_CONFIG_CREATE_LOCATION_PROJECT: ip +"/energyanalytics/api/v1/projects/location",
CG_CONFIG_FETCH_LOCATION_FOR_UPDATE: ip+"/energyanalytics/api/v1/fetch/location/data",
CG_CONFIG_DELETE_EQUIPMENT: ip + "/energyanalytics/api/v1/master/delete/equipment",

CG_CONFIG_FETCH_LOCATIONS: ip + "/energyanalytics/api/v1/fetchLocations",

CG_CONFIG_DELETE_LOCATIONS: ip + "/energyanalytics/api/v1/master/delete/location",


CG_CONFIG_UPLOAD_LOCATION:ip+"/energyanalytics/api/v1/upload/location",
CG_CONFIG_UPLOAD_EQUIPMENT:ip+"/energyanalytics/api/v1/upload/equipment",
CG_CONFIG_UPLOAD_DEVICE:ip+"/energyanalytics/api/v1/devices/upload",
CG_CONFIG_UPLOAD_POINT:ip+"/energyanalytics/api/v1/upload/point",
CG_CONFIG_UPLOAD_VARIABLES:ip+"/energyanalytics/api/v1/upload/variables",
CG_CONFIG_MAP_LOCATION:ip+"/energyanalytics/api/v1/updade/location/data/map",
CG_CONFIG_CREATE_POINT_ASS_EQP: ip + "/energyanalytics/api/v1/fetch/equip/assequip/details",
CG_CONFIG_CREATE_POINTS: ip+"/energyanalytics/api/v1/create/point",
CG_CONFIG_EDIT_POINTS: ip+"/energyanalytics/api/v1/edit/point",
CG_CONFIG_FETCH_POINTS_FOR_EDIT: ip+"/energyanalytics/api/v1/fetch/point/details",
CG_CONFIG_ASS_EQP_MAPPING : ip+"/energyanalytics/api/v1/ass/eqp/details",
CG_CONFIG_CREATE_VARIABLES: ip +"/energyanalytics/api/v1/create/variable",
CG_CONFIG_FETCH_RULE_LIST: ip+"/energyanalytics/api/v1/fetch/rule/details",
CG_CONFIG_DELETE_VARIABLES: ip + "/energyanalytics/api/v1/delete/variable",
CG_CONFIG_FETCH_VARIABLES_FOR_DELETE: ip + "/energyanalytics/api/v1/fetch/variable/details",
CG_CONFIG_EDIT_VARIABLES : ip + "/energyanalytics/api/v1/edit/variable",
CG_CONFIG_FETCH_VARIABLES: ip + "/energyanalytics/api/v1/fetch/variable/list?variabletype=",
CG_CONFIG_FETCH_ASS_EQP_MAPPING: ip+"/energyanalytics/api/v1/master/equipment-ae",
CG_CONFIG_MAP_EQUIPMENT:ip+"/energyanalytics/api/v1/edit/equipment",
CG_CONFIG_DELETE_POINTS:ip+"/energyanalytics/api/v1/delete/point",
CG_CONFIG_FETCH_POINTS_TYPE_UNIT:ip+"/energyanalytics/api/v1/fetch/pointtype/pointsiunit",
CG_CONFIG_CREATE_DEVICE: ip+"/energyanalytics/api/v1/create/device",
CG_CONFIG_DELETE_DEVICE: ip+"/energyanalytics/api/v1/delete/devices",
CG_CONFIG_FETCH_DEVICE: ip + "/energyanalytics/api/v1/fetch/delete/device/management",

CG_CONFIG_DELETE_LOCATION_TREE: ip+ "/energyanalytics/api/v1/project/delete/location",
CG_CONFIG_DELETE_EQUIPMENT_TREE: ip + "/energyanalytics/api/v1/project/delete/equipment",
CG_CONFIG_ADD_VARIABLE_TREE: ip+"/energyanalytics/api/v1/add/variable",
CG_CONFIG_ADD_EQUIPMENT_TREE: ip +"/energyanalytics/api/v1/add/equipment",
CG_CONFIG_REPLACE_DEVICE: ip+ "/energyanalytics/api/v1/device/replace",
CG_CONFIG_RENAME_DEVICE: ip+ "/energyanalytics/api/v1/device/rename",
CG_CONFIG_DEVICE_DISCOVERY_SUBMIT: ip+ "/energyanalytics/api/v1/device/rename",
CG_GET_ALARM_LIST: ip+ "/energyanalytics/api/v1/alarm/list",
CG_CONFIG_EDIT_DEVICE: ip + "/energyanalytics/api/v1/edit/device",
CG_CONFIG_EDIT_DEVICE_MAPPED_DATA:ip + "/energyanalytics/api/v1/devices/flagged",
CG_CONFIG_FETCH_REALTIME_ALARM_DATA:ip + "/energyanalytics/api/v1/alarm/list",
CG_CONFIG_CREATE_TASK_REALTIME_ALARM:ip + "/energyanalytics/api/v1/create/task",
CG_CONFIG_DISCARD_TASK_REALTIME_ALARM:ip + "/energyanalytics/api/v1/alarm/change/status",
CG_CONFIG_INDIVIDUAL_GRAPH_REALTIME_ALARM:ip + "/energyanalytics/api/v1/alarm/graph",
CG_CONFIG_INDIVIDUAL_ALARM_DETAILS_REALTIME_ALARM:ip + "/energyanalytics/api/v1/alarm/details",
CG_FETCH_ENERGY_DOUGHNUT2: ip + "/energyanalytics/api/v1/fetch/doughnut/energy",
CG_FETCH_PERCENTAGE_WATER_DATA: ip + "/energyanalytics/api/v1/fetch/percentage/water/data",
CG_FETCH_SUB_LOCATIONS_DATA_GLOBE: ip + "/energyanalytics/api/v1/fetch/graph/energy",
CG_DOUGHNUT_LOCATION_BASED_COMPARISON: ip + "/energyanalytics/api/v1/doughnut-graph/variable-data",//ip +"/energyanalytics/api/v1/doughnut-graph/variable-data",
CG_HEADER_NEW: ip + "/energyanalytics/api/v1/fetch/header/resource/data",
CG_BAR_NEW: ip + "/energyanalytics/api/v1/fetch/bar/graph/energy",//ip + "/energyanalytics/api/v1/fetch/bar/graph/energy"
CG_CONFIG_FETCH_TASK_MANAGEMENT_DATA: ip + "/energyanalytics/api/v1/fetch/task/details",
CG_CONFIG_FETCH_TASK_MANAGEMENT_POST_TASK_STATUS: ip + "/energyanalytics/api/v1/task/status",
CG_CONFIG_FETCH_TASK_MANAGEMENT_POST_COMMENT: ip + "/energyanalytics/api/v1/insert/task/comment",
CG_CONFIG_FETCH_TASK_MANAGEMENT_POST_CLOSURE: ip + "/energyanalytics/api/v1/close/task",
CG_CONFIG_FETCH_TASK_MANAGEMENT_GET_COMMENT: ip + "/energyanalytics/api/v1/fetch/comment/details?taskId=",
}