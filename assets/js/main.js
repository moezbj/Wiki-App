const $ = window.$

//* **********************************Scrolly links.************************************************************************************
$('.scrolly-middle').scrolly({
  speed: 1000,
  anchor: 'ask'
})

$('.scrolly').scrolly({
  speed: 1000,
  offset: function () { return (skel.breakpoint('mobile').active ? 70 : 190) }
})
//* *******************************appel ajax serach*************************************************************************************

$(document).ready(function () {
  var articles = $('.articles')
  var input = $('input')
  var button = $('button')
  var toSearch = ''
  var searchUrl = 'https://en.wikipedia.org/w/api.php'

  var ajaxArticleData = function () {
    $.ajax({
      url: searchUrl,
      dataType: 'jsonp',
      data: {
                // main parameters
        action: 'query',
        format: 'json',
        generator: 'search',
                    // parameters for generator
        gsrsearch: toSearch,
        gsrnamespace: 0,
        gsrlimit: 10,

        prop: 'extracts|pageimages',
                    // parameters for extracts
        exchars: 200,
        exlimit: 'max',
        explaintext: true,
        exintro: true,

                    // parameters for pageimages
        piprop: 'thumbnail',
        pilimit: 'max',
        pithumbsize: 200
      },
      success: function (json) {
        console.log(json)
        var pages = json.query.pages
        $.map(pages, function (page) {
          var pageElement = $('<div class="art">')
                    // get the article title
          pageElement.append($('<h2>').append($('<a>').attr('href', 'http://en.wikipedia.org/wiki/' + page.title).text(page.title)))
                    // get the article image (if exists)
          if (page.thumbnail) pageElement.append($('<img>').attr('width', 150).attr('src', page.thumbnail.source))
                    // get the article text
          pageElement.append($('<p>').text(page.extract))
                    
          pageElement.append($('<hr>'))

          articles.append(pageElement)
        })
      }
    })
  }
  button.click(function () {
    articles.empty()
    toSearch = input.val()
    ajaxArticleData()
  })
})
