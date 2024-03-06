const pageList = [
    {
        pageName: "SettingsPage",
        url: "/download-app-android",
    },
    {
        pageName: "Prima Necessità",
        url: "/necessita",
    },
    {
        pageName: "Svago",
        url: "/svago",
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
    if(page === undefined){
        pushState("ctv");
        setSelectedPage("HomePage");
    }else{
        setSelectedPage(page.pageName);
    }
}

