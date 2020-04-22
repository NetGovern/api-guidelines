const plugin = (hook, vm) => {
  var setTheme = (themeTitle) => {
    var themes = document.querySelectorAll('[rel="stylesheet"][title]')
    themes.forEach(function (theme) {
      theme.disabled = theme.title !== themeTitle
    })

    document.documentElement.style.setProperty(
      '--docsify_dark_mode_btn',
      defaultConfig[`${themeTitle}`]['toggleBtnBg']
    )
  }

  var defaultConfig = {
    dark: {
      toggleBtnBg: '#34495e',
    },
    light: {
      toggleBtnBg: 'var(--theme-color)',
    }
  }

  hook.afterEach(function(html, next) {
    var darkEl = ` <div id="dark_mode">
             <input class="container_toggle" type="checkbox" id="switch" name="mode" />
             <label for="switch">Toggle</label>
           </div>`
    html = `${darkEl}${html}`
    next(html)
  })

  hook.doneEach(function() {
    var themeTitle
    var storedTitle = localStorage.getItem('DOCSIFY_DARK_MODE')
    if (storedTitle && storedTitle == 'dark') {
      themeTitle = 'dark'
    } else {
      themeTitle = 'light'
    }
    setTheme(themeTitle)

    var checkbox = document.querySelector('input[name=mode]')

    checkbox.addEventListener('change', function() {
      if (themeTitle === 'light') {
        themeTitle = 'dark'
      } else {
        themeTitle = 'light'
      }
      setTheme(themeTitle)
      localStorage.setItem('DOCSIFY_DARK_MODE', themeTitle)
    })
  })
}

window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins)
