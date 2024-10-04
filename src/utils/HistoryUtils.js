const pageList = [
    {
        pageName: "SettingsPage",
        url: "/download-app-android",
    },
    {
        pageName: "Necessità",
        url: "/necessita",
    },
    {
        pageName: "Sfizio",
        url: "/sfizio",
    },
    {
        pageName: "SettingsPage",
        url: "/impostazioni",
    },
    {
        pageName: "HomePage",
        url: "/ctv",
    },
    {
        pageName: "InsertNew",
        url: "/nuovo-stipendio",
    },
    {
        pageName: "LoginPage",
        url: "/login",
    },
]
export const pushState = (url) => {
    window.history.pushState({}, '', '/' + url);
};

export const getCurrentUrl = () => {
    return window.location.href;
};

export const handleUrl = (setSelectedPage) => {
    const currentUrl = getCurrentUrl();
    const page = pageList.filter(p => currentUrl.includes(p.url))[0];
    if(page === undefined && (localStorage.getItem("user") === null || localStorage.getItem("user") === undefined)){
        pushState("login");
        setSelectedPage("LoginPage");
    }else if(page === undefined && (localStorage.getItem("user") !== null && localStorage.getItem("user") !== undefined)){
        pushState("ctv");
        setSelectedPage("HomePage");
    }else{
        if(localStorage.getItem("user") === null || localStorage.getItem("user") === undefined){
            pushState("login");
            setSelectedPage("LoginPage");
        }else{
            setSelectedPage(page.pageName);
        }
    }
}

