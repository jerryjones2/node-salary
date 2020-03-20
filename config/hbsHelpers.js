
function create(app,Handlebars,config) {
    Handlebars.registerHelper('hostname',
        () => {
            return config.hostname
        }
    )
    Handlebars.registerHelper('env',
        () => {
            return config.env
        }
    )
    Handlebars.registerHelper('getCurrentYear',
        () => {
            return new Date().getFullYear()
        }
    )
    Handlebars.registerHelper('screamIt', 
        (text) => {
            return text.toUpperCase()
        }
    )
    Handlebars.registerHelper('loginLogoutHtml',
        () => {
            if(app.locals.authenticated == true) {
                let username = app.locals.username
                loginLogoutText = '<a class="nav-link" href="/logout">Logout ('+username+')</a>'
            }else{
                loginLogoutText = '<a class="nav-link" href="/secured">Login</a>'
            }
            return new Handlebars.SafeString(loginLogoutText)
        }
    )

}


module.exports = {
    create
}