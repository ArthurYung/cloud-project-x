export const RELOAD_SCRIPT = `
</code>
<script>
setTimeout(function(){window.location.reload()}, 2000)
</script>
`

export const ERROR_STDOUT_STYLE = `
<b style="color: red">
`

export const HTML_HEADER = `
<!DOCTYPE html>
  <html lang="en">
  <head>
  <style>
    body{
      height: 100vh;
      background: #282c34;
      color: #fff;
    }
    code {
      padding-bottom: 40px
    }
  </style>
  </head>
  <body>
    <header class="header-form">
      <form action="/dpx_stdout_command">
        <input class="header-form-input" name="test"/>
      </form>
    </header>
  <code>
`